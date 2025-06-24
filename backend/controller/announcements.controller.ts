import {addMessage, deleteMessage, getMessage} from "../model/announcements.model.js"
import { Request, Response } from "express"
import { verifyToken } from "../utils/jwt.js";


export const addNewMessage = async (req: Request, res: Response) => {
    const body = req.body
    console.log(body)
    // const {ber} = req.body
    const token = verifyToken(req)

    if (!token) {
        return res.status(401).json({error: "wrong auth token"})
    }
  try {
    const addMe = await addMessage(body, token);
    res.status(200).json(addMe);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users', err: error });
  }
};

export const deleteAMessage = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        await deleteMessage(id);
        return res.status(201).json({ "message": "success" })
    }

    catch (error) {
    res.status(500).json({ error: 'Failed to fetch message' });
    }
}

export const getMsg = async (req: Request, res: Response) => {
    try {
    const msg = await getMessage();
    if (!msg) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(msg);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};