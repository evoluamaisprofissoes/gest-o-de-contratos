/* Geração fiel a partir dos PDFs-modelo. Nenhum dado é enviado ou armazenado. */
const A4_W=595.28,A4_H=841.89,SRC_W=612,SRC_H=792,SX=A4_W/SRC_W,SY=A4_H/SRC_H;

async function generateContractFromTemplate(d,model){
  if(!window.PDFLib)throw new Error("Biblioteca de PDF indisponível");
  const {PDFDocument,StandardFonts,rgb}=PDFLib;
  const template=model==="academy"?"assets/modelo-academy.pdf":"assets/modelo-presencial.pdf";
  const sourceBytes=await fetch(template).then(r=>{if(!r.ok)throw new Error("Modelo não encontrado");return r.arrayBuffer()});
  const source=await PDFDocument.load(sourceBytes);
  const out=await PDFDocument.create();
  const embedded=await out.embedPdf(source,source.getPageIndices());
  const font=await out.embedFont(StandardFonts.Helvetica);
  const bold=await out.embedFont(StandardFonts.HelveticaBold);
  const pages=embedded.map(ep=>{const p=out.addPage([A4_W,A4_H]);p.drawPage(ep,{x:0,y:0,width:A4_W,height:A4_H});return p});
  const ctx={pages,font,bold,white:rgb(1,1,1),black:rgb(0,0,0)};
  fillCommonPage(ctx,d,model);
  if(model==="academy")fillAcademy(ctx,d);else fillPresential(ctx,d);
  const bytes=await out.save();
  const number=safeFile(d.contractNumber||"sem-numero"),name=safeFile(d.studentName||"contrato");
  downloadBytes(bytes,`Contrato-${number}-${model==="academy"?"Academy":"Presencial"}-${name}.pdf`);
}

function fillCommonPage(c,d,model){
  const p=c.pages[0],a=model==="academy",o=a?-14.2:0;
  cover(p,a?438:406,207+o,145,29,c); drawRight(p,d.contractNumber,529,222+o,8,c.bold,c);
  field(p,d.studentName,61,264+o,263,17,8,c);
  field(p,brDate(d.studentBirth),328,274+o,69,15,7.4,c);
  field(p,d.studentCivil,405,274+o,108,15,7.4,c);
  field(p,(d.studentGender||"").slice(0,1),520,268+o,35,17,8,c,{align:"center"});
  field(p,d.studentProfession,61,307+o,111,15,7.4,c,{align:"center"});
  field(p,d.studentAddress,176,304+o,377,17,7.4,c);
  field(p,d.studentDistrict,61,351+o,111,18,7.2,c);
  field(p,d.studentCep,178,351+o,64,18,7.2,c);
  field(p,d.studentCity,246,351+o,130,18,7.2,c,{align:"center"});
  field(p,d.studentState,380,339+o,21,17,7.4,c,{align:"center"});
  field(p,d.studentEmail,404,346+o,149,23,6.2,c,{align:"center"});
  field(p,d.studentRg,61,383+o,181,16,7.2,c);
  field(p,d.studentCpf,247,383+o,129,16,7.2,c);
  field(p,d.studentPhone,380,383+o,173,16,7.2,c);
  field(p,d.studentProfession,61,417+o,111,15,7.2,c,{align:"center"});
  field(p,d.studentAddress,176,414+o,377,17,7.2,c);

  field(p,d.payerName,61,563+o,374,17,7.5,c);
  field(p,brDate(d.payerBirth),438,558+o,115,17,7.2,c);
  field(p,d.payerRg,61,607+o,165,16,7.2,c);
  field(p,d.payerCpf,230,607+o,165,16,7.2,c);
  field(p,d.payerProfession,400,607+o,153,16,7,c);
  field(p,d.payerAddress,61,636+o,332,17,7.2,c,{align:"center"});
  field(p,d.payerDistrict,398,636+o,155,17,7.2,c,{align:"center"});
  field(p,d.payerCep,61,668+o,160,16,7.2,c);
  field(p,d.payerCity,225,668+o,168,16,7.2,c,{align:"center"});
  field(p,d.payerPhone,398,668+o,155,16,7.2,c,{align:"center"});
  if(a){
    const total=+d.courseValue||0,n=Math.max(1,+d.installments||1),part=total/n;
    field(p,money(part),61,729,95,16,7.2,c);
    field(p,d.paymentMethod,157,716,66,29,6.4,c,{align:"center",multiline:true});
    field(p,"R$ 0,00",226,729,70,16,7.2,c,{align:"center"});
    field(p,d.material,299,716,111,29,6.2,c,{align:"center",multiline:true});
    field(p,money(total),419,729,105,16,7.2,c);
  }
}

