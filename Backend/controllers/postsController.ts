import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
import { RequestWithUser } from "../middlewares/authenticate";

const prisma = new PrismaClient()

export const getPosts = async (req: Request, res: Response) => {
  // get posts with author and movie
    const posts = await prisma.post.findMany({
        include: {
            movie: true,
            author : true
        }
    })
    res.json(posts)
}


export const postPost = async (req: RequestWithUser, res: Response) => {
    const { title, body, movieId } = req.body
    const authorId = req.user.id
    try {
      const post = await prisma.post.create({
          data: {
              title,
              body,
              movieId,
              authorId
          },
          include: {
              movie: true, 
              author: true, 
          },
      })
      res.json(post)
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao criar post: ' + error })
    }
}

export const deletePost = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params
    const userId = req.user.id
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id
            }
        })

        if (!post) {
            return res.status(404).json({ error: 'Post não encontrado' })
        }

        if (post.authorId !== userId) {
            return res.status(403).json({ error: 'Você não tem permissão para deletar este post' })
        }

        const deletedPost = await prisma.post.delete({
            where: {
                id: id
            }
        })

        res.json(deletedPost)
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao deletar post: ' + error })
    }
}

export const updatePosts = async (req: RequestWithUser, res: Response) => {
    const { id } = req.params
    const { title, body } = req.body
    const userId = req.user.id
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id
            }
        })

        if (!post) {
            return res.status(404).json({ error: 'Post não encontrado' })
        }

        if (post.authorId !== userId) {
            return res.status(403).json({ error: 'Você não tem permissão para atualizar este post' })
        }

        const updatedPost = await prisma.post.update({
            where: {
                id: id
            },
            data: {
                title,
                body
            }
        })

        res.json(updatedPost)
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar post: ' + error })
    }
}