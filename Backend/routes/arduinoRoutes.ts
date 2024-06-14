

import express from "express";
import { searchArduino } from "../controllers/arduinoController";

const router = express.Router();

router.post('/arduino/:code', searchArduino)

export default router;

