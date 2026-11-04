// Mede os pares de cores da paleta (WCAG 2.x). Corre sozinho para ver a tabela;
// o auditar.mjs importa `PARES` e `medir` e falha a publicação abaixo do mínimo.
export function luminancia(hex) {
  const n = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function medir(a, b) {
  const [l1, l2] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}
export const COR = {
  papel: '#FFFBF5', papel2: '#F6F0E8', branco: '#FFFFFF',
  tinta: '#151A33', tinta2: '#474C63', tinta3: '#5C6077',
  magenta: '#D3195F', magentaEscuro: '#A80F49', magentaClaro: '#FF7AAE',
  amarelo: '#FFC83D', ciano: '#0A8FC2', cianoClaro: '#5FD0F5',
  verde: '#157A42', verdeVivo: '#25D366',
  escuroTexto: '#C9CCDD',
};
// [frente, fundo, mínimo, onde]
export const PARES = [
  ['tinta', 'papel', 4.5, 'texto'], ['tinta2', 'papel', 4.5, 'texto secundário'], ['tinta3', 'papel', 4.5, 'legendas'],
  ['tinta2', 'papel2', 4.5, 'texto secundário em cartões cor de papel'], ['tinta3', 'branco', 4.5, 'legendas em cartões brancos'],
  ['magenta', 'papel', 4.5, 'destaque dos títulos e ligações'], ['magenta', 'branco', 4.5, 'ligações em cartões'],
  ['branco', 'magenta', 4.5, 'botão principal'], ['branco', 'magentaEscuro', 4.5, 'botão principal (rato)'],
  ['tinta', 'amarelo', 4.5, 'texto sobre amarelo'], ['tinta', 'cianoClaro', 4.5, 'texto sobre ciano claro'],
  ['tinta', 'ciano', 4.5, 'texto sobre ciano'], ['branco', 'verde', 4.5, 'texto branco sobre verde escuro'],
  ['tinta', 'verdeVivo', 4.5, 'botão WhatsApp (texto escuro)'],
  ['branco', 'tinta', 4.5, 'texto nas secções escuras'], ['escuroTexto', 'tinta', 4.5, 'texto secundário nas secções escuras'],
  ['amarelo', 'tinta', 4.5, 'destaque dos títulos nas secções escuras'], ['magentaClaro', 'tinta', 4.5, 'magenta nas secções escuras'],
  ['cianoClaro', 'tinta', 4.5, 'ciano nas secções escuras'],
];
if (import.meta.url === `file://${process.argv[1]}`) {
  let mal = 0;
  for (const [f, b, min, onde] of PARES) {
    const r = medir(COR[f], COR[b]);
    if (r < min) mal++;
    console.log(`${r >= min ? '✓' : '✗'} ${r.toFixed(2).padStart(5)}  ${f} sobre ${b}  (${onde})`);
  }
  process.exit(mal ? 1 : 0);
}
