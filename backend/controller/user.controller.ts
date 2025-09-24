import * as userModel from '../model/user.model.js'
import { Request, Response } from 'express';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { verifyToken } from '../utils/jwt.js';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.allUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users', err: error });
  }
};

export const getByEmp = async (req: Request, res: Response) => {
  const { empId } = req.params;
  try {
    const user = await userModel.getEmpId(empId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};


export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await userModel.userById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};


export const updateApproved = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await userModel.userApproved(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};


export const getDocs = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await userModel.getDocs(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const checkIsApproved = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await userModel.checkIsApproved(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};


export const createUser = async (req: Request, res: Response) => {
  try {
    
    // console.log(req.body);
    const {newEmp} = req.body
    console.log(newEmp);
    
    const user = await userModel.createUser(newEmp);
    res.status(201).json({ "message": "success" });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user', e: error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await userModel.updateUser(id, req.body);
    res.status(200).json({ "message": "success" });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user', err: error });
  }
};

export const userUpdateFromApp = async (req: Request, res: Response) => {
  const token = verifyToken(req)
  console.log(req.body)
    try {
    await userModel.updateUser(token as string, req.body);
    res.status(200).json({ "message": "success" });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user', err: error });
  }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await userModel.deleteUser(id);
        res.status(200).json({ "message": "success" });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
}

const SECRET_KEY = process.env.SECRET_KEY as string;

export const LoginUser = async (req: Request, res: Response) => {
    const {email, password} = req.body
    let available = await userModel.getUserByEmail(email);
    if (available?.email) {
        const pass = await bcrypt.compare(password, available.password)
        const id = available.id
        if (!pass) {
            res.json({"message": "wrong password", "status": "failed"})
            return;
        }
        if (!SECRET_KEY) {
            res.status(500).json({ error: 'Server misconfiguration: SECRET_KEY not set' });
            return;
        }
        const token = jwt.sign({ email, id }, SECRET_KEY);
        res.status(200).json({ token });
    }
    else {
        res.status(404).json({"message": "user not found"})
    }
}

export const checkToken = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];
    try {
    const user = jwt.verify(token, SECRET_KEY);
    res.json(user);
    } catch (e) {
    res.status(403).json({ error: 'Invalid token' });
    }
}

export const verifyPassword = async (req: Request, res: Response) => {
  const { password } = req.params;
  try {
  const token = verifyToken(req)
  const user: any = await userModel.getPass(token as string)
  const isMatch = await bcrypt.compare(password, user.password)
  if (isMatch) {
    res.status(200).json({correct: true})
  }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch user', erro: error });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { password } = req.body;
  try {
  const token = verifyToken(req)
  const user: any = userModel.updatePassword(token as string, password)
  if (user) {
    res.status(200).json({success: true})
  }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch user', erro: error });
  }
};



export const createDocController = async (req: Request, res: Response) => {
  try {
    const { title, userId, fileUrl } = req.body;
    
    if (!title || !fileUrl || !userId) {
      return res.status(400).json({ error: "title, fileUrl and userId are required" });
    }

    const doc = await userModel.uploadDocs(title, fileUrl, userId);
    res.status(201).json(doc);
  } catch (err: any) {
    console.error("Error creating doc:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};


// Delete a document by id
export const deleteDocController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "id is required" });
    }

    const deleted = await userModel.deleteDoc(id);
    res.json({ message: "Document deleted successfully", deleted });
  } catch (err: any) {
    console.error("Error deleting doc:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};