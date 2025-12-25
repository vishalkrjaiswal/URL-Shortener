import express from "express";
import { createurl, sh_url } from "../controllers/url.controller.js";

const createRouter = express.Router();
createRouter.post("/", createurl);

const redirectRouter = express.Router();
redirectRouter.get("/:code", sh_url);

export { createRouter, redirectRouter };