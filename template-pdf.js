/* Geração fiel a partir dos PDFs-modelo. Nenhum dado é enviado ou armazenado. */
const A4_W=595.28,A4_H=841.89,SRC_W=612,SRC_H=792,SX=A4_W/SRC_W,SY=A4_H/SRC_H;

async function generateContractFromTemplate(d,model){
  if(!window.PDFLib)throw new Error("Biblioteca de PDF indisponível");
  const {PDFDocument,StandardFonts,rgb}=PDFLib;
  if(["scholarship"].includes(model)) return generateScholarshipPdf(d);
  const template=model==="academy"?"assets/modelo-academy.pdf":model==="trial"?"assets/modelo-trial.pdf":model==="eja"?"assets/modelo-eja-intermediacao.pdf":model==="cancel"?"assets/modelo-cancelamento.pdf":model==="trancamento"?"assets/modelo-trancamento.pdf":"assets/modelo-presencial.pdf";
  const sourceBytes=await fetch(template).then(r=>{if(!r.ok)throw new Error("Modelo não encontrado");return r.arrayBuffer()});
  const source=await PDFDocument.load(sourceBytes);
  const out=await PDFDocument.create();
  const embedded=await out.embedPdf(source,source.getPageIndices());
  const font=await out.embedFont(StandardFonts.Helvetica);
  const bold=await out.embedFont(StandardFonts.HelveticaBold);
  const pages=embedded.map(ep=>{const p=out.addPage([A4_W,A4_H]);p.drawPage(ep,{x:0,y:0,width:A4_W,height:A4_H});return p});
  const ctx={pages,font,bold,white:rgb(1,1,1),black:rgb(0,0,0)};
  if(model==="trial")fillTrial(ctx,d);
  else if(model==="eja")fillEja(ctx,d);
  else if(model==="cancel")fillCancel(ctx,d);
  else if(model==="trancamento")fillTrancamento(ctx,d);
  else {
    fillCommonPage(ctx,d,model);
    if(model==="academy")fillAcademy(ctx,d);else fillPresential(ctx,d);
  }
  const bytes=await out.save();
  const number=safeFile(d.contractNumber||"");
  const name=safeFile(d.studentName||"contrato");
  const prefix={trial:"Termo-Acesso-Gratuito",academy:"Contrato-Academy",presencial:"Contrato-Presencial",eja:"Contrato-Intermediacao-EJA",cancel:"Termo-Rescisao",trancamento:"Aditivo-Trancamento"}[model]||"Documento-Evolua";
  const fileName=number?`${prefix}-${number}-${name}.pdf`:`${prefix}-${name}.pdf`;
  downloadBytes(bytes,fileName);
}


window.generateContractFromTemplate=generateContractFromTemplate;

