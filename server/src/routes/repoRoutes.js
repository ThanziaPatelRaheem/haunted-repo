import express from "express";
import {
  scanRepository,
  getDeletedFileSourceCode,
} from "../controllers/repoController.js";

const router = express.Router();

router.post("/deleted-files", scanRepository);
router.post("/deleted-file-content", getDeletedFileSourceCode);

export default router;
