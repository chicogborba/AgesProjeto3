import express from "express";
import authenticate from "../middlewares/authenticate";
import { deletePost, getPosts, postPost, updatePosts } from "../controllers/postsController";

const router = express.Router();

router.get('/posts', getPosts)
router.post('/posts',authenticate, postPost)
router.delete('/posts/:id',authenticate, deletePost)
router.put('/posts/:id',authenticate, updatePosts)

export default router;
