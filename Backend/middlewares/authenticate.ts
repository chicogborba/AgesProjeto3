// middlewares/authenticate.ts

import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import jwt from 'jsonwebtoken';

interface RequestWithUser extends Request<ParamsDictionary, any, any> {
  user?: any;
}

const secretKey = process.env.JWT_SECRET_KEY;

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

export default authenticate;