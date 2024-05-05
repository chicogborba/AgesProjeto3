import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'

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


export const postPost = async (req: Request, res: Response) => {
    const { title, body, movieId, authorId } = req.body
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

export const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const post = await prisma.post.delete({
            where: {
                id: id
            }
        })
        res.json(post)
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao deletar post: ' + error })
    }
}

export const updatePosts = async (req: Request, res: Response) => {
    const { id } = req.params
    const { title, body } = req.body
    try {
        const post = await prisma.post.update({
            where: {
                id: id
            },
            data: {
                title,
                body
            }
        })
        res.json(post)
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar post: ' + error })
    }
}