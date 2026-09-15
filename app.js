const TECH_START=["Operador de Informática Essencial","Google Workspace","Inteligência Artificial — Ferramentas e Aplicações","Design com Canva"];
const ADM_START=["Assistente Administrativo","Operador de Caixa","Jovem Aprendiz Administrativo","Atendente de Farmácia"];
const TECH_PRO=[...TECH_START,"Operador de Informática Avançada","Analista Power BI","Programador de Computador Avançado","Desenvolvedor Web","Desenvolvedor de Aplicativos Mobile","Desenvolvedor de Games 2D e 3D","Redes de Computadores","Manutenção de Computadores e Redes","Manutenção de Notebooks","Manutenção de Dispositivos Móveis","Designer Gráfico","Video Maker","Youtuber","AutoCAD — Desenho Arquitetônico","AutoCAD — Desenho Mecânico","SketchUp — Desenho Arquitetônico","Modelagem 3D — 3DS Studio Max","IA Criativa","Automação com IA"];
const ADM_PRO=[...ADM_START,"Assistente Contábil","Assistente de Recursos Humanos e Departamento Pessoal","Gestão Financeira","Gestão Empresarial","Supervisor de Vendas","Marketing Digital","Marketing com IA","Vendas com IA","Gestão com IA","Hotelaria e Turismo"];
const COMPLETE_CATALOG=[...new Set([...TECH_PRO,...ADM_PRO,"Informática Kids","Melhor Idade Conectada","Redação Nota 1000 no Enem","Matemática do 6º ao 9º ano","Assistente de Produção de Açúcar e Álcool"])];
const PLANS={
"Start Tech":{users:1,price:99,courses:TECH_START},
"Start Adm":{users:1,price:99,courses:ADM_START},
"Pro Tech":{users:1,price:159,courses:TECH_PRO},
"Pro Adm":{users:1,price:159,courses:ADM_PRO},
"Master":{users:1,price:249,courses:COMPLETE_CATALOG},
"Family":{users:4,price:289,courses:COMPLETE_CATALOG},
"Business Start":{users:2,price:359,courses:COMPLETE_CATALOG},
"Business Pro":{users:10,price:959,courses:COMPLETE_CATALOG},
"Business Plus":{users:50,price:3699,courses:COMPLETE_CATALOG},
"Business Gold":{users:51,price:0,courses:COMPLETE_CATALOG}};
const COURSES={
"Analista Power BI":{workload:72,months:9,modules:["Microsoft Excel Essencial","Microsoft Excel Intermediário","Microsoft Excel Avançado","Microsoft Power BI — Módulo I","Microsoft Power BI — Módulo II","Microsoft Power BI — Módulo III"]},
"Assistente Administrativo":{workload:76,months:10,modules:["Rotinas Administrativas","Google Ferramentas de Produtividade","Google Planilhas","Apresentações Google","Google Documentos","Excelência no Atendimento","Desenvolvimento Profissional","Líder do Amanhã","Dinamismo e Compromisso com o Sucesso","Trabalho em Equipe"]},
"Assistente Contábil":{workload:179,months:23,modules:["Assistente Contábil","Matemática Financeira","Microsoft Excel 365 Essencial","Microsoft Excel 365 Intermediário","Microsoft Excel 365 Avançado","Power BI — Módulos I, II e III","Crédito e Cobrança","Rotinas Administrativas","Departamento Pessoal","Recursos Humanos"]},
"Assistente de Recursos Humanos e Departamento Pessoal":{workload:107,months:14,modules:["Atribuições do RH","Cargos e Evolução","Recrutamento e Seleção","Entrevista e Integração","Treinamento e Desenvolvimento","Rescisões Contratuais","Contrato de Trabalho e Obrigações Legais","Segurança e Saúde","Rotinas de Admissão","Folha de Pagamento","Férias e 13º Salário","Anotações na CTPS"]},
"Assistente de Produção de Açúcar e Álcool":{workload:18,months:3,modules:["Introdução","Da Lavoura à Usina","Recepção e Análise da Cana-de-açúcar","Estocagem, Preparação e Moagem","Tratamento do Caldo","Fabricação do Açúcar","Fabricação do Álcool","Utilidades: Vapor, Água e Energia Elétrica","Controle de Qualidade nas Usinas"]},
"Atendente de Farmácia":{workload:63,months:8,modules:["Atendente de Farmácia","Excelência no Atendimento ao Cliente","Operador de Caixa","Agente de Vendas","Rotinas Administrativas"]},
"AutoCAD — Desenho Arquitetônico":{workload:32,months:4,modules:["Layers","Conexões entre paredes","Pavimento superior","Paredes internas e linhas do piso","Piscina e telhado","Garagem, portas e jardim","Mesas, cadeiras e cozinha","Sala e guarda-corpos","Projetos práticos"]},
"AutoCAD — Desenho Mecânico":{workload:24,months:3,modules:["Conhecendo o AutoCAD","Linhas, círculos, semicírculos e arcos","Arredondamento de cantos","Construção de ferramentas e engrenagens","Repetições, rotação e escalas","Parafusos e detalhamento","Medidas e impressão de projetos","Leitura e interpretação de peças reais"]},
"Automação com IA":{workload:8,months:1,modules:["Introdução à Automação de Tarefas com IA","Fluxos Inteligentes com Lógica Condicional","Formulários, Tarefas e Prazos","Mensagens Personalizadas com IA","Agendamentos e Confirmações","Lembretes e Revisões Automáticas","Projeto Prático de Automação"]},
"Desenvolvedor de Aplicativos Mobile":{workload:52,months:7,modules:["Lógica de Programação","Aplicativos com Angular","Aplicativos com Ionic","Aplicativos com Cordova"]},
"Desenvolvedor de Games 2D e 3D":{workload:64,months:8,modules:["Desenvolvimento de Jogos 2D com Construct 3","Desenvolvimento de Jogos 3D Unreal — Módulo I","Desenvolvimento de Jogos 3D Unreal — Módulo II"]},
"Desenvolvedor Web":{workload:40,months:5,modules:["HTML","CSS","JavaScript","WordPress"]},
"Design com Canva":{workload:16,months:2,modules:["Introdução ao Canva","Elementos Básicos do Design","Textos, Cores e Fontes","Layout e Templates","Imagens e Efeitos","Ferramentas de IA no Canva","Branding e Identidade Visual","Vídeos e Redes Sociais","Design para Impressão","Exportação e Compartilhamento","Projeto Final"]},
"Designer Gráfico":{workload:102,months:13,modules:["CorelDRAW Graphics Suite — Módulo I","CorelDRAW Graphics Suite — Módulo II","Adobe Photoshop Creative Cloud — Módulos I, II e III","Adobe Illustrator Creative Cloud","Adobe XD"]},
"Gestão com IA":{workload:8,months:1,modules:["Organização da Rotina com IA","Controle Financeiro","Precificação","Interpretação de Relatórios","Lembretes e Prazos","Cobrança com Empatia","Metas e Cenários","Painel de Gestão com IA"]},
"Gestão Empresarial":{workload:275,months:36,modules:["Rotinas Administrativas","Recursos Humanos e Departamento Pessoal","Telemarketing e Marketing Digital","Google Ads e Ferramentas de Produtividade","Atendimento, Vendas e Trabalho em Equipe","Empreendedorismo e Crédito e Cobrança","Operador de Caixa","Gestão de Pessoas","Matemática Financeira","Desenvolvimento Pessoal e Liderança","Hotelaria e Turismo"]},
"Gestão Financeira":{workload:145,months:19,modules:["Rotinas Administrativas","Matemática Financeira","Crédito e Cobrança","Excel 365 Essencial, Intermediário e Avançado","Power BI — Módulos I, II e III","Operador de Caixa","Google Ferramentas de Produtividade","Desenvolvimento Profissional","Trabalho em Equipe"]},
"Google Workspace":{workload:40,months:5,modules:["Google Ferramentas de Produtividade","Documentos Google","Planilhas Google","Apresentações Google"]},
"Hotelaria e Turismo":{workload:56,months:7,modules:["Hospedagem","Telefonia e Reservas","Recepção","Portaria e Governança","Alimentos e Bebidas","Atividades de Reforço","Introdução ao Turismo","Agenciamento e Pacotes Turísticos","Rotinas Administrativas","Excelência no Atendimento","Google Ferramentas de Produtividade","Operador de Caixa"]},
"IA Criativa":{workload:8,months:1,modules:["Criatividade, Eficiência e Personalização com IA","Design com Impacto Visual","Personalização para Públicos","IA em Apresentações","Escrita no Design Digital","Automação Criativa","IA no Design com Agilidade e Precisão"]},
"Informática Kids":{workload:112,months:12,modules:["Introdução à Informática","Windows 11 Essencial","Digitação","Word 365 Essencial","PowerPoint 365 Essencial","Excel Essencial","Outlook 365 Essencial","Internet, Redes Sociais e Aplicativos","Scratch","Pixel Art"]},
"Inteligência Artificial — Ferramentas e Aplicações":{workload:16,months:2,modules:["Aplicações Específicas de IA","IA para Conteúdos","IA para Imagens e Design","IA para Áudio","IA para Produtividade","IA para Pesquisa","Chatbots e Sugestões de Texto","Ética e Responsabilidade na IA","Projeto Final"]},
"Jovem Aprendiz Administrativo":{workload:72,months:9,modules:["Rotinas Administrativas","Google Documentos","Google Planilhas","Google Ferramentas de Produtividade","Apresentações Google","Excelência no Atendimento","Trabalho em Equipe","Desenvolvimento Profissional","Como Conquistar um Emprego"]},
"Manutenção de Computadores e Redes":{workload:65,months:9,modules:["Montagem e Manutenção de Computadores","Montagem e Manutenção de Notebooks","Redes: Cabeamento e Infraestrutura","Redes: Lógica e Estruturação","Redes: Tecnologia Wireless"]},
"Manutenção de Dispositivos Móveis":{workload:16,months:2,modules:["Introdução aos Dispositivos Móveis","Componentes e Equipamentos","Montagem, Desmontagem e Colagem de Telas","Estação de Solda e Fonte de Alimentação","Separadora de LCD","Sistemas Operacionais e Defeitos","Consertos de Software","Tablets: Manutenção, Limpeza e Backup","Assistência Técnica"]},
"Manutenção de Notebooks":{workload:16,months:2,modules:["Introdução e Eletrônica Básica","Conectividade e Redes","Formatação e Sistemas Operacionais","Assistência Técnica","Upgrades de Hardware","Telas e Teclados","BIOS e Problemas de Boot","Armazenamento","Placa-mãe e Componentes","Diagnóstico, Montagem e Limpeza"]},
"Marketing com IA":{workload:8,months:1,modules:["IA no Marketing Atual","Conteúdo e Copywriting com IA","SEO com IA","Planejamento de Conteúdo","Automação de Marketing","Segmentação e Personas","Testes e Ajustes de Comunicação","Vídeos Estratégicos com IA"]},
"Marketing Digital":{workload:140,months:18,modules:["Marketing Digital — Módulos I e II","Google Ads","Google Ferramentas de Produtividade","Google Planilhas, Documentos e Apresentações","Rotinas Administrativas","Agente de Vendas","Excelência no Atendimento","Trabalho em Equipe","Desenvolvimento Profissional","Telemarketing","E-commerce, SEO, Analytics, Mídias Sociais e E-mail Marketing"]},
"Matemática do 6º ao 9º ano":{workload:340,months:44,modules:["6º ano: números, operações, geometria, frações, MMC e MDC","7º ano: medidas, gráficos, números racionais, álgebra e proporções","8º ano: regra de três, porcentagem, ângulos, números reais e polinômios","9º ano: triângulos, quadriláteros, Teorema de Pitágoras e equações do 2º grau"]},
"Melhor Idade Conectada":{workload:72,months:9,modules:["Introdução à Informática","Windows 11 Essencial","Digitação","Word 365 Essencial","PowerPoint 365 Essencial","Outlook 365 Essencial","Internet, Redes Sociais e Aplicativos","Dispositivos Móveis e Tecnologias para o Dia a Dia"]},
"Modelagem 3D — 3DS Studio Max":{workload:32,months:4,modules:["Fundamentos do 3DS Max","Texturas, Refração e Reflexão","Transformação e Hierarquia de Objetos","Materiais e Animação","Iluminação","Objetos 3D e Imagens","Movimentos Humanos","Cenas, Fogo e Fumaça","Animações e Efeitos","Atmosfera e Efeitos Especiais","Unwrap UVW","Ambientes Realistas"]},
"Operador de Caixa":{workload:18,months:3,modules:["Operador de Caixa","Excelência no Atendimento"]},
"Operador de Informática Avançada":{workload:134,months:16,modules:["Introdução à Informática","Windows 11 Essencial e Avançado","Digitação","Word 365 Essencial e Avançado","PowerPoint 365 Essencial e Avançado","Excel Essencial, Intermediário e Avançado","Outlook 365 Essencial e Avançado","Internet, Redes Sociais e Aplicativos"]},
"Operador de Informática Essencial":{workload:92,months:8,modules:["Introdução à Informática","Windows 11 Essencial","Digitação","Word 365 Essencial","PowerPoint 365 Essencial","Excel Essencial","Outlook 365 Essencial","Internet, Redes Sociais e Aplicativos"]},
"Programador de Computador Avançado":{workload:100,months:13,modules:["Lógica de Programação","Programação C# com Visual Studio — Módulos I, II, III e IV","Banco de Dados SQL"]},
"Redação Nota 1000 no Enem":{workload:7,months:1,modules:["Dissertação Argumentativa","Coesão e Coerência Textual","Tema, Tese, Argumentação e Proposta de Intervenção","Construção da Dissertação","Dicas Gramaticais","Desempenho na Redação do ENEM","Erros Frequentes e Temas Importantes"]},
"Redes de Computadores":{workload:33,months:5,modules:["Redes: Cabeamento e Infraestrutura","Redes: Tecnologias Wireless","Redes: Lógica e Estruturação"]},
"SketchUp — Desenho Arquitetônico":{workload:12,months:2,modules:["Introdução e Ferramentas Essenciais","Grupos e Componentes","Camadas e Operações","Modelagem Intermediária — Partes I, II e III","Texturas e Detalhes","Exportação e Apresentação de Projeto"]},
"Supervisor de Vendas":{workload:122,months:16,modules:["Agente de Vendas","Excelência no Atendimento","Marketing Digital","Rotinas Administrativas","Telemarketing","Trabalho em Equipe","Liderança e Desenvolvimento Profissional","Google Ads","Google Workspace","Dinamismo e Compromisso com o Sucesso"]},
"Vendas com IA":{workload:8,months:1,modules:["IA em Vendas e Relacionamento","Argumentos para Dúvidas e Objeções","CRM Inteligente","Leitura de Sinais de Interesse","Retomada de Contatos","Chatbots e Atendimento 24/7","Relacionamento com IA","Projeto Integrador"]},
"Video Maker":{workload:32,months:4,modules:["Adobe Premiere Creative Cloud","Adobe After Effects Creative Cloud"]},
"Youtuber":{workload:8,months:1,modules:["YouTuber: Como Ter um Canal de Sucesso"]},
"Personalizado":{workload:1,months:12,modules:["Informe os módulos contratados"]}};
const EJA_PROVIDERS={
  mt:{
    legal:"SISTEMA DE ENSINO FUNDAMENTAL, MEDIO E PROFISSIONAL A DISTANCIA LTDA",
    fantasy:"MT-CURSOS Á DISTÂNCIA", cnpj:"10.807.062.0001-63",
    address:"Rua 145, quadra 147, CPA IV, nº 05, bairro Morada Da Serra, Cuiabá-MT", contact:"(65) 3649-3357",
    record:"Certificado registrado sob nº 256932. Folha nº 15, Livro nº 024, nos termos da Resolução nº 249/07 — CEE/MT. Cuiabá-MT, 22/12/2025."
  },
  cec:{
    legal:"CEC — CENTRO EDUCACIONAL DO CARIRI", fantasy:"CEC Educacional", cnpj:"23.466.918/0001-26",
    address:"Avenida Professora Maria Salete Pereira Bezerra, nº 267, bairro Alto São Vicente, Monteiro-PB, Brasil", contact:"(83) 99657-0411",
    record:"INEP 2512791. Credenciamento: Resolução CEE-PB nº 186/2022. Autorização: Resolução CEE-PB nº 187/2022."
  }
};
const SPECIAL_MODELS=new Set(["eja","cancel","trancamento","scholarship"]);
let selectedModel="presencial",currentStep=1;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],form=$("#contractForm");

