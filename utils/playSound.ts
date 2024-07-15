const audioContext = new (window.AudioContext ||
  (window as any).webkitAudioContext)();
const audioBufferCache: { [key: string]: AudioBuffer } = {};

export async function playSound(filename: string, volume = 100) {
  try {
    if (!audioBufferCache[filename]) {
      const response = await fetch(`/audio/${filename}.wav`);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      audioBufferCache[filename] = audioBuffer;
    }

    const audioBuffer = audioBufferCache[filename];
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;

    const gainNode = audioContext.createGain();
    gainNode.gain.value = volume / 100;

    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

    source.start();
  } catch (error) {
    console.error("Error playing sound:", error);
  }
}
