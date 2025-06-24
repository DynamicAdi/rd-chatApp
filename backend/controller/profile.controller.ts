import * as ProfileModel from "../model/user.model.js"
import {Request, Response} from "express"
import { verifyToken } from "../utils/jwt.js";

const SECRET = process.env.SECRET_KEY as string

export const getUserById = async (req: Request, res: Response) => {
    const det = verifyToken(req)
    if (!det) {
        return res.status(401).json({"message": "Wrong Auth Token"})
    }
    try {
    const user = await ProfileModel.userById(det);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};