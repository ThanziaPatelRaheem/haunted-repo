export default function playGhostLaugh() {
  return new Promise((resolve) => {
    const ghostLaughAudio = new Audio("/sounds/ghost-laugh.mp3");

    ghostLaughAudio.volume = 0.65;
    ghostLaughAudio.playbackRate = 0.85;

    ghostLaughAudio.onended = () => {
      resolve();
    };

    ghostLaughAudio.onerror = () => {
      resolve();
    };

    ghostLaughAudio.play().catch(() => {
      resolve();
    });
  });
}
