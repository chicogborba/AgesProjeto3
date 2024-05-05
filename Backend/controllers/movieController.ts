
// async (req, res) => {
//     const movies = await prisma.movie.findMany()
//     res.json(movies)
// }
import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getMovies = async (req: Request, res: Response) => {
  const movies = await prisma.movie.findMany()
  res.json(movies)
}

export const postMovie = async (req: Request, res: Response) => {
    const { title, relaseDate, posterUrl, imdbID } = req.body
    try {
    const movie = await prisma.movie.create({
        data: {
            title,
            relaseDate: new Date(relaseDate),
            posterUrl,
            imdbID
        }
    })
    res.json(movie)
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao criar filme: ' + error })
    }
}

