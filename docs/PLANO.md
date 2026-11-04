# Pinta — plano do site (v2, 4 nov 2026)

Pedido (Renato, 4 nov 2026): um cliente quer um site «com todas as features do retinapro.pt», «tão
bom ou melhor», com **dinâmica** («até o sublinhado é em movimento») e **artigos com dinâmica de
cor**. GitHub Pages, **sem backoffice por agora** (preparado para ele). Marca por nomear: proponho
uma. A inspecção do RetinaPro está em `_fonte/inspeccao/RETINAPRO.md` (fora do git).

A v1 foi revista por quatro agentes (paridade com o RetinaPro, design e conteúdo, técnica, legal).
Esta v2 é o que se constrói. O que mudou está marcado **(rev.)**.

## 0. Regras

1. **Nada do RetinaPro**: nem textos (nem os rótulos pequenos: «Ver cores e preços», «Modelo X de
   N», «Maquete enviada», «Mudar a cor?», «sem complicações», «Não encontrou?»), nem a forma dos
   sinais de marca deles: telemóvel com conversa a escrever-se, agulha a coser, ícones (caneta a
   escrever, líquido com bolhas, vapor, t-shirt no cabide, carimbo), bilhete com recortes e selo,
   caixa final amarela, estrelinhas, lápis a flutuar, grelha de pontos. **(rev.)** A nossa
   identidade vem da **impressão**: o traço que se imprime e acaba numa pinta, o **registo CMY** (três
   camadas desalinhadas que acertam), barra CMYK, marcas de corte, leque de amostras de cor,
   retícula.
2. **Nada inventado que pareça verdadeiro (rev.)**: sem avaliações, sem «trabalhos», sem pessoas,
   sem «Mais vendido», sem «Eco»/«reciclado»/«orgânico»/«certificado» em produtos de exemplo.
   Faixa fixa «Pré-visualização · produtos, preços e contactos de exemplo»; «Preço de exemplo» no
   próprio preço; as mensagens começam por «[Teste — pré-visualização]»; sem dados estruturados de
   produto enquanto `demo`.
3. **Zero pedidos a terceiros**, sem cookies, sem aviso de cookies. O que se guarda no aparelho
   (orçamento, logótipo, «Pausar movimento») só se escreve quando o visitante age, diz «fica só
   neste aparelho» e tem «Esvaziar»/«Remover».
4. **O movimento tem travão (rev.)**: interruptor «Pausar movimento» visível e lembrado (WCAG
   2.2.2), `reduce`, pausa fora do ecrã. Nada começa invisível no herói (só translação: LCP).
5. Dados em JSON, **um ficheiro por produto (rev.)**, cores por chave de uma paleta comum com
   `grupo`. `noindex` enquanto não houver CNAME; com CNAME e `demo` ligado, o build falha.

## 1. Marca proposta: **Pinta**

«Ter pinta» + a pinta de cor. Logótipo nosso em SVG (letra Bricolage 800 convertida em traço): o
ponto do *i* é a pinta, **magenta fixo no logótipo-mãe** (bordar, gravar); **no site** toma a cor que
o visitante escolheu por último (sem guardar uma chave própria: vem do orçamento ou da página).
Nome **proposto, sem pesquisa nem registo de marca** (dizer por escrito; `pinta.pt` já é de
outrem). Alternativas: Timbre, Estampa, Matiz.

Paleta medida (`scripts/contrastes.mjs`, a auditoria falha abaixo do mínimo): papel `#FFFBF5`,
papel-2 `#F6F0E8`, tinta `#151A33`, tinta-2 `#474C63`, tinta-3 `#5C6077`, **magenta `#CB1964`**
(5,27 no papel, 4,80 no papel-2, branco por cima 5,44), magenta-claro `#E2548F`/`#FF7AAE` no escuro,
amarelo `#FFC83D` (só fundo, nunca texto no claro, **nunca o papel de destaque do RetinaPro**),
ciano `#0A8FC2` (decoração), verde WhatsApp `#25D366` com **texto tinta** (8,6), linha de campo
`#7C7F8F` (≥ 3:1). Letra: Bricolage (títulos, `opsz`+`wght`, 68 KB) + Inter (texto, 48 KB).

## 2. Páginas (rev.)