function fillEja(c,d){
  const p1=c.pages[0], p4=c.pages[3], p2=c.pages[1];
  const one={name:d.eja1Name, birth:d.eja1Birth, civil:d.eja1Civil, gender:(d.eja1Gender||"").slice(0,1), profession:d.eja1Profession,address:d.eja1Address,district:d.eja1District,cep:d.eja1Cep,city:d.eja1City,state:d.eja1State,email:d.eja1Email,rg:d.eja1Rg,cpf:d.eja1Cpf,phone:d.eja1Phone};
  const two={name:d.eja2Name, birth:d.eja2Birth, civil:d.eja2Civil, gender:(d.eja2Gender||"").slice(0,1), profession:d.eja2Profession,address:d.eja2Address,district:d.eja2District,cep:d.eja2Cep,city:d.eja2City,state:d.eja2State,email:d.eja2Email,rg:d.eja2Rg,cpf:d.eja2Cpf,phone:d.eja2Phone};
  function student(page,v,top){
    field(page,v.name,61,top,285,26,8.1,c);field(page,brDate(v.birth),348,top,86,26,7.5,c);field(page,v.civil,436,top,119,26,7.3,c,{align:"center"});field(page,v.gender,558,top,32,26,8,c,{align:"center"});
    field(page,v.profession,61,top+32,123,25,7.1,c);field(page,v.address,161,top+32,393,25,7.1,c);
    field(page,v.district,61,top+64,123,37,7,c);field(page,v.cep,161,top+64,74,37,7,c);field(page,v.city,235,top+64,145,37,7,c,{align:"center"});field(page,v.state,380,top+64,35,37,7.5,c,{align:"center"});field(page,v.email,405,top+64,149,37,6.1,c);
    field(page,v.rg,61,top+105,198,25,7,c);field(page,v.cpf,259,top+105,146,25,7,c);field(page,v.phone,405,top+105,149,25,7,c);
  }
  // White over the original filled values while keeping the official table/labels.
  student(p1,one,197);
  const show2=d.ejaStudentCount==="2";
  student(p1,show2?two:{},384);
  // Provider block in the original template, keeping clause wording intact.
  const pr=d.ejaProviderData||{};
  cover(p2,110,326,445,92,c);
  drawWrapped(p2,`RAZÃO SOCIAL: ${pr.legal||""}`,61,326,490,8.1,10.5,c.bold,c);
  drawWrapped(p2,`NOME FANTASIA: ${pr.fantasy||""}`,61,348,490,8.1,10.5,c.bold,c);
  drawWrapped(p2,`CNPJ: ${pr.cnpj||""}`,61,370,490,8.1,10.5,c.bold,c);
  drawWrapped(p2,`ENDEREÇO: ${pr.address||""}`,61,392,490,7.5,9.8,c.font,c);
  drawWrapped(p2,`CONTATO: ${pr.contact||""}`,61,411,490,7.5,9.8,c.font,c);
  // The source has a static declaration date. Replace it with the generation date.
  cover(p4,55,238,485,22,c);drawCentered(p4,`Mirassol D’Oeste/MT, ${longDate(new Date())}`,55,239,485,8.5,c.font,c);
  cover(p4,115,286,375,78,c);
  drawCentered(p4,"Evolua+ Profissões-Valéria Da Silva Moura",115,291,375,8,c.bold,c);
  drawCentered(p4,one.name||"",115,337,375,8,c.bold,c);
  if(show2)drawCentered(p4,two.name||"",115,382,375,8,c.bold,c);
  else {cover(p4,115,370,375,35,c);}
}

function fillCancel(c,d){
  const p=c.pages[0];
  cover(p,45,218,505,300,c);
  const body=`Entre partes, na qualidade de CONTRATANTE, ${d.cancelName||""}, CPF: ${d.cancelCpf||""}, RG: ${d.cancelRg||""}, na qualidade de CONTRATADA, Valéria Da Silva Moura, nome fantasia “Evolua+ Profissões” sob o nº CNPJ: 44.456.212.0001-53, fica rescindido o Contrato de Prestação de Serviços sob nº matricula ${d.cancelContract||""}, firmado em ${brDate(d.cancelOriginalDate)}, nas seguintes condições:`;
  drawWrapped(p,body,50,220,495,10.5,14,c.font,c);
  const a=`A)    A CONTRATANTE pagará a Contratada, a importância de ${money(d.cancelFine)} (${numberWords(d.cancelFine)}), como multa contratual, com pagamento realizado em ${d.cancelPayment||""}.`;
  drawWrapped(p,a,50,320,495,10.5,14,c.font,c);
  const b=`B)    Após as condições aqui estabelecidas, fica valendo o presente acordo como quitação mútua, na forma do art. 1025 do Código Civil Brasileiro, ficando o contrato firmado entre as partes nulo e sem efeito.`;
  drawWrapped(p,b,50,405,495,10.5,14,c.font,c);
  drawCentered(p,'"DE ACORDO"',50,505,495,10.5,c.font,c);
  cover(p,70,544,455,28,c);drawCentered(p,`Mirassol D’oeste, ${longDate(new Date())}`,70,547,455,10.2,c.font,c);
  cover(p,80,620,220,55,c);cover(p,315,620,220,55,c);
  drawCentered(p,d.cancelName||"",80,649,220,9,c.font,c);drawCentered(p,"Evolua+ Profissões",315,649,220,9,c.font,c);
}

