import db from "../client/connect.js";
// import { CreateUserInput, UpdateUserInput } from "../client/types/user.types";

export const allUsers = async () => db.user.findMany({});

export const userById = async (id: string) =>
  db.user.findUnique({ where: { id } });

export const createUser = async (data: any) => {
    await db.user.create({
        data: {
        name: data.name,
        email: data.email,
        password: data.password,
        },
    });
}

export const updateUser = async (id: string, data: any) => {
  await db.user.update({
    where: { id: id },
    data: {
      name: data.name,
      email: data.email,
      role: data.role,
      password: data.password,
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