| Endereço | Página |
|---|---|
| `/` | Início |
| `/produtos/` | Todas as famílias, por grupo |
| `/produtos/<familia>/` | Família: herói curto + filtros + grelha logo no 1.º ecrã |
| `/produtos/<familia>/<produto>/` | **O configurador** (página verdadeira, partilhável; sem janela) |
| `/kits/` | Kits configuráveis (peça a peça) |
| `/orcamento/` | O orçamento: ver, mudar e enviar; **partilhável pela ligação** (estado no `#`) |
| `/sobre/`, `/contactos/`, `/ligacoes/` | Quem somos · contactos com estado do atendimento · página para a bio (`?origem=instagram`) |
| `/termos/`, `/privacidade/`, `/404.html` | Legais e página não encontrada |

«Produtos» e não «Catálogos» (catálogo lê-se PDF). **Sem janela de ficha (rev.)**: o cartão é uma
ligação para a página do produto; a transição entre páginas faz o desenho voar; ‹ › mostram o
modelo anterior/seguinte **pela ordem e filtro da grelha de onde se veio**; no telemóvel, barra fixa
em baixo com o preço e o botão. Uma só forma de configurar, um só endereço.

## 3. Componentes globais

- **Cabeçalho** fixo (sombra e logótipo mais pequeno ao rolar; nunca se esconde): logótipo ·
  Produtos (painel) · Kits · Sobre · Contactos · chip «O seu logótipo» (depois de carregar) ·
  **Orçamento · N** · WhatsApp.
- **Painel Produtos** (divulgação, não `menu`): leque de amostras — cada família numa ficha de cor
  com o ícone a imprimir-se em registo, «desde …», e as ligações «Todos os produtos», «Kits».
- **Menu do telemóvel**: ecrã inteiro (`dialog`, X lá dentro), abre em círculo a partir do botão,
  famílias em leque, páginas, WhatsApp em baixo.
- **Orçamento** (gaveta; folha no telemóvel): linhas com o desenho na cor e o logótipo, quantidade
  (± e campo), opções, preços **sem e com IVA ao mesmo tamanho**, total; «Tamanhos» (têxtil, por
  omissão «a combinar») e «Para quando?» opcionais; **«Pedir orçamento pelo WhatsApp»** (principal no
  telemóvel), **«… por e-mail»** (igual no computador), «Copiar ligação» (o orçamento vai na ligação:
  resolve o browser do Instagram); «Anexe o logótipo na conversa»; a frase da livre resolução; mensagem
  compacta com a ligação para `/orcamento/#…`.
- **O seu logótipo**: PNG/JPEG/WebP/SVG (`accept` explícito: o iPhone converte HEIC), até 5 MB;
  reduzido a ≤ 1600 px; fundo tirado por **enchimento a partir das bordas** (não por limiar), com
  «Manter fundo»; versão clara (gravação) feita em canvas no carregamento; guardado como
  `ArrayBuffer` em IndexedDB com reserva em memória (o Safari privado falha com `Blob`); SVG só
  como imagem. Aparece em **todos** os desenhos por **um** símbolo partilhado. «Pré-visualização
  aproximada».
- **Estado do atendimento** junto do WhatsApp, a partir do horário: «Atendimento aberto» /
  «Responde amanhã às 9h» (em vez da fotografia de um consultor).
- **Rodapé** escuro com a barra CMYK: logótipo, frase, redes; Produtos · A Pinta · Contactos; linha
  legal com Termos, Privacidade, Livro (discreto) e «Pausar movimento».
- **Transições entre páginas** (lições do NewAuto) e pré-carregamento ao passar o rato.

## 4. Início (rev.)

1. **Herói**: «Brindes e fardas / **com o seu logótipo.**» (H1: palavras a subir só em translação; o
   destaque imprime-se em registo CMY e o traço desenha-se até à pinta). «Desde 10 unidades. Maquete
   grátis antes de pagar.» · **Ver produtos** · WhatsApp. À direita, **o palco**: t-shirt, caneca,
   garrafa, boné e caneta à volta de uma pinta grande; as cores mudam em ciclo (com botão de pausa;
   pára fora do ecrã); **«Experimentar com o meu logótipo»** — carrega-se e o palco veste-o.
