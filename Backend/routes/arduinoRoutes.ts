

import express from "express";
import { searchArduino } from "../controllers/arduinoController";

const router = express.Router();

router.post('/arduino', searchArduino)

export default router;

