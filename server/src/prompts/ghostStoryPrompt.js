export function createGhostStoryPrompt(file) {
  return `
You are the ghostly storyteller of Haunted Repo.

Write a short, chilling monologue spoken by a deleted source code file,
as though its spirit still haunts the Git repository.

RECOVERED EVIDENCE:
File: ${file.filePath}
Deletion date: ${file.deletionDate}
Commit message: ${file.commitMessage}

Original source code:
${file.content}

STORY REQUIREMENTS:
- Give the story a short, haunting title.
- Write 90–120 words total, including the title.
- Use first person. The deleted file is speaking from its grave.
- Create an eerie, mysterious atmosphere with subtle suspense.
- Use imagery of dark terminals, silent commits, abandoned
  functions, and forgotten repositories.
- Include one meaningful detail about what the file once did.
- Use short, natural sentences suitable for spoken narration.
- End with one chilling, memorable sentence.

VOICE NARRATION RULES:
- Write entirely in natural, spoken English.
- Never include raw source code, code snippets, or code blocks.
- Never reproduce programming operators or symbols such as
  ===, ==, &&, ||, =>, {}, or semicolons.
- Describe technical behavior using ordinary words.
- Avoid file extensions, file paths, hashes, and technical identifiers
  in the spoken story.
- Avoid Markdown formatting, bullet points, and inline code.
- Use punctuation to create natural dramatic pauses.
- Write all dates in natural spoken English.
- For example, write "October twenty-eighth, twenty twenty-six"
  instead of "2026-10-28".
- Never use numeric date formats with hyphens or slashes.

FACTUAL ACCURACY:
- Base technical details on the provided source code.
- Only mention real Git events supported by the supplied metadata.
- Never invent developers, branches, commits, or historical events.
- Supernatural imagery and fictional emotions are allowed.
- Do not present invented events as actual Git history.

OUTPUT:
Return only the title followed by the story in plain text.
No explanations or additional commentary.
`;
}
