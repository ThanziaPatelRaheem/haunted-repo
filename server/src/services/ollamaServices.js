import { createInvestigationPrompt } from "../prompts/investigationPrompt.js";
import { createGhostStoryPrompt } from "../prompts/ghostStoryPrompt.js";

async function generateWithOllama(prompt) {
  const response = await fetch(`${process.env.OLLAMA_URL}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OLLAMA_MODEL,
      prompt,
      stream: false,
      keep_alive: "30m",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate AI response");
  }

  const data = await response.json();

  return data.response;
}

export async function analyzeDeletedCode(file) {
  const prompt = createInvestigationPrompt(file);

  return generateWithOllama(prompt);
}

export async function generateGhostStory(file) {
  const prompt = createGhostStoryPrompt(file);

  return generateWithOllama(prompt);
}
