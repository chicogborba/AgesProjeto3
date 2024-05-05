import express, { NextFunction, Response, Request } from "express";
import { deletePost, getPosts, postPost, updatePosts } from "../controllers/postsController";
import authenticate from "../middlewares/authenticate";

const router = express.Router();

router.get('/posts', authenticate, getPosts)
router.post('/posts',authenticate, postPost)
router.delete('/posts/:id',authenticate, deletePost)
router.put('/posts/:id',authenticate, updatePosts)

export default router;
