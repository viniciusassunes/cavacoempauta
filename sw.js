// Cavaco em pauta — funciona offline depois da primeira abertura.
// Ao mudar qualquer arquivo do app, aumente o número da versão abaixo.
const VERSAO = 'cavaco-v7';
const ARQUIVOS = [
  './', './index.html', './leitor.js', './pieces.js', './leitor-pdf.js', './importar.js', './pdf.min.js', './pdf.worker.min.js', './Tone.js', './manifest.webmanifest',
  './samples_sync/D1.wav', './samples_sync/B2.wav', './samples_sync/G3.wav', './samples_sync/D4.wav',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'
];
// além dos arquivos fixos, guarda as gravações de cada nota (samples_sync/notas/notas.json), se existirem
async function guardarNotas(c) {
  try {
    const r = await fetch('./samples_sync/notas/notas.json'); if (!r.ok) return;
    const man = await r.clone().json(); await c.put('./samples_sync/notas/notas.json', r);
    await c.addAll(Object.values(man).map(f => './samples_sync/notas/' + f));
  } catch (e) {}
}
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSAO).then(async c => { await c.addAll(ARQUIVOS); await guardarNotas(c); }).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request)));
});
