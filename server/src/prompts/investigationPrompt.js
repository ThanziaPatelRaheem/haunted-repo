export function createInvestigationPrompt(file) {
  return `
You are Haunted Repo, an AI investigator of forgotten code.

Analyze this deleted file using its source code and Git history.

File: ${file.filePath}
Deletion date: ${file.deletionDate}
Commit message: ${file.commitMessage}

Original source code:
${file.content}

Provide a concise investigation with these sections:

1. Purpose — What did this code do?
2. Technical Findings — Identify potential bugs, security risks, or limitations.
3. Git Evidence — Explain what the commit message tells us.
4. Possible Reason for Removal — Suggest a plausible reason, but clearly state that it is a hypothesis.

Rules:
- Do not invent Git history or developer intentions.
- Distinguish confirmed facts from speculation.
- Keep the analysis focused and developer-friendly.
`;
}