function init(){
 try{
  Object.keys(COURSES).forEach(v=>$("#courseName").add(new Option(v,v)));
  Object.keys(PLANS).forEach(v=>$("#planName").add(new Option(v,v)));
  setDefaults();applyCourse();applyPlan();setTrialDefaults();setSpecialDefaults();updateSummary();
  $$(".model-card").forEach(b=>b.addEventListener("click",()=>openForm(b.dataset.model)));
  $("#backButton").onclick=()=>currentStep===1?showHome():goStep(currentStep-1);
  $("#homeButton").onclick=showHome;
  $("#nextStep").onclick=()=>validateStep()&&goStep(currentStep+1);
  $("#prevStep").onclick=()=>goStep(currentStep-1);
  $("#samePayer").onchange=togglePayer;
  $("#courseName").onchange=applyCourse;
  $("#planName").onchange=applyPlan;
  $("#courseStart").onchange=()=>setEnd("courseStart","courseEnd",COURSES[$("#courseName").value]?.months||12);
  $("#subscriptionStart").onchange=()=>setEnd("subscriptionStart","subscriptionEnd",12);
  form.elements.courseValue.addEventListener("input",()=>{if(selectedModel==="academy")syncAcademyMonthly();updateSummary()});
  form.elements.enrollmentValue.addEventListener("input",updateSummary);
  $("#installments").addEventListener("input",()=>{if(selectedModel==="academy")syncAcademyMonthly();updateSummary()});
  $("#monthlyPrice").addEventListener("input",()=>{if(selectedModel==="academy")syncAcademyTotal();updateSummary()});
  form.elements.discount.addEventListener("input",updateSummary);
  $("#firstDue").addEventListener("change",updateSummary);
  $("#trialActivationDate").addEventListener("change",()=>setTrialEnd(true));
  $("#ejaStudentCount").addEventListener("change",toggleEjaStudent2);
  $("#trankDate").addEventListener("change",syncTrankDates);
  $("#scholarOriginal").addEventListener("input",syncScholarship);
  $("#scholarPercent").addEventListener("input",syncScholarship);
  $("#scholarInstallments").addEventListener("input",syncScholarship);
  $("#scholarType").addEventListener("change",syncScholarship);
  $$('[data-mask]').forEach(i=>i.addEventListener("input",applyMask));
  form.onsubmit=generatePdf;
  // O botão de geração é explicitamente controlado para impedir qualquer navegação/reload do formulário.
  $("#generateButton").onclick=generatePdf;
 }catch(err){console.error("Falha ao inicializar Gestão de Contratos:",err)}
}
function isSpecial(model=selectedModel){return SPECIAL_MODELS.has(model)}
function setSpecialDefaults(){
 const today=dateInput(new Date());
 ["#cancelDate","#trankDate","#scholarDate"].forEach(sel=>{const el=$(sel);if(el&&!el.value)el.value=today});
 const sv=$("#scholarValidity");if(sv&&!sv.value){const d=localDate(today);d.setDate(d.getDate()+7);sv.value=dateInput(d)}
 syncTrankDates();syncScholarship();toggleEjaStudent2();
}
function toggleEjaStudent2(){const show=$("#ejaStudentCount")?.value==="2";$("#ejaStudent2Block").hidden=!show;[...$("#ejaStudent2Block").querySelectorAll("input,select")].forEach(i=>i.required=show && i.name==="eja2Name");}
function syncTrankDates(){const v=$("#trankDate")?.value;if(!v)return;const base=localDate(v);const a=new Date(base),b=new Date(base),c=new Date(base);a.setMonth(a.getMonth()+3);b.setMonth(b.getMonth()+12);c.setFullYear(c.getFullYear()+1);$("#trankReturn").value=dateInput(a);$("#trankMax").value=dateInput(b);$("#trankValidity").value=dateInput(c)}
function syncScholarship(){const o=+$("#scholarOriginal")?.value||0;let p=Math.min(100,Math.max(0,+$("#scholarPercent")?.value||0));if($("#scholarType")?.value==="integral"){p=100;$("#scholarPercent").value="100"}const n=Math.max(1,+$("#scholarInstallments")?.value||1);const final=o*(1-p/100);$("#scholarFinal").value=final.toFixed(2);$("#scholarPart").value=(final/n).toFixed(2);}
function openForm(model){
 selectedModel=model;currentStep=1;$("#startScreen").classList.remove("active");$("#formScreen").classList.add("active");
 const a=model==="academy",t=model==="trial",sp=isSpecial(model);
 const titles={eja:"Contrato de Intermediação EJA EAD",cancel:"Termo de Rescisão de Contrato",trancamento:"Aditivo de Trancamento de Aulas",scholarship:"Termo de Compromisso de Bolsa"};
 const eyebrows={eja:"EJA • INTERMEDIAÇÃO",cancel:"RESCISÃO",trancamento:"TRANCAMENTO",scholarship:"COMERCIAL"};
 $("#formTitle").textContent=sp?titles[model]:t?"Termo de Compromisso de Acesso Gratuito":a?"Contrato Evolua+ Academy":"Contrato Presencial";
 $("#formEyebrow").textContent=sp?eyebrows[model]:t?"ACESSO EXPERIMENTAL":a?"ASSINATURA DIGITAL":"ENSINO PRESENCIAL";
 $("#trialFields").hidden=!t;$("#standardStudentFields").hidden=t||sp;$("#specialFields").hidden=!sp;
 ["specialEja","specialCancel","specialTrancamento","specialScholarship"].forEach(id=>$("#"+id).hidden=true);
 if(sp)$("#"+({eja:"specialEja",cancel:"specialCancel",trancamento:"specialTrancamento",scholarship:"specialScholarship"}[model])).hidden=false;
 $("#presentialFields").hidden=a||t||sp;$("#academyFields").hidden=!a||sp;$("#courseValueField").hidden=t||sp;$("#enrollmentField").hidden=a||t||sp;$("#paymentSummary").hidden=t||sp;
 $("#installments").max=a?12:36;$("#step1Title").textContent=sp?"Dados do documento":t?"Dados para liberação":"Dados do aluno";$("#step1Subtitle").textContent=sp?"Preencha os dados necessários e gere o documento pronto para assinatura.":t?"Informe os dados necessários para liberar o acesso experimental.":"Informações da pessoa que realizará o curso.";
 if(t)setTrialDefaults();else if(a){$("#installments").value=12;applyPlan()}else if(sp)setSpecialDefaults();
 goStep(1);updateSummary();
}
function showHome(){$("#formScreen").classList.remove("active");$("#startScreen").classList.add("active");scrollTo(0,0)}
function goStep(n){const totalSteps=(selectedModel==="trial"||isSpecial())?1:4;currentStep=Math.max(1,Math.min(totalSteps,n));$$(".form-step").forEach(s=>s.classList.toggle("active",+s.dataset.step===currentStep));$("#progressText").textContent=`Etapa ${currentStep} de ${totalSteps}`;$("#progressBar").style.width=`${currentStep/totalSteps*100}%`;$("#prevStep").style.display=currentStep===1?"none":"block";$("#nextStep").style.display=currentStep===totalSteps?"none":"block";$("#generateButton").classList.toggle("show",currentStep===totalSteps);if(currentStep===4)updateSummary();scrollTo({top:0,behavior:"smooth"})}
function validateStep(){let ok=true;const step=$( `.form-step[data-step="${currentStep}"]`);$$("[required]",step).filter(i=>!i.closest("[hidden]")).forEach(i=>{let bad=!String(i.value||"").trim();i.classList.toggle("invalid",bad);if(bad)ok=false});if(!ok)toast("Preencha os campos obrigatórios.");return ok}
function applyPlan(){const p=PLANS[$("#planName").value];if(!p)return;$("#planUsers").value=p.users;$("#monthlyPrice").value=p.price;$("#planCourses").value=p.courses.join("\n");if(selectedModel==="academy")syncAcademyTotal();updateSummary()}
function setDefaults(){const d=new Date(),iso=dateInput(d);["courseStart","subscriptionStart","firstDue"].forEach(id=>$("#"+id).value=iso);setEnd("courseStart","courseEnd",12);setEnd("subscriptionStart","subscriptionEnd",12)}
function setTrialDefaults(){const d=new Date(),iso=dateInput(d);if(!$("#trialActivationDate").value)$("#trialActivationDate").value=iso;setTrialEnd(false)}
function setTrialEnd(force){const start=localDate($("#trialActivationDate").value);if(!start)return;const end=new Date(start);end.setDate(end.getDate()+7);if(force || !$("#trialEndDate").value)$("#trialEndDate").value=dateInput(end)}
function setEnd(s,e,m){const d=localDate($("#"+s).value);if(!d)return;d.setMonth(d.getMonth()+m);d.setDate(d.getDate()-1);$("#"+e).value=dateInput(d)}
function syncAcademyTotal(){const n=Math.max(1,+$("#installments").value||1);form.elements.courseValue.value=((+$("#monthlyPrice").value||0)*n).toFixed(2)}
function syncAcademyMonthly(){const n=Math.max(1,+$("#installments").value||1);$("#monthlyPrice").value=((+form.elements.courseValue.value||0)/n).toFixed(2)}
function updateSummary(){const a=selectedModel==="academy",n=Math.max(1,+$("#installments").value||1),total=a?(+form.elements.courseValue.value||0):(+form.elements.courseValue.value||0)+(+form.elements.enrollmentValue.value||0),part=total/n;$("#paymentSummary").innerHTML=`<div><span>Valor total</span><strong>${money(total)}</strong></div><div><span>Parcelamento</span><strong>${n}× de ${money(part)}</strong></div><div><span>Primeiro vencimento</span><strong>${brDate($("#firstDue").value)||"—"}</strong></div>`}
function applyMask(e){let v=e.target.value.replace(/\D/g,""),t=e.target.dataset.mask;if(t==="cep")v=v.slice(0,8).replace(/(\d{5})(\d)/,"$1-$2");if(t==="phone"){v=v.slice(0,11);v=v.length>10?v.replace(/(\d{2})(\d{5})(\d{4})/,"($1) $2-$3"):v.replace(/(\d{2})(\d{4})(\d{0,4})/,"($1) $2-$3")}if(t==="cpfcnpj"){v=v.slice(0,14);v=v.length>11?v.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,"$1.$2.$3/$4-$5"):v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,"$1.$2.$3-$4")}e.target.value=v}
function getData(){
 const d=Object.fromEntries(new FormData(form).entries());
 if(selectedModel==="trial"){d.studentName=d.trialStudentName;d.studentCpf=d.trialStudentCpf;d.studentEmail=d.trialStudentEmail;d.studentPhone=d.trialStudentPhone;d.activationDate=d.trialActivationDate;d.trialEndDate=d.trialEndDate}
 else if(selectedModel==="academy"){const n=Math.max(1,+d.installments||1);d.monthlyPrice=((+d.courseValue||0)/n).toFixed(2)}
 else if(selectedModel==="eja"){d.ejaProviderData=EJA_PROVIDERS[d.ejaProvider||"mt"];d.ejaStudentCount=d.ejaStudentCount||"1"}
 if($("#samePayer")?.checked)["Name","Birth","Profession","Rg","Cpf","Phone","Address","District","Cep","City"].forEach(k=>d["payer"+k]=d["student"+k]||"");
 return d;
}
async function generatePdf(e){if(e&&typeof e.preventDefault==="function")e.preventDefault();if(!validateStep())return;const b=$("#generateButton");if(b.disabled)return;b.disabled=true;b.textContent="Gerando PDF…";try{const d=getData();await generateContractFromTemplate(d,selectedModel);toast("PDF gerado com sucesso.")}catch(err){console.error("Erro ao gerar PDF:",err);toast("Não foi possível gerar o PDF. Verifique o console para detalhes.")}finally{b.disabled=false;b.innerHTML='Gerar PDF <span>↓</span>'}}
function courseInfo(d){return `<table class="pdf-table pdf-plan-table"><tr><th>Curso</th><th>Carga horária</th><th>Início</th><th>Término</th></tr><tr><td>${esc(d.courseName)}</td><td>${esc(d.workload)} horas</td><td>${brDate(d.courseStart)}</td><td>${brDate(d.courseEnd)}</td></tr><tr><td>${esc(d.courseMode)}</td><td colspan="3" class="content"><b>Módulos:</b> ${lines(d.modules).join("; ")}</td></tr><tr><th colspan="4">Dias e horários contratados</th></tr><tr><td colspan="4">${esc(d.schedule)}</td></tr></table>`}
function academyInfo(d){return `<table class="pdf-table pdf-plan-table"><tr><th>Plano</th><th>Usuários</th><th>Início da assinatura</th><th>Término da assinatura</th></tr><tr><td>${esc(d.planName)}</td><td>${esc(d.planUsers)}</td><td>${brDate(d.subscriptionStart)}</td><td>${brDate(d.subscriptionEnd)}</td></tr><tr><td>Acesso 100% online</td><td colspan="3" class="content"><b>Cursos:</b> ${lines(d.planCourses).join("; ")}</td></tr><tr><th colspan="4">Acesso</th></tr><tr><td colspan="4">Todos os dias, em horário livre.</td></tr></table>`}
function installmentTable(d,total){const n=Math.max(1,+d.installments||1),v=total/n,dates=dueDates(d.firstDue,n,+d.dueDay||10);return `<table class="pdf-table"><tr><th>Nº</th><th>Vencimento</th><th>Valor</th><th>Desconto</th><th>Multa</th><th>Juros/mês</th></tr>${dates.map((x,i)=>`<tr><td>${i+1}</td><td>${brDate(x)}</td><td>${money(v)}</td><td>${money(d.discount||0)}</td><td>2%</td><td>1%</td></tr>`).join("")}</table>`}

