import { useEffect, useRef, useState } from "react";
import playGhostLaugh from "../utils/playGhostLaugh";

export default function useGhostNarrator() {
  const [readingGhostStory, setReadingGhostStory] = useState(false);
  const [ghostStoryPaused, setGhostStoryPaused] = useState(false);

  const currentSpeechRef = useRef(null);
  const narrationSessionRef = useRef(0);

  useEffect(() => {
    return () => {
      narrationSessionRef.current += 1;
      window.speechSynthesis?.cancel();
    };
  }, []);

  const stopReadingGhostStory = () => {
    narrationSessionRef.current += 1;

    window.speechSynthesis.cancel();
    currentSpeechRef.current = null;

    setReadingGhostStory(false);
    setGhostStoryPaused(false);
  };

  const readGhostStory = async (storyText) => {
    if (!storyText?.trim()) return;

    if (!("speechSynthesis" in window)) return;

    if (currentSpeechRef.current) return;

    const narrationSession = ++narrationSessionRef.current;

    window.speechSynthesis.cancel();
    setReadingGhostStory(true);
    setGhostStoryPaused(false);

    const cleanStoryText = storyText

      // Remove complete ISO date-time values
      .replace(
        /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?\b/gi,
        "",
      )
      // Remove timezone labels and offsets
      .replace(/\b(?:UTC|GMT)\s*[+-]\d{1,2}:\d{2}\b/gi, "")
      .replace(/(?<![\w:])[+-]\d{1,2}:\d{2}\b/g, "")

      // Remove timestamps such as 18:44:48 or 09:30
      .replace(/\b\d{1,2}:\d{2}(?::\d{2})?\b/g, "")

      // Remove file paths such as src/oldAuth.js
      .replace(/\b(?:[\w.-]+\/)+[\w.-]+\b/g, "")

      // Remove common Markdown formatting
      .replace(/[*_`#]/g, "")

      // Clean extra spaces
      .replace(/[ \t]{2,}/g, " ")
      .trim();

    if (!cleanStoryText) return;

    const speech = new SpeechSynthesisUtterance(cleanStoryText);
    speech.rate = 0.89;
    speech.pitch = 0.2;
    speech.volume = 1;

    currentSpeechRef.current = speech;

    speech.onend = () => {
      if (currentSpeechRef.current !== speech) return;

      currentSpeechRef.current = null;
      setReadingGhostStory(false);
      setGhostStoryPaused(false);
    };

    speech.onerror = () => {
      if (currentSpeechRef.current !== speech) return;

      currentSpeechRef.current = null;
      setReadingGhostStory(false);
      setGhostStoryPaused(false);
    };

    // Play the corrupted digital laugh before narration
    await playGhostLaugh();

    if (narrationSessionRef.current !== narrationSession) return;

    window.speechSynthesis.speak(speech);
  };

  const pauseGhostStory = () => {
    window.speechSynthesis.pause();
    setGhostStoryPaused(true);
  };

  const resumeGhostStory = () => {
    window.speechSynthesis.resume();
    setGhostStoryPaused(false);
  };

  return {
    readingGhostStory,
    ghostStoryPaused,
    readGhostStory,
    pauseGhostStory,
    resumeGhostStory,
    stopReadingGhostStory,
  };
}
