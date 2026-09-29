# Gestão de Contratos — Evolua+

Sistema estático para gerar contratos presenciais e da Evolua+ Academy no próprio navegador.

## Publicar no GitHub Pages

1. Envie todos os arquivos e pastas deste pacote para a raiz do repositório.
2. No GitHub, abra **Settings > Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Selecione a branch `main`, pasta `/ (root)` e clique em **Save**.

O arquivo de abertura é `index.html`.

## Privacidade

O sistema não possui banco de dados e não envia os dados do contrato para armazenamento. O preenchimento e a montagem acontecem no navegador. Ao fechar ou atualizar a página, os dados preenchidos são descartados.

## Atualizar preços, cursos e módulos

Abra `app.js` em um editor de texto:

- as trilhas dos planos estão nas listas `TECH_START`, `ADM_START`, `TECH_PRO`, `ADM_PRO` e `COMPLETE_CATALOG`;
- usuários e preços estão no bloco `PLANS`;
- os 42 cursos regulares do portfólio estão organizados nos planos da Academy;
- os cursos presenciais estão no bloco `COURSES`, com duração, carga horária e módulos;
- cada lista de cursos ou módulos pode ser alterada sem modificar o restante do sistema.

As opções “Formação Técnica por Competência” e “NRs — Normas Regulamentadoras” não foram inseridas automaticamente nos planos de assinatura porque possuem contratação e regras próprias.

O número do contrato é informado manualmente no primeiro campo e aparece no cabeçalho e no nome do PDF.

## Geração do PDF

A biblioteca de geração é carregada pela internet no momento da criação do PDF. Portanto, o computador precisa estar conectado para gerar o arquivo.

No contrato Academy, informe o valor total do contrato e a quantidade de parcelas. O sistema calcula automaticamente o valor de cada parcela e repete os mesmos valores no resumo, na tabela financeira e na cláusula 2.5.

No contrato presencial, informe o valor de cada parcela, a quantidade de parcelas e a matrícula. O total é calculado como `valor da parcela × quantidade de parcelas + matrícula`, e os mesmos valores são usados no resumo e no PDF.

Antes de utilizar contratos reais, confira o conteúdo jurídico, os valores, os cursos e os módulos cadastrados.
