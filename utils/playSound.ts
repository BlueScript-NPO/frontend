// playSound.ts

// Declare variables for AudioContext and cache
let audioContext: AudioContext | null = null;
const audioBufferCache: { [key: string]: AudioBuffer } = {};

// List of audio files to preload (without extension)
export const audioFiles = [
  "backspace",
  "click",
  "correct",
  "countdown",
  "finish",
  "incorrect",
  "ready",
  "start",
];

// Check if the code is running on the client side
const isClient = typeof window !== "undefined";

// Initialize AudioContext only in the browser
if (isClient) {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  } catch (error) {
    console.error("Failed to initialize AudioContext:", error);
  }
}

// Function to preload all audio files
export async function preloadAudioFiles(
  onProgress?: (loaded: number, total: number) => void
): Promise<void> {
  if (!isClient || !audioContext) {
    console.error(
      "AudioContext is not available. Ensure this code runs in the browser."
    );
    return;
  }

  const totalFiles = audioFiles.length;
  let loadedFiles = 0;

  // Load each audio file and cache it
  await Promise.all(
    audioFiles.map(async (filename) => {
      if (!audioBufferCache[filename]) {
        try {
          const response = await fetch(`/audio/${filename}.wav`);
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          audioBufferCache[filename] = audioBuffer;
          loadedFiles++;
          if (onProgress) {
            onProgress(loadedFiles, totalFiles);
          }
        } catch (error) {
          console.error(`Error loading ${filename}:`, error);
          throw error;
        }
      } else {
        loadedFiles++;
        if (onProgress) {
          onProgress(loadedFiles, totalFiles);
        }
      }
    })
  );
}

// Function to play a sound using the cached audio buffer
export async function playSound(filename: string, volume = 100) {
  if (!isClient || !audioContext) {
    console.error("AudioContext is not supported or not available.");
    return;
  }

  try {
    if (!audioBufferCache[filename]) {
      console.error(
        `Audio buffer for ${filename} not found. Make sure to preload the audio files.`
      );
      return;
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