const presentialA=d=>`<h3>1ª — Do objeto</h3><p>O CONTRATANTE contrata os serviços da CONTRATADA para ministrar o curso especificado neste instrumento, na modalidade escolhida, por meio do Sistema de Ensino Presencial Interativo e dos recursos educacionais disponibilizados.</p>
<p><b>2ª.</b> A CONTRATADA fornecerá material didático para uso interno durante o período de aula, ressalvados materiais específicos previamente informados.</p>
<p><b>3ª.</b> O material didático digital será disponibilizado por aplicativo ou plataforma indicada pela CONTRATADA, podendo existir versão física para aquisição separada.</p>
<p><b>4ª.</b> O pagamento será efetuado conforme as condições descritas no quadro financeiro.</p>
<p><b>5ª.</b> Material didático contratado: <b>${esc(d.material)}</b>.</p>
<p><b>6ª.</b> A conclusão antecipada do curso não isenta o CONTRATANTE do pagamento das parcelas restantes.</p>
<p><b>7ª.</b> Se, por faltas do aluno, o curso não terminar no prazo previsto, poderão ser emitidas parcelas extras necessárias à conclusão, conforme as regras pedagógicas.</p>
<p><b>8ª.</b> Havendo desconto no quadro financeiro, ele fica condicionado ao pagamento até o vencimento.</p>
<h3>9ª — Da inadimplência</h3><p>Na hipótese de inadimplência, o CONTRATANTE perderá eventual desconto e ficará sujeito à multa de 2%, juros de mora de 1% ao mês e correção monetária.</p>
<p><b>10ª.</b> A inadimplência poderá resultar em cobrança extrajudicial ou judicial, protesto e comunicação aos órgãos de proteção ao crédito, observada a legislação aplicável. Custos de cobrança poderão ser repassados ao CONTRATANTE.</p>
${d.notes?`<h3>Condição especial</h3><p>${esc(d.notes)}</p>`:""}`;
const presentialB=d=>`<h3>11ª — Do arrependimento e cancelamento</h3><p>O direito de arrependimento será observado quando aplicável, nos termos do artigo 49 do Código de Defesa do Consumidor.</p>
<p><b>12ª.</b> Para rescindir o contrato, o CONTRATANTE deverá formalizar requerimento. Serão devidas as parcelas vencidas, a parcela do mês da solicitação e a multa compensatória correspondente a uma parcela integral sem desconto.</p>
<p><b>13ª.</b> O CONTRATANTE poderá transferir seus direitos a pessoa idônea, mediante aprovação e novo cadastro junto à CONTRATADA.</p>
<p><b>14ª.</b> O cancelamento será formalizado por termo de rescisão. A simples desistência ou abandono não extingue débitos já constituídos.</p>
<p><b>15ª.</b> A inadimplência superior a 60 dias poderá ocasionar o cancelamento, sem prejuízo das parcelas vencidas, da parcela do mês e da multa contratual.</p>
<h3>16ª — Da imagem e dos dados</h3><p>O CONTRATANTE autoriza o uso de nome e imagem para fins institucionais e publicitários, observada a legislação aplicável. Os dados pessoais serão tratados para execução contratual, suporte, certificação e cumprimento de obrigações legais.</p>
<h3>17ª — Da certificação</h3><p>A CONTRATADA entregará certificado de conclusão ao aluno que atender aos requisitos acadêmicos de frequência mínima de 75% e nota final igual ou superior a 7,5, no prazo informado pela instituição.</p>
<h3>18ª — Das disposições finais</h3><p>As partes buscarão solução consensual para divergências decorrentes deste contrato, sem prejuízo do acesso aos meios legalmente assegurados.</p>`;

