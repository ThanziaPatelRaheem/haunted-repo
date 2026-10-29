import express from "express";
import cors from "cors";
import repoRoutes from "./routes/repoRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/api/status", (req, res) => {
  res.json({ message: "Hanted Repo API is alive 👻" });
});
app.use("/api/repos", repoRoutes);
app.use("/api/ai", aiRoutes);

export default app;
