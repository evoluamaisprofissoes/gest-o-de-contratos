/* Módulos adicionais do Gestão de Contratos. */
(()=>{
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];

  const institutions={
    mt:{label:'MT-Cursos',legal:'SISTEMA DE ENSINO FUNDAMENTAL, MÉDIO E PROFISSIONAL À DISTÂNCIA',cnpj:'10.807.062/0001-63',phone:'(65) 3649-3357',address:'Rua 145, Quadra 147, nº 05, CPA IV, 4ª Etapa, Cuiabá/MT'},
    cec:{label:'CEC – Complexo Educacional do Cariri',legal:'COMPLEXO EDUCACIONAL DO CARIRI',cnpj:'23.466.918/0001-26',phone:'',address:'Avenida Professora Maria Salete Pereira Bezerra, nº 267, Bairro Alto São Vicente, Monteiro/PB, Brasil'}
  };

  const configs={
    trancamento:{title:'Termo de Trancamento',eyebrow:'ADITIVO CONTRATUAL'},
    cancelamento:{title:'Termo de Cancelamento',eyebrow:'RESCISÃO CONTRATUAL'},
    ficha:{title:'Ficha de Matrícula | Provão MT-Cursos',eyebrow:'PROVÃO MT-CURSOS'},
    compromisso:{title:'Termo de Compromisso | Provão',eyebrow:'INSTITUIÇÃO CERTIFICADORA'}
  };

  let current='',signatureData=null,photoData=null;

  const start=$('#startScreen');
  const formScreen=$('#formScreen');
  const addonScreen=$('#addonScreen');
  const fields=$('#addonFields');
  const form=$('#addonForm');

  const field=(label,name,type='text',extra='')=>
    `<label>${label}<input name="${name}" type="${type}" ${extra}></label>`;

  const select=(label,name,options,extra='')=>
    `<label>${label}<select name="${name}" ${extra}>${options.map(o=>`<option value="${o[0]}">${o[1]}</option>`).join('')}</select></label>`;

  const section=(n,title,desc='')=>
    `<div class="section-title"><span>${n}</span><div><h2>${title}</h2><p>${desc}</p></div></div>`;

  const grid=content=>`<div class="field-grid">${content}</div>`;

  function open(kind){
    current=kind;
    signatureData=null;
    photoData=null;
    $('#addonTitle').textContent=configs[kind].title;
    start.classList.remove('active');
    formScreen.classList.remove('active');
    addonScreen.classList.add('active');
    build(kind);
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function back(){
    addonScreen.classList.remove('active');
    start.classList.add('active');
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function build(kind){
    let html='';

    if(kind==='trancamento'){
      html=section('01','Dados do aluno e do contrato','Informe os dados que devem aparecer no aditivo.')+
      grid(
        field('Nome completo do aluno','studentName','text','required')+
        field('CPF do aluno','studentCpf')+
        field('Número do contrato/matrícula','contractNumber','text','required')+
        field('Curso','courseName','text','required')+
        field('Data do contrato','contractDate','date')+
        field('Data do trancamento','eventDate','date','required')+
        field('Prazo de trancamento','pausePeriod','text','placeholder="Ex.: 3 meses"')+
        field('Data prevista para retorno','returnDate','date')+
        field('Motivo do trancamento','reason','text','placeholder="Opcional"')+
        field('Condições especiais','conditions','text','placeholder="Opcional"')
      )+
      `<p class="addon-note">O texto será gerado como minuta baseada no modelo enviado. Confira prazos, valores e condições antes de colher as assinaturas.</p>`;
    }

    if(kind==='cancelamento'){
      html=section('01','Dados do aluno e do contrato','Informe os dados da rescisão.')+
      grid(
        field('Nome completo do aluno/contratante','studentName','text','required')+
        field('CPF do aluno','studentCpf')+
        field('RG do aluno','studentRg')+
        field('Número do contrato/matrícula','contractNumber','text','required')+
        field('Data do contrato','contractDate','date')+
        field('Data do cancelamento','eventDate','date','required')+
        field('Valor da multa (R$)','fineValue','number','min="0" step="0.01" value="0"')+
        select('Forma de pagamento da multa','fineMethod',[
          ['Não se aplica','Não se aplica'],
          ['PIX','PIX'],
          ['Dinheiro','Dinheiro'],
          ['Cartão','Cartão'],
          ['Transferência','Transferência'],
          ['Outro','Outro']
        ])+
        field('Condições/acordo adicional','conditions','text','placeholder="Opcional"')
      )+
      `<p class="addon-note">O valor da multa é editável e pode ser zero. Revise o acordo e a base contratual antes de utilizar o documento.</p>`;
    }

    if(kind==='ficha'){
      const docs=[
        'Cópia da Cédula de Identidade - RG',
        'Cópia do CPF',
        '01 (uma) Foto 3x4',
        'Cópia do Título de Eleitor',
        'Certidão de Reservista',
        'Histórico Escolar concluído ou parcial',
        'Certidão de Nascimento ou casamento',
        '01 (um) envelope pardo TAMANHO A4'
      ];

      const levels=[
        'Exame de classificação (1ª a 4ª série) Ensino Fundamental',
        '1º ano/2º segmento Ensino Fundamental (6º/7º ano)',
        '2º ano/2º segmento Ensino Fundamental (8º/9º ano)',
        'Aproveitamento de estudos – Ensino Fundamental',
        'Dependência – 1º ano/2º segmento Ensino Fundamental',
        'Dependência – 2º ano/2º segmento Ensino Fundamental',
        'Aproveitamento de estudos – 2º ano/2º segmento Ensino Fundamental',
        '1º ano EJA Ensino Médio',
        '2º ano EJA Ensino Médio',
        '3º ano EJA Ensino Médio',
        'Aproveitamento de estudos – 1º ano EJA Ensino Médio',
        'Aproveitamento de estudos – 2º ano EJA Ensino Médio',
        'Aproveitamento de estudos – 3º ano EJA Ensino Médio',
        'Dependências – 1º ano EJA Ensino Médio',
        'Dependências – 3º ano EJA Ensino Médio'
      ];

      const subjects=[
        'L. PORTUGUESA',
        'ARTE',
        'ED. FÍSICA',
        'L.E. INGLÊS',
        'MATEMÁTICA',
        'CIÊNCIAS',
        'HISTÓRIA',
        'GEOGRAFIA'
      ];

      html=
      section('01','Dados pessoais','Preencha os dados conforme os documentos do aluno.')+
      grid(
        field('Nome completo','studentName','text','required')+
        field('Data de nascimento','birthDate','date')+
        field('Naturalidade','birthPlace')+
        field('UF','birthState','text','maxlength="2"')+
        field('CPF','studentCpf','text','required')+
        field('RG nº','studentRg')+
        field('Órgão expedidor','rgIssuer')+
        field('Nome do pai','fatherName')+
        field('Nome da mãe','motherName')+
        field('Bairro','district')+
        field('Endereço','address')+
        field('Fone residencial','homePhone')+
        field('Celular','phone')+
        field('E-mail','email','email')
      )+

      section('02','Documentos entregues','Marque os documentos recebidos.')+
      `<div class="check-grid">${docs.map((x,i)=>`<label><input type="checkbox" name="doc_${i}" value="${x}"> ${x}</label>`).join('')}</div>`+

      section('03','Cursos EJA – EAD','Selecione a etapa correspondente à matrícula.')+
      `<div class="check-grid">${levels.map((x,i)=>`<label><input type="checkbox" name="level_${i}" value="${x}"> ${x}</label>`).join('')}</div>`+

      section('04','Disciplinas','Marque as disciplinas correspondentes.')+
      `<div class="check-grid">${subjects.map((x,i)=>`<label><input type="checkbox" name="subject_${i}" value="${x}"> ${x}</label>`).join('')}</div>`+

      section('05','Foto e assinatura','A foto 3x4 é opcional. A assinatura é obrigatória.')+
      grid(
        `<label class="wide">Foto 3x4 do aluno
          <input id="studentPhotoFile" type="file" accept="image/*">
          <small>Opcional. JPG ou PNG, até 8 MB.</small>
          <img id="studentPhotoPreview" class="signature-preview" alt="Prévia da foto" hidden>
        </label>
        <label class="wide">Foto da assinatura do aluno
          <input id="signatureFile" name="signatureFile" type="file" accept="image/*" required>
          <small>JPG ou PNG, até 8 MB.</small>
          <img id="signaturePreview" class="signature-preview" alt="Prévia da assinatura" hidden>
        </label>`+
        field('Data da matrícula','eventDate','date','required')+
        field('Funcionário responsável','staffName')
      )+
      `<p class="addon-note">Confira as condições financeiras e acadêmicas vigentes antes de utilizar o documento.</p>`;
    }

    if(kind==='compromisso'){
      html=section('01','Dados do aluno','Esses dados serão inseridos no termo para assinatura digital.')+
      grid(
        field('Nome completo do aluno','studentName','text','required')+
        field('CPF do aluno','studentCpf','text','required')+
        field('RG do aluno','studentRg')+
        field('Data de nascimento','birthDate','date')+
        field('Curso pretendido','courseName','text','placeholder="Ensino Fundamental ou Médio"')+
        field('Data do termo','eventDate','date','required')+
        select('Instituição responsável pela certificação','institution',[
          ['mt','MT-Cursos'],
          ['cec','CEC – Complexo Educacional do Cariri']
        ],'required')
      )+
      `<p class="addon-note">A Evolua+ Profissões atua como intermediadora comercial e administrativa. A emissão de certificados compete à instituição parceira, conforme seus requisitos e a legislação aplicável.</p>`;
    }

    fields.innerHTML=html;

    const dateInput=$('input[name="eventDate"]',fields);
    if(dateInput)dateInput.value=new Date().toISOString().slice(0,10);

    const file=$('#signatureFile');
    if(file)file.addEventListener('change',readSignature);

    const photo=$('#studentPhotoFile');
    if(photo)photo.addEventListener('change',readPhoto);
  }

  async function readSignature(e){
    const file=e.target.files?.[0];
    signatureData=null;
    if(!file)return;

    if(!file.type.startsWith('image/')){
      alert('Escolha uma imagem válida.');
      e.target.value='';
      return;
    }

    if(file.size>8*1024*1024){
      alert('A imagem deve ter até 8 MB.');
      e.target.value='';
      return;
    }

    const raw=await fileToDataURL(file);
    const normalized=await normalizeImage(raw);
    signatureData={data:normalized,type:'image/png'};

    const img=$('#signaturePreview');
    img.src=normalized;
    img.hidden=false;
  }

  async function readPhoto(e){
    const file=e.target.files?.[0];
    photoData=null;
    if(!file)return;

    if(!file.type.startsWith('image/')){
      alert('Escolha uma imagem válida.');
      e.target.value='';
      return;
    }

    if(file.size>8*1024*1024){
      alert('A imagem deve ter até 8 MB.');
      e.target.value='';
      return;
    }

    const raw=await fileToDataURL(file);
    const normalized=await normalizeImage(raw);
    photoData={data:normalized,type:'image/png'};

    const img=$('#studentPhotoPreview');
    img.src=normalized;
    img.hidden=false;
  }

  function fileToDataURL(file){
    return new Promise((resolve,reject)=>{
      const r=new FileReader();
      r.onload=()=>resolve(r.result);
      r.onerror=reject;
      r.readAsDataURL(file);
    });
  }

  function normalizeImage(src){
    return new Promise((resolve,reject)=>{
      const im=new Image();
      im.onload=()=>{
        const c=document.createElement('canvas');
        c.width=im.naturalWidth;
        c.height=im.naturalHeight;
        c.getContext('2d').drawImage(im,0,0);
        resolve(c.toDataURL('image/png'));
      };
      im.onerror=reject;
      im.src=src;
    });
  }

  function values(){
    const fd=new FormData(form),d={};

    for(const [k,v] of fd.entries()){
      if(!(v instanceof File))d[k]=String(v).trim();
    }

    d.docs=$$('[name^="doc_"]:checked',form).map(x=>x.value);
    d.levels=$$('[name^="level_"]:checked',form).map(x=>x.value);
    d.subjects=$$('[name^="subject_"]:checked',form).map(x=>x.value);
    d.signature=signatureData;
    d.photo=photoData;

    return d;
  }

  function valid(){
    let ok=true;

    $$('[required]',form).forEach(el=>{
      if(el.type==='file'){
        if(!el.files?.length){
          ok=false;
          el.classList.add('invalid');
        }else{
          el.classList.remove('invalid');
        }
      }else if(!el.value.trim()){
        ok=false;
        el.classList.add('invalid');
      }else{
        el.classList.remove('invalid');
      }
    });

    if(current==='ficha'&&!signatureData)ok=false;

    if(!ok){
      alert('Preencha os campos obrigatórios e confira a foto da assinatura.');
    }

    return ok;
  }

  form.addEventListener('submit',async e=>{
    e.preventDefault();
    if(!valid())return;

    const btn=$('#addonGenerate');
    btn.disabled=true;
    btn.textContent='Gerando PDF…';

    try{
      await generateAddonPdf(current,values());
    }catch(err){
      console.error(err);
      alert('Não foi possível gerar o PDF. Tente novamente.');
    }finally{
      btn.disabled=false;
      btn.textContent='Gerar PDF ↓';
    }
  });

  $('#addonBack').addEventListener('click',back);
  $('#addonCancel').addEventListener('click',back);
  $$('[data-addon]').forEach(b=>b.addEventListener('click',()=>open(b.dataset.addon)));

  function dateBR(v){
    if(!v)return '';
    const [y,m,d]=v.split('-');
    return `${d}/${m}/${y}`;
  }

  function safe(v){
    return (v||'documento')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g,'')
      .replace(/[^a-zA-Z0-9_-]+/g,'-')
      .replace(/^-|-$/g,'')
      .slice(0,70)||'documento';
  }

  function money(v){
    return Number(v||0).toLocaleString('pt-BR',{
      style:'currency',
      currency:'BRL'
    });
  }

  async function generateAddonPdf(kind,d){
    if(!window.PDFLib)throw new Error('PDFLib indisponível');

    const {PDFDocument,StandardFonts,rgb}=PDFLib;
    const pdf=await PDFDocument.create();

    let page=pdf.addPage([595.28,841.89]);

    const font=await pdf.embedFont(StandardFonts.Helvetica);
    const bold=await pdf.embedFont(StandardFonts.HelveticaBold);

    const W=595.28,H=841.89,margin=48;
    let y=H-52;

    const newPage=()=>{
      page=pdf.addPage([W,H]);
      y=H-52;
    };

    const line=()=>{
      y-=6;
      page.drawLine({
        start:{x:margin,y},
        end:{x:W-margin,y},
        thickness:.7,
        color:rgb(.68,.64,.72)
      });
      y-=16;
    };

    const wrap=(text,size=10,isBold=false,indent=0)=>{
      const f=isBold?bold:font;
      const words=String(text??'').split(/\s+/);
      let row='';

      for(const word of words){
        const test=row?row+' '+word:word;

        if(f.widthOfTextAtSize(test,size)>W-margin*2-indent){
          if(y<70)newPage();

          page.drawText(row,{
            x:margin+indent,
            y,
            size,
            font:f,
            color:rgb(.08,.08,.1)
          });

          y-=size+5;
          row=word;
        }else{
          row=test;
        }
      }

      if(row){
        if(y<70)newPage();

        page.drawText(row,{
          x:margin+indent,
          y,
          size,
          font:f,
          color:rgb(.08,.08,.1)
        });

        y-=size+5;
      }
    };

    const title=t=>{
      wrap(t,15,true);
      y-=5;
      line();
    };

    const kv=(label,value)=>{
      wrap(`${label}: ${value||'________________________________'}`,10,false);
    };

    const signLine=name=>{
      y-=28;
      if(y<95)newPage();

      page.drawLine({
        start:{x:margin+18,y},
        end:{x:W-margin-18,y},
        thickness:.8,
        color:rgb(.1,.1,.1)
      });

      y-=17;
      wrap(name,9,true);
    };

    if(kind==='trancamento'||kind==='cancelamento'){
      const response=await fetch('assets/banner-academy.png');

      if(!response.ok){
        throw new Error('Não foi possível carregar assets/banner-academy.png');
      }

      const bannerBytes=await response.arrayBuffer();
      const banner=await pdf.embedPng(bannerBytes);
      const bannerWidth=W-margin*2;
      const bannerHeight=banner.height*(bannerWidth/banner.width);

      page.drawImage(banner,{
        x:margin,
        y:H-28-bannerHeight,
        width:bannerWidth,
        height:bannerHeight
      });

      y=H-28-bannerHeight-24;

      page.drawLine({
        start:{x:margin,y},
        end:{x:W-margin,y},
        thickness:1,
        color:rgb(.48,.18,.75)
      });

      y-=24;
    }

    const institution=institutions[d.institution||'mt'];

    if(kind==='trancamento'){
      title('ADITIVO CONTRATUAL | TERMO DE TRANCAMENTO');

      wrap('Pelo presente instrumento, a Evolua+ Profissões, representada por Valéria da Silva Moura, e o(a) aluno(a) abaixo identificado(a), registram a solicitação de trancamento relacionada ao contrato informado.',10);

      y-=8;
      kv('Aluno(a)',d.studentName);
      kv('CPF',d.studentCpf);
      kv('Contrato/matrícula',d.contractNumber);
      kv('Curso',d.courseName);
      kv('Data do contrato',dateBR(d.contractDate));
      kv('Data do trancamento',dateBR(d.eventDate));
      kv('Prazo solicitado',d.pausePeriod);
      kv('Previsão de retorno',dateBR(d.returnDate));
      kv('Motivo',d.reason);

      y-=8;
      wrap('As partes registram que o trancamento e eventual retorno observarão as condições contratuais aplicáveis e as condições específicas descritas abaixo. Este documento deverá ser conferido e aceito pelas partes antes da assinatura.',10);

      y-=6;
      wrap('Condições específicas: '+(d.conditions||'A definir por acordo entre as partes.'),10);

      y-=10;
      wrap(`Mirassol D’Oeste/MT, ${dateBR(d.eventDate)}.`,10);

      signLine('Evolua+ Profissões | Valéria da Silva Moura');
      signLine(d.studentName||'Aluno(a)');

    }else if(kind==='cancelamento'){
      title('TERMO DE RESCISÃO DE CONTRATO DE PRESTAÇÃO DE SERVIÇOS');

      wrap('Entre as partes identificadas abaixo, fica formalizada a rescisão do contrato de prestação de serviços indicado, conforme as condições registradas neste termo.',10);

      y-=8;
      kv('Contratante/aluno(a)',d.studentName);
      kv('CPF',d.studentCpf);
      kv('RG',d.studentRg);
      kv('Contrato/matrícula',d.contractNumber);
      kv('Data do contrato',dateBR(d.contractDate));
      kv('Data do cancelamento',dateBR(d.eventDate));

      y-=8;
      wrap(`A) Valor de multa contratual acordado: ${money(d.fineValue)}. Forma de pagamento: ${d.fineMethod||'Não informada'}.`,10);
      wrap('B) Após o cumprimento das condições expressamente acordadas neste termo, as partes darão quitação nos limites das obrigações aqui descritas e da legislação aplicável.',10);
      wrap('Condições adicionais: '+(d.conditions||'Nenhuma condição adicional informada.'),10);

      y-=10;
      wrap(`Mirassol D’Oeste/MT, ${dateBR(d.eventDate)}.`,10);

      signLine(d.studentName||'Contratante');
      signLine('Evolua+ Profissões | Valéria da Silva Moura');

    }else if(kind==='ficha'){

      // FICHA MT-CURSOS
      // Página A4 retrato, baseada na distribuição do modelo original.

      const ink=rgb(.05,.05,.05);
      const blue=rgb(.08,.34,.55);
      const gray=rgb(.32,.32,.32);

      const t=(text,x,yy,size=7.2,b=false,color=ink,max=535)=>{
        if(text===undefined||text===null||String(text)==='')return;

        page.drawText(String(text),{
          x,
          y:yy,
          size,
          font:b?bold:font,
          color,
          maxWidth:max
        });
      };

      const rule=(x1,yy,x2,th=.45)=>{
        page.drawLine({
          start:{x:x1,y:yy},
          end:{x:x2,y:yy},
          thickness:th,
          color:ink
        });
      };

      const rect=(x,yy,w,h)=>{
        page.drawRectangle({
          x,
          y:yy,
          width:w,
          height:h,
          borderColor:ink,
          borderWidth:.55
        });
      };

      const fit=(v,n)=>{
        v=String(v||'');
        return v.length>n?v.slice(0,n-1)+'…':v;
      };

      const label=(name,value,x,yy,w)=>{
        const labelText=name+':';
        const lw=bold.widthOfTextAtSize(labelText,7.2);

        t(labelText,x,yy,7.2,true);
        rule(x+lw+3,yy-2,x+w);
        t(fit(value,Math.max(8,Math.floor((w-lw-8)/3.8))),x+lw+6,yy,7.2,false,ink,w-lw-8);
      };

      // Cabeçalho com a logo oficial MT-Cursos.
      try{
        const logoResponse=await fetch('assets/logo-mt-cursos.png');

        if(!logoResponse.ok){
          throw new Error('Logo MT não encontrada');
        }

        const logo=await pdf.embedPng(await logoResponse.arrayBuffer());
        const scale=Math.min(126/logo.width,78/logo.height);

        page.drawImage(logo,{
          x:40,
          y:744,
          width:logo.width*scale,
          height:logo.height*scale
        });

      }catch(e){
        t('MT',43,777,34,true,blue);
        t('CURSOS',43,750,18,false,gray);
      }

      t('FICHA DE MATRÍCULA',211,765,14.5,true,ink,230);

      // Espaço da fotografia 3x4.
      rect(492,748,70,94);
      t('FOTO',514,798,7,true);
      t('3x4',518,787,7,true);

      if(d.photo){
        try{
          const im=await pdf.embedPng(await fetch(d.photo.data).then(r=>r.arrayBuffer()));
          const sc=Math.min(64/im.width,87/im.height);

          page.drawImage(im,{
            x:495+(64-im.width*sc)/2,
            y:751+(87-im.height*sc)/2,
            width:im.width*sc,
            height:im.height*sc
          });
        }catch(e){}
      }

      // DADOS PESSOAIS
      let yy=722;

      label('Nome',d.studentName,36,yy,335);
      label('Data de Nascimento',dateBR(d.birthDate),385,yy,174);
      yy-=15;

      label('Naturalidade',d.birthPlace,36,yy,335);
      label('UF',d.birthState,385,yy,174);
      yy-=15;

      label('CPF',d.studentCpf,36,yy,335);
      label('RG nº',d.studentRg,385,yy,82);
      label('ÓRGÃO EXP',d.rgIssuer,474,yy,85);
      yy-=15;

      label('Filiação PAI',d.fatherName,36,yy,523);
      yy-=15;

      label('MÃE',d.motherName,36,yy,523);
      yy-=15;

      label('Bairro',d.district,36,yy,230);
      label('Endereço',d.address,280,yy,279);
      yy-=15;

      label('Fone Residencial',d.homePhone,36,yy,270);
      label('Celular',d.phone,330,yy,229);
      yy-=15;

      label('E-mail',d.email,36,yy,523);
      yy-=20;

      // DOCUMENTOS ENTREGUES
      t('Relação de Documentos Entregues',205,yy,9.2,true);
      yy-=8;

      const docRows=[
        [[0,225],[1,165],[2,145]],
        [[3,225],[4,165]],
        [[5,535]],
        [[6,225],[7,310]]
      ];

      const docLabels=[
        'Cópia da Cédula de Identidade - RG',
        'Cópia do CPF',
        '01 (uma) Foto 3x4',
        'Cópia do Título de Eleitor',
        'Certidão de Reservista',
        'Histórico Escolar concluído ou parcial',
        'Certidão de Nascimento ou casamento',
        '01 (um) envelope pardo TAMANHO A4'
      ];

      const selectedDocs=new Set(d.docs||[]);

      for(let ri=0;ri<docRows.length;ri++){
        const row=docRows[ri];
        const h=16;
        let x=36;

        rect(36,yy-h,523,h);

        for(const [idx,w] of row){
          const checked=selectedDocs.has(docLabels[idx]);

          t((checked?'( X ) ':'(   ) ')+docLabels[idx],x+5,yy-11,6.6,true,ink,w-8);
          x+=w;
        }

        yy-=h;
      }

      // CURSOS EJA
      const courseTop=yy-18;
      const courseBottom=courseTop-184;

      rect(30,courseBottom,535,184);

      t('CURSOS EJA – EAD: ENSINO FUNDAMENTAL',40,courseTop-14,8.1,true,blue,330);
      t('ENSINO MÉDIO',385,courseTop-14,8.1,true,blue,170);

      const fundamental=[
        'Exame de classificação (1ª a 4ª série) Ensino Fundamental',
        '1º ano/2º segmento Ensino Fundamental (6º/7º ano)',
        '2º ano/2º segmento Ensino Fundamental (8º/9º ano)',
        'Aproveitamento de estudos – Ensino Fundamental',
        'Dependência – 1º ano/2º segmento Ensino Fundamental',
        'Dependência – 2º ano/2º segmento Ensino Fundamental',
        'Aproveitamento de estudos – 2º ano/2º segmento Ensino Fundamental'
      ];

      const medio=[
        '1º ano EJA Ensino Médio',
        '2º ano EJA Ensino Médio',
        '3º ano EJA Ensino Médio',
        'Aproveitamento de estudos – 1º ano EJA Ensino Médio',
        'Aproveitamento de estudos – 2º ano EJA Ensino Médio',
        'Aproveitamento de estudos – 3º ano EJA Ensino Médio',
        'Dependências – 1º ano EJA Ensino Médio',
        'Dependências – 3º ano EJA Ensino Médio'
      ];

      const selectedLevels=new Set(d.levels||[]);

      let fy=courseTop-29;

      for(const item of fundamental){
        t((selectedLevels.has(item)?'( X ) ':'(   ) ')+item,40,fy,6.45,true,ink,330);
        fy-=13.5;
      }

      let my=courseTop-29;

      for(const item of medio){
        t((selectedLevels.has(item)?'( X ) ':'(   ) ')+item,385,my,6.15,true,ink,170);
        my-=13.5;
      }

      // DISCIPLINAS
      let sy=courseBottom-15;

      t('DISCIPLINAS:',36,sy,7.4,true);
      sy-=12;

      const subjects=[
        'L. PORTUGUESA',
        'ARTE',
        'ED. FÍSICA',
        'L.E. INGLÊS',
        'MATEMÁTICA',
        'CIÊNCIAS',
        'HISTÓRIA',
        'GEOGRAFIA'
      ];

      const selectedSubjects=new Set(d.subjects||[]);

      const subjectLine=subjects.slice(0,7).map(v=>
        (selectedSubjects.has(v)?'( X ) ':'(   ) ')+v
      ).join('   ');

      t(subjectLine,36,sy,5.8,true,ink,523);
      sy-=11;

      t((selectedSubjects.has('GEOGRAFIA')?'( X ) ':'(   ) ')+'GEOGRAFIA',36,sy,6.2,true);
      sy-=9;

      t('ENSINO MÉDIO',36,sy,6.2,true);
      sy-=15;

      // OBSERVAÇÃO DO MODELO ORIGINAL
      const obs='OBS: Ao assinar este termo e consequentemente esta ficha de matrícula e financeira, o(a) aluno(a) contratará o curso de Ensino Fundamental ou Médio conforme descrito acima e deverá estar com as parcelas quitadas no vencimento para receber o certificado. Após a contratação de nossos serviços, o aluno que porventura atrasar o pagamento de seu curso por 30 dias ficará automaticamente na lista dos desistentes. Avisar a secretaria da escola no prazo de sete dias antes para renegociação.';

      const words=obs.split(/\s+/);
      let row='';
      const obsLines=[];

      for(const word of words){
        const test=row?row+' '+word:word;

        if(font.widthOfTextAtSize(test,6.1)>523){
          obsLines.push(row);
          row=word;
        }else{
          row=test;
        }
      }

      if(row)obsLines.push(row);

      t(obsLines[0]||'',36,sy,6.1,false,ink,523);
      sy-=9;

      for(let i=1;i<obsLines.length;i++){
        t(obsLines[i],36,sy,6.1,false,ink,523);
        sy-=9;
      }

      // ASSINATURA E DATA
      const sigY=92;

      rule(115,sigY,520,.65);
      t('Assinatura do Aluno (conforme RG)',250,sigY-12,6.8,false,ink,180);

      if(d.signature){
        try{
          const im=await pdf.embedPng(await fetch(d.signature.data).then(r=>r.arrayBuffer()));
          const sc=Math.min(170/im.width,25/im.height);

          page.drawImage(im,{
            x:235,
            y:sigY+3,
            width:im.width*sc,
            height:im.height*sc
          });
        }catch(e){}
      }

      t('DATA: '+dateBR(d.eventDate),36,48,8,false);

    }else if(kind==='compromisso'){

      title('TERMO DE COMPROMISSO DO ALUNO | PROVÃO');

      wrap(`Aluno(a): ${d.studentName}`,10,true);
      kv('CPF',d.studentCpf);
      kv('RG',d.studentRg);
      kv('Data de nascimento',dateBR(d.birthDate));
      kv('Curso/programa',d.courseName);

      y-=6;
      line();

      wrap('1. CIÊNCIA SOBRE A INSTITUIÇÃO RESPONSÁVEL',11,true);

      wrap(`O(A) aluno(a) declara estar ciente de que a instituição parceira identificada neste termo é ${institution.label}, CNPJ ${institution.cnpj}, ${institution.address?`com endereço em ${institution.address}`:''}${institution.phone?`, telefone ${institution.phone}`:''}.`,10);

      wrap('2. PAPEL DA EVOLUA+ PROFISSÕES',11,true);

      wrap('A Evolua+ Profissões atua como intermediadora comercial e administrativa, oferecendo orientação e apoio no encaminhamento e acompanhamento do processo de matrícula. A Evolua+ Profissões não é a instituição certificadora do Ensino Fundamental ou Ensino Médio.',10);

      wrap('3. RESPONSABILIDADE PELA CERTIFICAÇÃO',11,true);

      wrap('O(A) aluno(a) declara estar ciente de que a análise documental, a verificação dos requisitos, as avaliações e a emissão de declarações, históricos e certificados competem à instituição parceira selecionada, de acordo com suas regras e com a legislação aplicável. A emissão do certificado depende do cumprimento dos requisitos exigidos e não é garantida apenas pela matrícula ou pelo pagamento.',10);

      wrap('4. COMPROMISSOS DO ALUNO',11,true);

      wrap('O(A) aluno(a) compromete-se a fornecer informações verdadeiras, apresentar documentos autênticos e legíveis, cumprir os requisitos acadêmicos, realizar as avaliações e acompanhar as orientações fornecidas durante o processo.',10);

      wrap('5. DECLARAÇÃO DE CIÊNCIA',11,true);

      wrap('Declaro que li e compreendi este termo, que fui informado(a) sobre a instituição responsável pela certificação e que compreendo a função de intermediação da Evolua+ Profissões. Este termo não afasta direitos previstos em lei nem responsabilidades legalmente atribuídas a qualquer das partes.',10);

      y-=8;
      wrap(`Instituição certificadora selecionada: ${institution.label}`,10,true);
      wrap(`CNPJ: ${institution.cnpj}`,10);
      wrap(`Data: ${dateBR(d.eventDate)}`,10);

      signLine(d.studentName||'Aluno(a)');
      signLine('Evolua+ Profissões | Ciência da intermediação');
    }

    const bytes=await pdf.save();
    const blob=new Blob([bytes],{type:'application/pdf'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');

    a.href=url;
    a.download=`${safe(configs[kind].title)}-${safe(d.studentName)}.pdf`;

    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(()=>URL.revokeObjectURL(url),1500);
  }
})();
