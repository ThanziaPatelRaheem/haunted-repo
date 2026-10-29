import { getDeletedFiles, getDeletedFileContent } from "../utils/gitScanner.js";

export async function scanRepository(req, res) {
  try {
    const { repoPath } = req.body;

    if (typeof repoPath !== "string" || !repoPath.trim()) {
      return res.status(400).json({
        message: "A valid repository path is required",
      });
    }

    const deletedFiles = await getDeletedFiles(repoPath.trim());

    return res.status(200).json({
      success: true,
      count: deletedFiles.length,
      deletedFiles,
    });
  } catch (error) {
    console.error("Repository scan failed:", error.message);

    return res.status(400).json({
      success: false,
      message: "Unable to scan repository. Check the path and Git history.",
    });
  }
}

export async function getDeletedFileSourceCode(req, res) {
  try {
    const { repoPath, filePath } = req.body;

    if (
      typeof repoPath !== "string" ||
      !repoPath.trim() ||
      typeof filePath !== "string" ||
      !filePath.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Repository path and file path are required",
      });
    }

    const file = await getDeletedFileContent(repoPath.trim(), filePath.trim());

    return res.status(200).json({
      success: true,
      file,
    });
  } catch (error) {
    console.error("Falied to retrive deleted file:", error.message);

    return res.status(400).json({
      success: false,
      message: "Unable to retrieve deleted file content",
    });
  }
}
