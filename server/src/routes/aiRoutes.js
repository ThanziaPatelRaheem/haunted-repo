import express from "express";
import { analyzeCode, createGhostStory } from "../controllers/aiController.js";

const router = express.Router();

router.post("/analyze", analyzeCode);
router.post("/ghost-story", createGhostStory);

export default router;
