export function createGhostStoryPrompt(file) {
  return `
You are the storyteller of Haunted Repo, a graveyard of forgotten code.

Create a short, atmospheric, spooky story inspired by this deleted file.

File: ${file.filePath}
Deletion date: ${file.deletionDate}
Commit message: ${file.commitMessage}

Original source code:
${file.content}

Story requirements:
- Give the story a creative, spooky title.
- Write approximately 150 words.
- Tell the story from the perspective of the deleted code.
- Include developer-themed imagery such as commits, branches, terminals, and forgotten functions.
- Make the story eerie but entertaining, not excessively frightening.
- Incorporate details from the actual source code and Git history.
- End with a memorable final line.

Important:
- This is creative fiction inspired by real Git history.
- Use only the provided Git history when mentioning actual commits,
  commit messages, dates, or branches.
- Never invent commit messages, branch names, or historical events.
- You may invent supernatural experiences, emotions, and spooky imagery
  as creative fiction.
- Make the deleted file the narrator, speaking in first person.
- Return only the story in Markdown.
`;
}