const academyA=d=>{const total=+d.courseValue||0,n=Math.max(1,+d.installments||1),monthly=total/n;return `<h3>Cláusula 1 — Do objeto</h3><p><b>1.1.</b> O CONTRATANTE acima qualificado contrata os serviços da CONTRATADA para ministrar o(s) curso(s) especificado(s) acima com aulas 100% online, através do Sistema de Ensino Presencial Interativo, disponibilizado também pelo site da escola.</p>
<p><b>1.2.</b> A licença de acesso concedida ao CONTRATANTE permitirá utilização dos conteúdos digitais, cursos, aulas, materiais complementares, trilhas de aprendizagem, recursos educacionais e demais funcionalidades disponíveis conforme o plano contratado.</p>
<p><b>1.3.</b> O acesso disponibilizado possui natureza exclusivamente digital, educacional e individual, sendo vedada qualquer forma de comercialização, compartilhamento indevido ou cessão a terceiros fora das condições previstas neste contrato.</p>
<h3>Cláusula 2 — Dos planos contratados</h3><p><b>2.1.</b> A Evolua Academy disponibiliza planos conforme tabela comercial vigente.</p>
<p><b>2.2.</b> Cada plano possuirá características específicas de acesso, quantidade de usuários e disponibilidade de conteúdos, conforme informado no ato da contratação.</p>
<p><b>2.3.</b> O plano Family possui limite máximo de até 4 (quatro) usuários vinculados ao mesmo núcleo familiar.</p>
<p><b>2.4.</b> Os planos Business possuem limite de usuários conforme especificado comercialmente pela CONTRATADA.</p>
<p class="pdf-clause-highlight"><b>2.5.</b> O plano contratado pelo CONTRATANTE é <b>${esc(d.planName)}</b>, com vigência de 12 (doze) meses e valor total contratual de <b>${money(total)} (${numberWords(total)})</b>, pago em <b>${n} parcela(s) de ${money(monthly)} (${numberWords(monthly)})</b>. A forma de pagamento escolhida é <b>${esc(d.paymentMethod)}</b>, com vencimento no dia <b>${esc(d.dueDay)}</b> de cada mês, conforme o quadro financeiro.</p>
<h3>Cláusula 3 — Da vigência contratual</h3><p><b>3.1.</b> O presente contrato possui vigência mínima de 12 (doze) meses, de <b>${brDate(d.subscriptionStart)}</b> a <b>${brDate(d.subscriptionEnd)}</b>.</p><p><b>3.2.</b> O CONTRATANTE declara ciência de que está contratando uma licença anual de acesso digital, podendo o valor total ser parcelado para facilitar o pagamento.</p><p><b>3.3.</b> O acesso permanecerá disponível durante o período contratado, respeitadas as condições previstas neste instrumento.</p>`};
const academyB=d=>`<h3>Cláusula 4 — Do valor e forma de pagamento</h3><p><b>4.1.</b> O valor total do contrato corresponderá ao plano contratado multiplicado pelo período de vigência mínima de 12 (doze) meses.</p><p><b>4.2.</b> O pagamento poderá ocorrer via boleto bancário, cartão de crédito, PIX, débito ou outras formas disponibilizadas pela CONTRATADA.</p><p><b>4.3.</b> O parcelamento do valor contratual não descaracteriza a natureza anual da contratação.</p><p><b>4.4.</b> Em caso de inadimplência incidirão multa de 2% sobre a parcela vencida, juros de mora de 1% ao mês e correção monetária, podendo haver protesto, negativação e cobrança extrajudicial ou judicial.</p><p><b>4.5.</b> Todos os custos de cobrança, cartório, honorários advocatícios e taxas decorrentes da inadimplência poderão ser repassados ao CONTRATANTE.</p>
<h3>Cláusula 5 — Da liberação do acesso</h3><p><b>5.1.</b> O acesso à plataforma será disponibilizado após confirmação do pagamento inicial e assinatura eletrônica deste contrato.</p><p><b>5.2.</b> Após a liberação, o conteúdo digital será considerado disponibilizado, a licença entrará em plena vigência e os recursos educacionais poderão ser acessados livremente dentro do período contratado.</p><p><b>5.3.</b> O CONTRATANTE declara ciência de que a plataforma possui conteúdos digitais imediatamente disponibilizados após a ativação da conta.</p>
<h3>Cláusula 6 — Do direito de arrependimento</h3><p><b>6.1.</b> O CONTRATANTE poderá exercer o direito de arrependimento no prazo de até 7 (sete) dias corridos após a contratação, conforme artigo 49 do Código de Defesa do Consumidor.</p><p><b>6.2.</b> Exercido o direito dentro do prazo legal, o acesso será cancelado e os valores pagos serão devolvidos conforme a legislação aplicável.</p><p><b>6.3.</b> Após esse prazo, o contrato permanecerá sujeito às condições de fidelidade.</p>
<h3>Cláusula 7 — Da fidelidade contratual</h3><p><b>7.1.</b> O contrato possui fidelidade mínima de 12 (doze) meses.</p><p><b>7.2.</b> Em caso de encerramento antecipado após o prazo legal de arrependimento, o acesso poderá ser encerrado, porém permanecerão exigíveis as obrigações financeiras assumidas.</p><p><b>7.3.</b> Poderá ser aplicada multa compensatória equivalente a 20% do saldo contratual restante.</p><p><b>7.4.</b> A desistência, abandono ou falta de acesso aos conteúdos não extinguem as obrigações financeiras.</p>
<h3>Cláusula 8 — Do uso da plataforma</h3><p><b>8.1.</b> O acesso é pessoal e intransferível.</p><p><b>8.2.</b> É proibido compartilhar login e senha, revender acessos, disponibilizar conteúdos a terceiros, reproduzir aulas sem autorização, copiar materiais protegidos ou utilizar robôs e automações indevidas.</p><p><b>8.3.</b> O compartilhamento indevido poderá acarretar suspensão, cancelamento, cobrança de perdas e danos e medidas judiciais cabíveis.</p>`;
const academyC=d=>`<h3>Cláusula 9 — Da suspensão por inadimplência</h3><p>A CONTRATADA poderá suspender o acesso em caso de inadimplência superior a 60 dias. A suspensão não extingue parcelas vencidas, vincendas, multa ou demais obrigações.</p>
<h3>Cláusula 10 — Dos certificados</h3><p>Os certificados digitais serão disponibilizados conforme as regras acadêmicas, podendo existir requisitos mínimos de conclusão, desempenho, frequência e atividades obrigatórias.</p>
<h3>Cláusula 11 — Da propriedade intelectual</h3><p>Os conteúdos pertencem à CONTRATADA ou a seus parceiros licenciados. É proibida a reprodução, gravação, comercialização ou distribuição não autorizada.</p>
<h3>Cláusula 12 — Da autorização de imagem</h3><p>O CONTRATANTE autoriza gratuitamente o uso de sua imagem, nome e depoimentos para fins institucionais, publicitários e promocionais.</p>
<h3>Cláusula 13 — Da LGPD</h3><p>Os dados pessoais serão tratados para execução contratual, acesso à plataforma, emissão de certificados, comunicação, suporte e cumprimento de obrigações legais, em conformidade com a Lei nº 13.709/2018.</p>
<h3>Cláusula 14 — Das disposições gerais</h3><p>O contrato poderá ser firmado eletronicamente. O CONTRATANTE declara ter lido e concordado com todas as cláusulas. Eventual tolerância não implica renúncia de direitos.</p>
<h3>Cláusula 15 — Do foro</h3><p>Fica eleito o foro da comarca de Mirassol D’Oeste–MT para dirimir controvérsias, respeitados os direitos legalmente assegurados ao consumidor.</p>${d.notes?`<h3>Condição especial</h3><p>${esc(d.notes)}</p>`:""}`;

