import { Router } from "express";
import { createShortenURL , redirectToOriginalUrl } from "../controllers/URL.controllers.js";


const router = Router();

router.post('/',createShortenURL);

router.get("/:shortURL", redirectToOriginalUrl);

export default router