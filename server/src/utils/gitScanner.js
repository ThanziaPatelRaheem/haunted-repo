import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export async function getDeletedFiles(repoPath) {
  // Check whether the supplied path is a Git repository
  const { stdout: root } = await execFileAsync(
    "git",
    ["rev-parse", "--show-toplevel"],
    { cwd: repoPath },
  );

  const repositoryRoot = root.trim();

  // Find files deleted in Git history
  const { stdout } = await execFileAsync(
    "git",
    ["log", "--diff-filter=D", "--name-only", "--pretty=format:"],
    {
      cwd: repositoryRoot,
      maxBuffer: 10 * 1024 * 1024,
    },
  );

  const deletedOldFiles = [
    ...new Set(
      stdout
        .split("\n")
        .map((file) => file.trim())
        .filter(Boolean),
    ),
  ];

  const { stdout: trackedFilesOutput } = await execFileAsync(
    "git",
    ["ls-files", "-z"],
    {
      cwd: repositoryRoot,
      timeout: 10000,
    },
  );

  const trackedFiles = new Set(trackedFilesOutput.split("\0").filter(Boolean));

  const deletedFiles = deletedOldFiles.filter(
    (file) => !trackedFiles.has(file),
  );

  return deletedFiles;
}

export async function getDeletedFileContent(repoPath, filePath) {
  const { stdout: root } = await execFileAsync(
    "git",
    ["rev-parse", "--show-toplevel"],
    { cwd: repoPath },
  );

  const repositoryRoot = root.trim();

  // Find the commit that deleted this file
  const { stdout: commitOutput } = await execFileAsync(
    "git",
    ["log", "-1", "--diff-filter=D", "--format=%H%n%aI%n%s", "--", filePath],
    { cwd: repositoryRoot },
  );

  const [deletionCommit, deletionDate, commitMessage] = commitOutput
    .trim()
    .split("\n");

  if (!deletionCommit) {
    throw new Error("No deletion commit found for this file");
  }

  // Retrieve the file from before its deletion
  const { stdout: content } = await execFileAsync(
    "git",
    ["show", `${deletionCommit}^:${filePath}`],
    {
      cwd: repositoryRoot,
      maxBuffer: 10 * 1024 * 1024,
    },
  );

  return {
    filePath,
    deletionCommit,
    deletionDate,
    commitMessage,
    content,
  };
}
