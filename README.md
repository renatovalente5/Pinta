# Pinta — personalizados com pinta

Site de brindes, têxtil e impressão personalizados para empresas (marca proposta, por confirmar
com o cliente). Pré-visualização em https://renatovalente5.github.io/Pinta/ (`noindex`).

O plano, as decisões e o que falta decidir com o cliente estão em [docs/PLANO.md](docs/PLANO.md).

## Como está feito

- **Dados em JSON** (`dados/`): a marca e os contactos, as famílias, **um ficheiro por produto**
  (`dados/produtos/<slug>.json`), a paleta de cores com o grupo de cada cor, os kits e as dúvidas.
  É isto que o painel (backoffice) vai editar.
- **Gerador sem dependências** (`scripts/gerar.mjs`, Node 24): escreve `_site/`, uma página por
  endereço (início, produtos, cada família, **cada produto**, kits, orçamento, sobre, contactos,
  ligações, termos, privacidade, 404) e o catálogo que o browser usa (`assets/catalogo.json`).
- **Os produtos são desenhos SVG nossos** (`assets/js/desenhos.js`): a cor muda com uma variável e
  o logótipo do visitante aparece em todos os desenhos por um símbolo partilhado.
- **As contas** (`assets/js/preco.js`) são as mesmas no gerador e no browser: cêntimos inteiros, sem
  e com IVA ao mesmo tamanho.
- Sem cookies, sem estatísticas, nada carregado de fora (a letra é servida pelo site).

## Trabalhar

```bash
node scripts/gerar.mjs          # gera _site/
node scripts/servir.mjs         # http://localhost:8930/Pinta/
node scripts/auditar.mjs        # o travão que o CI corre antes de publicar
node scripts/testar.mjs         # bateria Playwright (Chrome e WebKit, computador e telemóvel)
node scripts/contrastes.mjs     # os contrastes da paleta
node scripts/imagens.mjs        # ícones e imagens de partilha (quando a marca ou as famílias mudam)
```

Uma bateria de cada vez (servem cópias do mesmo `_site/`). Publicar = `git push` para a `main`: o
`publicar.yml` gera, audita e publica.

## Antes de abrir ao público

Em `dados/marca.json`: nome e logótipo finais, firma, NIF, morada, e-mail, telefone, WhatsApp,
horário; `demo: false`; um ficheiro `CNAME` com o domínio (o build falha com domínio e `demo`
ligado). Produtos, preços e mínimos reais. Ver o §15 do plano.
