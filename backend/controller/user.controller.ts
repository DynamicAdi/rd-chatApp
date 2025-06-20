import { Request, Response } from "express";
import prisma from "../client/connect";
import { Role } from "@prisma/client";
import { generateToken } from "../utils/jwt"; // make sure this exists

export const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      dob,
      department,
      bio,
      image,
    } = req.body;

    let role: Role = Role.User;

    if (email.endsWith("@therdgroupofindustries.app")) {
      role = Role.Employee;
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        phone,
        dob,
        department,
        bio,
        image,
        role,
      },
    });


    const token = generateToken({
      userId: newUser.id,
      role: newUser.role,
    });

    return res.status(201).json({
      message: "User created successfully",
      token,
      user: newUser,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: "User creation failed",
      details: error?.message || error,
    });
  }
};
