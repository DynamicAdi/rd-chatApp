import { Request } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.SECRET_KEY || 'secret-key';
export const verifyToken = (req: Request) => {
  const auth = req.headers.authorization
  if (!auth) {
    return false
  }
  // const token = auth.split(' ')[1]
  const user = jwt.verify(auth, JWT_SECRET) as {id: string};
  return user.id
};