function fillAcademy(c,d){
  const p2=c.pages[1],total=+d.courseValue||0,n=Math.min(12,Math.max(1,+d.installments||12)),part=total/n,dates=dueDates(d.firstDue,n,+d.dueDay||10);
  for(let i=0;i<12;i++){
    const top=49.2+(i<10?i*14.2:10*14.2+(i-10)*16.9);
    if(i<n){draw(p2,String(i+1),64,top+2,7,c.font,c);draw(p2,brDate(dates[i]),86,top+2,7,c.font,c);draw(p2,money(part),150,top+2,7,c.font,c);if(+d.discount)draw(p2,money(d.discount),209,top+2,6.7,c.font,c)}
  }
  field(p2,d.planName,61,287,162,27,7.3,c,{align:"center"});
  field(p2,String(d.planUsers||""),226,287,116,27,7.3,c,{align:"center"});
  field(p2,brDate(d.subscriptionStart),345,287,106,27,7.1,c,{align:"center"});
  field(p2,brDate(d.subscriptionEnd),454,287,103,27,7.1,c,{align:"center"});
  field(p2,linesPlain(d.planCourses).join(", "),226,315,331,100,6.6,c,{multiline:true,lineHeight:8});

  const p3=c.pages[2];
  cover(p3,59,251,494,58,c);
  const clause=`2.5. O plano contratado pelo CONTRATANTE acima mencionado é ${d.planName}, com vigência de 12 (doze) meses e valor total contratual de ${money(total)} (${numberWords(total)}), pago em ${n} parcela(s) de ${money(part)} (${numberWords(part)}), forma de pagamento escolhida ${d.paymentMethod.toUpperCase()} com vencimento todo dia ${d.dueDay} conforme descrito no item 3.`;
  drawWrapped(p3,clause,61,253,488,8,10.3,c.font,c);
  addSignatureDate(c.pages[5],d,c,"academy");
}

function fillPresential(c,d){
  const p2=c.pages[1],n=Math.min(17,Math.max(1,+d.installments||1)),part=+d.courseValue||0,total=part*n+(+d.enrollmentValue||0),dates=dueDates(d.firstDue,n,+d.dueDay||10);
  field(p2,money(d.courseValue),61,63,101,28,7.2,c);
  field(p2,d.paymentMethod,163,63,61,28,6.2,c,{align:"center",multiline:true});
  field(p2,money(d.enrollmentValue),226,63,72,28,7.1,c,{align:"center"});
  field(p2,d.material,300,62,111,29,6.2,c,{align:"center",multiline:true});
  field(p2,money(total),419,63,105,28,7.2,c);
  for(let i=0;i<17;i++){
    const top=i<10?108+i*14.2:252.8+(i-10)*16.9;
    cover(p2,63,top+1,198,11,c);
    draw(p2,String(i+1),64,top+2,7,c.font,c);
    if(i<n){draw(p2,brDate(dates[i]),86,top+2,7,c.font,c);draw(p2,money(part),152,top+2,7,c.font,c);if(+d.discount)draw(p2,money(d.discount),210,top+2,6.7,c.font,c)}
  }
  field(p2,d.courseName,61,444,162,31,7.2,c,{align:"center",multiline:true});
  field(p2,String(d.workload||"")+" horas",226,444,116,31,7.2,c,{align:"center"});
  field(p2,brDate(d.courseStart),345,444,106,31,7.1,c,{align:"center"});
  field(p2,brDate(d.courseEnd),454,444,103,31,7.1,c,{align:"center"});
  field(p2,d.courseMode,61,480,162,76,7,c,{align:"center",multiline:true});
  field(p2,"Módulos: "+linesPlain(d.modules).join(", "),226,480,331,76,6.5,c,{multiline:true,lineHeight:7.8});
  field(p2,d.schedule,61,599,496,18,7,c);
  addSignatureDate(c.pages[3],d,c,"presential");
}

