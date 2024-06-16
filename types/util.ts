// enums
export enum stimuliCharactorSets {
  Numbers = "0123456789",
  Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  Alphanumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  Korean = "ㅁㅠㅊㅇㄷㄹㅎㅗㅑㅓㅏㅣㅡㅜㅐㅔㅂㄱㄴㅅㅕㅍㅈㅋㅛㅋ",
}

// utility functions

// function that converts QWERTY keyboard strokes to Korean characters
export class KeyboardUtil {
  charMap: Map<string, string>;

  constructor() {
    this.charMap = new Map<string, string>([
      ["A", "ㅁ"],
      ["B", "ㅠ"],
      ["C", "ㅊ"],
      ["D", "ㅇ"],
      ["E", "ㄷ"],
      ["F", "ㄹ"],
      ["G", "ㅎ"],
      ["H", "ㅗ"],
      ["I", "ㅑ"],
      ["J", "ㅓ"],
      ["K", "ㅏ"],
      ["L", "ㅣ"],
      ["M", "ㅡ"],
      ["N", "ㅜ"],
      ["O", "ㅐ"],
      ["P", "ㅔ"],
      ["Q", "ㅂ"],
      ["R", "ㄱ"],
      ["S", "ㄴ"],
      ["T", "ㅅ"],
      ["U", "ㅕ"],
      ["V", "ㅍ"],
      ["W", "ㅈ"],
      ["X", "ㅋ"],
      ["Y", "ㅛ"],
      ["Z", "ㅋ"],
      ["0", "0"],
      ["1", "1"],
      ["2", "2"],
      ["3", "3"],
      ["4", "4"],
      ["5", "5"],
      ["6", "6"],
      ["7", "7"],
      ["8", "8"],
      ["9", "9"],
    ]);
  }

  strokeToKorean(char: string): string {
    if (this.charMap.has(char)) {
      return this.charMap.get(char)!;
    }
    return char;
  }
}
