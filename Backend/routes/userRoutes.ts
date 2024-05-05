

import express from "express";
import authenticate from "../middlewares/authenticate";
import { getMovies, postMovie } from "../controllers/movieController";
import { getUsers, loginUser, registerUser } from "../controllers/registerLoginControler";

const router = express.Router();

router.post('/register', registerUser)
router.post('/login' , loginUser)
router.get('/users',authenticate , getUsers)

export default router;