function addSignatureDate(page,d,c,model){
  const top=model==="academy"?444:33;
  cover(page,158,top,278,17,c);
  const txt=`Mirassol D’Oeste, ${longDate(new Date())}`;
  drawCentered(page,txt,150,top+2,294,7.5,c.bold,c);
}

function field(page,text,x,top,w,h,size,c,opt={}){
  cover(page,x+1,top+1,w-2,Math.max(1,h-2),c);
  if(opt.multiline)drawWrapped(page,String(text||""),x+3,top+2,w-6,size,opt.lineHeight||size+1.5,c.font,c,opt.align);
  else if(opt.align==="center")drawCentered(page,String(text||""),x+2,top+3,w-4,size,c.font,c);
  else drawFitted(page,String(text||""),x+3,top+3,w-6,size,c.font,c);
}
function cover(page,x,top,w,h,c){page.drawRectangle({x:x*SX,y:A4_H-(top+h)*SY,width:w*SX,height:h*SY,color:c.white})}
function draw(page,text,x,top,size,font,c){page.drawText(sanitize(text),{x:x*SX,y:A4_H-(top+size)*SY,size,color:c.black,font})}
function drawRight(page,text,right,top,size,font,c){const s=sanitize(text),tw=font.widthOfTextAtSize(s,size);page.drawText(s,{x:right*SX-tw,y:A4_H-(top+size)*SY,size,font,color:c.black})}
function drawCentered(page,text,x,top,w,size,font,c){const s=sanitize(text),tw=font.widthOfTextAtSize(s,size);page.drawText(s,{x:x*SX+Math.max(0,(w*SX-tw)/2),y:A4_H-(top+size)*SY,size,font,color:c.black})}
function drawFitted(page,text,x,top,w,size,font,c){let s=sanitize(text),z=size;while(z>4.8&&font.widthOfTextAtSize(s,z)>w*SX)z-=.25;page.drawText(s,{x:x*SX,y:A4_H-(top+z)*SY,size:z,font,color:c.black})}
function drawWrapped(page,text,x,top,w,size,lineHeight,font,c,align){
  const words=sanitize(text).split(/\s+/),lines=[];let line="";
  for(const word of words){const test=line?line+" "+word:word;if(font.widthOfTextAtSize(test,size)<=w*SX)line=test;else{if(line)lines.push(line);line=word}}
  if(line)lines.push(line);
  lines.slice(0,Math.max(1,Math.floor(110/lineHeight))).forEach((ln,i)=>{if(align==="center")drawCentered(page,ln,x,top+i*lineHeight,w,size,font,c);else draw(page,ln,x,top+i*lineHeight,size,font,c)});
}
function sanitize(v){return String(v??"").replace(/[\u2012\u2013\u2014]/g,"-").replace(/\u00a0/g," ")}
function safeFile(v){return String(v).replace(/[^\p{L}\p{N}.-]+/gu,"-").replace(/^-|-$/g,"")}
function linesPlain(v){return String(v||"").split(/\n+/).map(s=>s.trim()).filter(Boolean)}
function downloadBytes(bytes,name){const blob=new Blob([bytes],{type:"application/pdf"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000)}
