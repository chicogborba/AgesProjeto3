

import express from "express";
import { conectSSE } from "../controllers/sseController";


const router = express.Router();

router.get('/sse/:code', conectSSE)

export default router;

