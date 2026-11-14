/* leitor.js — Cavaco em pauta, motor v2
 * Este arquivo só sabe ler dados (pieces.js), desenhar a pauta e tocar.
 * Glifos de clave, acidentes, pausas e bandeirolas: fonte Bravura (SIL OFL 1.1, Steinberg).
 */
(() => {
'use strict';

const GLYPH = {"gClef":{"w":26.8,"d":"M15 -16.6C15 -17.1 15 -17.1 15.3 -17.4C15.9 -18 16.8 -18.8 17.5 -19.6C20.9 -23.3 22.9 -28.1 22.9 -32.6C22.9 -36.1 21.9 -39.5 20.3 -41.9C19.7 -42.8 18.6 -43.9 18.2 -43.9C17.6 -43.9 16.4 -42.9 15.6 -42C12.6 -38.7 11.7 -33.7 11.7 -29.6C11.7 -27.2 12 -24.6 12.2 -23C12.3 -22.5 12.4 -22.4 11.9 -22C9.3 -19.9 6.6 -17.5 4.5 -14.9C1.7 -11.5 0 -7.8 0 -3.5C0 3.5 4.8 10.1 14.6 10.1C15.5 10.1 16.5 10 17.3 9.8C17.8 9.8 17.8 9.7 17.9 10.2C18.4 12.9 19 16.4 19 18.2C19 24.2 15 24.9 12.6 24.9C10.5 24.9 9.4 24.2 9.4 23.7C9.4 23.4 9.8 23.3 10.7 23C12 22.7 13.4 21.6 13.4 19.3C13.4 17.1 12 15.2 9.6 15.2C6.9 15.2 5.3 17.3 5.3 19.8C5.3 22.4 6.8 26.3 12.9 26.3C15.6 26.3 20.8 25.1 20.8 18.3C20.8 16 20 12.2 19.6 9.8C19.5 9.3 19.6 9.3 20.1 9.1C24.2 7.5 26.8 4.1 26.8 -0.4C26.8 -5.6 23.1 -10.1 17.2 -10.1C16.2 -10.1 16.2 -10.1 16 -10.8ZM18.8 -37.7C20.1 -37.7 21.2 -36.6 21.2 -34.4C21.2 -31.7 19.9 -29.1 16.8 -26C16.1 -25.4 15.2 -24.4 14.2 -23.6C14 -23.4 13.8 -23.4 13.7 -24C13.6 -25 13.5 -26.4 13.5 -27.6C13.5 -33.9 16.4 -37.7 18.8 -37.7ZM14.4 -10.5C14.6 -9.7 14.6 -9.8 13.8 -9.5C10.3 -8.3 8 -5.2 8 -1.8C8 1.8 9.9 4.4 12.6 5.3C13 5.4 13.4 5.6 13.7 5.6C14 5.6 14.2 5.4 14.2 5.1C14.2 4.8 13.9 4.7 13.6 4.6C11.9 3.9 10.7 2.2 10.7 0.3C10.7 -2 12.3 -3.7 14.7 -4.4C15.4 -4.5 15.4 -4.5 15.5 -4L17.5 7.9C17.6 8.3 17.6 8.3 17 8.4C16.3 8.6 15.5 8.6 14.7 8.6C7.7 8.6 3.2 4.8 3.2 -0.8C3.2 -3.2 3.6 -6.3 6.9 -10.1C9.3 -12.8 11.2 -14.2 13 -15.8C13.4 -16.1 13.5 -16 13.6 -15.6ZM17.2 -4.1C17.1 -4.6 17.2 -4.7 17.6 -4.7C20.9 -4.4 23.6 -1.7 23.6 1.8C23.6 4.4 22 6.4 19.8 7.5C19.3 7.8 19.2 7.8 19.2 7.3Z"},"flat":{"w":9.0,"d":"M0.5 6.8C0.6 7 0.7 7 0.8 7C1 7 1.1 6.9 1.1 6.9C2.3 6.2 3.2 5.2 4.2 4.5C7.8 2 9 -0.4 9 -2.3C9 -4.6 7.3 -6 5.4 -6.1C5.2 -6.1 4.9 -6.1 4.6 -6C4.2 -5.9 3.7 -5.7 3.2 -5.4C3 -5.2 2.6 -4.9 2.4 -4.9C2.3 -4.9 2.2 -4.9 2.2 -4.9C1.9 -5 1.7 -5.3 1.7 -5.6C1.8 -6.5 2 -16.1 2 -16.9C2 -17.3 1.6 -17.6 1.2 -17.6C0.7 -17.6 0 -17.2 0 -16.4C0 -16.4 0.2 6.4 0.5 6.8ZM1.9 3.2C1.9 3.2 1.8 0.8 1.8 -0.8C1.8 -1.4 1.8 -1.9 1.8 -2C2 -2.5 3 -3.4 3.6 -3.7C4 -3.9 4.3 -4 4.6 -4C5 -4 5.4 -3.8 5.6 -3.6C6 -3.1 6.3 -2.4 6.3 -1.7C6.3 -1 6.1 -0.1 5.6 0.7C5.1 1.7 3.9 3 2.7 3.7C2.6 3.8 2.4 3.8 2.3 3.8C2 3.8 1.9 3.4 1.9 3.2Z"},"natural":{"w":6.7,"d":"M5.6 -7.2C5.6 -7.2 5.5 -7.2 5.5 -7.2C5.5 -7.2 2.9 -6.3 1.9 -6.3C1.6 -6.3 1.5 -6.3 1.5 -6.5V-13.2C1.5 -13.4 1.2 -13.6 1 -13.6H0.5C0.2 -13.6 0 -13.4 0 -13.2V7.4C0 7.7 0.1 7.8 0.3 7.8C0.4 7.8 0.4 7.8 0.5 7.8C0.5 7.8 0.6 7.8 0.6 7.7C1.2 7.5 3.4 6.5 4.6 6.5C5 6.5 5.2 6.6 5.2 7V12.9C5.2 13.2 5.4 13.4 5.7 13.4H6.2C6.5 13.4 6.7 13.2 6.7 12.9V-7.2C6.7 -7.4 6.6 -7.5 6.4 -7.5C6.4 -7.5 6.3 -7.5 6.2 -7.4ZM1.5 -1.6C1.5 -2.1 3.9 -3.2 4.9 -3.2C5.1 -3.2 5.2 -3.1 5.2 -3V1.2C5.2 1.9 3 2.8 2 2.8C1.7 2.8 1.5 2.7 1.5 2.6Z"},"sharp":{"w":10.0,"d":"M9.5 -4.7C9.8 -4.8 10 -5.2 10 -5.4V-8.2C10 -8.4 9.8 -8.6 9.7 -8.6C9.6 -8.6 9.6 -8.6 9.5 -8.5C9.5 -8.5 8.7 -8.2 8.5 -8.2C8.2 -8.2 7.9 -8.4 7.9 -8.7V-13.6C7.9 -13.8 7.7 -14 7.4 -14C7 -14 6.7 -13.8 6.7 -13.6V-8.4C6.7 -8 6.6 -7.4 6.2 -7.2C5.7 -6.9 4.4 -6.4 3.7 -6.2C3.3 -6.2 3.2 -6.7 3.2 -7V-11.8C3.2 -12 2.9 -12.2 2.6 -12.2C2.2 -12.2 2 -12 2 -11.8V-6.4C2 -5.8 1.8 -5.4 1.5 -5.3C1.3 -5.2 0.5 -4.9 0.5 -4.9C0.2 -4.8 0 -4.5 0 -4.2V-1.4C0 -1.2 0.1 -1 0.3 -1C0.4 -1 0.4 -1.1 0.5 -1.1C0.5 -1.1 1.1 -1.3 1.4 -1.5C1.4 -1.5 1.4 -1.5 1.5 -1.5C1.8 -1.5 2 -1.1 2 -0.8V3.2C2 3.6 1.8 4 1.6 4.1C1.3 4.2 0.5 4.5 0.5 4.5C0.2 4.6 0 4.9 0 5.2V8C0 8.2 0.1 8.4 0.3 8.4C0.4 8.4 0.4 8.3 0.5 8.3C0.5 8.3 1 8.1 1.4 8C1.4 7.9 1.5 7.9 1.5 7.9C1.8 7.9 2 8.4 2 8.6V13.5C2 13.7 2.2 13.9 2.5 13.9C2.9 13.9 3.2 13.7 3.2 13.5V7.9C3.2 7.4 3.4 7.1 3.6 7L6 6C6.1 6 6.2 6 6.2 6C6.5 6 6.7 6.5 6.7 6.7V11.7C6.7 12 7 12.2 7.2 12.2C7.7 12.2 7.9 12 7.9 11.7V6C7.9 5.7 8.1 5.2 8.4 5.1C8.6 5 9.5 4.7 9.5 4.7C9.8 4.6 10 4.2 10 4V1.2C10 1 9.8 0.8 9.7 0.8C9.6 0.8 9.6 0.8 9.5 0.9L8.4 1.3C8.2 1.3 7.9 1 7.9 0.6V-3.2C7.9 -3.4 8.1 -4.2 8.4 -4.3ZM6.7 1.8C6.5 2.6 4.6 3.4 3.7 3.4C3.4 3.4 3.2 3.3 3.2 3.2C3.1 3 3.1 2.2 3.1 1.2C3.1 -0 3.1 -1.4 3.2 -1.8C3.3 -2.4 5.1 -3.3 6.1 -3.3C6.4 -3.3 6.6 -3.2 6.7 -3C6.8 -2.8 6.9 -1.8 6.9 -0.8C6.9 0.3 6.8 1.4 6.7 1.8Z"},"restWhole":{"w":11.3,"d":"M11.3 4.4V0.7C11.3 0.1 10.8 -0.4 10.2 -0.4H1C0.4 -0.4 0 0.1 0 0.7V4.4C0 4.9 0.4 5.4 1 5.4H10.2C10.8 5.4 11.3 4.9 11.3 4.4Z"},"restHalf":{"w":11.3,"d":"M11.3 -1V-4.6C11.3 -5.2 10.8 -5.7 10.2 -5.7H1C0.4 -5.7 0 -5.2 0 -4.6V-1C0 -0.4 0.4 0.1 1 0.1H10.2C10.8 0.1 11.3 -0.4 11.3 -1Z"},"restQuarter":{"w":10.8,"d":"M3.1 1.5C3.8 2.3 4.3 3.1 4.8 3.9C4.9 4.1 5.1 4.4 5.1 4.5C5.1 4.5 5.1 4.6 5 4.6C5 4.8 4.8 4.8 4.6 4.8C4.4 4.8 4.1 4.8 4 4.7C3.8 4.7 3.5 4.6 3.3 4.6C1.6 4.6 0 6.3 0 8.4C0 10.4 1.8 12.4 4.7 14.6C5 14.9 5.4 15 5.7 15C6 15 6.3 14.9 6.3 14.8C6.4 14.6 6.4 14.6 6.4 14.5C6.4 14.1 6.1 13.8 5.8 13.5C5.2 13.5 4.8 12.4 4.7 12.1C4.6 11.8 4.6 11.4 4.6 11C4.6 9.8 5.2 8.4 6.4 8.2C6.6 8.1 6.8 8.1 7.1 8.1C8.2 8.1 9.6 8.6 10.2 8.8C10.2 8.8 10.3 8.8 10.3 8.8C10.4 8.9 10.5 8.9 10.6 8.9C10.7 8.9 10.8 8.8 10.8 8.7C10.8 8.2 9.8 6.9 9.3 6.4C7.8 4.6 6.6 3.1 6.6 0.9C6.6 0.7 6.6 0.5 6.6 0.4C6.8 -2 8.2 -3.9 9.2 -5.5C9.4 -5.7 9.4 -5.9 9.4 -6.1C9.4 -6.5 9.2 -6.9 9.2 -6.9C9.2 -6.9 3.3 -13.9 2.6 -14.6C2.4 -14.8 2.2 -14.9 1.9 -14.9C1.5 -14.9 1.1 -14.6 1.1 -14.1C1.1 -13.9 1.2 -13.7 1.3 -13.4C1.4 -13 3.7 -11 3.7 -8.1C3.7 -6.6 3.1 -4.9 1.3 -3C0.9 -2.6 0.8 -2.2 0.8 -1.8C0.8 -1.3 1.2 -0.9 1.2 -0.9Z"},"rest8th":{"w":10.0,"d":"M5.4 -4.3C5.4 -5.8 4.2 -7 2.7 -7C1.2 -7 0 -5.8 0 -4.3C0 -3.4 0.5 -2.7 1.1 -2.2C1.4 -2 1.8 -1.8 2.2 -1.7C2.5 -1.6 2.9 -1.6 3.2 -1.6C3.8 -1.6 4.4 -1.7 4.8 -1.8C5.4 -2 5.7 -2.2 6.2 -2.4C6.3 -2.5 6.4 -2.5 6.4 -2.5C6.6 -2.5 6.6 -2.3 6.6 -2.1C6.6 -2 6.6 -1.8 6.6 -1.7C6.5 -1.1 3.6 6.9 2.9 9.5C2.9 10 3.8 10 4 10C4.5 10 5 10 5.4 9.6C5.6 9.6 9.5 -4.5 9.5 -4.5C9.6 -5.2 9.8 -5.8 9.9 -6C9.9 -6.4 9.5 -6.6 9.4 -6.7C9.3 -6.7 9.2 -6.7 9 -6.5C8.7 -6.3 6.7 -3.9 5.4 -3.9Z"},"rest16th":{"w":12.8,"d":"M8.3 -4.4C8.3 -6 7.1 -7.2 5.6 -7.2C4.1 -7.2 2.9 -6 2.9 -4.4C2.9 -3.6 3.4 -2.9 4 -2.4C4.3 -2.2 4.7 -2 5.1 -1.8C5.4 -1.8 5.7 -1.7 6.1 -1.7C6.6 -1.7 7.3 -1.8 7.8 -2C8.3 -2.2 8.7 -2.3 9.2 -2.6C9.3 -2.6 9.4 -2.7 9.5 -2.7C9.6 -2.7 9.7 -2.6 9.7 -2.4C9.7 -2.3 9.6 -2.1 9.6 -1.8C9.5 -1.5 7.7 4 7.4 4.8C7 5.6 6 6 5.4 6C5.4 5.9 5.4 5.8 5.4 5.6C5.4 4.1 4.2 2.9 2.7 2.9C1.2 2.9 0 4.1 0 5.6C0 6.4 0.5 7.2 1.1 7.7C1.4 7.9 1.8 8.1 2.2 8.2C2.5 8.3 2.8 8.4 3.2 8.4C3.8 8.4 4.4 8.2 4.9 8.1C5.4 7.9 5.7 7.8 6.2 7.5C6.3 7.5 6.4 7.6 6.4 7.7C6.4 7.8 6.3 7.8 6.3 7.8L2.5 19.2C2.5 19.2 2.5 19.2 2.5 19.3C2.5 19.6 2.8 20 3.7 20C4.9 20 5.1 19.5 5.2 19.1L9.9 3.8C10.9 0.4 11.7 -2.2 11.7 -2.2C11.7 -2.2 12.7 -5.8 12.8 -6.3C12.8 -6.4 12.8 -6.4 12.8 -6.4C12.8 -6.7 12.5 -6.8 12.4 -6.9C12.2 -6.9 12.1 -6.8 12 -6.7C11.7 -6.5 9.7 -4.1 8.3 -4Z"},"fermataAbove":{"w":24.2,"d":"M12.1 -8.8C20.6 -8.8 22.3 -2.5 22.7 -1C22.8 -0.9 22.8 -0.8 22.8 -0.7C23.1 -0.2 23.2 0.1 23.6 0.1C24 0.1 24.2 -0 24.2 -0.4C24.2 -0.6 24.2 -0.7 24.2 -0.8C21.7 -13.1 13.3 -13.2 12.2 -13.2C10.9 -13.2 2.6 -13.1 0.2 -0.8C0.1 -0.7 0.1 -0.5 0.1 -0.4C0.1 0 0.3 0.1 0.6 0.1C1 0.1 1.2 -0.2 1.4 -0.7C1.5 -0.8 1.5 -0.9 1.6 -1.1C2 -2.7 3.8 -8.8 12.1 -8.8ZM14.3 -2.1C14.3 -3.2 13.3 -4.2 12.1 -4.2C11 -4.2 10 -3.2 10 -2.1C10 -0.9 11 0.1 12.1 0.1C13.3 0.1 14.3 -0.9 14.3 -2.1Z"},"doubleSharp":{"w":10.0,"d":"M7.6 1.3C7.2 1 5.7 0.2 5.7 -0C5.7 -0.6 7 -1.2 7.6 -1.4C7.8 -1.4 7.9 -1.4 8.1 -1.4C8.7 -1.4 9.3 -1.5 9.6 -1.8C9.8 -2 9.9 -2.6 9.9 -3.2C9.9 -3.9 9.8 -4.6 9.6 -4.8C9.4 -5 8.8 -5.1 8.1 -5.1C7.4 -5.1 6.7 -5 6.5 -4.8C6.3 -4.7 6.3 -4 6.3 -3.2C6.1 -2.8 5.4 -1.4 5 -1.4C4.4 -1.4 3.8 -2.7 3.6 -3.2C3.6 -3.9 3.5 -4.6 3.3 -4.8C3.1 -5 2.5 -5.1 1.8 -5.1C1.2 -5.1 0.4 -5 0.2 -4.8C0.1 -4.7 0 -4 0 -3.3C0 -2.6 0.1 -1.9 0.2 -1.8C0.5 -1.5 1.2 -1.4 1.9 -1.4C2 -1.4 2.2 -1.4 2.3 -1.4C2.7 -1.2 4.2 -0.4 4.2 -0.1C4.2 0.4 2.9 1.1 2.3 1.3H1.9C1.2 1.3 0.4 1.4 0.2 1.6C0.1 1.7 0 2.4 0 3.1C0 3.8 0.1 4.5 0.2 4.6C0.5 4.8 1.1 5 1.8 5C2.4 5 3 4.9 3.3 4.6C3.5 4.4 3.6 3.7 3.6 3.1C3.6 3 3.6 3 3.7 2.9C3.9 2.4 4.4 1.2 4.9 1.2C5.4 1.2 6.1 2.5 6.3 3.1C6.3 3.8 6.3 4.5 6.5 4.6C6.8 4.8 7.4 5 8.1 5C8.7 5 9.3 4.9 9.6 4.6C9.8 4.4 9.9 3.8 9.9 3.2C9.9 2.5 9.8 1.8 9.6 1.6C9.4 1.4 8.7 1.3 8 1.3Z"},"segno":{"w":22.3,"d":"M5.4 -26.6C5.6 -26.6 5.9 -26.5 6 -26.1L6.1 -25.8C6.4 -24.7 7 -22.4 9 -22.4C9.4 -22.4 9.8 -22.4 10.2 -22.6C11.4 -23 11.8 -23.9 11.8 -25C11.8 -25.6 11.7 -26.3 11.5 -26.9C10.8 -28.8 8.2 -29.4 6.1 -29.4C3.3 -29.4 0.2 -26 0.2 -22C0.2 -21.1 0.4 -20.1 0.8 -19.1C2.1 -16.2 7.9 -12.6 8.2 -12.5C8.4 -12.4 8.4 -12.3 8.4 -12.2C8.4 -12 8.4 -11.8 8.2 -11.5C7.9 -11 2.2 -0.6 2.2 -0.6C2.1 -0.4 2 -0.2 2 -0.1C2 0.3 2.2 0.7 2.6 0.9C2.8 1 3 1.1 3.2 1.1C3.6 1.1 4 0.8 4.2 0.5C4.2 0.5 10.4 -10.7 10.5 -11C10.5 -10.9 10.8 -11.2 11 -11.2C11.6 -11 19.6 -8.7 19.6 -4.9C19.6 -3.3 18.6 -2.3 17.3 -2.1C17.2 -2.1 17.1 -2 17 -2C16.3 -2 15.6 -2.6 15.6 -3.8V-4.3C15.6 -5.8 14.6 -6.9 13.5 -6.9C13.3 -6.9 13.2 -6.9 13 -6.8C11.5 -6.5 10.2 -5.8 10.2 -4.2C10.2 -4.1 10.2 -3.9 10.2 -3.7C10.5 -2 12.3 0.3 15 0.3C15.5 0.3 16.1 0.2 16.7 0C19.9 -1 22 -3.6 22 -7C22 -7.3 22 -7.7 21.9 -8.1C21.3 -12.5 15 -16.1 14.5 -16.3C14 -16.6 13.8 -16.8 13.8 -17C13.8 -17 13.9 -17.1 13.9 -17.2C14.1 -17.5 20.3 -28.7 20.3 -28.7C20.4 -28.9 20.5 -29 20.5 -29.2C20.5 -29.6 20.2 -30 19.9 -30.2C19.7 -30.3 19.5 -30.4 19.4 -30.4C19 -30.4 18.6 -30.2 18.4 -29.8C18.4 -29.8 12 -18.3 11.8 -18C11.6 -17.8 11.6 -17.6 11.4 -17.6C11.3 -17.6 11.2 -17.7 11 -17.8C10.6 -17.9 4.6 -20.2 3.6 -22C3.3 -22.4 3 -23.3 3 -24.1C3 -25.2 3.5 -26.3 5.2 -26.6ZM16.6 -18.6C16.6 -17.4 17.6 -16.4 18.9 -16.4C20.2 -16.4 21.2 -17.4 21.2 -18.6C21.2 -19.9 20.2 -20.9 18.9 -20.9C17.6 -20.9 16.6 -19.9 16.6 -18.6ZM5.6 -10.6C5.6 -11.8 4.6 -12.8 3.3 -12.8C2.1 -12.8 1 -11.8 1 -10.6C1 -9.3 2.1 -8.3 3.3 -8.3C4.6 -8.3 5.6 -9.3 5.6 -10.6Z"},"coda":{"w":38.2,"d":"M37.5 -16H32.7C32.3 -23.5 26.7 -29.6 20.2 -30.1V-35.2C20.2 -35.8 19.8 -35.9 19.3 -35.9C18.8 -35.9 18.3 -35.8 18.3 -35.2V-30.1C11.8 -29.6 6.3 -23.6 5.8 -16H0.6C0 -16 -0.2 -15.6 -0.2 -15C-0.2 -14.5 0 -14.1 0.6 -14.1H5.8C6.3 -6.6 11.8 -0.5 18.3 0V5.6C18.3 6.2 18.8 6.3 19.3 6.3C19.8 6.3 20.2 6.2 20.2 5.6V0C26.7 -0.5 32.3 -6.6 32.7 -14.1H37.5C38 -14.1 38.2 -14.5 38.2 -15C38.2 -15.6 38 -16 37.5 -16ZM26.1 -16H20.2V-27.8C25.8 -27.4 26.1 -22.5 26.1 -16ZM18.3 -27.8V-16H12.6C12.6 -22.5 12.6 -27.4 18.3 -27.8ZM12.6 -14.1H18.3V-1.9C13.2 -2.5 12.7 -7.9 12.6 -14.1ZM20.2 -1.9V-14.1H26.1C26 -8 25.2 -2.5 20.2 -1.9Z"},"flag8thUp":{"w":10.6,"d":"M9.5 31.6C9.5 31.6 10.6 27.8 10.6 24.7C10.6 19.7 8.5 15 6 11C3.9 7.8 2.2 4.4 1.6 0.5C1.5 -0.1 1.2 -0.4 0.8 -0.4C0.3 -0.4 0 -0.2 0 0.2V9.8C2.6 10.3 6.4 15.7 7.9 19.1C8.5 20.5 8.8 22.8 8.8 25.1C8.8 26.9 8.6 28.8 7.9 30.6C7.8 30.8 7.8 31 7.8 31.2C7.8 31.8 8.2 32.2 8.4 32.4C8.4 32.4 8.5 32.4 8.6 32.4C8.9 32.4 9.4 32.2 9.5 31.6Z"},"flag8thDown":{"w":12.2,"d":"M9.6 -30.4C10.2 -28.7 10.4 -26.7 10.4 -24.9C10.4 -22.6 9.4 -19.2 8.8 -17.8C7.4 -14.5 5.4 -11.2 0 -9.4V-0C0 0.4 0.3 0.6 0.6 0.6C1 0.6 1.5 0.3 1.6 -0.3C2.3 -4.1 5.2 -7.6 7.3 -10.8C9.8 -14.7 12.2 -19.5 12.2 -24.5C12.2 -27.6 11.4 -30.4 11.1 -31.7C11 -32.2 10.8 -32.3 10.5 -32.3C10 -32.3 9.5 -31.8 9.5 -31.1C9.5 -30.9 9.5 -30.6 9.6 -30.4Z"},"flag16thUp":{"w":11.2,"d":"M10.9 31.8C11 31.6 11.2 29.4 11.2 27.4V26.6C11.2 24.9 10.7 23.2 10 21.8C10 21.6 10 21.6 10 21.4C10 21.3 10 21.2 10 21.1C10.1 20.9 11 18.5 11 16C11 15.5 11 15.1 10.9 14.6C10.5 11.9 9.4 10.8 6.6 7.6C4.4 5.3 2.2 4.7 1.5 0.4C1.4 0 0.9 -0.1 0.7 -0.1C0.4 -0.1 0 0 0 0.3V15.8H0.2C2.7 15.9 5.5 16 8.3 21.6C9.2 23.5 9.6 25.5 9.6 27.6C9.6 28.7 9.4 29.9 9.2 31.1C9.2 31.3 9.2 31.4 9.2 31.5C9.2 32 9.5 32.4 9.8 32.4C9.9 32.5 10 32.5 10.1 32.5C10.4 32.5 10.6 32.4 10.9 31.8ZM8.4 18.4C7.7 17.4 7 16.6 6.2 15.6C4.3 13.4 2.5 12.5 1.6 9.2C1.6 9.2 1.6 9.1 1.6 9.1C1.6 8.9 1.8 8.7 2.2 8.7H2.5C4.9 8.7 7.1 10.9 8.4 12.9C9.1 13.9 9.5 15.2 9.5 16.4C9.5 16.7 9.5 17 9.4 17.2C9.4 17.6 9.4 18 9.2 18.3C9.1 18.4 8.8 18.5 8.6 18.5C8.5 18.5 8.4 18.5 8.4 18.4Z"},"flag16thDown":{"w":11.7,"d":"M9.6 -31.4C9.8 -30.2 10 -28.8 10 -27.5C10 -25.4 9.6 -23.2 8.7 -21.3C5.9 -15.7 2.7 -15.6 0.2 -15.5H0V-0C0 0.2 0.3 0.4 0.7 0.4C1 0.4 1.4 0.3 1.5 -0.2C2.4 -6.3 10.3 -8 11.3 -14.3C11.4 -14.8 11.4 -15.2 11.4 -15.8C11.4 -18.2 10.5 -20.6 10.4 -20.8C10.4 -20.9 10.4 -21 10.4 -21.1C10.4 -21.3 10.4 -21.4 10.4 -21.5C11.3 -23.3 11.6 -25.5 11.6 -27.6C11.6 -29 11.5 -30.4 11.2 -31.6C11 -32.5 10.8 -32.5 10.3 -32.5C9.8 -32.4 9.5 -32.1 9.6 -31.4ZM9 -18.2C9.2 -18.2 9.5 -18.1 9.6 -18C9.8 -17.7 9.8 -17.3 9.8 -17C9.9 -16.7 9.9 -16.4 9.9 -16.2C9.9 -14.8 9.5 -13.6 8.8 -12.6C7.5 -10.6 4.9 -8.4 2.5 -8.4H2.2C1.8 -8.4 1.6 -8.6 1.6 -8.8C1.6 -8.8 1.6 -8.9 1.6 -8.9C2.5 -12.2 4.7 -13.1 6.6 -15.3C7.4 -16.2 8.1 -17 8.8 -18.1C8.8 -18.2 8.9 -18.2 9 -18.2Z"}};

// ---------- constantes ----------
const L = { width: 940, left: 8, barsStart: 80, right: 920, sysH: 190, firstTop: 70,
            padBar: 12, stemLen: 34, trackY: 82, trackH: 40 };
const TUNING = [ {n:1, midi:74}, {n:2, midi:71}, {n:3, midi:67}, {n:4, midi:62} ]; // D5 B4 G4 D4
const MAX_FRET = 12;
const LOWEST_MIDI = Math.min(...TUNING.map(t => t.midi));   // Ré 4
const STEP = {C:0,D:1,E:2,F:3,G:4,A:5,B:6};
const SEMI = {C:0,D:2,E:4,F:5,G:7,A:9,B:11};
const SOLFA = {C:'DÓ',D:'RÉ',E:'MI',F:'FÁ',G:'SOL',A:'LÁ',B:'SI'};
const NOME  = {C:'Dó',D:'Ré',E:'Mi',F:'Fá',G:'Sol',A:'Lá',B:'Si'};
const ACC_SYM = {'-2':'♭♭','-1':'♭','0':'','1':'♯','2':'×'};
const PC_NAME = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const ACC_VAL = { '': 0, '#': 1, b: -1, x: 2, '##': 2, bb: -2 };
const BOTTOM_STEP = 30;            // E4 = 1ª linha da pauta
const MIDDLE_STEP = 34;            // B4 = 3ª linha
const DURS = [1,2,3,4,6,8,12,16];  // em semicolcheias

// ---------- teoria: tudo derivado do pitch ----------
function parsePitch(name) {
  const m = /^([A-G])(x|##|bb|#|b)?(\d)$/.exec(name);
  if (!m) throw new Error(`altura inválida "${name}"`);
  const letter = m[1], acc = ACC_VAL[m[2] || ''], oct = +m[3];
  const midi = 12 * (oct + 1) + SEMI[letter] + acc;
  // o cavaco não tem nada abaixo da corda mais grave (Ré 4): a nota fica escrita como no PDF,
  // mas o som e a digitação sobem a oitava necessária (ex.: Dó 4 escrito → toca Dó 5, 2ª corda casa 1)
  const shift = midi < LOWEST_MIDI ? Math.ceil((LOWEST_MIDI - midi) / 12) : 0;
  const playMidi = midi + 12 * shift;
  const playName = PC_NAME[((playMidi % 12) + 12) % 12] + (Math.floor(playMidi / 12) - 1);   // sempre nome simples: serve p/ acidente duplo também
  return { name, letter, acc, oct, step: STEP[letter] + 7 * oct, midi, shift, playMidi, playName };
}
function fingering(midi) {
  let best = null;
  for (const s of TUNING) {
    const fret = midi - s.midi;
    if (fret >= 0 && fret <= MAX_FRET && (!best || fret < best.fret)) best = { n: s.n, fret };
  }
  return best;
}
function fingeringText(midi) {
  const f = fingering(midi);
  if (!f) return 'fora do alcance do cavaco';
  return f.fret === 0 ? `${f.n}ª corda solta` : `${f.n}ª corda, casa ${f.fret}`;
}
function fingeringFor(p) {
  const f = fingering(p.playMidi);
  if (!f) return 'fora do alcance do cavaco';
  const base = f.fret === 0 ? `${f.n}ª corda solta` : `${f.n}ª corda, casa ${f.fret}`;
  return p.shift ? `${base} — soa uma oitava acima do escrito` : base;
}
function posName(step) {
  const i = step - BOTTOM_STEP;
  if (i >= 0 && i <= 8) return i % 2 === 0 ? `${i / 2 + 1}ª linha` : `${(i + 1) / 2}º espaço`;
  if (i < 0) return i % 2 === 0 ? `${-i / 2}ª linha supl. abaixo` : 'espaço abaixo da pauta';
  return i % 2 === 0 ? `${(i - 8) / 2}ª linha supl. acima` : 'espaço acima da pauta';
}
function noteLabel(p) { return SOLFA[p.letter] + ACC_SYM[p.acc]; }
function noteName(p)  { return `${NOME[p.letter]}${ACC_SYM[p.acc]} ${p.oct}`; }

// ---------- leitura dos dados ----------
// notas: "G4 G4 C5/4 r/2 F#4*3"  →  altura[/duração em semicolcheias][*repetições][~][^]; r = pausa
//   /2t = tercina de colcheia · ~ = ligada à próxima nota de mesma altura · ^ = fermata
function parseBar(b, bi, slots) {
  const where = `Compasso ${bi + 1}`;
  const evs = []; let t = 0;
  for (const tok of String(b.notes).trim().split(/\s+/)) {
    const m = /^(r|[A-G](?:x|##|bb|#|b)?\d)(?:\/(\d+)(t?))?(?:\*(\d+))?([~^]*)$/.exec(tok);
    if (!m) throw new Error(`${where}: "${tok}" não é uma nota válida (ex.: G4, Bb4, F#4, r, C5/4, G4*4, E5/2t, A4/2~)`);
    const n = +(m[2] || 1), trip = m[3] === 't', rep = +(m[4] || 1);
    if (!DURS.includes(n)) throw new Error(`${where}: duração /${n} inválida (use ${DURS.join(', ')})`);
    const d = trip ? n * 2 / 3 : n;
    for (let k = 0; k < rep; k++) {
      evs.push({ rest: m[1] === 'r', pitch: m[1] === 'r' ? null : parsePitch(m[1]), d, t, trip,
                 tie: m[5].includes('~'), ferm: m[5].includes('^') });
      t = Math.round((t + d) * 3) / 3;   // mantém múltiplos exatos de 1/3 (tercinas)
    }
  }
  const pickup = !!b.pickup && t < slots;
  if (Math.abs(t - slots) > 1e-6 && !pickup) throw new Error(`${where}: as durações somam ${+t.toFixed(3)}, mas o compasso tem ${slots} semicolcheias`);
  // anacruse: no tempo de execução ela ocupa o fim de um compasso inteiro (os cliques do metrônomo dão a contagem)
  const lead = pickup ? slots - t : 0;
  evs.forEach((e, i) => {
    e.tp = e.t + lead;
    if (!e.tie) return;
    if (e.rest) throw new Error(`${where}: pausa não pode ter ligadura (~)`);
    const nx = evs[i + 1];
    if (!nx) return;                                   // última nota do compasso: liga com o próximo compasso (linkTies)
    if (nx.rest || nx.pitch.name !== e.pitch.name) throw new Error(`${where}: ligadura (~) precisa de outra nota igual logo depois`);
    e.tieNext = nx; nx.tiedFrom = e;
  });
  const chords = String(b.chords || '').trim().split(/\s+/).filter(Boolean).map(c => {
    const [name, at] = c.split('@'); return { name, at: +(at || 0) };
  });
  return { ...b, idx: bi, evs, chords, pickup, len: t };
}
// liga as notas com ~ no fim de um compasso à primeira nota do compasso seguinte (pode ser outra linha)
function linkTies(bars) {
  bars.forEach(b => b.evs.forEach(e => { e.bar = b; }));
  bars.forEach((b, bi) => {
    const e = b.evs[b.evs.length - 1];
    if (!e || !e.tie || e.tieNext) return;
    const nb = bars[bi + 1], nx = nb && nb.evs[0];
    if (!nx || nx.rest || nx.pitch.name !== e.pitch.name) throw new Error(`Compasso ${bi + 1}: ligadura (~) no fim do compasso precisa de nota igual no começo do próximo`);
    e.tieNext = nx; nx.tiedFrom = e;
  });
}
function chordAt(bar, t) {
  let c = null; for (const x of bar.chords) if (x.at <= t) c = x; return c ? c.name : '';
}

// ordem de execução: ritornelos, casas 1/2, D.C. al Fine, D.S. al Coda
// segno = compasso do segno · ds = no fim deste compasso volta ao segno · tocoda = "ir para a coda" (vale antes deste compasso, só depois do D.S.)
// coda = compasso onde a coda começa (o n-ésimo D.S. vai para a n-ésima coda). Entre o D.S. e a coda, ritornelos e casas não valem.
// from = compasso onde começar. Começando no meio de um trecho com ritornelo, toca direto até o fim (já na "segunda vez").
function playOrder(bars, from = 0) {
  const out = []; let i = from, rs = 0, pass = 1, dc = false, inDS = false, nDS = 0, guard = 0;
  const segno = Math.max(0, bars.findIndex(b => b.segno));
  const codas = bars.map((b, k) => b.coda ? k : -1).filter(k => k >= 0);
  if (from > 0) {
    if (bars[from].repeatStart) rs = from;
    else {
      for (let j = from; j >= 0; j--) if (bars[j].repeatStart) { rs = j; break; }
      if (bars[from].volta !== 1) pass = 2;
    }
  }
  while (i < bars.length && guard++ < 5000) {
    const b = bars[i];
    if (inDS && b.tocoda && codas.length) { i = codas[Math.min(nDS, codas.length) - 1]; inDS = false; pass = 1; rs = i; continue; }
    if (!dc && !inDS && b.repeatStart && i !== rs) { rs = i; pass = 1; }
    const want = dc || inDS ? 1 : pass;
    if (b.volta && b.volta !== want) { i++; continue; }
    out.push(i);
    if (dc && b.fine) break;
    if (!dc && !inDS && b.ds) { nDS++; inDS = true; i = segno; continue; }
    if (!dc && !inDS && b.repeatEnd && pass === 1) { pass = 2; i = rs; continue; }
    if (b.dc && !dc) { dc = true; i = 0; continue; }
    i++;
  }
  return out;
}

// ---------- desenho ----------
const glyph = (name, x, y, cls = '') => `<path class="glyph${cls}" d="${GLYPH[name].d}" transform="translate(${x.toFixed(1)},${y.toFixed(1)})"/>`;

function chordSvg(name, x, y) {
  const m = /^([A-G][#b]?)(.*)$/.exec(name);
  const root = (m ? m[1] : name).replace(/#/g, '♯').replace(/b/g, '♭');
  const q = (m ? m[2] : '').replace(/o/g, '°').replace(/#/g, '♯').replace(/b/g, '♭');
  return `<text x="${x.toFixed(1)}" y="${y}" class="chord"><tspan>${root}</tspan><tspan class="chord-q" dy="3">${q}</tspan></text>`;
}

function boundary(x, top, prev, next) {
  const y1 = top, y2 = top + 40;
  const thin  = xx => `<line x1="${xx}" y1="${y1}" x2="${xx}" y2="${y2}" class="bar-line"/>`;
  const thick = xx => `<line x1="${xx}" y1="${y1}" x2="${xx}" y2="${y2}" class="thick-bar"/>`;
  const dots  = xx => `<circle cx="${xx}" cy="${top + 15}" r="2.5" class="dot"/><circle cx="${xx}" cy="${top + 25}" r="2.5" class="dot"/>`;
  const pe = prev && prev.repeatEnd, ns = next && next.repeatStart, fin = prev && prev.final;
  if (pe && ns) return dots(x - 12) + thin(x - 5) + thin(x + 5) + dots(x + 12);
  if (pe) return dots(x - 12) + thin(x - 6) + thick(x);
  if (ns) return thick(x) + thin(x + 6) + dots(x + 12);
  if (fin) return thin(x - 5) + thick(x);
  return thin(x);
}

function restSvg(e, top, whole) {
  const dotted = !whole && [3, 6, 12].includes(e.d), base = whole ? 16 : dotted ? e.d * 2 / 3 : e.d;
  const name = base >= 16 ? 'restWhole' : base >= 8 ? 'restHalf' : base >= 4 ? 'restQuarter' : base >= 2 ? 'rest8th' : 'rest16th';
  const y = name === 'restWhole' ? top + 10 : top + 20;
  let s = glyph(name, e.x - GLYPH[name].w / 2, y);
  if (dotted) s += `<circle cx="${(e.x + GLYPH[name].w / 2 + 4).toFixed(1)}" cy="${top + 16}" r="2" class="dot"/>`;
  return s;
}

let LABFS = 12;
const LAB = { M: -1e9, U: -1e9, L: -1e9 };   // até onde cada altura do rótulo já está ocupada (por linha de pauta)
const NOTES = [];   // todas as notas tocáveis, em ordem de partitura
let SYS_TOPS = [];

function drawBar(bar, barX, top, sysIdx, slotW, beat, out) {
  const bottom = top + 40;
  const xs = t => barX + L.padBar + (t + 0.5) * slotW;
  const accState = {}, kmap = keyMap(bar.keyN || 0);
  bar.evs.forEach(e => { e.x = xs(e.t); if (!e.rest) e.y = bottom - (e.pitch.step - BOTTOM_STEP) * 5; });

  bar.geo = { barX, slotW };   // as cifras são desenhadas no render, numa altura única por linha
  bar.ceil = top;              // ponto mais alto ocupado por cabeças, hastes, feixes, fermata e numerais

  // grupos de feixe: por tempo, só colcheias e semicolcheias, pausa quebra o grupo
  const groups = []; let cur = null;
  for (const e of bar.evs) {
    if (!e.rest && e.d < 4) {
      const b = Math.floor(e.t / beat);
      if (cur && cur.beat === b) cur.evs.push(e); else { cur = { beat: b, evs: [e] }; groups.push(cur); }
    } else cur = null;
  }
  const beamed = new Set();
  for (const g of groups) {
    if (g.evs.length < 2) continue;
    const avg = g.evs.reduce((s, e) => s + e.pitch.step, 0) / g.evs.length;
    g.down = avg >= MIDDLE_STEP;
    const ys = g.evs.map(e => e.y);
    g.tip = g.down ? Math.max(...ys) + L.stemLen : Math.min(...ys) - L.stemLen;
    g.evs.forEach(e => { e.down = g.down; e.tip = g.tip; beamed.add(e); });
  }
  for (const e of bar.evs) {
    if (e.rest || beamed.has(e)) continue;
    e.down = e.pitch.step >= MIDDLE_STEP;
    e.tip = e.down ? e.y + L.stemLen : e.y - L.stemLen;
  }

  let prevLab = null;
  bar.evs.forEach((e, k) => {
    if (e.rest) { prevLab = null;
      const whole = bar.evs.length === 1 && !bar.pickup;                 // pausa do compasso inteiro: semibreve centralizada
      if (whole) e.x = barX + L.padBar + bar.len * slotW / 2;
      out.push(restSvg(e, top, whole)); return;
    }
    const p = e.pitch, i = p.step - BOTTOM_STEP;
    e.id = `n${bar.idx}_${k}`; e.sys = sysIdx; e.bar = bar; e.chord = chordAt(bar, e.t);
    NOTES.push(e);
    if (i <= -2) for (let l = -2; l >= i; l -= 2) out.push(`<line x1="${e.x - 10}" y1="${bottom - l * 5}" x2="${e.x + 10}" y2="${bottom - l * 5}" class="staff-line"/>`);
    if (i >= 10) for (let l = 10; l <= i; l += 2) out.push(`<line x1="${e.x - 10}" y1="${bottom - l * 5}" x2="${e.x + 10}" y2="${bottom - l * 5}" class="staff-line"/>`);
    const key = p.letter + p.oct, shown = accState[key] ?? kmap[p.letter] ?? 0;
    const contTie = e.tiedFrom && e.tiedFrom.bar !== bar;      // nota ligada vinda do compasso anterior: não repete o acidente
    if (p.acc !== shown && !contTie) {
      accState[key] = p.acc;
      const nm = p.acc === 2 ? 'doubleSharp' : p.acc > 0 ? 'sharp' : p.acc < 0 ? 'flat' : 'natural';
      let ax = e.x - 10 - GLYPH[nm].w;
      if (p.acc === -2) { out.push(glyph('flat', ax - GLYPH.flat.w + 1, e.y, ' ng')); }
      out.push(glyph(nm, ax, e.y, ' ng'));
    }
    if (e.d < 16) {
      e.sx = e.x + (e.down ? -4.6 : 4.6);
      out.push(`<line x1="${e.sx.toFixed(1)}" y1="${e.y}" x2="${e.sx.toFixed(1)}" y2="${e.tip}" class="stem"/>`);
      if (!beamed.has(e) && e.d < 4) {
        const nm = `flag${e.d === 1 ? 16 : 8}th${e.down ? 'Down' : 'Up'}`;
        out.push(glyph(nm, e.sx - 0.9, e.tip, ' ng'));
      }
    }
    const open = e.d >= 8, rx = e.d >= 16 ? 6.2 : 5.3;
    out.push(`<ellipse id="${e.id}" cx="${e.x.toFixed(1)}" cy="${e.y}" rx="${rx}" ry="4" transform="rotate(-20 ${e.x.toFixed(1)} ${e.y})" class="notehead${open ? ' open' : ''}" data-i="${NOTES.length - 1}"/>`);
    if (!contTie) {                                      // nome da nota na faixa cinza (apagado até a vez dela); se encosta no vizinho, escalona em 2 alturas
      const txt = noteLabel(p), w = LABFS * 0.6 * txt.replace(/[♯♭×]/g, '').length + (/[♯♭×]/.test(txt) ? LABFS * 0.7 : 0), mid = top + L.trackY + L.trackH / 2;
      const bi = Math.floor(e.t / beat + 1e-6), lo = bi === 0 ? barX + 6 : barX + L.padBar + bi * beat * slotW, hi = (bi + 1) * beat >= bar.len - 1e-6 ? barX + 2 * L.padBar + bar.len * slotW - 6 : barX + L.padBar + (bi + 1) * beat * slotW;
      const lx = hi - lo > w + 6 ? Math.min(Math.max(e.x, lo + 4 + w / 2), hi - 4 - w / 2) : e.x, x0 = lx - w / 2;   // não deixa o nome encostar no corte do bloco
      const free = { M: x0 >= Math.max(LAB.M, LAB.U, LAB.L) + - 1, U: x0 >= Math.max(LAB.U, LAB.M) + - 1, L: x0 >= Math.max(LAB.L, LAB.M) + - 1 };
      const row = free.M ? 'M' : free.U && (!free.L || LAB.U <= LAB.L) ? 'U' : free.L ? 'L' : (LAB.U <= LAB.L ? 'U' : 'L');
      LAB[row] = lx + w / 2;
      if (prevLab && prevLab.bi === bi && e.t - prevLab.e.t <= prevLab.e.d + 1e-6)     // tracinho entre notas seguidas do mesmo tempo: cada nome = uma bolinha
        { const mx = ((prevLab.e.x + e.x) / 2).toFixed(1); out.push(`<path class="note-sep" d="M${mx} ${(mid - 5).toFixed(1)}v10"/>`); }   // um tracinho só, no meio entre as duas letras
      prevLab = { e, bi };
      out.push(`<text id="${e.id}l" class="note-lab" x="${lx.toFixed(1)}" y="${(mid + (row === 'U' ? -9 : row === 'L' ? 9 : 0)).toFixed(1)}">${txt}</text>`);
    }
    if (p.shift) {   // nota que não existe no braço: desenha a nota real (oitava acima) em verde pontilhado
      const gy = e.y - 35 * p.shift, gi = i + 7 * p.shift;
      if (gi >= 10) for (let l = 10; l <= gi; l += 2) out.push(`<line x1="${e.x - 10}" y1="${bottom - l * 5}" x2="${e.x + 10}" y2="${bottom - l * 5}" class="ghost-ledger"/>`);
      out.push(`<ellipse id="${e.id}g" cx="${e.x.toFixed(1)}" cy="${gy}" rx="${rx + 2.5}" ry="6.5" transform="rotate(-20 ${e.x.toFixed(1)} ${gy})" class="ghost-note" data-i="${NOTES.length - 1}"/>`);
    }
    if (e.ferm) {                                          // fermata sempre acima da haste
      const yf = Math.min(top - 5, e.down ? e.y - 10 : e.tip - 6);
      out.push(glyph('fermataAbove', e.x - GLYPH.fermataAbove.w / 2, yf)); bar.ceil = Math.min(bar.ceil, yf - 12);
    }
    bar.ceil = Math.min(bar.ceil, e.y - 6, e.tip);
    if ([3, 6, 12].includes(e.d)) out.push(`<circle cx="${(e.x + 11).toFixed(1)}" cy="${i % 2 === 0 ? e.y - 5 : e.y}" r="2" class="dot ng"/>`);
  });

  // numeral das tercinas
  for (const g of groups) {
    if (g.evs.length !== 3 || !g.evs.every(e => e.trip)) continue;
    const cx = g.evs.reduce((s, e) => s + e.x, 0) / 3;
    const yy = g.down ? g.tip + 15 : g.tip - 7;           // do lado do feixe, como no PDF
    if (!g.down) bar.ceil = Math.min(bar.ceil, yy - 12);
    out.push(`<text x="${cx.toFixed(1)}" y="${yy}" class="tuplet" text-anchor="middle">3</text>`);
  }

  // feixes
  for (const g of groups) {
    if (g.evs.length < 2) continue;
    const poly = (x1, x2, y) => `<polygon points="${x1},${y} ${x2},${y} ${x2},${y + 4} ${x1},${y + 4}" class="beam"/>`;
    const y1 = g.down ? g.tip - 4 : g.tip, y2 = g.down ? g.tip - 11 : g.tip + 7;
    const first = g.evs[0], last = g.evs[g.evs.length - 1];
    out.push(poly((first.sx - 0.9).toFixed(1), (last.sx + 0.9).toFixed(1), y1));
    for (let a = 0; a < g.evs.length;) {
      if (g.evs[a].d !== 1) { a++; continue; }
      let b = a; while (b + 1 < g.evs.length && g.evs[b + 1].d === 1) b++;
      if (b > a) out.push(poly((g.evs[a].sx - 0.9).toFixed(1), (g.evs[b].sx + 0.9).toFixed(1), y2));
      else {
        const sx = g.evs[a].sx;
        out.push(a === 0 ? poly(sx - 0.9, sx + 8, y2) : poly(sx - 8, sx + 0.9, y2));
      }
      a = b + 1;
    }
  }
}

// armadura de clave: n > 0 sustenidos, n < 0 bemóis
const SHARP_ORDER = ['F','C','G','D','A','E','B'], FLAT_ORDER = ['B','E','A','D','G','C','F'];
const SHARP_STEPS = [38,35,39,36,33,37,34], FLAT_STEPS = [34,37,33,36,32,35,31];
function keyMap(n) {
  const m = {};
  for (let i = 0; i < Math.abs(n); i++) m[(n > 0 ? SHARP_ORDER : FLAT_ORDER)[i]] = n > 0 ? 1 : -1;
  return m;
}
function keySigSvg(n, x0, top) {
  let o = '';
  for (let i = 0; i < Math.abs(n); i++) {
    const nm = n > 0 ? 'sharp' : 'flat', step = (n > 0 ? SHARP_STEPS : FLAT_STEPS)[i];
    o += glyph(nm, x0 + i * 8, top + 40 - (step - BOTTOM_STEP) * 5);
  }
  return o;
}
// ligaduras de prolongamento (inclusive entre compassos e entre linhas): arco do lado oposto à haste
function drawTies(bars, out) {
  const arc = (x1, x2, y, up) => {
    const h = up ? -6 : 6;
    out.push(`<path d="M${x1.toFixed(1)} ${y} Q${((x1 + x2) / 2).toFixed(1)} ${y + h * 1.7} ${x2.toFixed(1)} ${y}" class="tie"/>`);
  };
  bars.forEach(b => b.evs.forEach(e => {
    const n = e.tieNext; if (!n) return;
    const up = e.down, dy = up ? -7 : 7;
    if (e.sys === n.sys) arc(e.x + 6, n.x - 6, e.y + dy, up);
    else {
      arc(e.x + 6, e.bar.geo.barX + e.bar.geo.bw - 4, e.y + dy, up);
      arc(n.bar.geo.barX + 4, n.x - 6, n.y + (n.down ? -7 : 7), n.down);
    }
  }));
}

let current = null;   // { piece, bars, slots, beat, order }

function cardInnerW(card) {
  if (!card) return 980;
  const cs = getComputedStyle(card);
  return Math.round(card.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0));
}
function render(piece) {
  const den = piece.timeSig[1];
  const slots = 16 * piece.timeSig[0] / den, beat = 16 / den;
  const bars = piece.bars.map((b, i) => parseBar(b, i, slots));
  let kn = piece.key || 0;                                  // armadura em vigor (muda se o compasso tiver "key")
  bars.forEach(b => { if (b.key !== undefined) kn = b.key; b.keyN = kn; });
  linkTies(bars);
  const per = piece.barsPerSystem || 4;
  // largura da folha = largura real do cartão (1 unidade = 1 px): janela maior → mais espaço entre as notas, sem aumentar o tamanho delas
  const card = document.querySelector('.sheet-card');
  L.width = Math.max(260, Math.min(1700, cardInnerW(card))); L.right = L.width - 14;
  const KX = 46, maxKey = Math.max(0, ...bars.map(b => Math.abs(b.keyN)));
  // quantos compassos cabem numa linha com ao menos 17 unidades por semicolcheia (senão as letras das notas se atropelam)
  const barMin = 2 * L.padBar + slots * 17, bsEst = Math.max(KX + maxKey * 8 + 4, KX + 2) + 22 + 6;
  const fit = Math.max(1, Math.floor((L.right - bsEst) / barMin));
  let sysCounts = piece.systems, usesSys = !!piece.systems;
  if (!sysCounts || Math.max(...sysCounts) > fit) {      // folha estreita (celular, janela pequena): refaz as quebras de linha
    const n = Math.min(per, fit); sysCounts = []; usesSys = true;
    for (let i = 0; i < bars.length;) { const c = Math.min(bars.length - i, n + (bars[i].pickup ? 1 : 0)); sysCounts.push(c); i += c; }
  }
  if (sysCounts.reduce((x, y) => x + y, 0) !== bars.length)
    throw new Error(`"systems" soma ${sysCounts.reduce((x, y) => x + y, 0)} compassos, mas a peça tem ${bars.length}`);
  const nSys = sysCounts.length;
  // margem esquerda enxuta: clave, armadura e fórmula de compasso (só na 1ª linha) ocupam só o necessário
  const firstOf = s => sysCounts.slice(0, s).reduce((x, y) => x + y, 0);
  L.barsStart = Math.max(...sysCounts.map((_, s) => { const kEnd = KX + Math.abs(bars[firstOf(s)].keyN) * 8; return (s === 0 ? Math.max(kEnd + 4, KX + 2) + 22 : kEnd) + 6; }));
  // tamanho único dos nomes das notas, conforme o espaço da folha (sempre o mesmo em todas as notas da peça)
  const slotMin = Math.min(...sysCounts.map((cnt, s) => { const f = firstOf(s), pk = bars.slice(f, f + cnt).filter(b => b.pickup), pl = pk.reduce((x, b) => x + b.len, 0), nf = (usesSys ? cnt : per) - pk.length; return (L.right - L.barsStart - 2 * L.padBar * (nf + pk.length)) / (slots * nf + pl); }));
  LABFS = Math.max(9, Math.min(13, (slotMin - 3) / 1.8));   // 'SOL' (3 letras) tem que caber num slot de semicolcheia
  NOTES.length = 0; SYS_TOPS = [];
  const out = [];
  for (let s = 0; s < nSys; s++) {
    const top = L.firstTop + s * L.sysH; SYS_TOPS.push(top);
    const first = sysCounts.slice(0, s).reduce((x, y) => x + y, 0), last = first + sysCounts[s] - 1;
    const nb = last - first + 1;
    const pickBars = bars.slice(first, last + 1).filter(b => b.pickup);
    const nPick = pickBars.length, pickLen = pickBars.reduce((x, b) => x + b.len, 0);
    const nFull = (usesSys ? nb : per) - nPick;   // com "systems", cada linha ocupa a largura toda
    // mesma largura por semicolcheia em todos os compassos (a anacruse ocupa só o que as suas notas pedem)
    const slotW = (L.right - L.barsStart - 2 * L.padBar * (nFull + nPick)) / (slots * nFull + pickLen);
    const barW = 2 * L.padBar + slots * slotW, pickW = b => 2 * L.padBar + b.len * slotW;
    const bx = [L.barsStart];                                          // x de cada fronteira de compasso
    for (let k = 0; k < nb; k++) bx.push(bx[k] + (bars[first + k].pickup ? pickW(bars[first + k]) : barW));
    const xEnd = bx[nb];
    out.push(`<g id="sys-${s}" class="system">`);
    for (let i = 0; i < 5; i++) out.push(`<line x1="${L.left}" y1="${top + i * 10}" x2="${xEnd}" y2="${top + i * 10}" class="staff-line"/>`);
    out.push(`<line x1="${L.left}" y1="${top}" x2="${L.left}" y2="${top + 40}" class="bar-line"/>`);   // fecha a pauta à esquerda, como no PDF
    if (s > 0) out.push(`<text x="${L.left}" y="${top - 18}" class="barnum">${bars.slice(0, first).filter(b => !b.pickup).length + 1}</text>`);
    out.push(glyph('gClef', 14, top + 30));
    const kN = bars[first].keyN, kEnd = KX + Math.abs(kN) * 8;
    out.push(keySigSvg(kN, KX, top));
    if (s === 0) { const tx = Math.max(KX + 2, kEnd + 4); out.push(`<text x="${tx}" y="${top + 18}" class="time-sig">${piece.timeSig[0]}</text><text x="${tx}" y="${top + 38}" class="time-sig">${den}</text>`); }
    for (let k = 0; k < nb; k++) {                                       // faixa cinza: um bloco por tempo (corte branco de 2 px), com respiro maior entre compassos
      const b = bars[first + k], cls = `reading-track${(first + k) % 2 ? ' alt' : ''}`;
      const cuts = []; for (let n = 1; n * beat < b.len - 1e-6; n++) cuts.push(bx[k] + L.padBar + n * beat * slotW);
      const xs = [bx[k] + 6, ...cuts.flatMap(c => [c - 1, c + 1]), bx[k + 1] - 6];
      for (let i = 0; i < xs.length; i += 2) {                          // cantos arredondados só nas pontas do compasso; no corte entre tempos, reto
        const x1 = xs[i], x2 = xs[i + 1], y1 = top + L.trackY, y2 = y1 + L.trackH, r = 6;
        const rl = i === 0 ? r : 0, rr = i === xs.length - 2 ? r : 0;
        out.push(`<path class="${cls}" d="M${(x1 + rl).toFixed(1)} ${y1}H${(x2 - rr).toFixed(1)}${rr ? `Q${x2.toFixed(1)} ${y1} ${x2.toFixed(1)} ${y1 + rr}V${y2 - rr}Q${x2.toFixed(1)} ${y2} ${(x2 - rr).toFixed(1)} ${y2}` : `V${y2}`}H${(x1 + rl).toFixed(1)}${rl ? `Q${x1.toFixed(1)} ${y2} ${x1.toFixed(1)} ${y2 - rl}V${y1 + rl}Q${x1.toFixed(1)} ${y1} ${(x1 + rl).toFixed(1)} ${y1}` : `V${y1}`}Z"/>`);
      }
    }
    for (let k = 0; k <= last - first + 1; k++) {
      const prev = k > 0 ? bars[first + k - 1] : null;
      const next = first + k <= last ? bars[first + k] : null;
      out.push(boundary(bx[k], top, prev, next));
    }
    LAB.M = LAB.U = LAB.L = -1e9;
    for (let k = 0; k <= last - first; k++) {
      const b = bars[first + k], barX = bx[k], bw = bx[k + 1] - bx[k];
      drawBar(b, barX, top, s, slotW, beat, out);
      b.geo.bw = bw; b.sys = s;
      const mg = (nm, x) => `<path class="glyph" d="${GLYPH[nm].d}" transform="translate(${x.toFixed(1)},${top + 63}) scale(.55)"/>`;
      if (b.segno) out.push(mg('segno', barX + 5));
      if (b.coda) out.push(mg('coda', barX + 5));
      if (b.tocoda) out.push(mg('coda', barX + 5));          // sinal "ir para a coda": só o símbolo, como no PDF
      if (b.ds) out.push(`<text x="${barX + bw - 8}" y="${top + 62}" text-anchor="end" class="mark">${b.dsText || 'D.S. al Coda'}</text>`);
      if (k > 0 && b.key !== undefined) {             // troca de armadura no meio da linha (0 = cancela com bequadros)
        const pk = bars[first + k - 1].keyN;
        if (b.keyN === 0) { for (let q = 0; q < Math.abs(pk); q++) out.push(glyph('natural', barX + 3 + q * 8, top + 40 - ((pk > 0 ? SHARP_STEPS : FLAT_STEPS)[q] - BOTTOM_STEP) * 5)); }
        else out.push(keySigSvg(b.keyN, barX + 3, top));
      }
      if (b.fine) out.push(`<text x="${barX + bw - 8}" y="${top + 62}" text-anchor="end" class="mark">Fine</text>`);
      if (b.dc) out.push(`<text x="${barX + bw - 8}" y="${top + 62}" text-anchor="end" class="mark">D.C. al Fine</text>`);
    }
    // cifras numa altura única por linha: acima de tudo que as notas ocupam (notas agudas empurram as cifras pra cima)
    const sysCeil = Math.min(top, ...bars.slice(first, last + 1).map(b => b.ceil));
    const chordY = Math.min(top - 21, sysCeil - 10);
    for (let k = 0; k <= last - first; k++) {
      const b = bars[first + k];
      b.chords.forEach(c => out.push(chordSvg(c.name, b.geo.barX + L.padBar + (c.at + 0.5) * b.geo.slotW - 8, chordY)));
    }
    // casas 1./2.
    const vy = Math.min(top - 52, chordY - 31);
    for (let k = 0; k <= last - first; k++) {
      const b = bars[first + k]; if (!b.volta) continue;
      if (k > 0 && bars[first + k - 1].volta === b.volta) continue;
      let end = k; while (end + 1 <= last - first && bars[first + end + 1].volta === b.volta) end++;
      const x1 = bx[k] + 4, x2 = bx[end + 1] - 4;
      out.push(`<polyline points="${x1},${vy + 12} ${x1},${vy} ${x2},${vy}" class="volta"/><text x="${x1 + 5}" y="${vy + 11}" class="volta-text">${b.volta}.</text>`);
    }
    out.push('</g>');
  }
  drawTies(bars, out);
  out.push(`<text id="activeLabel" class="active-note-text" x="0" y="0"></text>`);
  const svg = document.getElementById('score');
  svg.setAttribute('viewBox', `0 0 ${L.width} ${L.firstTop + (nSys - 1) * L.sysH + 130}`);
  svg.innerHTML = out.join('');
  svg.style.setProperty('--fs', LABFS.toFixed(2) + 'px');
  current = { piece, bars, slots, beat };
  startBar = 0; updateStartUi();
  document.getElementById('title').textContent = piece.title;
  document.getElementById('subtitle').textContent = [piece.composer, piece.note].filter(Boolean).join(' · ');
  document.title = `${piece.title} — Cavaco em pauta`;
  clearFeedback(); showCount('');
}

// ---------- contador e compasso inicial ----------
let startBar = 0;
function showCount(n) { for (const id of ['counter', 'fabCount']) { const c = document.getElementById(id); if (!c) continue; c.textContent = n; c.classList.toggle('on', n !== ''); c.classList.toggle('go', n === 0); } }   // fabCount = espelho da contagem no celular (a barra de cima rola para fora da tela)
function clearArmed() { document.querySelectorAll('.armed').forEach(n => n.classList.remove('armed')); }
function armStart() {                                   // compasso marcado: a primeira nota dele já aparece em verde (com o nome na faixa)
  clearArmed();
  if (!startBar || !current || playing) return;
  const e = current.bars[startBar].evs.find(x => !x.rest); if (!e) return;
  [e.id, e.id + 'g', e.id + 'l'].forEach(id => { const n = document.getElementById(id); if (n) n.classList.add('armed'); });
}
function updateStartUi() {
  const old = document.getElementById('startMark'); if (old) old.remove();
  armStart();
  const el = document.getElementById('fbStart'); if (el) el.textContent = startBar + 1;
  if (!startBar || !current) return;
  const b = current.bars[startBar], top = SYS_TOPS[b.sys], x = b.geo.barX;
  const y1 = top - 40, y2 = top + L.trackY + L.trackH;
  document.getElementById('score').insertAdjacentHTML('beforeend',
    `<g id="startMark" pointer-events="none"><rect x="${x}" y="${y1}" width="${b.geo.bw}" height="${y2 - y1}" rx="6" fill="rgba(14,165,233,.10)"/>` +
    `<line x1="${x + 1.5}" y1="${y1}" x2="${x + 1.5}" y2="${y2}" stroke="#0284c7" stroke-width="3"/>` +
    `<path d="M${x + 1.5},${y1} l11,6.5 l-11,6.5 z" fill="#0284c7"/></g>`);
}
// compasso que está sendo tocado: só o contorno verde, sem preenchimento (some quando para)
let curBar = 0;
function markBar(bi) {
  curBar = bi;
  const b = current.bars[bi], svg = document.getElementById('score'); let r = document.getElementById('playBar');
  if (!r) { svg.insertAdjacentHTML('beforeend', '<rect id="playBar" rx="6" fill="none" stroke="rgba(22,163,74,.85)" stroke-width="2" pointer-events="none"/>'); r = document.getElementById('playBar'); }
  const top = SYS_TOPS[b.sys], y1 = top - 40, y2 = top + L.trackY + L.trackH;
  r.setAttribute('x', b.geo.barX + 1); r.setAttribute('y', y1); r.setAttribute('width', b.geo.bw - 2); r.setAttribute('height', y2 - y1);
  r.style.display = '';
}
function hideBar() { const r = document.getElementById('playBar'); if (r) r.style.display = 'none'; }
function barAtClick(ev) {
  const svg = document.getElementById('score'), m = svg.getScreenCTM(); if (!m || !current) return -1;
  const pt = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(m.inverse());
  for (let i = 0; i < current.bars.length; i++) {
    const b = current.bars[i], top = SYS_TOPS[b.sys];
    if (pt.x >= b.geo.barX && pt.x <= b.geo.barX + b.geo.bw && pt.y >= top - 56 && pt.y <= top - 56 + L.sysH - 14) return i;
  }
  return -1;
}

// ---------- feedback ----------
let hl = null, hlg = null, hll = null, lastSys = -1;
function showFeedback(e) {
  document.getElementById('fbBar').textContent = `${e.bar.idx + 1}${e.chord ? ` (${e.chord})` : ''}`;
  document.getElementById('fbNote').textContent = `${noteName(e.pitch)} (${posName(e.pitch.step)})`;
  document.getElementById('fbFret').textContent = fingeringText(e.pitch.playMidi);
  document.getElementById('fbOct').textContent = e.pitch.shift ? '↑ 8ª acima do escrito' : '';
}
function clearFeedback() {
  ['fbBar', 'fbNote', 'fbFret'].forEach(id => document.getElementById(id).textContent = '-');
  document.getElementById('fbOct').textContent = '';
  unhighlight();
}
function highlight(e) {
  unhighlight(); showCount('');
  hl = document.getElementById(e.id); hl && hl.classList.add('playing');
  hlg = document.getElementById(e.id + 'g'); hlg && hlg.classList.add('playing');
  hll = document.getElementById(e.id + 'l') || document.getElementById((e.tiedFrom && e.tiedFrom.id || '') + 'l'); hll && hll.classList.add('playing');
  showFeedback(e);
  if (e.sys !== lastSys) { lastSys = e.sys; followLine(e.sys); }
}
// ---------- rolagem ----------
// Regra: a linha tocada fica sempre na mesma posição da tela (2ª linha visível, ou 1ª se a tela for pequena),
// então a folha anda exatamente UMA linha por vez, com movimento lento e suave. Nada de pulo maior que isso.
let scrollAnim = 0;
function stopScrollAnim() { if (scrollAnim) { cancelAnimationFrame(scrollAnim); scrollAnim = 0; } }
['wheel', 'touchstart', 'mousedown'].forEach(ev => window.addEventListener(ev, stopScrollAnim, { passive: true }));
window.addEventListener('keydown', e => { if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') stopScrollAnim(); }, { passive: true });
// animação suave até uma posição (easeInOut, sem trancos)
function animateScrollTo(to, dur) {
  const from = window.pageYOffset;
  if (Math.abs(to - from) < 2) return;
  const t0 = performance.now();
  stopScrollAnim();
  const ease = x => x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  const tick = now => {
    const x = Math.min(1, (now - t0) / dur);
    window.scrollTo(0, from + (to - from) * ease(x));
    scrollAnim = x < 1 ? requestAnimationFrame(tick) : 0;
  };
  scrollAnim = requestAnimationFrame(tick);
}
// modo "3 linhas": a folha anda de 3 em 3 linhas. A virada começa no ÚLTIMO compasso da 3ª linha
// (agendada em startPlayback), devagar, pra dar tempo de acompanhar com o olho.
// tamanho da pagina conforme a opcao de rolagem: p2 = 2 linhas, pagina = 3 linhas (0 = outro modo)
const pageSize = () => { const m = document.getElementById('scrollMode'); return m ? ({ p2: 2, pagina: 3 }[m.value] || 0) : 3; };
let shownPage = -1;
const pageOf = s => Math.floor(s / (pageSize() || 3));
// altura que a barra de controles ocupa no topo da tela (0 quando ela não gruda, como no celular)
function stickyTop() { const tb = document.querySelector('.topbar'); return (getComputedStyle(tb).position === 'sticky' ? tb.offsetHeight : 0) + 6; }
function glideToPage(p, dur) {
  shownPage = p;
  const sr = document.getElementById('score').getBoundingClientRect(), k = sr.width / L.width;
  const topLimit = stickyTop();
  const lineTop = sr.top + (SYS_TOPS[p * (pageSize() || 3)] - 56) * k;     // 56 = folga p/ cifras e casas 1./2.
  const to = Math.max(0, window.pageYOffset + lineTop - topLimit);
  if (Math.abs(to - window.pageYOffset) < 4) return;
  animateScrollTo(to, dur);
}
function followLine(s, dur = 1500) {
  const modeEl = document.getElementById('scrollMode'), mode = modeEl ? modeEl.value : 'pagina';
  if (mode === 'manual') return;
  if (pageSize()) { if (pageOf(s) !== shownPage) glideToPage(pageOf(s), dur); return; }
  // "linha a linha": a linha tocada fica sempre na mesma posição da tela (2ª linha visível, ou 1ª se a tela for pequena)
  const sr = document.getElementById('score').getBoundingClientRect();
  const k = sr.width / L.width, step = L.sysH * k;
  const topLimit = stickyTop();   // altura da barra fixa (ela gruda no topo ao rolar)
  const rows = Math.max(1, Math.floor((innerHeight - topLimit) / step));
  const anchor = rows >= 3 ? 1 : 0;
  const lineTop = sr.top + (SYS_TOPS[s] - 56) * k;
  const delta = lineTop - (topLimit + anchor * step);
  if (delta < step * 0.3 && delta > -step * 0.6) return;     // já está bem posicionada: não mexe
  animateScrollTo(Math.max(0, window.pageYOffset + delta), Math.min(1100, 600 + Math.abs(delta) * 0.5));
}

function unhighlight() {
  if (hl) { hl.classList.remove('playing'); hl = null; }
  if (hlg) { hlg.classList.remove('playing'); hlg = null; }
  if (hll) { hll.classList.remove('playing'); hll = null; }
}

// ---------- áudio ----------
let cavaco, click, playing = false, firstLap = true, reverb, soundFilter, soundBody;
// timbres: 'natural' toca a gravação crua (sem reverb, sem filtro, a corda ressoa até acabar);
// 'suave' = natural com os agudos domados e um pouco mais de corpo; 'antigo' = versão de antes
const SOUNDS = {
  natural: { wet: 0,    lp: 18000, body: 0, release: 1.4,  vol: -4 },
  suave:   { wet: 0,    lp: 3200,  body: 4, release: 1.2,  vol: -2 },
  antigo:  { wet: 0.18, lp: 5200,  body: 0, release: 0.35, vol: -4 }
};
function applySound() {
  if (!cavaco) return;
  let m = 'natural'; try { m = localStorage.getItem('cavaco.som') || 'natural'; } catch (e) {}
  if (!SOUNDS[m]) m = 'natural';
  const S = SOUNDS[m], sel = $('soundSel'); if (sel) sel.value = m;
  reverb.wet.value = S.wet; soundFilter.frequency.value = S.lp; soundBody.gain.value = S.body;
  cavaco.release = S.release; cavaco.volume.value = S.vol;
}
const $ = id => document.getElementById(id);

function initAudio() {
  if (typeof Tone === 'undefined') { showError('Tone.js não carregou (sem internet?). A partitura aparece, mas sem som.'); return; }
  reverb = new Tone.Reverb({ decay: 0.8, wet: 0 }).toDestination();
  soundFilter = new Tone.Filter({ frequency: 18000, type: 'lowpass', rolloff: -12 }).connect(reverb);
  soundBody = new Tone.Filter({ frequency: 350, type: 'lowshelf', gain: 0 }).connect(soundFilter);
  // gravações de cada nota (opcional): samples_sync/notas/notas.json lista as notas gravadas; cada uma toca CRUA, sem esticar/encolher o som.
  // Notas que não estão lá continuam saindo das 4 cordas soltas.
  const montarSampler = notas => {
  cavaco = new Tone.Sampler({
    urls: Object.assign({ D5: 'D1.wav', B4: 'B2.wav', G4: 'G3.wav', D4: 'D4.wav' }, notas),
    baseUrl: './samples_sync/',   // gravações com o silêncio do início cortado: o ataque de todas as cordas cai junto com o clique
    release: 0.35,
    onload: () => { $('loading').style.display = 'none'; $('playBtn').style.display = 'inline-block'; $('restartBtn').style.display = 'inline-block'; },
    onerror: () => { $('loading').style.display = 'none';
      showError('Não consegui carregar os timbres da pasta samples_sync/. Se abriu o arquivo direto do disco (file://), abra por um servidor local: na pasta do projeto, rode  python3 -m http.server  e acesse http://localhost:8000/index_v2.html'); }
  }).connect(soundBody);
  cavaco.volume.value = -4;
  applySound();
  };
  fetch('./samples_sync/notas/notas.json').then(r => r.ok ? r.json() : {}).catch(() => ({}))
    .then(man => { const n = {}; Object.keys(man).forEach(k => { n[k] = 'notas/' + man[k]; }); montarSampler(n); });
  click = new Tone.Synth({ oscillator: { type: 'sine' }, envelope: { attack: 0.001, decay: 0.02, sustain: 0, release: 0.01 } }).toDestination();
  applyMetroVol();
}
// volume do metrônomo: 0 = mudo; 1..100 vai de -40 dB a +6 dB (65 ≈ -10 dB, o padrão de antes)
function applyMetroVol() {
  if (!click) return;
  const v = +$('metroVol').value;
  click.mute = v === 0; if (v > 0) click.volume.value = -40 + (v / 100) * 46;
}
const quarterBpm = beatBpm => beatBpm * 4 / current.piece.timeSig[1];   // Tone.Transport.bpm é em semínimas

function startPlayback() {
  const T = Tone.Transport, tk = T.PPQ / 4;                              // ticks por semicolcheia
  clearArmed();
  T.stop(); T.cancel(); Tone.Draw.cancel(0);
  T.bpm.value = quarterBpm(+$('bpm').value || 60);
  const { bars, slots, beat } = current;
  const order = playOrder(bars, startBar);
  const nBeats = slots / beat;
  const pickupStart = !!bars[order[0]].pickup;                           // anacruse: o compasso "virtual" dela já é a contagem
  const off = pickupStart ? 0 : slots;                                   // contagem = 1 compasso (em 2/4: "1, 0"), em semicolcheias
  const tick = s => `${Math.round(s * tk)}i`;
  const count = (at, idx) => T.schedule(time => {                        // contagem regressiva: sempre audível, mesmo sem metrônomo
    click.triggerAttackRelease(idx === 0 ? 'C6' : 'G5', '32n', time);
    Tone.Draw.schedule(() => { if (playing) showCount(nBeats - 1 - idx); }, time);
  }, tick(at));
  if (!pickupStart) {
    for (let b = 0; b < nBeats; b++) count(b * beat, b);
    T.schedule(time => Tone.Draw.schedule(() => { if (playing) showCount(''); }, time), tick(off));
  }
  shownPage = -1;
  firstLap = true;
  const lead = pickupStart ? slots - bars[order[0]].len : 0;            // anacruse: silêncio antes das notas dela (só na 1ª volta)
  const loopOn = $('loop').checked;
  order.forEach((bi, k) => {
    const base = off + k * slots;
    const nextBi = k + 1 < order.length ? order[k + 1] : (loopOn ? order[0] : -1);
    T.schedule(time => Tone.Draw.schedule(() => {
      if (!playing) return;
      markBar(bi);
      // modo N linhas: se o proximo compasso ja e de outra pagina, vira agora (decidido na hora, entao trocar a opcao durante a musica funciona)
      if (nextBi >= 0 && pageSize() && pageOf(bars[nextBi].sys) !== pageOf(bars[bi].sys)) {
        const barMs = slots * 60 / T.bpm.value / 4 * 1000;
        glideToPage(pageOf(bars[nextBi].sys), Math.max(1500, Math.min(2400, barMs)));
      }
    }, time), tick(base + (pickupStart && k === 0 ? lead : 0)));
    for (let b = 0; b < slots; b += beat) {
      if (pickupStart && k === 0) T.schedule(time => {                              // o compasso virtual da anacruse é a contagem (só na 1ª volta; depois vira metrônomo)
        if (firstLap) { click.triggerAttackRelease(b === 0 ? 'C6' : 'G5', '32n', time); Tone.Draw.schedule(() => { if (playing) showCount(nBeats - 1 - b / beat); }, time); }
        else if ($('metro').checked) click.triggerAttackRelease(b === 0 ? 'C6' : 'G5', '32n', time);
      }, tick(base + b));
      else T.schedule(time => { if ($('metro').checked) click.triggerAttackRelease(b === 0 ? 'C6' : 'G5', '32n', time); }, tick(base + b));
    }
    const prevBi = k > 0 ? order[k - 1] : -1;
    bars[bi].evs.forEach(e => {
      if (e.rest) return;
      // nota ligada: só a primeira ataca, com a duração somada (a ligadura só vale se o compasso de origem toca logo antes)
      const attack = !(e.tiedFrom && (e.tiedFrom.bar.idx === bi || e.tiedFrom.bar.idx === prevBi));
      let sound = e.d;
      if (attack) {
        let c = e, kk = k;
        while (c.tieNext) {
          const nx = c.tieNext;
          if (nx.bar.idx !== c.bar.idx) { if (order[kk + 1] !== nx.bar.idx) break; kk++; }
          sound += nx.d; c = nx;
        }
      }
      T.schedule(time => {
        if (attack) {
          const sec = sound * 60 / T.bpm.value / 4;
          const vel = (Math.abs(e.tp % beat) < 1e-6 ? 0.95 : 0.80) + Math.random() * 0.08;
          cavaco.triggerAttackRelease(e.pitch.playName, sec, time + (Math.random() * 0.006 - 0.003), vel);
        }
        Tone.Draw.schedule(() => { if (playing) highlight(e); }, time);
      }, tick(base + e.tp));
    });
  });
  const total = order.length * slots;
  T.loop = $('loop').checked; T.loopStart = tick(off + lead); T.loopEnd = tick(off + total);   // ao voltar, sem contagem: o recomeço obedece às pausas do fim da peça
  T.schedule(() => { firstLap = false; }, tick(off + slots));
  if (pickupStart) T.schedule(time => Tone.Draw.schedule(() => { if (playing) showCount(''); }, time), tick(lead + 1));
  T.schedule(time => { if (!T.loop) Tone.Draw.schedule(stopPlayback, time); }, tick(off + total));
  lastSys = -1; playing = true; showCount('');
  markBar(order[0]);
  followLine(bars[order[0]].sys, 1200);
  $('playBtn').textContent = 'Pause'; $('playBtn').style.background = '#f59e0b';
  T.start('+0.05');
}
function stopPlayback() {
  if (typeof Tone !== 'undefined') { Tone.Transport.stop(); Tone.Transport.cancel(); Tone.Draw.cancel(0); }
  playing = false;
  lastSys = -1; unhighlight(); showCount(''); hideBar(); armStart();
  $('playBtn').textContent = 'Play'; $('playBtn').style.background = '#10b981';
}

// usado por importar.js: confere uma peça nova com as mesmas regras do motor antes de guardá-la
window.validarPeca = function (p) {
  const slots = 16 * p.timeSig[0] / p.timeSig[1], probs = [], parsed = [];
  p.bars.forEach((b, i) => { try { parsed.push(parseBar(b, i, slots)); } catch (e) { probs.push(e.message); } });
  if (!probs.length) { try { linkTies(parsed); } catch (e) { probs.push(e.message); } }
  return probs;
};

// ---------- erro visível ----------
function showError(msg) { const el = $('error'); el.textContent = msg; el.hidden = false; }

// ---------- partida ----------
function loadPiece(i) {
  if (playing) stopPlayback();
  try { $('error').hidden = true; render(window.PIECES[i]); }
  catch (err) { showError(err.message); console.error(err); }
}
document.addEventListener('DOMContentLoaded', () => {
  const sel = $('pieceSel');
  window.PIECES.forEach((p, i) => sel.add(new Option(`${i + 1}. ` + p.title + (p.note ? ` — ${p.note}` : ''), i)));
  const list = $('pieceList');
  window.PIECES.forEach((p, i) => {
    const b = document.createElement('button'); b.className = 'pitem'; b.dataset.i = i; b.title = `${p.title} — ${p.composer}`;
    b.innerHTML = `<span class="n">${i + 1}</span><span class="t"><span>${p.title}</span><span class="c">${'●'.repeat(p.level || 1)}${'○'.repeat(5 - (p.level || 1))}</span></span>`;
    b.addEventListener('click', () => { goPiece(i); b.blur(); });
    list.appendChild(b);
  });
  function goPiece(i) {
    if (i < 0 || i >= window.PIECES.length) return;
    sel.value = i; loadPiece(i); window.scrollTo(0, 0);
    list.querySelectorAll('.pitem').forEach(b => b.classList.toggle('on', +b.dataset.i === i));
    const on = list.querySelector('.pitem.on'); if (on) on.scrollIntoView({ block: 'nearest' });
    const P = window.PIECES, pv = $('prevPiece'), nx = $('nextPiece');
    pv.disabled = i === 0; nx.disabled = i === P.length - 1;
    pv.querySelector('small').textContent = i > 0 ? P[i - 1].title : ''; nx.querySelector('small').textContent = i < P.length - 1 ? P[i + 1].title : '';
    pv.dataset.to = i - 1; nx.dataset.to = i + 1;
  }
  ['prevPiece', 'nextPiece'].forEach(id => $(id).addEventListener('click', () => { goPiece(+$(id).dataset.to); $(id).blur(); }));
  sel.addEventListener('change', () => goPiece(+sel.value));
  goPiece(window.__abrir || 0);
  initAudio();
  if ($('fabPlay')) { $('fabPlay').addEventListener('click', () => { $('fabPlay').blur(); $('playBtn').click(); }); new MutationObserver(() => { $('fabPlay').textContent = $('playBtn').textContent === 'Pause' ? '⏸' : '▶'; $('fabPlay').classList.toggle('on', $('playBtn').textContent === 'Pause'); }).observe($('playBtn'), { childList: true, characterData: true, subtree: true }); }
  $('menuBtn').addEventListener('click', ev => { ev.stopPropagation(); $('side').classList.toggle('open'); $('menuBtn').blur(); });
  document.addEventListener('click', ev => { if (!ev.target.closest('#side')) $('side').classList.remove('open'); });
  $('pieceList').addEventListener('click', () => $('side').classList.remove('open'));
  window.addEventListener('orientationchange', () => window.dispatchEvent(new Event('resize')));

  $('playBtn').addEventListener('click', () => togglePause());
  $('restartBtn').addEventListener('click', () => restartFromStart());
  if ($('fabRestart')) $('fabRestart').addEventListener('click', () => { $('fabRestart').blur(); restartFromStart(); });
  $('bpm').addEventListener('input', () => {
    const v = +$('bpm').value;
    if (typeof Tone !== 'undefined' && v >= 20 && v <= 240 && current) Tone.Transport.bpm.value = quarterBpm(v);
  });
  const stepBpm = d => { $('bpm').value = Math.max(20, Math.min(240, (+$('bpm').value || 55) + d)); $('bpm').dispatchEvent(new Event('input')); };
  [['bpmDown', -1], ['bpmUp', 1]].forEach(([id, d]) => {                  // clique = ±1; segurando, repete
    const btn = $(id); let wait = 0, rep = 0;
    const stop = () => { clearTimeout(wait); clearInterval(rep); };
    btn.addEventListener('pointerdown', ev => { ev.preventDefault(); stepBpm(d); wait = setTimeout(() => { rep = setInterval(() => stepBpm(d), 90); }, 380); });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(n => btn.addEventListener(n, stop));
    btn.addEventListener('click', ev => { if (ev.detail === 0) stepBpm(d); });   // teclado
  });
  $('metroVol').addEventListener('input', applyMetroVol);
  $('soundSel').addEventListener('change', () => { try { localStorage.setItem('cavaco.som', $('soundSel').value); } catch (e) {} applySound(); try { cavaco.triggerAttackRelease('G4', 0.6); } catch (e) {} });
  const setStart = i => { startBar = i; updateStartUi(); if (playing) { stopPlayback(); startPlayback(); } };
  // ← / → : volta / avança um compasso (Shift: uma linha). Tocando, recomeça dali (espera 0,45 s pra juntar vários toques).
  let resumeTimer = 0;
  const firstBarOfLine = s => current.bars.findIndex(b => b.sys === s);
  const reveal = bi => {                                    // mostra o compasso escolhido quando está parado
    const s = current.bars[bi].sys, mode = $('scrollMode').value;
    if (pageSize()) glideToPage(pageOf(s), 700); else if (mode === 'suave') followLine(s);
  };
  document.addEventListener('keydown', ev => {
    if ((ev.key !== 'ArrowLeft' && ev.key !== 'ArrowRight') || ev.ctrlKey || ev.metaKey || ev.altKey || !current) return;
    const a = document.activeElement;
    if (a && (a.tagName === 'SELECT' || a.tagName === 'TEXTAREA' || (a.tagName === 'INPUT' && a.type !== 'checkbox'))) return;
    ev.preventDefault();
    const dir = ev.key === 'ArrowLeft' ? -1 : 1, bars = current.bars, from = playing ? curBar : startBar;
    let target;
    if (ev.shiftKey) {
      const s = bars[from].sys;
      if (dir < 0) target = from > firstBarOfLine(s) ? firstBarOfLine(s) : (s > 0 ? firstBarOfLine(s - 1) : 0);
      else { const nx = firstBarOfLine(s + 1); target = nx >= 0 ? nx : from; }
    } else target = Math.max(0, Math.min(bars.length - 1, from + dir));
    const wasPlaying = playing || resumeTimer;
    if (playing) stopPlayback();
    startBar = target; updateStartUi(); reveal(target);
    if (wasPlaying) { clearTimeout(resumeTimer); resumeTimer = setTimeout(() => { resumeTimer = 0; startPlayback(); }, 450); }
  });
  // Play/Pause (botão e Espaço): pausando, a marca "Começar em" vai pro compasso onde parou; continuando, volta dali (com a contagem).
  async function togglePause() {
    if (typeof Tone === 'undefined' || !cavaco || $('playBtn').style.display === 'none') return;
    await Tone.start();
    if (playing || resumeTimer) {
      clearTimeout(resumeTimer); resumeTimer = 0;
      if (playing) { startBar = curBar; stopPlayback(); updateStartUi(); }
    } else startPlayback();
  }
  // Reiniciar (botão e Backspace/Delete): toca do compasso 1 na hora.
  async function restartFromStart() {
    if (typeof Tone === 'undefined' || !cavaco || $('playBtn').style.display === 'none') return;
    await Tone.start();
    clearTimeout(resumeTimer); resumeTimer = 0;
    if (playing) stopPlayback();
    startBar = 0; updateStartUi(); startPlayback();
  }
  document.addEventListener('keydown', ev => {
    const space = ev.key === ' ', back = ev.key === 'Backspace' || ev.key === 'Delete';   // no Mac a tecla "delete" chega como Backspace
    if ((!space && !back) || ev.repeat || ev.ctrlKey || ev.metaKey || ev.altKey || !current) return;
    const a = document.activeElement;
    if (a && (a.tagName === 'SELECT' || a.tagName === 'TEXTAREA' || (a.tagName === 'INPUT' && a.type !== 'checkbox'))) return;
    ev.preventDefault();
    if (a && a !== document.body) a.blur();
    space ? togglePause() : restartFromStart();
  });
  // tira o foco de seletores/campos depois de usar, pra as setas voltarem a navegar pela partitura
  $('scrollMode').addEventListener('change', () => { shownPage = -1; if (playing) followLine(current.bars[curBar].sys, 900); });
  ['pieceSel', 'scrollMode', 'metroVol', 'soundSel'].forEach(id => $(id).addEventListener('change', () => $(id).blur()));
  $('bpm').addEventListener('keydown', ev => { if (ev.key === 'Enter') $('bpm').blur(); });
  $('startReset').addEventListener('click', () => setStart(0));
  let rsz = 0;                                                         // janela/zoom mudou: refaz a folha na largura nova (se não estiver tocando)
  window.addEventListener('resize', () => { clearTimeout(rsz); rsz = setTimeout(() => {
    const card = document.querySelector('.sheet-card'); if (!card || !current || playing) return;
    const W = Math.max(260, Math.min(1700, cardInnerW(card)));
    if (Math.abs(W - L.width) < 12) return;
    const sb = startBar; render(current.piece); startBar = sb; updateStartUi();
  }, 250); });
  $('loop').addEventListener('change', () => { if (typeof Tone !== 'undefined') Tone.Transport.loop = $('loop').checked; });
  $('score').addEventListener('click', async ev => {
    const i = ev.target.dataset && ev.target.dataset.i;
    if (document.activeElement && document.activeElement !== document.body) document.activeElement.blur();
    if (i === undefined) {                                               // clique fora de nota = escolher compasso inicial
      const bi = barAtClick(ev); if (bi < 0) return;
      if (bi === startBar && bi > 0) { startBar = 0; updateStartUi(); return; }   // clicar de novo no compasso marcado desmarca (tocando, a música segue sem reiniciar)
      setStart(bi); return;
    }
    if (!cavaco) return;
    await Tone.start();
    const e = NOTES[+i];
    cavaco.triggerAttackRelease(e.pitch.playName, 0.6);
    highlight(e); setTimeout(unhighlight, 450);
  });
});

window.Leitor = { linkTies, keyMap, startBarSet: i => { startBar = i; updateStartUi(); }, followLine, parsePitch, parseBar, playOrder, fingeringText, fingeringFor, posName, render };
})();
