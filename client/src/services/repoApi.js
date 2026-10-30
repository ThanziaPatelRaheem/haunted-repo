export async function scanRepository(repoPath) {
  let response;

  try {
    response = await fetch("http://localhost:3000/api/repos/deleted-files", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ repoPath }),
    });
  } catch {
    throw new Error("SERVER_UNAVAILABLE");
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to scan repository");
  }

  return data;
}

export async function getDeletedFileContent(repoPath, filePath) {
  const response = await fetch(
    "http://localhost:3000/api/repos/deleted-file-content",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ repoPath, filePath }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to retrieve deleted file");
  }

  return data.file;
}
