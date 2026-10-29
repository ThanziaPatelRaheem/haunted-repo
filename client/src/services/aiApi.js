export async function analyzeDeletedCode(file, signal) {
  const response = await fetch("http://localhost:3000/api/ai/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ file }),
    signal,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to analyze deleted code");
  }

  return data.analysis;
}

export async function generateGhostStory(file, signal) {
  const response = await fetch("http://localhost:3000/api/ai/ghost-story", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ file }),
    signal,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to generate ghost story");
  }

  return data.story;
}