function fillTrancamento(c,d){
  const p=c.pages[0],p2=c.pages[1];
  cover(p,55,200,500,505,c);
  drawCentered(p,"Aditivo Contratual",55,200,500,15,c.bold,c);
  drawCentered(p,`INSTRUMENTO PARTICULAR DE ADITAMENTO AO CONTRATO ${d.trankContract||""}`,55,242,500,9.3,c.font,c);
  const body=`Pelo presente instrumento, como Prestadora de Serviços Valéria Da Silva Moura nome fantasia Evolua+ Profissões, e como Pagador Responsável Financeiro deste Contrato ${d.trankName||""}, ajustam o seguinte:\n\nA cláusula XIII terá a seguinte redação: “TRANCAMENTO DE MATRICULA” - O aluno poderá solicitar trancamento de sua matricula durante um período pré-definido para que não haja contabilização de faltas.\n\nMediante pedido formal por escrito, podendo retomar as atribuições da qualificação contratada dentro do período de 3 (três) meses à partir da assinatura deste contrato; A prestadora neste caso em acordo com o contratante firma que o mesmo terá uma carência de 3 meses sem efetuar pagamento, pela razão de desemprego. Após o período de 3 meses, poderá ser solicitado prorrogação deste período, com o tempo máximo de mais 09 meses, não havendo retorno sobre a ativação do contrato ou transferência, acarretará a multa de Cancelamento no valor de uma parcela sem descontos promocionais. Ressaltamos que o investimento efetuado até a petição deste trancamento se deve as aulas do curso ${d.trankCourse||""}, já assistidas e foram devidamente quitadas pelo aluno e será válido por um período de 1 ano a contar da data de assinatura deste contrato, A contratada se coloca à disposição para eventual negociação.\n\n3. Ficam ratificadas todas as demais cláusulas e condições do CONTRATO ora alterado.\n\n4. Caso o mesmo não retorne dentro do período estipulado para seu retorno, haverá atualização de valores, sendo eles Matrícula e novas Parcelas.`;
  const lines=wrapLines(body,500,8.7,c.font);lines.slice(0,39).forEach((ln,i)=>draw(p,ln,55,273+i*10.5,8.7,c.font,c));
  cover(p,70,690,455,24,c);drawCentered(p,`Mirassol D’Oeste, ${longDate(new Date())}`,70,693,455,8.7,c.font,c);
  cover(p2,90,145,415,70,c);drawCentered(p2,"Evolua+ Profissões",90,173,200,9,c.font,c);drawCentered(p2,d.trankName||"",305,173,200,9,c.font,c);
}

function wrapLines(text,w,fontSize,font){const out=[];String(text).split(/\n/).forEach(par=>{if(!par.trim()){out.push("");return}const words=par.trim().split(/\s+/);let line="";for(const word of words){const t=line?line+" "+word:word;if(font.widthOfTextAtSize(t,fontSize)<=w*SX)line=t;else{if(line)out.push(line);line=word}}if(line)out.push(line)});return out}

