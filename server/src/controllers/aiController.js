import {
  analyzeDeletedCode,
  generateGhostStory,
} from "../services/ollamaServices.js";

export async function analyzeCode(req, res) {
  try {
    const { file } = req.body;

    if (
      !file ||
      typeof file.content !== "string" ||
      !file.content.trim() ||
      typeof file.filePath !== "string" ||
      typeof file.deletionDate !== "string" ||
      typeof file.commitMessage !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid deleted file details are required",
      });
    }

    const analysis = await analyzeDeletedCode(file);

    return res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error("AI analysis failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to analyze deleted code",
    });
  }
}

export async function createGhostStory(req, res) {
  try {
    const { file } = req.body;

    if (
      !file ||
      typeof file.content !== "string" ||
      !file.content.trim() ||
      typeof file.filePath !== "string" ||
      typeof file.deletionDate !== "string" ||
      typeof file.commitMessage !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid deleted file details are required",
      });
    }

    const story = await generateGhostStory(file);

    return res.status(200).json({
      success: true,
      story,
    });
  } catch (error) {
    console.error("Ghost story generation failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to generate ghost story",
    });
  }
}
