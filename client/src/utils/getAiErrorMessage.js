export const getAIErrorMessage = (error) => {
  const message = error?.message || "";

  if (
    /ollama|econnrefused|failed to fetch|fetch failed|server_unavailable/i.test(
      message,
    )
  ) {
    return "☠ The spirits are unreachable. Check that the local backend and Ollama are running, then try again.";
  }

  return message || "☠ The spirits could not respond. Please try again.";
};
