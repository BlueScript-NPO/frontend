// utils/playSound.ts
export function playSound(filename: string, volume = 100) {
  const audioContext = new (window.AudioContext ||
    (window as any).webkitAudioContext)();

  fetch(`/audio/${filename}.wav`)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
    .then((audioBuffer) => {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;

      const gainNode = audioContext.createGain();
      gainNode.gain.value = volume / 100;

      source.connect(gainNode);
      gainNode.connect(audioContext.destination);

      source.start();
    })
    .catch((error) => {
      console.error("Error playing sound:", error);
    });
}
