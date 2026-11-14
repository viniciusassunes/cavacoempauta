/* pieces.js — dados das peças. Este é o formato que o conversor de PDF gera (extract3.py).
 *
 * notes:  "G4 G4 C5/4 r/2 F#4*3"
 *         altura (G4, Bb4, F#4) · /n duração em semicolcheias (1,2,3,4,6,8,12,16) · *n repete · r = pausa
 *         /2t = tercina de colcheia · ~ = ligada à próxima nota (mesma altura) · ^ = fermata
 *         o motor confere se cada compasso fecha a conta (soma das durações = tamanho do compasso)
 * chords: "C" ou "C@0 G7@4"  (@n = posição em semicolcheias dentro do compasso)
 * marcas por compasso: repeatStart, repeatEnd, volta (1 ou 2), fine, dc, final, pickup (anacruse: compasso incompleto no início)
 */
window.PIECES = [
  {
    title: "Palhetinha",
    composer: "Everaldo Pinheiro",
    level: 1,
    note: "completa, 34 compassos",
    source: "15 Palhetinha.pdf",
    timeSig: [2, 4],
    bpm: 40,
    systems: [4, 4, 4, 5, 4, 4, 4, 5],   // compassos por linha, como no PDF
    bars: [
      { chords: "C", notes: "G4*4 C5*4", repeatStart: true },  // 1
      { chords: "Dm", notes: "A4*4 D5*4" },  // 2
      { chords: "G7", notes: "B4*4 A4*4" },  // 3
      { chords: "C@0 G7@4", notes: "G4*4 A4*4" },  // 4
      { chords: "C@0 D7@4", notes: "G4*4 C5*4" },  // 5
      { chords: "G@0 G#o@4", notes: "B4*4 E5*4" },  // 6
      { chords: "Am@0 D7@4", notes: "D5*4 C5*4" },  // 7
      { chords: "G7", notes: "B4*4 A4*4" },  // 8
      { chords: "C", notes: "G4*4 C5*4" },  // 9
      { chords: "Dm", notes: "A4*4 D5*4" },  // 10
      { chords: "G7", notes: "B4*4 A4*4" },  // 11
      { chords: "C@0 C7@4", notes: "G4*4 Bb4*4" },  // 12
      { chords: "F@0 F#o@4", notes: "F4*4 A4*4" },  // 13
      { chords: "C@0 A7@4", notes: "E4*4 G4*4" },  // 14
      { chords: "Dm@0 G7@4", notes: "D4*4 F4*3 E4" },  // 15
      { chords: "C@0 G7@4", notes: "C4/4 r/4", repeatEnd: true, fine: true, volta: 1 },  // 16
      { chords: "C@0 E7@4", notes: "C4/4 r/4", volta: 2 },  // 17
      { chords: "Am@0 E7@4", notes: "E5*4 D5*4", repeatStart: true },  // 18
      { chords: "Am@0 E7@4", notes: "C5*4 B4*4" },  // 19
      { chords: "A7", notes: "A4*4 G4*4" },  // 20
      { chords: "Dm", notes: "F4*4 r/4" },  // 21
      { chords: "Dm", notes: "D5*4 C5*4" },  // 22
      { chords: "Bø", notes: "B4*4 A4*4" },  // 23
      { chords: "E7", notes: "G#4*4 F4*4" },  // 24
      { chords: "Am@0 E7@4", notes: "E4*4 r/4" },  // 25
      { chords: "Am@0 E7@4", notes: "E5*4 D5*4" },  // 26
      { chords: "Am@0 E7@4", notes: "C5*4 B4*4" },  // 27
      { chords: "A7", notes: "A4*4 G4*4" },  // 28
      { chords: "Dm", notes: "F4/4 F5*4" },  // 29
      { chords: "Dm@0 Bø@4", notes: "D5*4 E5*4" },  // 30
      { chords: "Am", notes: "C5*4 D5*4" },  // 31
      { chords: "B7@0 E7@4", notes: "B4*4 G#4*4" },  // 32
      { chords: "Am@0 E7@4", notes: "A4/4 r/4", repeatEnd: true, volta: 1 },  // 33
      { chords: "Am@0 G7@4", notes: "A4/4 r/4", dc: true, final: true, volta: 2 }   // 34
    ]
  },
  {
    title: "Peixe Vivo",
    composer: "Tradicional",
    level: 1,
    note: "completa, 18 compassos",
    source: "16 Peixe Vivo.pdf",
    timeSig: [2, 4],
    bpm: 55,
    systems: [5, 4, 4, 5],   // compassos por linha, como no PDF
    bars: [
      { chords: "", notes: "E4/2 G4/2", pickup: true },  // 1
      { chords: "G7", notes: "G4/2 F4/2*2 A4/2", repeatStart: true },  // 2
      { chords: "C", notes: "A4/2 G4/2 E4/2 G4/2" },  // 3
      { chords: "G7", notes: "G4/2 F4/2 D4/2 F4/2" },  // 4
      { chords: "C", notes: "F4/2 E4/2*2 G4/2" },  // 5
      { chords: "G7", notes: "G4/2 F4/2*2 A4/2" },  // 6
      { chords: "C", notes: "A4/2 G4/2 E4/2 G4/2" },  // 7
      { chords: "G7", notes: "G4/2 F4/2 D4/2 F4/2" },  // 8
      { chords: "C@0 C7@4", notes: "F4/2 E4/2 r/1 C4/2 C4" },  // 9
      { chords: "F", notes: "A4/3 B4 C5/3 B4" },  // 10
      { chords: "C", notes: "A4/2 G4/2 r/1 C4/2 C4" },  // 11
      { chords: "F", notes: "A4/3 B4 C5/3 B4" },  // 12
      { chords: "C", notes: "A4/2 G4/2 E4/2 G4/2", repeatEnd: true },  // 13
      { chords: "G7", notes: "G4/2 F4/2*2 A4/2" },  // 14
      { chords: "C", notes: "A4/2 G4/2 E4/2 G4/2" },  // 15
      { chords: "G7", notes: "G4/2 F4/2 D4/2 E4/2" },  // 16
      { chords: "C", notes: "C4/8~" },  // 17
      { chords: "C", notes: "C4/2 r/2 r/4", fine: true, final: true }   // 18
    ]
  },
  {
    title: "Gente Humilde",
    composer: "Garoto / Chico Buarque",
    level: 1,
    note: "completa, 18 compassos",
    source: "12 Gente Humilde.pdf",
    timeSig: [2, 4],
    bpm: 40,
    systems: [5, 4, 4, 5],   // compassos por linha, como no PDF
    bars: [
      { chords: "", notes: "r/4 r/1 E4*2 F4" },  // 1
      { chords: "C@0 Am@4", notes: "G4*4 A4*4", repeatStart: true },  // 2
      { chords: "Dm", notes: "C5/2 A4/2~ A4*4" },  // 3
      { chords: "G7", notes: "E5*6 D5*2" },  // 4
      { chords: "Cmaj7@0 G7@4", notes: "B4/4 r/1 G4*3" },  // 5
      { chords: "C@0 Am@4", notes: "D5*4 C5*2 A4*2" },  // 6
      { chords: "Dm", notes: "C5/2 A4/2~ A4*4" },  // 7
      { chords: "Dm@0 G7@4", notes: "C5*4 B4*2 G4*2" },  // 8
      { chords: "Cmaj7@0 G7@4", notes: "B4/4 r/1 E4*2 F4" },  // 9
      { chords: "C@0 Am@4", notes: "G4*4 A4*4" },  // 10
      { chords: "Dm", notes: "C5/2 A4/2~ A4*4" },  // 11
      { chords: "G7", notes: "E5*5 D5 C#5 D5" },  // 12
      { chords: "Gm@0 C7@4", notes: "G5/4 r/1 G5 A5 G5" },  // 13
      { chords: "F@0 Fm@4", notes: "C5*4 E5 D5 C5 Ab4" },  // 14
      { chords: "C@0 Am@4", notes: "G4/4 r/1 G4*3" },  // 15
      { chords: "Dm@0 G7@4", notes: "A4*4 E5*4" },  // 16
      { chords: "C", notes: "C5/4 r/1 E4*2 F4", repeatEnd: true, volta: 1 },  // 17
      { chords: "C", notes: "C5/4 r/4", fine: true, final: true, volta: 2 }   // 18
    ]
  },
  {
    title: "Luar do Sertão",
    composer: "Catulo da Paixão Cearense",
    level: 2,
    note: "completa, 18 compassos",
    source: "13 Luar do Sertão .pdf",
    timeSig: [2, 4],
    bpm: 40,
    systems: [5, 4, 4, 5],   // compassos por linha, como no PDF
    bars: [
      { chords: "", notes: "G4", pickup: true },  // 1
      { chords: "C", notes: "C5/3 D5 E5/3 D5", repeatStart: true },  // 2
      { chords: "Dm", notes: "F5/3 E5 D5/3 C5" },  // 3
      { chords: "G7", notes: "B4/3 A4 G4/3 F4" },  // 4
      { chords: "C", notes: "E4/4 r/3 G4" },  // 5
      { chords: "C", notes: "C5/3 D5 E5/3 D5" },  // 6
      { chords: "Dm", notes: "F5/3 E5 D5/3 C5" },  // 7
      { chords: "G7", notes: "B4/3 A4 G4/3 D5" },  // 8
      { chords: "C", notes: "C5/4 r/1 G4 A4 B4" },  // 9
      { chords: "C", notes: "C5*3 D5 E5*3 D5" },  // 10
      { chords: "Dm", notes: "F5*3 E5 D5*3 C5" },  // 11
      { chords: "G7", notes: "B4*3 A4 G4*3 F4" },  // 12
      { chords: "C", notes: "E4/4 r/1 G4 A4 B4" },  // 13
      { chords: "C", notes: "C5*3 D5 E5*3 D5" },  // 14
      { chords: "Dm", notes: "F5*3 E5 D5*3 C5" },  // 15
      { chords: "G7", notes: "B4*3 A4 G4*3 D5" },  // 16
      { chords: "C", notes: "C5/4 r/3 G4", repeatEnd: true, volta: 1 },  // 17
      { chords: "C", notes: "C5/4 r/4", fine: true, final: true, volta: 2 }   // 18
    ]
  },
  {
    title: "Trenzinho Caipira",
    composer: "Villa-Lobos",
    level: 2,
    note: "completa, 20 compassos",
    source: "18 Trenzinho Caipira.pdf",
    timeSig: [2, 4],
    bpm: 60,
    systems: [6, 6, 6, 2],   // compassos por linha, como no PDF
    bars: [
      { chords: "C", notes: "E5/2t*4 D5/2t C5/2t", repeatStart: true },  // 1
      { chords: "C", notes: "E5/8" },  // 2
      { chords: "C", notes: "G5/2t*4 F5/2t E5/2t" },  // 3
      { chords: "Dm", notes: "F5/8" },  // 4
      { chords: "Dm", notes: "F5/2t*4 E5/2t D5/2t" },  // 5
      { chords: "Dm", notes: "F5/8" },  // 6
      { chords: "G7", notes: "A5/2t*4 G5/2t F5/2t" },  // 7
      { chords: "C", notes: "G5/4 C5/4" },  // 8
      { chords: "Am", notes: "C6/2t*4 B5/2t A5/2t" },  // 9
      { chords: "Em", notes: "B5/4 E5/4" },  // 10
      { chords: "F", notes: "A5/2t*4 G5/2t F5/2t" },  // 11
      { chords: "C", notes: "G5/8" },  // 12
      { chords: "Dm", notes: "F5/2t*4 E5/2t D5/2t" },  // 13
      { chords: "Am", notes: "E5/2t*4 D5/2t C5/2t" },  // 14
      { chords: "Dm", notes: "D5/2t*4 C5/2t B4/2t" },  // 15
      { chords: "Am", notes: "A4/8" },  // 16
      { chords: "Dm", notes: "D5/2t*4 C5/2t B4/2t" },  // 17
      { chords: "Am", notes: "A4/8", repeatEnd: true },  // 18
      { chords: "Dm", notes: "D5/2t*4 C5/2t B4/2t" },  // 19
      { chords: "Am", notes: "A4/8^", fine: true, final: true }   // 20
    ]
  },
  {
    title: "Eu não existo sem você",
    composer: "Tom Jobim / Vinicius de Moraes",
    level: 2,
    note: "completa, 14 compassos",
    source: "9 Eu não existo sem você.pdf",
    timeSig: [2, 4],
    bpm: 55,
    systems: [5, 5, 4],   // compassos por linha, como no PDF
    bars: [
      { chords: "", notes: "r/4 r/3 G4" },  // 1
      { chords: "C@0 Am@4", notes: "G4 F4 E4 D4 E4 F4 G4 A4", repeatStart: true },  // 2
      { chords: "Dm@0 G7@4", notes: "F4 E4 D4 C4 D4/2 r/1 A4" },  // 3
      { chords: "Dm@0 G7@4", notes: "A4 G4 F4 E4 F4 G4 A4 C5" },  // 4
      { chords: "C", notes: "G4 F4 E4 F4 G4/2 r/1 C5" },  // 5
      { chords: "Am", notes: "C5 B4 A4 G4 A4 B4 C5 D5" },  // 6
      { chords: "Em", notes: "B4 A4 G4 A4 B4/2 r/1 A4" },  // 7
      { chords: "F", notes: "A4 G4 F4 E4 F4 G4 A4 C5" },  // 8
      { chords: "Em@0 A7@4", notes: "G4 F4 E4 F4 G4/2 r/1 F4" },  // 9
      { chords: "Dm@0 Dø@4", notes: "F4 E4 D4 E4 F4 E4 F4 G4" },  // 10
      { chords: "C@0 A7@4", notes: "E4 D4 C4 D4 E4/2 r/1 D4" },  // 11
      { chords: "D7@0 G7@4", notes: "D4 C4 B3 C4 D4 C#4 D4 E4" },  // 12
      { chords: "C@0 Dø@2 C@4", notes: "D4 C4*2 B3 C4/2 r/1 G4", repeatEnd: true, volta: 1 },  // 13
      { chords: "C@0 Dø@2 C@4", notes: "D4 C4*2 B3 C4/2 r/2", fine: true, final: true, volta: 2 }   // 14
    ]
  },
  {
    title: "Yesterday",
    composer: "Lennon / McCartney",
    level: 3,
    note: "completa, 24 compassos",
    source: "20 Yesterday .pdf",
    timeSig: [2, 4],
    key: -1,
    bpm: 55,
    systems: [4, 4, 4, 4, 4, 4],   // compassos por linha, como no PDF
    bars: [
      { chords: "F", notes: "G4 F4 F4/6", repeatStart: true },  // 1
      { chords: "Em@0 A7@4", notes: "r/2 A4 B4 C#5 D5 E5 F5" },  // 2
      { chords: "Dm", notes: "E5/2 D5 D5~ D5/4" },  // 3
      { chords: "Bb@0 C@4", notes: "r/2 D5*2 C5 Bb4 A4 G4" },  // 4
      { chords: "Bb@0 F@4", notes: "Bb4/2 A4 A4~ A4/3 G4" },  // 5
      { chords: "Dm@0 G7@4", notes: "F4/2 A4 G4~ G4/3 D4" },  // 6
      { chords: "Bb@0 F@4", notes: "F4/2 A4 A4~ A4/4", repeatEnd: true },  // 7
      { chords: "Em@0 A7@4", notes: "A4/4*2", repeatStart: true },  // 8
      { chords: "Dm@0 Bb@4", notes: "D5/2 E5/2 F5/2 E5 D5" },  // 9
      { chords: "Gm@0 C7@4", notes: "E5/3 D5 C5/2 D5 A4~" },  // 10
      { chords: "F", notes: "A4/8" },  // 11
      { chords: "Em@0 A7@4", notes: "A4/4*2" },  // 12
      { chords: "Dm@0 Bb@4", notes: "D5/2 E5/2 F5/2 E5 D5" },  // 13
      { chords: "Gm@0 C7@4", notes: "E5/3 D5 C5/2 E5/2" },  // 14
      { chords: "F", notes: "F5/2 C5/2 Bb4/2 A4/2" },  // 15
      { chords: "F", notes: "G4 F4 F4/6" },  // 16
      { chords: "Em@0 A7@4", notes: "r/2 A4 B4 C#5 D5 E5 F5" },  // 17
      { chords: "Dm", notes: "E5/2 D5 D5~ D5/4" },  // 18
      { chords: "Bb@0 C@4", notes: "r/2 D5*2 C5 Bb4 A4 G4" },  // 19
      { chords: "Bb@0 F@4", notes: "Bb4/2 A4 A4~ A4/3 G4" },  // 20
      { chords: "Dm@0 G7@4", notes: "F4/2 A4 G4~ G4/3 D4" },  // 21
      { chords: "Bb@0 F@4", notes: "F4/2 A4 A4~ A4/4", repeatEnd: true },  // 22
      { chords: "F@0 G@4", notes: "F4/2 A4/2 G4/2 D4/2" },  // 23
      { chords: "Bb@0 F@3", notes: "F4/2 A4 A4~ A4/4^", fine: true, final: true }   // 24
    ]
  },
  {
    title: "Valsinha",
    composer: "Chico Buarque",
    level: 3,
    note: "completa, 34 compassos, em 3/4",
    source: "19 Valsinha.pdf",
    timeSig: [3, 4],
    bpm: 55,
    systems: [4, 4, 4, 4, 4, 4, 5, 5],   // compassos por linha, como no PDF
    bars: [
      { chords: "", notes: "E4/2", pickup: true },  // 1
      { chords: "E7", notes: "F4/2 E4/2*2 G#4/2*2 B4/2", repeatStart: true },  // 2
      { chords: "E7", notes: "B4/2 D5/2*2 E5/2*2 E4/2" },  // 3
      { chords: "Am", notes: "F4/2 E4/2*2 A4/2*2 C5/2" },  // 4
      { chords: "Am", notes: "C5/8 r/2 E4/2" },  // 5
      { chords: "E7", notes: "F4/2 E4/2*2 G#4/2*2 B4/2" },  // 6
      { chords: "E7", notes: "B4/2 D5/2*2 E5/2*2 E4/2" },  // 7
      { chords: "Am", notes: "F4/2 E4/2*2 A4/2*2 C5/2" },  // 8
      { chords: "Am", notes: "C5/8 r/2 A4/2" },  // 9
      { chords: "A7", notes: "Bb4/2 A4/2*2 C#5/2*2 E5/2" },  // 10
      { chords: "A7", notes: "E5/2 G5/2*2 A5/2*2 A4/2" },  // 11
      { chords: "Dm", notes: "Bb4/2 A4/2*2 D5/2*2 F5/2" },  // 12
      { chords: "Dm", notes: "F5/8 r/2 B4/2" },  // 13
      { chords: "B7", notes: "C5/2 B4/2*2 D#5/2*2 F#5/2" },  // 14
      { chords: "B7", notes: "F#5/2 A5/2*2 B5/2*2 B4/2" },  // 15
      { chords: "E7", notes: "A4/2 G#4/2*2 B4/2*2 D5/2" },  // 16
      { chords: "E7", notes: "D5/2 F5/2 F5/6 E4/2", repeatEnd: true },  // 17
      { chords: "E7", notes: "F4/2 E4/2*2 G#4/2*2 B4/2" },  // 18
      { chords: "E7", notes: "B4/2 D5/2*2 E5/2*2 E4/2" },  // 19
      { chords: "Am", notes: "F4/2 E4/2*2 A4/2*2 C5/2" },  // 20
      { chords: "Am", notes: "C5/8 r/2 E4/2" },  // 21
      { chords: "E7", notes: "F4/2 E4/2*2 G#4/2*2 B4/2" },  // 22
      { chords: "E7", notes: "B4/2 D5/2*2 E5/2*2 E4/2" },  // 23
      { chords: "Am", notes: "F4/2 E4/2*2 A4/2*2 C5/2" },  // 24
      { chords: "Am", notes: "C5/8 r/2 A4/2" },  // 25
      { chords: "A7", notes: "Bb4/2 A4/2*2 C#5/2*2 E5/2" },  // 26
      { chords: "A7", notes: "E5/2 G5/2*2 A5/2*2 A4/2" },  // 27
      { chords: "Dm", notes: "G4/2 F4/2*2 A4/2*2 D5/2" },  // 28
      { chords: "Bø", notes: "D5/2 F5/2 F5/6 E4/2" },  // 29
      { chords: "Am", notes: "F4/2 E4/2*2 C5/2 C5/4~" },  // 30
      { chords: "Am", notes: "C5/8 r/2 E4/2" },  // 31
      { chords: "E7", notes: "F4/2 E4/2*2 B4/2 B4/4~" },  // 32
      { chords: "E7", notes: "B4/8 C5/4" },  // 33
      { chords: "Am", notes: "A4/12", fine: true, final: true }   // 34
    ]
  },
  {
    title: "Sampa",
    composer: "Caetano Veloso",
    level: 3,
    note: "completa, 31 compassos",
    source: "17 Sampa.pdf",
    timeSig: [2, 4],
    bpm: 55,
    systems: [4, 4, 4, 4, 4, 4, 4, 3],   // compassos por linha, como no PDF
    bars: [
      { chords: "C", notes: "r/1 E4*3 G4*3 E4~" },  // 1
      { chords: "E7", notes: "E4*3 G#4~ G#4 Fx4 G#4 E4~" },  // 2
      { chords: "Am", notes: "E4/4 r/4" },  // 3
      { chords: "Gm@0 C7@4", notes: "r/4 r/3 A4" },  // 4
      { chords: "F", notes: "A4 G#4 A4 C5~ C5*3 A4~" },  // 5
      { chords: "A7", notes: "A4 G#4 A4 C#5~ C#5*3 A4~" },  // 6
      { chords: "Dm", notes: "A4/4 r/4" },  // 7
      { chords: "Dm", notes: "r/4 r/1 A4/2 Ab4" },  // 8
      { chords: "G7", notes: "G4/2t F#4/2t G4/2t B4/2t A#4/2t B4/2t" },  // 9
      { chords: "E7", notes: "D5/3 F4 F4/2t G4/2t F4/2t" },  // 10
      { chords: "Am", notes: "E4/4 r/4" },  // 11
      { chords: "Am", notes: "r/4 r/3 E4" },  // 12
      { chords: "D7", notes: "D4*3 F#4*3 A4*2" },  // 13
      { chords: "D7", notes: "A4 C5*3 C5/2 A4/2" },  // 14
      { chords: "D7", notes: "D4*4 F#4*3 A4" },  // 15
      { chords: "D7", notes: "A4*2 C5*3 C5/2 A4~" },  // 16
      { chords: "Dm", notes: "A4/8" },  // 17
      { chords: "G7", notes: "r/4 r/3 G4" },  // 18
      { chords: "C", notes: "C5*8" },  // 19
      { chords: "C7", notes: "C5*3 C5~ C5/3 C5" },  // 20
      { chords: "F", notes: "C5*8" },  // 21
      { chords: "F#o", notes: "C5/8" },  // 22
      { chords: "C@0 A7@4", notes: "r/1 G4 F#4 G4 A4 G#4 A4 F#4~" },  // 23
      { chords: "Dm@0 G7@4", notes: "F#4 E4 F4 G4~ G4 F#4 G4 E4~" },  // 24
      { chords: "E7", notes: "E4/8" },  // 25
      { chords: "A7", notes: "r/4 r/3 E4" },  // 26
      { chords: "D7", notes: "E4*3 A4~ A4*3 Eb4~" },  // 27
      { chords: "Ab7@0 G7@4", notes: "Eb4*3 D4~ D4*3 C4~" },  // 28
      { chords: "C", notes: "C4/8" },  // 29
      { chords: "G7", notes: "r/8", repeatEnd: true, volta: 1 },  // 30
      { chords: "C", notes: "C4/8^", fine: true, final: true, volta: 2 }   // 31
    ]
  },
  {
    title: "Naquela Mesa",
    composer: "Sérgio Bittencourt",
    level: 4,
    note: "completa, 30 compassos",
    source: "14 Naquela Mesa.pdf",
    timeSig: [2, 4],
    key: -1,
    bpm: 55,
    systems: [4, 4, 4, 4, 4, 4, 3, 3],   // compassos por linha, como no PDF
    bars: [
      { chords: "", notes: "G5*3", pickup: true },  // 1
      { chords: "Gm", notes: "G5 F5 E5 G5 F5 E5/2 Bb5~" },  // 2
      { chords: "Dm", notes: "Bb5 A5 D5 E5 F5 G5/2 F5~" },  // 3
      { chords: "A7", notes: "F5 E5 C#5 D5 E5 F5/2 F#5~" },  // 4
      { chords: "D7", notes: "F#5/4 r/1 G5*3" },  // 5
      { chords: "Gm", notes: "G5 F5 E5 G5 F5 E5/2 Bb5~" },  // 6
      { chords: "Dm", notes: "Bb5 A5 D5 E5 F5 G5/2 F5~" },  // 7
      { chords: "A7", notes: "F5 E5 C#5 D5 E5 F5/2 D5~" },  // 8
      { chords: "Dm@0 A7@4", notes: "D5/4 r/1 F5 E5 D5" },  // 9
      { chords: "Dm", notes: "A4 F5 E5 F5 E5 D5/2 A4~", repeatStart: true },  // 10
      { chords: "Dm", notes: "A4 F5 E5 F5 E5 D5/2 A4~" },  // 11
      { chords: "Dm", notes: "A4 F5 E5 F5 E5 G4/2 Bb4~" },  // 12
      { chords: "Gm", notes: "Bb4/4 r/1 E5*3" },  // 13
      { chords: "Gm", notes: "E5 Bb4 E5 G5 F5 E5/2 Bb4~" },  // 14
      { chords: "Gm", notes: "Bb4 E5 F5 G5 F5 E5/2 Bb4~" },  // 15
      { chords: "Gm", notes: "Bb4 E5 F5 G5 F5 E5/2 A4~" },  // 16
      { chords: "Dm@0 A7@4", notes: "A4/4 r/1 F5 E5 D5" },  // 17
      { chords: "Dm", notes: "A4 F5 E5 F5 E5 D5/2 A4~" },  // 18
      { chords: "Dm", notes: "A4 F5 E5 F5 E5 D5/2 A4~" },  // 19
      { chords: "D7", notes: "A4 D5 C#5 D5 Eb5 D5/2 G5~" },  // 20
      { chords: "Gm", notes: "G5/4 r/1 G5*3" },  // 21
      { chords: "Gm", notes: "G5 F5 E5 G5 F5 E5/2 Bb5~" },  // 22
      { chords: "Dm", notes: "Bb5 A5 D5 E5 F5 G5/2 F5~" },  // 23
      { chords: "A7", notes: "F5 E5 C#5 D5 E5 F5/2 D5~" },  // 24
      { chords: "Dm@0 A7@4", notes: "D5/4 r/1 F5 E5 D5", repeatEnd: true, volta: 1 },  // 25
      { chords: "Dm", notes: "D5/4 r/1 G5*3", volta: 2 },  // 26
      { chords: "Gm", notes: "G5 F5 E5 G5 F5 E5/2 F5~" },  // 27
      { chords: "Dm", notes: "F5 E5 D5 E5 F5 D5/2 E5~" },  // 28
      { chords: "A7", notes: "E5 D5 C#5 D5 E5/3 F5" },  // 29
      { chords: "Dm", notes: "D5/8", fine: true, final: true }   // 30
    ]
  },
  {
    title: "As Rosas Não Falam",
    composer: "Cartola",
    level: 4,
    note: "completa, 48 compassos",
    source: "3 As Rosas Não Falam.pdf",
    timeSig: [2, 4],
    key: -1,
    bpm: 55,
    systems: [6, 6, 6, 6, 6, 6, 6, 6],   // compassos por linha, como no PDF
    bars: [
      { chords: "Dm", notes: "A4/2t D5/2t E5/2t F5/4~" },  // 1
      { chords: "Dm", notes: "F5/2t D5/2t E5/2t F5/2t E5/2t D5/2t" },  // 2
      { chords: "E7", notes: "B4/2t*3 E5/4~" },  // 3
      { chords: "Gm", notes: "E5/2t*2 F5/2t G5/2t F5/2t E5/2t" },  // 4
      { chords: "E7", notes: "E5/2t G#4/2t B4/2t E5/4~" },  // 5
      { chords: "A7", notes: "E5/4 F5/4" },  // 6
      { chords: "Dm", notes: "D5/8" },  // 7
      { chords: "A7", notes: "r/8" },  // 8
      { chords: "Dm", notes: "F5/2t D5/2t E5/2t F5/4~", repeatStart: true },  // 9
      { chords: "Dm", notes: "F5/2t D5/2t E5/2t F5/2t E5/2t D5/2t" },  // 10
      { chords: "Gm", notes: "D5/2t G4/2t Bb4/2t E5/4~" },  // 11
      { chords: "Gm", notes: "E5/2t*2 F5/2t G5/2t F5/2t E5/2t" },  // 12
      { chords: "E7", notes: "E5/2t G#4/2t B4/2t F5/4~" },  // 13
      { chords: "A7", notes: "F5/6 E5/2" },  // 14
      { chords: "Dm", notes: "A4/8" },  // 15
      { chords: "E7@0 A7@4", notes: "r/8" },  // 16
      { chords: "Dm", notes: "A5/2t F5/2t G5/2t A5/4~" },  // 17
      { chords: "Dm", notes: "A5/2t F5/2t G5/2t A5/2t G5/2t F5/2t" },  // 18
      { chords: "E7", notes: "G#5/2t E5/2t F#5/2t G#5/4~" },  // 19
      { chords: "E7", notes: "G#5/2t E5/2t F#5/2t G#5/2t F#5/2t E5/2t" },  // 20
      { chords: "Gm", notes: "G5/2t E5/2t F5/2t G5/4~" },  // 21
      { chords: "A7", notes: "G5/4~ G5/2t F5/2t E5/2t" },  // 22
      { chords: "Dm", notes: "A4/8" },  // 23
      { chords: "D7", notes: "r/8" },  // 24
      { chords: "Gm", notes: "D5/2t Bb4/2t C5/2t D5/4" },  // 25
      { chords: "Eø", notes: "r/2t Bb4/2t C5/2t D5/2t E5/2t F5/2t" },  // 26
      { chords: "Dm", notes: "F5/2t D5/2t E5/2t F5/4" },  // 27
      { chords: "Dm", notes: "r/2t D5/2t E5/2t F5/2t G5/2t A5/2t" },  // 28
      { chords: "E7", notes: "G#5/2t E5/2t F#5/2t G#5/4" },  // 29
      { chords: "E7", notes: "r/2t E5/2t F#5/2t G#5/2t F#5/2t E5/2t" },  // 30
      { chords: "A7", notes: "G5/2t E5/2t F5/2t G5/4" },  // 31
      { chords: "A7", notes: "A5/8" },  // 32
      { chords: "Dm", notes: "A4/2t D5/2t E5/2t F5/4~" },  // 33
      { chords: "Dm", notes: "F5/2t D5/2t E5/2t F5/2t E5/2t D5/2t" },  // 34
      { chords: "Gm", notes: "D5/2t G4/2t Bb4/2t E5/4" },  // 35
      { chords: "Gm", notes: "r/2t E5/2t F5/2t G5/2t F5/2t E5/2t" },  // 36
      { chords: "E7", notes: "E5/2t G#4/2t B4/2t F5/4~" },  // 37
      { chords: "A7", notes: "F5/4 r/2 E5/2" },  // 38
      { chords: "Dm", notes: "D5/8" },  // 39
      { chords: "A7", notes: "r/8", repeatEnd: true },  // 40
      { chords: "Dm", notes: "A4/2t D5/2t E5/2t F5/4~" },  // 41
      { chords: "Dm", notes: "F5/2t D5/2t E5/2t F5/2t E5/2t D5/2t" },  // 42
      { chords: "Gm", notes: "D5/2t G4/2t Bb4/2t E5/4" },  // 43
      { chords: "Gm", notes: "r/2t E5/2t F5/2t G5/2t F5/2t E5/2t" },  // 44
      { chords: "E7", notes: "E5/2t G#4/2t B4/2t F5/4~" },  // 45
      { chords: "A7", notes: "F5/4 r/2 E5/2" },  // 46
      { chords: "Dm", notes: "D4 C#4 E4 D4 F4 E4 G4 F4" },  // 47
      { chords: "Dm", notes: "A4 G4 Bb4 A4 E5/4", fine: true, final: true }   // 48
    ]
  },
  {
    title: "Carolina",
    composer: "Chico Buarque",
    level: 5,
    note: "completa, 53 compassos, com D.S. al Coda",
    source: "4 Carolina.pdf",
    timeSig: [2, 4],
    key: 2,
    bpm: 55,
    systems: [4, 4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4],   // compassos por linha, como no PDF
    bars: [
      { chords: "", notes: "r/4 r/1 A4/2 E#4" },  // 1
      { chords: "Dmaj7", notes: "F#4/8", repeatStart: true, segno: true },  // 2
      { chords: "Dmaj7", notes: "r/1 D4/2 E4 F#4 A4/2 F#5~" },  // 3
      { chords: "C#ø", notes: "F#5/8" },  // 4
      { chords: "F#7", notes: "r/4 r/1 F#5/2 E5" },  // 5
      { chords: "Bm7", notes: "C#5/2 E5 D5~ D5/3 F#4" },  // 6
      { chords: "F#m7@0 B7@4", notes: "A4/2 C#5 B4~ B4 F#4/2 A4" },  // 7
      { chords: "Em7", notes: "G4/8" },  // 8
      { chords: "Em7", notes: "r/4 r/3 B4" },  // 9
      { chords: "A7", notes: "B4 A4 G#4 A4~ A4/3 B4" },  // 10
      { chords: "A7", notes: "B4 A4 G#4 A4~ A4/3 B4" },  // 11
      { chords: "Dmaj7", notes: "B4 A4 F#4 A4~ A4/3 B4" },  // 12
      { chords: "Bm7", notes: "B4 A4 F#4 A4~ A4/3 C#5" },  // 13
      { chords: "E7", notes: "C#5 B4 A#4 B4~ B4/3 C#5" },  // 14
      { chords: "E7", notes: "C#5 B4 A#4 B4~ B4/3 F#5" },  // 15
      { chords: "Em7", notes: "F#5 E5 D#5 E5~ E5/3 F#5" },  // 16
      { chords: "A7", notes: "F#5 E5 D#5 E5~ E5/3 G5" },  // 17
      { chords: "Dmaj7", notes: "G5/3 F#5 A4/4" },  // 18
      { chords: "Dmaj7", notes: "r/1 D5/2 E5 F#5 E5 D5 F#5~" },  // 19
      { chords: "C#ø", notes: "F#5/8" },  // 20
      { chords: "F#7", notes: "r/1 D5/2 E5 F#5 E5 D5 F#5~" },  // 21
      { chords: "Bm7", notes: "F#5/8" },  // 22
      { chords: "Bm7", notes: "r/2t D5/2t*4 C#5/2t", tocoda: true },  // 23
      { chords: "Am7", notes: "C5/8~" },  // 24
      { chords: "B7", notes: "C5/4 r/1 A5/2 G5~" },  // 25
      { chords: "Em7", notes: "G5/4 r/2t B4/2t D5/2t" },  // 26
      { chords: "Gm6", notes: "A5/4~ A5 G5/2 F#5~" },  // 27
      { chords: "Dmaj7", notes: "F#5/8" },  // 28
      { chords: "Bm7", notes: "r/1 A4 F#4 A4 D5 A4 D5 F#5~" },  // 29
      { chords: "E7", notes: "F#5 E5/3 r/4" },  // 30
      { chords: "E7", notes: "F#5/2t E5/2t D5/2t B4/2t C#5/2t D5/2t" },  // 31
      { chords: "Em7", notes: "E5/8" },  // 32
      { chords: "A7(#5)", notes: "r/4 r/1 A4/2 E#4", repeatEnd: true, ds: true },  // 33
      { chords: "Bm7", notes: "r/1 D5/2 E5 F#5 E5 D5 A5~", coda: true },  // 34
      { chords: "F#ø", notes: "A5/8~" },  // 35
      { chords: "B7", notes: "A5/4 r/1 A5/2 G5~" },  // 36
      { chords: "Em7", notes: "G5/4 r/2t B4/2t D5/2t" },  // 37
      { chords: "Gm6", notes: "A5/4~ A5 G5/2 F#5~" },  // 38
      { chords: "Dmaj7", notes: "F#5/8" },  // 39
      { chords: "Bm7", notes: "r/1 A4 F#4 A4 D5 A4 D5 F#5~" },  // 40
      { chords: "E7", notes: "F#5 E5/3 r/4" },  // 41
      { chords: "A7", notes: "F#5/2t E5/2t D5/2t C#5/2t D5/2t E5/2t" },  // 42
      { chords: "F#7", notes: "F#5/8~" },  // 43
      { chords: "B7", notes: "F#5/4 r/1 A5/2 G5~" },  // 44
      { chords: "Em7", notes: "G5/4 r/2t B4/2t D5/2t" },  // 45
      { chords: "Gm6", notes: "A5/4~ A5 G5/2 F#5~" },  // 46
      { chords: "Dmaj7", notes: "F#5/8" },  // 47
      { chords: "Bm7", notes: "r/1 A4 F#4 A4 D5 A4 D5 F#5~" },  // 48
      { chords: "E7", notes: "F#5 E5/3 r/4" },  // 49
      { chords: "A7", notes: "F#5/2t E5/2t D5/2t C#5/2t D5/2t E5/2t" },  // 50
      { chords: "G#ø", notes: "D5/8~" },  // 51
      { chords: "Gm6", notes: "D5/8~" },  // 52
      { chords: "D", notes: "D5/8^", fine: true, final: true }   // 53
    ]
  },
  {
    title: "Curare",
    composer: "Bororó",
    level: 5,
    note: "completa, 37 compassos",
    source: "6 Curare .pdf",
    timeSig: [2, 4],
    key: 2,
    bpm: 55,
    systems: [4, 4, 4, 4, 4, 4, 4, 4, 3, 2],   // compassos por linha, como no PDF
    bars: [
      { chords: "E7@0 A7@4", notes: "r/1 E5/2 E5*2 G5 F#5 E5~", repeatStart: true },  // 1
      { chords: "D@0 Fo@4", notes: "E5 D5/2 E5 D5 C#5 B4 D5~" },  // 2
      { chords: "Em@0 A7@4", notes: "D5 G4/2 D5 C#5 B4 A4 C#5~" },  // 3
      { chords: "D", notes: "C#5/4 r/4" },  // 4
      { chords: "E7@0 A7@4", notes: "r/1 E5/2 E5*2 G5 F#5 E5~" },  // 5
      { chords: "D@0 Fo@4", notes: "E5 D5/2 D5*2 C#5 B4 C#5~" },  // 6
      { chords: "A@0 E7@4", notes: "C#5 E5/2 F#5 C#5/2 B4/2" },  // 7
      { chords: "A7", notes: "E5/8" },  // 8
      { chords: "E7@0 A7@4", notes: "r/1 E5/2 E5*2 G5 F#5 E5~" },  // 9
      { chords: "D@0 Fo@4", notes: "E5 D5/2 E5 D5 C#5 B4 D5~" },  // 10
      { chords: "Em@0 A7@4", notes: "D5 G4/2 D5 C#5 B4 A4 C#5~" },  // 11
      { chords: "D", notes: "C#5/3 F#4~ F#4/4" },  // 12
      { chords: "B7", notes: "r/1 F#4/2 G4 A4 G4 F#4 B4~" },  // 13
      { chords: "Em", notes: "B4/8" },  // 14
      { chords: "A7", notes: "r/1 A4/2 B4 C#5 D5 E5 F#5~" },  // 15
      { chords: "D@0 B7@4", notes: "F#5/4~ F#5 F#5/2 B5" },  // 16
      { chords: "E7@0 A7@4", notes: "F#5/3 E5~ E5 E5/2 A5" },  // 17
      { chords: "D7@0 G7@4", notes: "E5/3 D5~ D5 D5/2 G5" },  // 18
      { chords: "C#7@0 F#7@4", notes: "D5 C#5/2 B4 A#4/2 C#5/2" },  // 19
      { chords: "Bm", notes: "B4/4 r/4" },  // 20
      { chords: "Em@0 A7@4", notes: "r/1 C#5 B4 C#5 B4 C#5 B4 C#5" },  // 21
      { chords: "D", notes: "B4 D5 B4 D5 B4/4" },  // 22
      { chords: "Em@0 A7@4", notes: "r/1 C#5 B4 C#5 B4/4" },  // 23
      { chords: "D", notes: "r/1 C#5 B4 C#5 B4/4" },  // 24
      { chords: "Em@0 A7@4", notes: "r/1 C#5 B4 C#5 B4 C#5 B4 C#5" },  // 25
      { chords: "D", notes: "B4 D5 B4 D5 B4/3 D5" },  // 26
      { chords: "F#@0 C#7@4", notes: "C#5 A#4/2 C#5 B4 G#4 A#4 B4" },  // 27
      { chords: "F#7", notes: "C#5/4 r/4" },  // 28
      { chords: "Em@0 A7@4", notes: "r/1 C#5 B4 C#5 B4 C#5 B4 C#5" },  // 29
      { chords: "D", notes: "B4 D5 B4 D5 B4/4" },  // 30
      { chords: "Em@0 A7@4", notes: "r/1 A4/2 B4 C#5 D5 E5 F#5~" },  // 31
      { chords: "D@0 B7@4", notes: "F#5/4 r/1 F#5/2 B5" },  // 32
      { chords: "E7@0 A7@4", notes: "F#5/3 E5~ E5 E5/2 A5" },  // 33
      { chords: "D7@0 G#o@4", notes: "E5/3 D5~ D5 C#5/2 B4" },  // 34
      { chords: "D@0 A7@4", notes: "D5 F#5/2 B5 A5 E5/2 F#5" },  // 35
      { chords: "D", notes: "D5/8", repeatEnd: true, volta: 1 },  // 36
      { chords: "D", notes: "D5 A4/2 F#4 D4/2 r/2", fine: true, final: true, volta: 2 }   // 37
    ]
  },
  {
    title: "Flor Amorosa",
    composer: "Joaquim Antonio da Silva Callado / Catulo da Paixão Cearense",
    level: 5,
    note: "completa, 53 compassos, com D.S. al Coda",
    source: "10 Flor Amorosa .pdf",
    timeSig: [2, 4],
    bpm: 55,
    systems: [5, 4, 5, 4, 4, 4, 4, 4, 4, 5, 4, 5, 1],   // compassos por linha, como no PDF
    bars: [
      { chords: "", notes: "B4 A4 Ab4", pickup: true },  // 1
      { chords: "G7", notes: "G4 B4 A4 Ab4 G4 B4 A4 Ab4", repeatStart: true, segno: true },  // 2
      { chords: "C", notes: "G4 E5/2 G4~ G4/4" },  // 3
      { chords: "G7", notes: "r/1 F5/2 G4~ G4/4" },  // 4
      { chords: "C@0 C7@4", notes: "G5/4 r/1 G5*3" },  // 5
      { chords: "F@0 Fm@4", notes: "G5/3 F5~ F5*4" },  // 6
      { chords: "C@0 A7@4", notes: "F5/3 E5~ E5*4" },  // 7
      { chords: "Dm@0 G7@4", notes: "E5/3 D5 C#5 D5 A4 B4" },  // 8
      { chords: "C", notes: "D5 C5 B4 A4 G4 B4 A4 Ab4" },  // 9
      { chords: "G7", notes: "G4 B4 A4 Ab4 G4 B4 A4 Ab4" },  // 10
      { chords: "C", notes: "G4 E5/2 G4~ G4/4" },  // 11
      { chords: "G7", notes: "r/1 F5/2 G4~ G4/4" },  // 12
      { chords: "C@0 C7@4", notes: "G5/4 r/1 G5*3" },  // 13
      { chords: "F@0 Fm@4", notes: "G5/3 F5~ F5*4" },  // 14
      { chords: "C@0 A7@4", notes: "F5/3 E5~ E5*4" },  // 15
      { chords: "Dm@0 G7@4", notes: "E5 D5 G#4 A4 C5 B4 A4 G4" },  // 16
      { chords: "C", notes: "C5/4 r/1 B4 A4 Ab4", repeatEnd: true, tocoda: true, volta: 1 },  // 17
      { chords: "C", notes: "C5/4~ C5 E5 Eb5 D5", volta: 2 },  // 18
      { chords: "Am", notes: "C5*2 B4 Bb4 A4*2 Ab4 G4" },  // 19
      { chords: "Dm", notes: "F4/4~ F4 D4 E4 F4" },  // 20
      { chords: "E7", notes: "F4/3 E4 r/1 E4 C5 G#4" },  // 21
      { chords: "Am@0 E7@4", notes: "B4/3 A4 r/1 E5 Eb5 D5" },  // 22
      { chords: "Am", notes: "C5*2 B4 Bb4 A4*2 Ab4 G4" },  // 23
      { chords: "Dm", notes: "F4/4~ F4 D4 E4 F4" },  // 24
      { chords: "Am@0 E7@4", notes: "F4 E4 D#4 E4 C5/2 B4/2" },  // 25
      { chords: "Am@0 E7@4", notes: "A4/4 r/1 E5 Eb5 D5" },  // 26
      { chords: "Am", notes: "C5*2 B4 Bb4 A4*2 Ab4 G4" },  // 27
      { chords: "Dm", notes: "F4/4~ F4 D4 E4 F4" },  // 28
      { chords: "E7", notes: "F4/3 E4 r/1 E4 C5 G#4" },  // 29
      { chords: "Am@0 E7@4", notes: "B4/3 A4 r/1 E5 Eb5 D5" },  // 30
      { chords: "Am", notes: "C5*2 B4 Bb4 A4*2 Ab4 G4" },  // 31
      { chords: "Dm", notes: "F4/4~ F4 D4 E4 F4" },  // 32
      { chords: "Am@0 E7@4", notes: "F4 E4 D#4 E4 C5/2 B4/2" },  // 33
      { chords: "Am", notes: "A4/4 r/1 B4 A4 Ab4", ds: true },  // 34
      { chords: "C@0 C7@4", notes: "C5 A4 G4 E4 C4/4", coda: true },  // 35
      { chords: "F", notes: "A4/3 C5 Bb4 A4 G4 F4", repeatStart: true, key: -1 },  // 36
      { chords: "C7", notes: "E4 D5/2 C5~ C5/4" },  // 37
      { chords: "C7", notes: "D5 C5 E4/2 D5 C5 E4/2" },  // 38
      { chords: "F", notes: "D5 C5 A4 F4 C4/4" },  // 39
      { chords: "F@0 E7@4", notes: "A4 G#4 A4 C5 Bb4 A4 G4 F4" },  // 40
      { chords: "Am", notes: "E4 F5/2 E5~ E5/4" },  // 41
      { chords: "E7", notes: "F5 E5 G#4/2 F5 E5 G#4/2" },  // 42
      { chords: "Am@0 C7@4", notes: "A4 Bb4 B4 C5 E5 D5 C5 Bb4" },  // 43
      { chords: "F", notes: "A4 G#4 A4 C5 Bb4 A4 G4 F4" },  // 44
      { chords: "C7", notes: "E4 D5/2 C5~ C5/4" },  // 45
      { chords: "C7", notes: "D5 C5 E4/2 D5 C5 E4/2" },  // 46
      { chords: "F", notes: "D5 C5 A4 F4 C4/4" },  // 47
      { chords: "F@0 F7@4", notes: "A4/3 C5 Bb4 A4 G4 F4" },  // 48
      { chords: "Bb@0 Bdim@4", notes: "F5/4~ F5 F4 G4 G#4" },  // 49
      { chords: "F@0 C7@4", notes: "A4 D5 C5 B4 Bb4 E4 A4 G4" },  // 50
      { chords: "F", notes: "F4/4 r/4", repeatEnd: true, volta: 1 },  // 51
      { chords: "F", notes: "F4/4 r/1 B4 A4 Ab4", ds: true, volta: 2 },  // 52
      { chords: "C", notes: "C5 A4 G4 E4 C4/2 r/2", fine: true, final: true, coda: true, key: 0 }   // 53
    ]
  }
];
