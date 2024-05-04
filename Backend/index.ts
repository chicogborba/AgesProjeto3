// https://www.omdbapi.com/ - API PARA POSTER DE FILMES 

import { PrismaClient } from '@prisma/client'
import express from 'express'
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

interface RequestWithUser extends Request<ParamsDictionary, any, any> {
  user?: any;
}


dotenv.config();
const app = express()
const prisma = new PrismaClient()
const externalApiKey = process.env.MOVIE_API_KEY;
const secretKey = process.env.JWT_SECRET_KEY;

app.use(express.json());

// POST USERS

app.post('/register', async (req, res) => {
  const { email, password , name } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });
  res.json(user);
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }
  let token = ""
  if(secretKey !== undefined) {
      token = jwt.sign({ id: user.id }, secretKey);
    }
  res.json({ token });
});


const authenticate = ((req:RequestWithUser, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    if(secretKey !== undefined)
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
});



// GET MOVIES

app.get('/movies',authenticate, async (req, res) => {
    const movies = await prisma.movie.findMany()
    res.json(movies)
}
)

// POST MOVIES

app.post('/movies',authenticate , async (req, res) => {
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

app.get('/posts',authenticate, async (req, res) => {
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

app.post('/posts',authenticate, async (req, res) => {
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

app.delete('/posts/:id',authenticate, async (req, res) => {
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

app.put('/posts/:id',authenticate, async (req, res) => {
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





// GET MORE MOVIE DETAILS
// using external api

// http://www.omdbapi.com/?apikey=${externalApiKey}&i=tt0345950



app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})