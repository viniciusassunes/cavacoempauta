/* leitor-pdf.js — lê PDFs de partitura gerados pelo Finale (fonte Maestro) e devolve uma peça no formato do pieces.js.
 * Roda no navegador (com pdf.js) e no Node (para testes). Faz o melhor possível e AVISA quando não tem certeza.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.PdfScore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
'use strict';

const mul = (a, b) => [a[0]*b[0]+a[2]*b[1], a[1]*b[0]+a[3]*b[1], a[0]*b[2]+a[2]*b[3], a[1]*b[2]+a[3]*b[3], a[0]*b[4]+a[2]*b[5]+a[4], a[1]*b[4]+a[3]*b[5]+a[5]];
const ap = (m, x, y) => [m[0]*x+m[2]*y+m[4], m[1]*x+m[3]*y+m[5]];

// ---------------------------------------------------------------- 1. extração bruta da página
async function extractPage(pdfjs, page) {
  const vp = page.getViewport({ scale: 1 }); const H = vp.height, W = vp.width;
  const tc = await page.getTextContent();
  const ops = await page.getOperatorList();
  const OPS = pdfjs.OPS;
  const ids = [...new Set(tc.items.map(i => i.fontName))], fname = {};
  for (const id of ids) {
    try { const f = await Promise.race([new Promise(r => page.commonObjs.get(id, r)), new Promise((_, rej) => setTimeout(() => rej(new Error('t')), 4000))]); fname[id] = (f && f.name) || ''; }
    catch (e) { fname[id] = ''; }
  }
  const text = [];
  for (const i of tc.items) {
    if (!i.str || !i.str.trim()) continue;
    const fs = Math.hypot(i.transform[0], i.transform[1]), name = fname[i.fontName] || '';
    const chars = [...i.str]; const adv = chars.length ? i.width / chars.length : 0;
    chars.forEach((ch, k) => { if (ch.trim()) text.push({ s: ch, x: i.transform[4] + adv * k, y: H - i.transform[5], fs, w: adv, maestro: /aestro/i.test(name), font: name }); });
  }
  // traços
  let ctm = [1, 0, 0, 1, 0, 0]; const stack = []; let lw = 1; let cur = null; const segs = [], polys = [], curves = [];
  for (let k = 0; k < ops.fnArray.length; k++) {
    const fn = ops.fnArray[k], a = ops.argsArray[k];
    if (fn === OPS.save) stack.push([ctm.slice(), lw]);
    else if (fn === OPS.restore) { const s = stack.pop(); if (s) { ctm = s[0]; lw = s[1]; } }
    else if (fn === OPS.transform) ctm = mul(ctm, a);
    else if (fn === OPS.setLineWidth) lw = a[0];
    else if (fn === OPS.constructPath) {
      const o = a[0], c = a[1]; let ci = 0; const subs = []; let sub = null;
      const pt = (x, y) => { const p = ap(ctm, x, y); return [p[0], H - p[1]]; };
      for (const op of o) {
        if (op === OPS.moveTo) { sub = { pts: [pt(c[ci], c[ci+1])], curve: false }; ci += 2; subs.push(sub); }
        else if (op === OPS.lineTo) { if (!sub) { sub = { pts: [], curve: false }; subs.push(sub); } sub.pts.push(pt(c[ci], c[ci+1])); ci += 2; }
        else if (op === OPS.curveTo) { if (sub) { sub.curve = true; sub.pts.push(pt(c[ci+4], c[ci+5])); } ci += 6; }
        else if (op === OPS.curveTo2 || op === OPS.curveTo3) { if (sub) { sub.curve = true; sub.pts.push(pt(c[ci+2], c[ci+3])); } ci += 4; }
        else if (op === OPS.rectangle) { const x = c[ci], y = c[ci+1], w = c[ci+2], h = c[ci+3]; ci += 4; sub = { pts: [pt(x, y), pt(x+w, y), pt(x+w, y+h), pt(x, y+h)], curve: false, rect: true }; subs.push(sub); }
      }
      cur = { subs, lw: lw * Math.hypot(ctm[0], ctm[1]) };
    } else if (fn === OPS.stroke || fn === OPS.closeStroke) {
      if (cur) { for (const s of cur.subs) { if (s.curve) curves.push({ pts: s.pts, lw: cur.lw }); else for (let i = 0; i + 1 < s.pts.length; i++) segs.push({ x0: s.pts[i][0], y0: s.pts[i][1], x1: s.pts[i+1][0], y1: s.pts[i+1][1], lw: cur.lw }); } cur = null; }
    } else if (fn === OPS.fill || fn === OPS.eoFill || fn === OPS.fillStroke || fn === OPS.closeFillStroke) {
      if (cur) { for (const s of cur.subs) { if (s.curve) curves.push({ pts: s.pts, lw: cur.lw, filled: true }); else if (s.pts.length >= 3) polys.push({ pts: s.pts, rect: !!s.rect }); } cur = null; }
    } else if (fn === OPS.endPath) cur = null;
  }
  return { H, W, text, segs, polys, curves };
}

// ---------------------------------------------------------------- 2. teoria
const LET = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
function stepToPitch(step) { const abs = 30 + step; return { letter: LET[((abs % 7) + 7) % 7], oct: Math.floor(abs / 7) }; }
const SHARP_ORDER = ['F', 'C', 'G', 'D', 'A', 'E', 'B'], FLAT_ORDER = ['B', 'E', 'A', 'D', 'G', 'C', 'F'];
// altura (em espaços acima da linha inferior) esperada de cada acidente da armadura (clave de sol)
const SHARP_REL = [4, 2.5, 4.5, 3, 1.5, 3.5, 2], FLAT_REL = [2, 3.5, 1.5, 3, 1, 2.5, 0.5];
const ACC_GLYPH = { '#': 1, 'b': -1, 'n': 0, '‹': 2 };    // ‹ = dobrado sustenido
const ACC_NAME = { '-2': 'bb', '-1': 'b', '0': '', '1': '#', '2': 'x' };
const REST_GLYPH = { 'Œ': 4, '‰': 2, '≈': 1 };  // Œ semínima · ‰ colcheia · ≈ semicolcheia
const FLAG_GLYPH = { 'j': 1, 'J': 1, 'r': 2, 'R': 2 };

function median(a) { const s = a.slice().sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; }

// ---------------------------------------------------------------- 3. leitura da partitura
function parseScore(pages, meta) {
  const warn = []; const bars = []; const systemsCount = [];
  let timeSig = null, keySig = 0, title = '', composer = '';
  const slotsOf = ts => ts ? ts[0] * 16 / ts[1] : 8;

  pages.forEach((pg, pi) => {
    // ---- pautas
    const hl = pg.segs.filter(s => Math.abs(s.y0 - s.y1) < 0.3 && Math.abs(s.x1 - s.x0) > 100 && s.lw < 1.5).map(s => ({ y: (s.y0 + s.y1) / 2, x0: Math.min(s.x0, s.x1), x1: Math.max(s.x0, s.x1) })).sort((a, b) => a.y - b.y);
    const staves = [];
    for (let i = 0; i + 4 < hl.length;) {
      const g = hl.slice(i, i + 5); const sp = (g[4].y - g[0].y) / 4; const gaps = [1, 2, 3, 4].map(k => g[k].y - g[k - 1].y);
      if (sp > 2 && sp < 14 && gaps.every(d => Math.abs(d - sp) < sp * 0.06)) { staves.push({ top: g[0].y, bot: g[4].y, sp, x0: Math.min(...g.map(l => l.x0)), x1: Math.max(...g.map(l => l.x1)), page: pi }); i += 5; }
      else i += 1;                                   // linha solta (colchete de casa, sublinhado…): ignora
    }
    if (!staves.length) warn.push(`Página ${pi + 1}: não achei pautas`);
    const maestro = pg.text.filter(t => t.maestro && t.s.charCodeAt(0) < 0xf000);
    const times = pg.text.filter(t => !t.maestro);
    const near = (y, margin) => { let best = null, bd = 1e9; staves.forEach(s => { const d = y < s.top ? s.top - y : (y > s.bot ? y - s.bot : 0); const dd = d + Math.abs(y - (s.top + s.bot) / 2) * 0.001; if (d <= margin * s.sp && dd < bd) { bd = dd; best = s; } }); return best; };

    // ---- título e compositor (só na 1ª página, acima da 1ª pauta)
    if (pi === 0 && staves.length) {
      const head = times.filter(t => t.y < staves[0].top - 8 * staves[0].sp);
      if (head.length) {
        const byY = {}; head.forEach(t => { const k = Math.round(t.y / 3) + '_' + Math.round(t.fs); (byY[k] = byY[k] || []).push(t); });
        const lines = Object.values(byY).map(l => l.sort((a, b) => a.x - b.x)).map(l => ({ s: l.map((t, i) => (i && t.x - (l[i-1].x + l[i-1].w) > t.fs * 0.2 ? ' ' : '') + t.s).join(''), fs: Math.max(...l.map(t => t.fs)), x: l[0].x, y: l[0].y }));
        const big = lines.slice().sort((a, b) => b.fs - a.fs)[0]; title = big.s.trim();
        composer = lines.filter(l => l !== big).map(l => l.s.trim()).filter(Boolean).join(' / ');
      }
    }

    staves.forEach((st, si) => {
      const sp = st.sp, relY = y => (st.bot - y) / sp;                       // altura em espaços
      const inBand = (y, up, dn) => y >= st.top - up * sp && y <= st.bot + dn * sp;
      const mine = t => near(t.y, 6) === st;
      const M = maestro.filter(mine), T = times.filter(t => near(t.y, 11) === st && t.y < st.top - 0.8 * sp || (near(t.y, 3) === st && t.y > st.bot));
      // ---- barras de compasso: traços verticais que cobrem exatamente a altura da pauta
      const vs = pg.segs.filter(s => Math.abs(s.x0 - s.x1) < 0.4 && Math.abs(Math.min(s.y0, s.y1) - st.top) < 0.7 && Math.abs(Math.max(s.y0, s.y1) - st.bot) < 0.7 && s.x0 >= st.x0 - 2 && s.x0 <= st.x1 + 2).map(s => ({ x: (s.x0 + s.x1) / 2, lw: s.lw })).sort((a, b) => a.x - b.x);
      const clusters = [];
      vs.forEach(v => { const c = clusters[clusters.length - 1]; if (c && v.x - c.xMax < 7) { c.xMax = v.x; c.parts.push(v); } else clusters.push({ xMin: v.x, xMax: v.x, parts: [v] }); });
      clusters.forEach(c => { c.thick = c.parts.some(p => p.lw > 1.6); c.n = c.parts.length; });
      // pontos de repetição (ficam a 1.5 e 2.5 espaços da linha inferior)
      const dots = M.filter(t => t.s === '.' && (Math.abs(relY(t.y) - 1.5) < 0.35 || Math.abs(relY(t.y) - 2.5) < 0.35));
      clusters.forEach(c => {
        c.dotsL = dots.filter(d => d.x < c.xMin && c.xMin - d.x < 2.6 * sp).length >= 2;
        c.dotsR = dots.filter(d => d.x > c.xMax && d.x - c.xMax < 2.6 * sp).length >= 2;
      });
      // ---- cabeçalho: clave, armadura, fórmula de compasso
      const clef = M.filter(t => t.s === '&').sort((a, b) => a.x - b.x)[0];
      if (M.some(t => t.s === '?' || t.s === 'B' && relY(t.y) > 2.5)) { /* clave diferente */ }
      const clefEnd = clef ? clef.x + clef.w : st.x0 + 1;               // sistemas sem clave (continuação) também existem
      let headerEnd = clefEnd;
      const accs = M.filter(t => t.s in ACC_GLYPH && t.x > clefEnd - 1).sort((a, b) => a.x - b.x);
      let sharps = [], flats = [];
      for (const a of accs) {
        const last = (sharps.length ? sharps : flats).length ? [...sharps, ...flats].slice(-1)[0] : null;
        if (last ? a.x - last.x > 1.6 * sp : a.x - clefEnd > 3 * sp) break;
        const n = sharps.length + flats.length, r = relY(a.y);
        if (a.s === '#' && !flats.length && Math.abs(r - SHARP_REL[n]) < 0.3) sharps.push(a);
        else if (a.s === 'b' && !sharps.length && Math.abs(r - FLAT_REL[n]) < 0.3) flats.push(a);
        else break;
      }
      const sysKey = sharps.length ? sharps.length : flats.length ? -flats.length : 0;
      if (sharps.length || flats.length) headerEnd = [...sharps, ...flats].slice(-1)[0].x + sp;
      const sysHeadKey = sysKey; let sysStartChange = (si === 0 && pi === 0) ? (keySig = sysKey, false) : sysKey !== keySig; keySig = sysKey;
      // fórmula de compasso: dois dígitos empilhados logo depois da armadura
      const digs = M.filter(t => /\d/.test(t.s) && t.x > headerEnd - 2 && t.x < headerEnd + 4 * sp && (Math.abs(relY(t.y) - 3) < 0.3 || Math.abs(relY(t.y) - 1) < 0.3)).sort((a, b) => a.x - b.x);
      if (digs.length >= 2 && !timeSig) {
        const top = digs.filter(d => Math.abs(relY(d.y) - 3) < 0.3).map(d => d.s).join(''), bot = digs.filter(d => Math.abs(relY(d.y) - 1) < 0.3).map(d => d.s).join('');
        if (top && bot) timeSig = [+top, +bot];
      }
      if (digs.length >= 2) headerEnd = Math.max(headerEnd, digs[digs.length - 1].x + digs[digs.length - 1].w);
      // ---- fronteiras de compasso
      const bnd = clusters.filter(c => c.xMax > headerEnd - 1);              // as que vêm depois do cabeçalho
      const startC = clusters.find(c => c.xMax <= headerEnd + 1 * sp);        // barra inicial do sistema
      const cl = [{ xMin: -1e9, xMax: headerEnd, start: true }, ...bnd];
      // ---- eventos (notas e pausas)
      const heads = M.filter(t => t.s === 'œ' || t.s === '˙').map(t => ({ ...t, open: t.s === '˙', kind: 'note' })).filter(t => t.x > headerEnd - 1);
      const rests = M.filter(t => t.s in REST_GLYPH && t.x > headerEnd - 1).map(t => ({ ...t, kind: 'rest', base: REST_GLYPH[t.s] }));
      const vseg = pg.segs.filter(s => Math.abs(s.x0 - s.x1) < 0.4 && Math.abs(s.y0 - s.y1) > 2.2 * sp && Math.abs(s.y0 - s.y1) < 8 * sp && inBand(Math.min(s.y0, s.y1), 7, 7) && inBand(Math.max(s.y0, s.y1), 7, 7)).map(s => ({ x: (s.x0 + s.x1) / 2, ya: s.y0, yb: s.y1, lw: s.lw }));
      const beams = pg.polys.map(p => { if (p.pts.length < 4) return null; const xs = p.pts.map(q => q[0]), ys = p.pts.map(q => q[1]); const xl = Math.min(...xs), xr = Math.max(...xs); if (xr - xl < 1.2 || !inBand(Math.min(...ys), 8, 8) || Math.max(...ys) - Math.min(...ys) > 14) return null; const L = p.pts.filter(q => q[0] < xl + 0.6), R = p.pts.filter(q => q[0] > xr - 0.6); if (!L.length || !R.length) return null; const yL = L.reduce((s, q) => s + q[1], 0) / L.length, yR = R.reduce((s, q) => s + q[1], 0) / R.length; const th = Math.max(...L.map(q => q[1])) - Math.min(...L.map(q => q[1])); if (th < 1 || th > 4.6) return null; return { xl, xr, yL, yR }; }).filter(Boolean).filter(b => inBand(b.yL, 8, 8));
      const flags = M.filter(t => t.s in FLAG_GLYPH);
      const dotsG = M.filter(t => t.s === '.');
      const events = [];
      for (const h of heads) {
        const w = h.w || 6.5;
        // haste: traço vertical colado na cabeça, uma ponta na altura da nota
        let stem = null, bd = 1e9;
        for (const v of vseg) { if (v.x < h.x - 0.8 || v.x > h.x + w + 0.8) continue; const near_ = Math.min(Math.abs(v.ya - h.y), Math.abs(v.yb - h.y)); if (near_ > 1.8) continue; const d = near_ + Math.abs(v.x - (h.x + w)) * 0.05; if (d < bd) { bd = d; stem = v; } }
        let nb = 0, nf = 0, up = null, tipY = null;
        if (stem) {
          const far = Math.abs(stem.ya - h.y) > Math.abs(stem.yb - h.y) ? stem.ya : stem.yb; tipY = far; up = far < h.y;
          const cx = stem.x;
          nb = beams.filter(b => cx >= b.xl - 0.9 && cx <= b.xr + 0.9).filter(b => { const yc = b.xr - b.xl > 0.01 ? b.yL + (b.yR - b.yL) * Math.min(1, Math.max(0, (cx - b.xl) / (b.xr - b.xl))) : b.yL; return up ? (yc >= tipY - 1.5 && yc <= tipY + 8) : (yc <= tipY + 1.5 && yc >= tipY - 8); }).length;
          if (!nb) { const f = flags.filter(g => g.x > cx - 2.5 && g.x < cx + 9 && Math.abs(g.y - tipY) < 11); nf = f.length ? FLAG_GLYPH[f[0].s] : 0; }
        }
        let base;
        if (h.open) base = stem ? 8 : 16;
        else if (!stem) base = 16;
        else { const n = nb || nf; base = n === 0 ? 4 : n === 1 ? 2 : n === 2 ? 1 : 0.5; }
        const dotted = dotsG.some(d => d.x > h.x + w - 0.5 && d.x < h.x + w + 3.2 * sp && Math.abs(d.y - h.y) < 0.8 * sp);
        const step = Math.round((st.bot - h.y) / (sp / 2));
        events.push({ kind: 'note', x: h.x, w, y: h.y, step, base, dotted, stem, nb, nf, up, open: h.open });
      }
      for (const r of rests) { const dotted = dotsG.some(d => d.x > r.x + (r.w || 5) - 0.5 && d.x < r.x + (r.w || 5) + 3.2 * sp && Math.abs(d.y - r.y) < 1.0 * sp); events.push({ kind: 'rest', x: r.x, w: r.w || 5, base: r.base, dotted }); }
      // pausas de pausa-de-compasso / mínima / semibreve desenhadas como retângulos
      pg.polys.filter(p => p.rect).forEach(p => { const xs = p.pts.map(q => q[0]), ys = p.pts.map(q => q[1]); const w = Math.max(...xs) - Math.min(...xs), h = Math.max(...ys) - Math.min(...ys); if (w > 0.9 * sp && w < 2 * sp && h > 0.25 * sp && h < 0.7 * sp && inBand(ys[0], 0, 0)) { const yc = (Math.min(...ys) + Math.max(...ys)) / 2, r = relY(yc); if (Math.abs(r - 2.25) < 0.45 && !events.some(e => Math.abs(e.x - Math.min(...xs)) < 3 && e.kind === 'rest')) events.push({ kind: 'rest', x: Math.min(...xs), w, base: 8, dotted: false, rect: true }); else if (Math.abs(r - 2.75) < 0.45) events.push({ kind: 'rest', x: Math.min(...xs), w, base: 16, dotted: false, rect: true }); } });
      events.sort((a, b) => a.x - b.x);
      // ---- tercinas: um "3" (texto) entre três eventos consecutivos
      const threes = times.filter(t => t.s === '3' && near(t.y, 6) === st && t.fs < 14 && !(t.y < st.top - 2.2 * sp && false));
      threes.forEach(t => { const cx = t.x + (t.w || 3) / 2; let best = null, bd = 1e9; for (let i = 0; i + 2 < events.length; i++) { const a = events[i], c = events[i + 2]; const mid = (a.x + c.x + c.w) / 2; const d = Math.abs(mid - cx); if (d < bd && cx > a.x - 3 && cx < c.x + c.w + 3) { bd = d; best = i; } } if (best !== null && bd < 3 * sp) { [0, 1, 2].forEach(k => events[best + k].trip = true); } });
      // ---- acidentes
      const keyChanges = {};                                   // índice do cl -> {key, used:Set}
      const firstEvX = k0 => { const a = cl[k0], b = cl[k0 + 1]; if (!b) return null; const x0 = a.start ? headerEnd - 1 : a.xMax; const ev = events.filter(e => e.x >= x0 - 0.5 && e.x < b.xMin); return ev.length ? ev[0].x : null; };
      for (let k0 = 0; k0 + 1 < cl.length; k0++) {
        const a = cl[k0]; if (a.start) continue; const fx = firstEvX(k0); if (fx === null) continue;
        const cand = M.filter(t => t.s in ACC_GLYPH && t.x > a.xMax && t.x < fx - 0.5).sort((p, q) => p.x - q.x); if (!cand.length) continue;
        const run = []; for (const t of cand) { const l = run[run.length - 1]; if (!run.length ? t.x - a.xMax < (a.dotsR ? 6 : 3.5) * sp : t.x - l.x < 1.9 * sp) run.push(t); else break; }
        if (!run.length || fx - (run[run.length - 1].x + (run[run.length - 1].w || 4)) < 1.2 * sp) continue;     // acidente colado na nota = acidente de nota
        const nat = run.every(t => t.s === 'n'); let kk = null;
        if (nat) kk = 0;
        else if (run.every((t, i) => t.s === '#' && Math.abs(relY(t.y) - SHARP_REL[i]) < 0.3)) kk = run.length;
        else if (run.every((t, i) => t.s === 'b' && Math.abs(relY(t.y) - FLAT_REL[i]) < 0.3)) kk = -run.length;
        if (kk !== null) keyChanges[k0] = { key: kk, used: run };
      }
      for (let k0 = 1; k0 < cl.length; k0++) {                 // armadura de aviso: desenhada logo ANTES da barra, vale para o compasso seguinte
        const c = cl[k0]; if (keyChanges[k0] || !cl[k0 + 1] && false) continue;
        const cand = M.filter(t => t.s in ACC_GLYPH && t.x < c.xMin && t.x > c.xMin - 5 * sp).sort((p, q) => p.x - q.x); if (!cand.length) continue;
        const prevEv = events.filter(e => e.x < c.xMin).slice(-1)[0]; if (prevEv && prevEv.x + prevEv.w + 0.5 * sp > cand[0].x) continue;
        const nat = cand.every(t => t.s === 'n'); let kk = null;
        if (nat) kk = 0; else if (cand.every((t, i) => t.s === '#' && Math.abs(relY(t.y) - SHARP_REL[i]) < 0.3)) kk = cand.length; else if (cand.every((t, i) => t.s === 'b' && Math.abs(relY(t.y) - FLAT_REL[i]) < 0.3)) kk = -cand.length;
        if (kk !== null && cl[k0 + 1]) keyChanges[k0] = { key: kk, used: cand };
      }
      const keyUsed = new Set(); Object.values(keyChanges).forEach(c => c.used.forEach(t => keyUsed.add(t)));
      const accG = M.filter(t => t.s in ACC_GLYPH && t.x > headerEnd - 1 && !keyUsed.has(t));
      const usedAcc = new Set();
      events.forEach(e => { if (e.kind !== 'note') return; let best = null, bd = 1e9; accG.forEach(a => { if (usedAcc.has(a)) return; const dx = e.x - (a.x + (a.w || 3)); if (dx < -0.5 || dx > 2.2 * sp) return; const dy = Math.abs(a.y - e.y); if (dy > 0.8 * sp) return; if (dx + dy < bd) { bd = dx + dy; best = a; } }); if (best) { usedAcc.add(best); e.acc = ACC_GLYPH[best.s]; } });
      // ---- fermata e ligaduras
      const fermatas = M.filter(t => t.s === 'U');
      fermatas.forEach(f => { const e = events.filter(e => e.kind === 'note' || e.kind === 'rest').sort((a, b) => Math.abs(a.x - f.x) - Math.abs(b.x - f.x))[0]; if (e && Math.abs(e.x - f.x) < 2.2 * sp) e.ferm = true; });
      const curvesHere = pg.curves.filter(c => { const ys = c.pts.map(q => q[1]); return inBand(Math.min(...ys), 3, 4) && inBand(Math.max(...ys), 3, 4); });
      const notesOnly = events.filter(e => e.kind === 'note');
      curvesHere.forEach(c => { const xs = c.pts.map(q => q[0]); const xa = Math.min(...xs), xb = Math.max(...xs); const a = notesOnly.filter(e => Math.abs(e.x + e.w / 2 - xa) < 1.8 * sp).sort((p, q) => Math.abs(p.x - xa) - Math.abs(q.x - xa))[0]; const b = notesOnly.filter(e => e.x > (a ? a.x : 0) + 1 && Math.abs(e.x + e.w / 2 - xb) < 2.2 * sp).sort((p, q) => Math.abs(p.x - xb) - Math.abs(q.x - xb))[0]; if (a && b && a.step === b.step) a.tie = true; else if (a && !b && xb > st.x1 - 25 && xa > st.x1 - 80) a.tie = true; });
      // ---- acordes
      const chordItems = []; const ct = pg.text.filter(t => { if (t.y > st.top - 0.5 * sp || t.y < st.top - 12 * sp) return false; const nb = staves.filter(q => q.top - t.y > -0.5 * q.sp).sort((a, b) => a.top - b.top)[0]; if (nb !== st) return false; return true; }).filter(t => !(t.maestro && t.s.charCodeAt(0) >= 0xf000));
      // a linha de acordes é a que está mais perto (y) — separa dos números de volta ("1.", "2.") e de textos como "Fine"
      const volta = [], marks = [];
      const chordCand = ct.filter(t => t.s !== '.');
      // raízes de acorde = letras A–G grandes (qualquer altura, pois o acorde sobe quando há colchete de casa); depois colamos o que vem grudado (m, 7, maj7, #, ø…)
      const capFs = Math.max(0, ...chordCand.filter(t => !t.maestro && /^[A-G]$/.test(t.s)).map(t => t.fs));
      const roots = chordCand.filter(t => !t.maestro && /^[A-G]$/.test(t.s) && t.fs >= capFs * 0.93).sort((a, b) => a.x - b.x);
      const small = chordCand.filter(t => !roots.includes(t) && t.s.trim() && (!t.maestro || '#bo\u00f8\u2039'.includes(t.s))).sort((a, b) => a.x - b.x);
      roots.forEach(r => {
        const items = [r]; let last = r;
        for (const t of small) { if (t.x < last.x + 0.5 || items.includes(t)) continue; const gap = t.x - (last.x + (last.w || 3)); if (gap > Math.max(2.4, last.fs * 0.22)) { if (t.x > last.x + 30) break; continue; } if (!(t.maestro ? Math.abs(t.y - r.y) < 12 : Math.abs(t.y - r.y) < 3.2)) continue; items.push(t); last = t; }
        chordItems.push({ items, x: r.x });
      });
      const chords = chordItems.map(c => ({ x: c.x + (c.items[0].w || 0) / 2, name: chordName(c.items) })).filter(c => c.name);
      // volta e marcas
      pg.text.filter(t => !t.maestro && /^[12]$/.test(t.s) && t.fs < 9.6 && t.y < st.top - 0.5 * sp && t.y > st.top - 4.2 * sp && near(t.y, 6) === st).forEach(t => { if (pg.text.some(d => d.s === '.' && !d.maestro && d.x > t.x && d.x - t.x < 6 && Math.abs(d.y - t.y) < 2)) volta.push({ n: +t.s, x: t.x }); });
      const wordsAbove = {}; times.filter(t => near(t.y, 11) === st).forEach(t => { if (t.s.length === 1 && !/^[\d.]$/.test(t.s)) return; });
      const sysText = [...times].filter(t => near(t.y, 8) === st && (t.y > st.bot || t.fs >= 8 && t.fs <= 16)).sort((a, b) => a.y - b.y || a.x - b.x);
      const lineStr = (y0, y1) => { const arr = times.filter(t => t.y >= y0 && t.y <= y1 && near(t.y, 9) === st).sort((a, b) => a.x - b.x); return arr.map((t, i) => (i && t.x - (arr[i-1].x + arr[i-1].w) > t.fs * 0.25 ? ' ' : '') + t.s).join(''); };
      const below = lineStr(st.bot + 0.8 * sp, st.bot + 9 * sp);
      const belowItems = times.filter(t => t.y > st.bot + 0.8 * sp && t.y < st.bot + 9 * sp && near(t.y, 9) === st);
      // ---- monta compassos
      let count = 0;
      for (let k = 0; k + 1 < cl.length; k++) {
        const a = cl[k], b = cl[k + 1];
        const x0 = a.start ? headerEnd - 1 : a.xMax, x1 = b.xMin;
        let evs = events.filter(e => e.x >= x0 - 0.5 && e.x < x1);
        if (!evs.length) { if (x1 - x0 < 3 * sp) continue; evs = [{ kind: 'rest', x: (x0 + x1) / 2, w: 5, base: slotsOf(timeSig), dotted: false, whole: true }]; }
        count++;
        const kc = keyChanges[k]; let _key; if (k === 0 && sysStartChange) { _key = sysHeadKey; }
        if (kc && kc.key !== keySig) { _key = kc.key; keySig = kc.key; }
        bars.push({ _keyEff: keySig, _key, _evs: evs, _x0: x0, _x1: x1, _st: st, _sp: sp, _chords: [], _volta: volta.filter(v => v.x >= x0 - 3 && v.x < x1), repeatStart: (!a.start && a.thick && a.dotsR) || (k > 0 ? false : !!(cl[1] && false)), _leftC: a, _rightC: b, _belowItems: belowItems.filter(t => t.x >= x0 - 8 && t.x <= x1 + 8), _page: pi });
      }
      // repeatStart logo depois do cabeçalho (barra grossa+pontos antes do 1º compasso)
      systemsCount.push(count);
      const firstBar = bars.length - count;
      chords.forEach(c => {                                    // cada acorde vai para a nota mais próxima na horizontal (assim um acorde escrito colado na barra cai no compasso certo)
        let best = null, bd = 1e9;
        for (let q = 0; q < count; q++) bars[firstBar + q]._evs.forEach(e => { const d = Math.abs(e.x - c.x); if (d < bd) { bd = d; best = bars[firstBar + q]; } });
        if (best) best._chords.push(c);
      });
      if (count && bnd.length) { const c0 = bnd[0]; const firstEv = events[0]; if (c0 && firstEv && c0.xMax < firstEv.x && c0.dotsR) bars[firstBar].repeatStart = true; }
      const barAt = x => { for (let q = 0; q < count; q++) { const bb = bars[firstBar + q]; if (x >= bb._x0 - 2 && x < bb._x1 + 1) return bb; } return null; };
      if (count) {
        const ownAbove = t => t.y < st.top && t.y > st.top - 12 * sp && staves.filter(q => q.top - t.y > -0.5 * q.sp).sort((a, b) => a.top - b.top)[0] === st;
        maestro.filter(t => t.s === '%' && ownAbove(t)).forEach(t => { let bb = null; for (let q = 0; q < count; q++) { const c = bars[firstBar + q]; if (c._x0 >= t.x - 8) { bb = c; break; } } if (!bb) bb = bars[firstBar + count - 1]; bb.segno = true; });
        maestro.filter(t => t.s === 'f' && ownAbove(t)).forEach(f => { if (!maestro.some(i => i.s === 'i' && Math.abs(i.y - f.y) < 1 && i.x > f.x && i.x - f.x < 9)) return; if (f.x < st.x0 + 25) bars[firstBar].coda = true; else { const bi2 = bars.indexOf(barAt(f.x + 4)); if (bi2 >= 0) { const nxt = bars[bi2 + 1] && bars[bi2 + 1]._page === pi ? bars[bi2 + 1] : bars[bi2]; nxt.tocoda = true; } } });
        const below = pg.text.filter(t => !t.maestro && t.y > st.bot + 0.8 * sp && t.y < st.bot + 10 * sp && near(t.y, 11) === st).sort((a, b) => a.x - b.x);
        for (let i = 0; i + 3 < below.length; i++) { if (below[i].s === 'D' && below[i + 1].s === '.' && below[i + 2].s === 'S' && below[i + 3].s === '.') { const bb = barAt(below[i].x) || bars[firstBar + count - 1]; bb.ds = true; } }
      }
      for (let q = 0; q < count; q++) { const bar = bars[firstBar + q]; const rc = bar._rightC; if (rc.dotsL) bar.repeatEnd = true; if (rc.thick && !rc.dotsL && !rc.dotsR && si === staves.length - 1 && pi === pages.length - 1 && q === count - 1) bar.final = true; const lc = bar._leftC; if (!lc.start && lc.thick && lc.dotsR) bar.repeatStart = true; }
    });
  });

  // ---------------------------------------------------------------- 4. durações, alturas, texto
  const slots = slotsOf(timeSig); const firstKey = bars.length ? bars[0]._keyEff : 0;
  const outBars = [];
  const meaningfulAcc = {};
  bars.forEach((b, bi) => {
    const evs = b._evs; const accState = {};
    let t = 0; const toks = [];
    const ev = [];
    const pv = bars[bi - 1] && bars[bi - 1]._evs[bars[bi - 1]._evs.length - 1]; let tieAcc = null;   // a nota ligada herda o acidente do compasso anterior, só ela
    if (pv && pv.tie && pv.name) { const m = /^([A-G])(bb|b|#|x)?(\d)$/.exec(pv.name); if (m) tieAcc = { key: m[1] + m[3], alt: { '': 0, '#': 1, b: -1, x: 2, bb: -2 }[m[2] || ''] }; }
    const calc = () => { let q = 0; evs.forEach(e => { let d = e.base * (e.dotted ? 1.5 : 1); if (e.trip) d = d * 2 / 3; q += d; }); return q; };
    if (Math.abs(calc() - slots) > 1e-6 && !(bi === 0 && calc() < slots)) {
      // tenta consertar: tira pontos suspeitos (staccato/ponto vizinho) até a soma bater
      const dd = evs.filter(e => e.dotted); let fixed = false;
      for (const e of dd) { e.dotted = false; if (Math.abs(calc() - slots) < 1e-6) { fixed = true; break; } e.dotted = true; }
      if (!fixed && dd.length > 1) { for (let i = 0; i < dd.length && !fixed; i++) for (let j = i + 1; j < dd.length; j++) { dd[i].dotted = dd[j].dotted = false; if (Math.abs(calc() - slots) < 1e-6) { fixed = true; break; } dd[i].dotted = dd[j].dotted = true; } }
    }
    if (calc() - slots > 1e-6) {                   // sobra tempo: provavelmente duas vozes. Fica a voz de baixo (a de notas mais curtas)
      const cands = evs.map((e, i) => ({ e, i })).filter(c => c.e.kind === 'note' && Math.abs(calc() - (c.e.base * (c.e.dotted ? 1.5 : 1) * (c.e.trip ? 2 / 3 : 1)) - slots) < 1e-6).sort((a, b) => b.e.base - a.e.base);
      if (cands.length) { evs.splice(cands[0].i, 1); warn.push(`Compasso ${bi + 1}: tem duas vozes; li só uma (a de notas mais curtas)`); }
    }
    evs.forEach(e => {
      let d = e.base * (e.dotted ? 1.5 : 1);
      if (e.trip) d = d * 2 / 3;
      e.d = d; e.t = t; t = Math.round((t + d) * 3) / 3;
      if (e.kind === 'note') {
        const p = stepToPitch(e.step); let alt;
        const key = p.letter + p.oct;
        if (e.acc !== undefined) { alt = e.acc; accState[key] = alt; }
        else if (tieAcc && evs.indexOf(e) === 0 && tieAcc.key === key) alt = tieAcc.alt;
        else if (key in accState) alt = accState[key];
        else { const kS = b._keyEff, ks = kS > 0 ? (SHARP_ORDER.slice(0, kS).includes(p.letter) ? 1 : 0) : kS < 0 ? (FLAT_ORDER.slice(0, -kS).includes(p.letter) ? -1 : 0) : 0; alt = ks; }
        e.name = p.letter + ACC_NAME[String(alt)] + p.oct;
      }
      ev.push(e);
    });
    // ligadura entre notas de mesmo nome já marcada em e.tie; confere se a próxima tem o mesmo nome
    const nb = outBars[outBars.length] = { chords: '', notes: '' };
    const parts = [];
    const tokOf = e => { let n, tr = false; if (e.trip) { n = Math.round(e.d * 3 / 2); tr = true; } else n = e.d; const nm = e.kind === 'rest' ? 'r' : e.name; return { nm, n, tr, flags: (e.tie ? '~' : '') + (e.ferm ? '^' : ''), key: nm + '|' + n + '|' + tr }; };
    const toks2 = ev.map(tokOf);
    for (let i = 0; i < toks2.length;) { let j = i; if (!toks2[i].flags) while (j + 1 < toks2.length && !toks2[j + 1].flags && toks2[j + 1].key === toks2[i].key) j++; const k = toks2[i]; const rep = j - i + 1; parts.push(k.nm + (k.n !== 1 || k.tr ? '/' + (Number.isInteger(k.n) ? k.n : +k.n.toFixed(2)) + (k.tr ? 't' : '') : '') + (rep > 1 ? '*' + rep : '') + k.flags); i = j + 1; }
    nb.notes = parts.join(' ');
    nb._sum = t; nb._ev = ev;
    // acordes: posição = início do evento mais próximo em x
    const beatSl = 16 / (timeSig ? timeSig[1] : 4);
    const cs = b._chords.map(c => { if (ev.length === 1 && ev[0].whole) return { name: c.name, at: Math.max(0, Math.min(slots - beatSl, Math.round(((c.x - b._x0) / Math.max(1, b._x1 - b._x0)) * slots / beatSl - 0.25) * beatSl)) }; let best = null, bd = 1e9; ev.forEach(e => { const d = Math.abs(e.x - c.x); if (d < bd) { bd = d; best = e; } }); return { name: c.name, at: best ? Math.round(best.t) : 0 }; });
    const dedup = []; cs.forEach(c => { const l = dedup[dedup.length - 1]; if (l && l.at === c.at) l.name = c.name; else dedup.push(c); });
    nb.chords = dedup.length === 1 && dedup[0].at === 0 ? dedup[0].name : dedup.map(c => c.name + '@' + c.at).join(' ');
    if (bi > 0 && b._keyEff !== bars[bi - 1]._keyEff) nb.key = b._keyEff;
    if (b.segno) nb.segno = true; if (b.coda) nb.coda = true; if (b.tocoda) nb.tocoda = true; if (b.ds) nb.ds = true;
    if (b.repeatStart) nb.repeatStart = true;
    if (b.repeatEnd) nb.repeatEnd = true;
    if (b.final) nb.final = true;
    nb._volta = b._volta; nb._below = b._belowItems; nb._x0 = b._x0; nb._x1 = b._x1; nb._page = b._page;
    if (Math.abs(t - slots) > 1e-6) { if (bi === 0 && t < slots) nb.pickup = true; else warn.push(`Compasso ${bi + 1}: as durações somam ${+t.toFixed(2)} em vez de ${slots}`); }
  });
  // casas 1/2
  outBars.forEach((nb, i) => { const v = nb._volta[0]; if (v) nb.volta = v.n; });
  // casa 1 que cobre vários compassos até o repeatEnd, e casa 2 até a próxima barra dupla: propaga
  for (let i = 0; i < outBars.length; i++) { if (outBars[i].volta === 1) { let j = i; while (j < outBars.length && !outBars[j].repeatEnd) { outBars[j].volta = 1; j++; } } }
  // fine / D.C.
  outBars.forEach((nb, i) => { const txt = nb._below.sort((a, b) => a.x - b.x).map(t => t.s).join(''); if (/Fine/i.test(txt.replace(/D\.?[CS]\.?\s*al\s*Fine/i, ''))) nb.fine = true; if (/D\.?C\.?/i.test(txt)) nb.dc = true;  });
  outBars.forEach(nb => { delete nb._ev; delete nb._volta; delete nb._below; delete nb._x0; delete nb._x1; delete nb._page; });
  const piece = { title: title || (meta && meta.title) || 'Peça importada', composer, level: 1, note: 'importada de PDF', source: meta && meta.source || '', timeSig: timeSig || [2, 4], bpm: 55, systems: systemsCount, bars: outBars.map(b => { const o = { chords: b.chords, notes: b.notes }; ['repeatStart', 'repeatEnd', 'volta', 'fine', 'dc', 'final', 'pickup', 'segno', 'tocoda', 'ds', 'coda'].forEach(k => { if (b[k]) o[k] = b[k]; }); if (b.key !== undefined) o.key = b.key; return o; }) };
  if (firstKey) piece.key = firstKey;
  if (!timeSig) warn.push('Não encontrei a fórmula de compasso; assumi 2/4');
  return { piece, warn };
}

// ---------------------------------------------------------------- 5. nome do acorde a partir dos símbolos
function chordName(items) {
  const arr = items.slice().sort((a, b) => a.x - b.x); let s = '';
  arr.forEach((t, i) => { let c = t.s; if (t.maestro) { if (c === '#') c = '#'; else if (c === 'b') c = 'b'; else if (c === 'o') c = 'o'; else if (c === 'ø') c = 'ø'; else if (c === '‹') c = 'x'; } s += c; });
  s = s.replace(/\s+/g, '').replace('°', 'o');
  return /^[A-G][#b]?(maj|min|dim|aug|sus|add|m|M|o|\u00f8|\+)?\d{0,2}(\([#b]?\d+\))?(sus\d|add\d|[#b]\d+)*$/.test(s) ? s : '';
}

// ---------------------------------------------------------------- 6. API
async function readPdf(pdfjs, data, meta) {
  const doc = await pdfjs.getDocument({ data: new Uint8Array(data) }).promise;
  const pages = [];
  for (let p = 1; p <= doc.numPages; p++) pages.push(await extractPage(pdfjs, await doc.getPage(p)));
  const maestroGlyphs = pages.reduce((s, pg) => s + pg.text.filter(t => t.maestro).length, 0);
  if (!maestroGlyphs) throw new Error('SEM_MAESTRO');
  return parseScore(pages, meta);
}
return { readPdf, extractPage, parseScore, chordName };
});
