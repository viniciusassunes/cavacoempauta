/* importar.js — botão "Importar partitura (PDF)". As peças importadas ficam só neste aparelho (localStorage). */
(function () {
  const CHAVE = 'cavaco.importadas';
  let salvas = [];
  try { salvas = JSON.parse(localStorage.getItem(CHAVE) || '[]'); } catch (e) { salvas = []; }
  const fixas = window.PIECES.length;
  salvas.forEach(p => { p._importada = true; window.PIECES.push(p); });
  try { const t = sessionStorage.getItem('cavaco.abrir'); if (t) { sessionStorage.removeItem('cavaco.abrir'); const i = window.PIECES.findIndex(p => p._importada && p.title === t); if (i >= 0) window.__abrir = i; } } catch (e) {}

  const $ = id => document.getElementById(id);
  const carregaScript = src => new Promise((ok, err) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = () => err(new Error('Não consegui carregar o leitor de PDF (precisa de internet na primeira vez).')); document.head.appendChild(s); });
  async function pdfjs() {
    if (!window.pdfjsLib) await carregaScript('pdf.min.js?v=1');
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js?v=1';
    return window.pdfjsLib;
  }
  if (!window.PdfScore) { /* leitor-pdf.js é carregado antes deste arquivo */ }

  function msg(texto, tipo) { const el = $('impMsg'); if (!el) return; el.textContent = texto; el.className = tipo || ''; el.hidden = !texto; }

  async function importar(file) {
    msg('Lendo a partitura…', 'info');
    try {
      if (!/\.pdf$/i.test(file.name) && file.type !== 'application/pdf') throw new Error('NAO_PDF');
      const lib = await pdfjs();
      const buf = new Uint8Array(await file.arrayBuffer());
      const nome = file.name.replace(/\.pdf$/i, '').replace(/^\d+\s*[-_.]?\s*/, '').trim();
      const r = await window.PdfScore.readPdf(lib, buf, { title: nome, source: file.name });
      const p = r.piece;
      if (!p.bars.length) throw new Error('VAZIA');
      // confere com o mesmo motor que toca: se algum compasso não fechar a conta, avisa qual
      const probs = window.validarPeca ? window.validarPeca(p) : [];
      if (probs.length) throw new Error('CONTA|' + probs.slice(0, 3).join(' · ') + (probs.length > 3 ? ` (e mais ${probs.length - 3})` : ''));
      if (!p.title || p.title === 'Peça importada') p.title = nome || 'Peça importada';
      p.note = 'importada de PDF — confira antes de tocar';
      const base = p.title; let n = 2; while (window.PIECES.some(x => x.title === p.title)) p.title = base + ' (' + (n++) + ')';
      salvas.push(p);
      try { localStorage.setItem(CHAVE, JSON.stringify(salvas)); } catch (e) { throw new Error('Não deu para guardar a peça neste aparelho (espaço cheio?).'); }
      try { sessionStorage.setItem('cavaco.abrir', p.title); } catch (e) {}
      msg(`Pronto! "${p.title}" — ${p.bars.length} compassos. Abrindo…`, 'ok');
      setTimeout(() => location.reload(), 500);
    } catch (e) {
      const m = String(e.message || e);
      if (m === 'NAO_PDF') msg('Esse arquivo não é PDF. Por enquanto só leio PDF de partitura.', 'erro');
      else if (m === 'SEM_MAESTRO') msg('Não consegui ler este PDF. Ele provavelmente é uma foto, um escaneado ou foi feito em outro programa. Por enquanto só leio PDFs de partitura gerados pelo Finale. Tente outro arquivo.', 'erro');
      else if (m === 'VAZIA') msg('Abri o PDF, mas não encontrei compassos. Tente outro arquivo.', 'erro');
      else if (m.startsWith('CONTA|')) msg('Li o PDF, mas algum compasso ficou com a conta errada, então não vou arriscar tocar errado. ' + m.slice(6) + '. Tente outro arquivo.', 'erro');
      else msg('Não consegui ler este PDF (' + m + '). Tente outro arquivo.', 'erro');
      console.error(e);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const side = $('side'); if (!side) return;
    const box = document.createElement('div'); box.id = 'impBox';
    box.innerHTML = '<button id="impBtn" type="button">＋ Importar partitura (PDF)</button><input id="impFile" type="file" accept="application/pdf,.pdf" hidden><div id="impMsg" hidden></div>' +
      (salvas.length ? '<button id="impDel" type="button" class="link">Remover as importadas (' + salvas.length + ')</button>' : '');
    side.appendChild(box);
    $('impBtn').addEventListener('click', ev => { ev.stopPropagation(); msg(''); $('impFile').value = ''; $('impFile').click(); });
    $('impFile').addEventListener('change', ev => { const f = ev.target.files[0]; if (f) importar(f); });
    box.addEventListener('click', ev => ev.stopPropagation());       // não fecha o menu ao tocar aqui
    const del = $('impDel'); if (del) del.addEventListener('click', () => { if (confirm('Remover as ' + salvas.length + ' peças importadas deste aparelho?')) { try { localStorage.removeItem(CHAVE); } catch (e) {} location.reload(); } });
  });
})();
