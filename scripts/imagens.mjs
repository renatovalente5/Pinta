// As imagens que não se desenham no browser: ícones da aplicação (PNG) e as
// imagens de partilha (1200×630) do site e de cada família. Corre-se à mão
// quando a marca ou as famílias mudam (`node scripts/imagens.mjs`); os PNG ficam
// em assets/ e vão para o git.
import { createRequire } from 'node:module';
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { RAIZ, marca, familias, produtosDe, logotipo } from './site.mjs';
import { sprite, instancia } from '../assets/js/desenhos.js';
import { euros, desde, comIva } from '../assets/js/preco.js';
const require = createRequire(import.meta.url);
const pw = require(process.env.PLAYWRIGHT || join(process.env.HOME, 'Websites/carimbo/node_modules/playwright'));
const css = ['base', 'desenhos', 'componentes', 'paginas'].map((n) => readFileSync(join(RAIZ, `assets/css/${n}.css`), 'utf8')).join('\n').replaceAll('../fontes/', `file://${RAIZ}/assets/fontes/`);
mkdirSync(join(RAIZ, 'assets/og'), { recursive: true });
const b = await pw.chromium.launch({ channel: 'chrome' });
const foto = async (html, w, h, saida) => {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  // Por ficheiro (e não setContent): só assim a página pode ler a letra em file://.
  const tmp = join(RAIZ, '_fonte/og-tmp.html');
  writeFileSync(tmp, `<!doctype html><html lang="pt-PT"><meta charset="utf-8"><style>${css} body{margin:0;width:${w}px;height:${h}px;overflow:hidden}</style>${html}</html>`);
  await p.goto(`file://${tmp}`);
  await p.evaluate(async () => { await document.fonts.load('780 66px Bricolage'); await document.fonts.load('500 28px Inter'); await document.fonts.ready; }); await p.waitForTimeout(200);
  await p.screenshot({ path: join(RAIZ, saida) }); await p.close();
};
const icone = (t) => `<div style="width:${t}px;height:${t}px;display:grid;place-items:center;background:#151A33"><svg viewBox="0 0 64 64" width="${t * 0.8}" height="${t * 0.8}"><circle cx="23" cy="25" r="11" fill="#0A8FC2" opacity=".9"/><circle cx="41" cy="25" r="11" fill="#FFC83D" opacity=".9"/><circle cx="32" cy="40" r="11" fill="#CB1964" opacity=".95"/></svg></div>`;
for (const [t, f] of [[180, 'assets/apple-touch-icon.png'], [192, 'assets/icone-192.png'], [512, 'assets/icone-512.png']]) await foto(icone(t), t, t, f);
const og = (titulo, sub, pecas) => `${sprite(pecas.map((x) => x[0]))}
<div style="width:1200px;height:630px;position:relative;background:#FFFBF5;display:grid;grid-template-columns:1fr 520px;align-items:center;padding:0 70px;box-sizing:border-box;overflow:hidden">
  <div style="position:absolute;right:-60px;top:-60px;width:700px;height:700px;border-radius:50%;background:#CB1964;opacity:.12"></div>
  <div style="position:relative;display:flex;flex-direction:column;gap:26px">
    <div style="color:#151A33">${logotipo().replace('class="logo"', 'class="logo" style="height:64px"')}</div>
    <div style="font:780 66px/1.02 Bricolage,sans-serif;letter-spacing:-.02em;color:#151A33">${titulo}</div>
    <div style="font:500 28px/1.3 Inter,sans-serif;color:#474C63">${sub}</div>
  </div>
  <div style="position:relative;height:520px">${pecas.map(([d, c], i) => `<div style="position:absolute;width:${i ? 230 : 330}px;${['left:90px;top:60px', 'left:0;bottom:10px', 'right:0;bottom:30px'][i]}">${instancia(d, { cor: c })}</div>`).join('')}</div>
  <div style="position:absolute;left:0;right:0;bottom:0;height:10px;display:grid;grid-template-columns:repeat(4,1fr)"><i style="background:#0A8FC2"></i><i style="background:#CB1964"></i><i style="background:#FFC83D"></i><i style="background:#000"></i></div>
</div>`;
await foto(og('Brindes e fardas<br><span style="color:#CB1964">com o seu logótipo.</span>', 'Desde 10 unidades. Maquete grátis antes de pagar.', [['tshirt', '#FFC83D'], ['caneca', '#151A33'], ['garrafa-termica', '#0A8FC2']]), 1200, 630, 'assets/og/pinta.png');
for (const f of familias) {
  const cores = ['#CB1964', '#151A33', '#FFC83D'];
  const d = Math.min(...produtosDe(f.slug).map(desde));
  await foto(og(`${f.h1.antes}<br><span style="color:#CB1964">${f.h1.destaque}</span>`, `Desde ${euros(d)} + IVA (${euros(comIva(d))} com IVA) por unidade.`, f.desenhos.map((x, i) => [x, cores[i]])), 1200, 630, `assets/og/${f.slug}.png`);
}
await b.close();
console.log('imagens feitas');