2. **Produtos**: as 9 famílias em fichas de amostra (desenho, nome, «desde»).
3. **Kits**: 4 kits desenhados (com o logótipo do visitante, se houver), preço por kit, «Ver kit».
4. **Como funciona**: Escolha · Aprove a maquete («Sem surpresas: só produzimos depois do seu
   sim») · Receba — linha que se desenha com o scroll.
5. **Dúvidas** (`details`, uma aberta de cada vez).
6. **Fecho**: «Comece pela maquete.» + «Pedir maquete grátis».

## 5. Família (rev.)

Herói curto («T-shirts personalizadas», frase, 3 incluídos com visto, desenho da família); **barra
de filtros**: grupos de cor (pintas com contagem; ao escolher, **todas as cartas passam a essa cor**
sem JS por cartão — variáveis `--cor-<grupo>` em cada cartão e `html[data-cor]` posto antes da
primeira pintura a partir de `?cor=`), tipo, tinta, ordenar (preço ↑↓); filtros com menos de 2
opções não aparecem; estado vazio com «Limpar filtros»; contador. **Cartões**: uma ligação esticada;
desenho na cor; atributos (capacidade, tinta, área de impressão); «12 cores» com pintas
decorativas (passar o rato pré-visualiza a cor); «desde 0,58 € + IVA · 0,71 € com IVA (500 un.)».
Depois da grelha: «Procura outra coisa? Diga-nos o que precisa.» e as dúvidas da família.

## 6. Produto — o configurador (rev.)

Migalhas; ‹ anterior · seguinte › com os nomes; desenho grande (logótipo do visitante; «carregar o
seu logótipo»); nome, frase, atributos.
1. **Cor**: rádios em amostras com o nome; a escolhida dá a cor ao desenho (0,3 s), à pinta do
   logótipo e à **ficha de cor** do preço; `?cor=` com `replaceState`.
2. **Quantidade**: escalões em linhas (rádios) «25 un. · 1,30 €/un. · 32,50 €», com o indicador a
   deslizar; **«Outra quantidade»** (campo ±) com a regra do escalão e o empurrão «Com 50 un. fica a
   1,05 €/un.»; abaixo do mínimo ou acima do último escalão → pedido especial.
3. **Personalização**: rádios (laser / UV a cores; frente / frente e costas…); muda o aspecto do
   logótipo no desenho; medidas de impressão por opção; «Outra medida» → pedido especial.
4. **Preço** (ficha de amostra: a cor escolhida em cima com o nome, como num leque de cores): **sem
   IVA e com IVA ao mesmo tamanho**, por unidade, a contar de valor a valor (cêntimos incluídos;
   anúncio só do valor final), «Preço de exemplo» na pré-visualização, a frase do indicativo, a
   frase da livre resolução.
5. **Juntar ao orçamento** (principal; abre a gaveta) · «Dúvidas? Pergunte no WhatsApp» (ligação).
Depois: especificações (composição em %), «Combina com» (3), dúvidas. Telemóvel: barra fixa com o
preço e o botão.

## 7. Kits

Kit = peças de produtos existentes (cor por peça, quantidade por pessoa), número de pessoas
(stepper, mínimo), preço por kit e total (sem e com IVA), incluídos. Barra fixa com o total. Juntar
ao orçamento (como um conjunto).

## 8. O movimento (rev.)

Fica: traço impresso (desenha-se ao aparecer; volta a «tintar-se» de vez em quando; numa variante
segue o scroll com `animation-timeline: view()` dentro de `@supports`), **registo CMY** nos destaques
e nos ícones das famílias (acerta ao aparecer/passar o rato), palavras do H1, palco do herói,
cascata dos cartões (uma vez), mudança de cor 0,3 s, indicador a deslizar, preço a contar, linha do
«Como funciona», cabeçalho que encolhe, menu em círculo, painel, gaveta, transição entre páginas,
brilho e seta nos botões ao passar o rato. Sai: brilhos e pontos de fundo a derivar, íman, abanões,
anel a pulsar, inclinação 3D fora do herói, selos, vistos de passos, faixas infinitas. Uma animação
de fundo por ecrã, no máximo.

## 9. Desenhos

