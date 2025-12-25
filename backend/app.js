import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoDb from "./config/db.js";
import { createRouter, redirectRouter } from "./routes/route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/create", createRouter);
app.use("/s", redirectRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  mongoDb();
  console.log(`Server running on port ${PORT}`);
});
