import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient()

const secretKey = process.env.JWT_SECRET_KEY;


export const registerUser = async (req: Request, res: Response) => {
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
};

export const loginUser =  async (req: Request, res: Response) => {
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
};

// GET USERS

export const getUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany()
    res.json(users)
}