~28 formas nossas em SVG (`assets/js/desenhos.js`), **como `<symbol>` num sprite por página (rev.)**
e instâncias `<svg style="--cor:…"><use href="#d-…"/></svg>` (gradientes neutros e únicos, sem ids
repetidos). O logótipo é um símbolo único (cor + versão clara), referido em cada área de impressão;
a técnica escolhe a versão com variáveis (`--logo-cor`, `--logo-claro`). Nota: «O desenho mostra o
modelo e a cor; o tom exacto confirma-se na maquete.»

## 10. Preços (rev.)

Sem IVA no JSON, em cêntimos inteiros nas contas: preço unitário do escalão (arredondado) →
opções (acréscimo por unidade, factor) → unitário arredondado → total = unitário × q → IVA por linha,
arredondado uma vez. Quantidade livre usa o escalão mais alto ≤ q. Se o cliente for isento (CIVA
art. 53.º), `iva: 0` e só um preço. Tudo isto num ficheiro (`preco.js`) que o gerador e o browser
usam; a auditoria confere texto visível = contas.

## 11. Técnica (rev.)

Gerador sem dependências (Node 24), `_site/`, Actions (gerar → auditar → publicar). Módulos ES com
**mapa de importação** com versões por conteúdo (o GitHub Pages guarda 10 min). `assets/js/
package.json` `{"type":"module"}`. Orçamentos em gzip: JS < 60 KB, CSS < 70 KB, letra 116 KB (só a
Bricolage pré-carregada), fallback com métricas acertadas. Imagens de partilha PNG 1200×630 feitas
com o Chrome sem cabeça (local; no CI quando houver domínio). `legal-comum` (Livro, RAL nacional,
nota das chamadas, `verificarIdentificacao` avisar/bloquear, `verificarProduto` têxtil).

## 12. Acessibilidade

Um H1 (texto inteiro para leitores, palavras animadas `aria-hidden`); rádios nativos; preço
animado `aria-hidden` + frase educada ~500 ms depois; dialog com X dentro; painel como divulgação;
foco visível e não tapado pelo cabeçalho; alvos ≥ 44 px; contraste medido; «Pausar movimento».

## 13. Legal

Identificação (DL 7/2004 art. 10.º) com «(por indicar)» só em pré-visualização; antes de abrir:
firma, NIF, morada geográfica, e-mail escrito, telefone com a nota, «Pinta é uma marca de …».
IVA sempre visível (DL 138/90). «Preço indicativo para esta configuração. O preço final chega por
escrito com a maquete, antes de pagar, e só muda se mudar o logótipo, a técnica ou a quantidade.»
Livre resolução: «Peças com o seu logótipo ou texto são feitas por medida: depois de aprovar a
maquete e o orçamento, não há livre resolução (DL 24/2014, art. 17.º, n.º 1, al. c)). Sem
personalização: 14 dias. A garantia legal de 3 anos mantém-se.» Portes: «no continente; ilhas no
orçamento». Prazo: «5 a 7 dias úteis após aprovar a maquete». Termos: quem encomenda garante o
direito ao logótipo. Privacidade completa (responsável, GitHub, armazenamento local, WhatsApp/Meta,
e-mail, direitos, CNPD). Livro discreto no rodapé; RAL nacional; sem ODR. Promoções e avaliações:
fora até haver dados reais (regras anotadas para depois).

## 14. Testes

Auditoria (cada verificação provada a falhar): ids únicos e referências `url(#…)` resolvidas;
prefixo; nenhum pedido externo; preços = contas; canonical/og; noindex ⇔ sem CNAME; mapa de
importação completo; orçamentos gzip; animações infinitas desligadas em `reduce`; contrastes;
identificação; produtos têxteis com composição. Baterias Playwright (Chromium e WebKit, 390/768/1440,
uma de cada vez, numa cópia `SAIDA`): cor por amostragem de píxel (com filtro, primeiro cartão
escondido), logótipo dentro da área, WebKit em contexto privado, histórico (‹ ›, voltar, ligação
directa, recarregar), cor no `pagereveal`, Tab com o cabeçalho, transbordo em todas as páginas,
nenhum pedido externo ou ≥ 400.

## 15. Por decidir com o cliente

Nome e logótipo · firma, NIF, morada, contactos, horário · produtos, preços, mínimos, técnicas reais ·
se a maquete é sempre grátis · ilhas · fotografias de trabalhos reais · avaliações (ligação ao Google)
· domínio · conta no Livro de Reclamações.
