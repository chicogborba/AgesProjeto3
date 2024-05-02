// https://www.omdbapi.com/ - API PARA POSTER DE FILMES 

import { PrismaClient } from '@prisma/client'
import express from 'express'
import dotenv from 'dotenv';


dotenv.config();
const app = express()
const prisma = new PrismaClient()
const externalApiKey = process.env.MOVIE_API_KEY;

app.use(express.json());



// GET MOVIES

app.get('/movies', async (req, res) => {
    const movies = await prisma.movie.findMany()
    res.json(movies)
}
)

// POST MOVIES

app.post('/movies', async (req, res) => {
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
})


// GET POSTS

app.get('/posts', async (req, res) => {
  // get posts with author and movie
    const posts = await prisma.post.findMany({
        include: {
            movie: true,
            author : true
        }
    })
    res.json(posts)
}
)


// POST POSTS

app.post('/posts', async (req, res) => {
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
})


// DELETE POSTS

app.delete('/posts/:id', async (req, res) => {
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
})

// UPDATE POSTS

app.put('/posts/:id', async (req, res) => {
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
})


// GET USERS

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
}
)

// POST USERS

app.post('/users', async (req, res) => {
    const { email, name } = req.body
    try {
      const user = await prisma.user.create({
          data: {
              email,
              name
          }
      })
      res.json(user)
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao criar usuário: ' + error })
    }
})




// GET MORE MOVIE DETAILS
// using external api

// http://www.omdbapi.com/?apikey=${externalApiKey}&i=tt0345950



app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})