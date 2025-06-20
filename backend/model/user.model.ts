import db from "../client/connect.js";
import bcrypt from "bcryptjs";

export const allUsers = async () => db.user.findMany({});

export const userById = async (id: string) =>
  db.user.findUnique({ where: { id } });

export const createUser = async (data: any, type: boolean = false) => {
  const hashed = await bcrypt.hash(data.password, 10);
    await db.user.create({
        data: {
        name: data.name,
        email: data.email,
        password: hashed,
        role: type ? "Employee" : "User",
        },
    });
}



export const updateUser = async (id: string, data: any) => {
  const hashed = await bcrypt.hash(data.password, 10);
  await db.user.update({
    where: { id: id },
    data: {
      name: data.name,
      email: data.email,
      role: data.role,
      password: hashed,
      employeeId: data.employeeId || null,
      department: data.department || null,
      bio: data.bio || null,
      dob: data.dob || null,
      phone: data.phone || null,
      image: data.imageUrl || null,
    },
  });
};


export const deleteUser = async (id: string) => {
    await db.user.delete({
        where: { id: id}
    })
}


export const getUserByEmail = async (email: string) => {
    return await db.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          password: true
        }
    });
}