async function generateScholarshipPdf(d){
  const {PDFDocument,StandardFonts,rgb}=PDFLib;const out=await PDFDocument.create();const p=out.addPage([A4_W,A4_H]);const font=await out.embedFont(StandardFonts.Helvetica),bold=await out.embedFont(StandardFonts.HelveticaBold);const black=rgb(0,0,0),purple=rgb(.43,.16,.85),light=rgb(.96,.94,.99);
  const rect=(x,t,w,h,color=rgb(1,1,1))=>p.drawRectangle({x,y:A4_H-(t+h),width:w,height:h,color});const tx=(text,x,t,size,f=font)=>p.drawText(sanitize(text),{x,y:A4_H-(t+size),size,font:f,color:black});const wrap=(text,x,t,w,size,lh=12,f=font)=>wrapLines(text,w,size,f).slice(0,30).forEach((ln,i)=>tx(ln,x,t+i*lh,size,f));
  tx("EVOLUA+ PROFISSÕES",55,55,18,bold);tx("TERMO DE COMPROMISSO DE BOLSA / CONDIÇÃO COMERCIAL",55,82,12,bold);tx("Documento para formalização da condição comercial acordada entre as partes.",55,101,8.5,font);
  rect(55,125,485,45,light);tx(`Benefício: ${d.scholarType==="integral"?"Bolsa integral — 100%":d.scholarType==="parcial"?"Bolsa parcial":d.scholarType==="desconto"?"Desconto especial":"Condição comercial especial"}`,68,140,9,bold);tx(`Validade da condição: ${brDate(d.scholarValidity)}`,350,140,8.2,font);
  tx("1. IDENTIFICAÇÃO",55,195,10,bold);wrap(`CONTRATANTE: ${d.scholarName||""} | CPF/CNPJ: ${d.scholarCpf||""} | RG: ${d.scholarRg||""}`,55,215,485,8.5,12);wrap(`Telefone: ${d.scholarPhone||""} | E-mail: ${d.scholarEmail||""}`,55,239,485,8.5,12);
  tx("2. OBJETO E CONDIÇÃO COMERCIAL",55,275,10,bold);wrap(`A CONTRATADA registra, neste instrumento, a condição comercial especial concedida ao(à) CONTRATANTE para ${d.scholarService||""}, na modalidade ${d.scholarMode||"não informada"}.`,55,295,485,8.5,12);wrap(`Valor original: ${money(d.scholarOriginal)}. Benefício concedido: ${d.scholarPercent||0}%. Valor final acordado: ${money(d.scholarFinal)}.`,55,331,485,8.5,12);wrap(`Forma de pagamento: ${d.scholarPayment||""}. Quantidade: ${d.scholarInstallments||1} parcela(s) de ${money(d.scholarPart)}.`,55,355,485,8.5,12);
  tx("3. COMPROMISSO",55,397,10,bold);wrap("A condição comercial acima será considerada a condição acordada entre as partes durante sua validade, desde que o(a) CONTRATANTE cumpra as condições de pagamento e demais obrigações aplicáveis ao serviço contratado. A presente declaração não substitui o contrato principal, matrícula ou instrumento específico que venha a formalizar a prestação do serviço.",55,417,485,8.5,12);
  tx("4. DISPOSIÇÕES FINAIS",55,495,10,bold);wrap(`O(a) CONTRATANTE declara ter ciência dos valores e condições registrados neste documento. ${d.scholarNotes||""}`,55,515,485,8.5,12);wrap(`Firmado em Mirassol D’Oeste/MT, ${longDate(localDate(d.scholarDate)||new Date())}.`,55,567,485,8.5,12);
  tx("__________________________________",80,625,9,font);tx("__________________________________",325,625,9,font);tx(d.scholarName||"CONTRATANTE",80,642,8.5,font);tx("Valéria Da Silva Moura — Evolua+ Profissões",325,642,8.2,font);tx("CNPJ 44.456.212/0001-53",325,657,7.5,font);
  const bytes=await out.save();downloadBytes(bytes,`Termo-Compromisso-Bolsa-${safeFile(d.scholarName||"cliente")}.pdf`);
}

function fillTrial(c,d){
  const p=c.pages[0];
  const TW=595.304,TH=841.89;
  const coverT=(x,top,w,h)=>p.drawRectangle({x,y:TH-(top+h),width:w,height:h,color:c.white});
  const drawT=(text,x,top,size,font=c.font)=>{const s=sanitize(text);p.drawText(s,{x,y:TH-(top+size),size,font,color:c.black})};
  const fittedT=(text,x,top,w,size)=>{let s=sanitize(text),z=size;while(z>5&&c.font.widthOfTextAtSize(s,z)>w)z-=.25;drawT(s,x,top,z)};
  const centeredT=(text,x,top,w,size)=>{const s=sanitize(text),tw=c.font.widthOfTextAtSize(s,size);drawT(s,x+Math.max(0,(w-tw)/2),top,size)};
  const date=brDate(d.activationDate),end=brDate(d.trialEndDate);
  coverT(98,297,274,18); fittedT(d.studentName||"",101,300,268,9.2);
  coverT(415,297,118,18); fittedT(d.studentCpf||"",418,300,112,9.2);
  coverT(90,318,279,18); fittedT(d.studentEmail||"",93,321,273,8.8);
  coverT(415,318,118,18); fittedT(d.studentPhone||"",418,321,112,9.2);
  coverT(127,345,83,15); centeredT(date,127,347,83,9.2);
  coverT(379,353,84,15); centeredT(end,379,355,84,9.2);
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
  const p2=c.pages[1],total=(+d.courseValue||0)+(+d.enrollmentValue||0),n=Math.min(17,Math.max(1,+d.installments||1)),dates=dueDates(d.firstDue,n,+d.dueDay||10),part=total/n;
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
