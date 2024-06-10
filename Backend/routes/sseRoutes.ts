import express from "express";
import { eventsHandler } from "../controllers/sseController";

const router = express.Router();

router.post('/sse', eventsHandler)

export default router;

