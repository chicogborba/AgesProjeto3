

import express from "express";
import authenticate from "../middlewares/authenticate";
import { getMovies, postMovie } from "../controllers/movieController";

const router = express.Router();

router.get('/movies', getMovies)
router.post('/movies',authenticate , postMovie)

export default router;

