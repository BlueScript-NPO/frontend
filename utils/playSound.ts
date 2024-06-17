// utils/playSound.ts
export function playSound(filename: string, volume = 100) {
  const audio = new Audio(`/audio/${filename}.wav`);
  audio.volume = volume / 100;
  audio.play();
}
