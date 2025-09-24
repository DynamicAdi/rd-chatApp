import db from "../client/connect.js";
import bcrypt from "bcryptjs";

export const allUsers = async () => db.user.findMany({orderBy: {employeeId: 'asc'}});

export const userById = async (id: string) =>
  db.user.findUnique({ where: { id }, include: {
    WorkAssigned: true,
  } });

  export const userApproved = async (id: string) =>
  db.user.update({ where: { id }, data: { isApproved: true }});

  export const checkIsApproved = async (id: string) =>
  db.user.findUnique({ where: { id }, select: {
    isApproved: true,
    id: true
  }});

    export const getDocs = async (id: string) =>
  db.user.findUnique({ where: { id }, select: {
    isApproved: true,
    Documents: true,
    id: true
  }});

export const getEmpId = async (id: string) => db.user.findUnique({where: {employeeId: id}})

export const createUser = async (data: any, type: boolean = false) => {
  const hashed = await bcrypt.hash(data.password, 10);
    await db.user.create({
        data: {
        name: data.name,
        email: data.email,
        password: hashed,
        employeeId: data.employeeId,
        department: data.department,
        workingAs: data.workingAs,
        role: type ? "Employee" : "Client",
        },
    });
}



export const updateUser = async (id: string, data: any) => {
  const user =  await db.user.findUnique({where: {id}})
  
  // const hashed = data.password && await bcrypt.hash(data.password, 10);

  await db.user.update({
    where: { id: id },
    data: {
      name: data.name || user?.name,
      email: data.email || user?.email,
      role: data.role || user?.role,
      workingAs: data.workingAs || user?.workingAs || null,
      employeeId: data.employeeId || user?.employeeId || null,
      department: data.department || user?.department || null,
      isLogin: data.isLogin,
      bio: data.bio || user?.bio || null,
      dob: data.dob || user?.dob || null,
      phone: data.phone || user?.phone || null,
      image: data.imageUrl || user?.image || null,
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

export const getPass = async (id: string) => {
  return await db.user.findUnique({
        where: { id },
        select: {
          id: true,
          password: true
        }
    });
}


export const updatePassword = async (id: string, password: string) => {
  const hashed = await bcrypt.hash(password, 10); 
   return await db.user.update({
    where: { id: id },
    data: {
      password: hashed
    },
  });
}

export const uploadDocs = async (title: string, fileUrl: string, userId: string) => {
    return await db.docs.create({
        data: {
            title,
            fileUrl,
            User: {
                connect: {id: userId}
            }
        }
    })
}


export const deleteDoc = async (id: string) => {
    return await db.docs.delete({where: {id}})
}