function presentialDocument(d){return `<div class="pdf-document">${commonPage(d,"assets/banner-presencial.png",false)}${page(`<div class="pdf-contract">${presentialA(d)}</div>`,2)}${page(`<div class="pdf-contract">${presentialB(d)}</div>`,3)}${signature(d,4,"assets/logo-presencial.png")}</div>`}
function academyDocument(d){return `<div class="pdf-document">${commonPage(d,"assets/banner-academy.png",true)}${page(`<div class="pdf-contract">${academyA(d)}</div>`,2)}${page(`<div class="pdf-contract">${academyB(d)}</div>`,3)}${page(`<div class="pdf-contract">${academyC(d)}</div>`,4)}${signature(d,5,"assets/logo-academy.png")}</div>`}
function signature(d,n,logo){return page(`<div class="pdf-contract"><h3>Assinaturas</h3><p>Mirassol D’Oeste, ${longDate(new Date())}.</p></div><div class="pdf-signatures"><div class="line"></div><b>Valéria Da Silva Moura — Evolua+ Profissões</b><br>CNPJ 44.456.212/0001-53 — CONTRATADA<div class="line"></div><b>${esc(d.studentName)}</b><br>ALUNO(A) / CONTRATANTE<div class="line"></div><b>${esc(d.payerName)}</b><br>RESPONSÁVEL FINANCEIRO (QUANDO NECESSÁRIO)<br><img src="${logo}" style="width:180px;max-height:180px;object-fit:contain;margin-top:38px"></div>`,n)}
function page(content,n){return `<section class="pdf-page">${content}<div class="pdf-brand-footer"></div><span class="pdf-page-number">Página ${n}</span></section>`}
function cell(label,value){return `<span class="label">${esc(label)}</span><span class="value">${esc(value||"")}</span>`}
function lines(v){return String(v||"").split(/\n+/).map(esc).filter(Boolean)}
function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function money(v){return Number(v||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}
function localDate(v){if(!v)return null;const [y,m,d]=v.split("-").map(Number);return new Date(y,m-1,d)}
function dateInput(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`}
function brDate(v){const d=typeof v==="string"?localDate(v):v;return d&&!isNaN(d)?d.toLocaleDateString("pt-BR"):""}
function longDate(d){return d.toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}
function dueDates(start,n,day){const base=localDate(start)||new Date();return Array.from({length:n},(_,i)=>{const d=new Date(base.getFullYear(),base.getMonth()+i,1),last=new Date(d.getFullYear(),d.getMonth()+1,0).getDate();d.setDate(Math.min(day,last));return dateInput(d)})}
function numberWords(v){const n=Math.round(Number(v||0));if(n===99)return"noventa e nove reais";if(n===159)return"cento e cinquenta e nove reais";if(n===189)return"cento e oitenta e nove reais";if(n===249)return"duzentos e quarenta e nove reais";if(n===289)return"duzentos e oitenta e nove reais";if(n===959)return"novecentos e cinquenta e nove reais";if(n===1188)return"mil cento e oitenta e oito reais";if(n===3699)return"três mil seiscentos e noventa e nove reais";return `${n.toLocaleString("pt-BR")} reais`}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2600)}
init();
