import db from "../client/connect.js";

export const getAllGroups = async () => {
    return await db.group.findMany({
        select: {
            id: true,
            name: true,
            image: true,
            message: true
        }
    })
}

export const getGroupById = async (id: string) => {
    return await db.group.findUnique({
        where: {id: id},
        select: {
            id: true,
            name: true,
            description: true,
            createdAt: true,
            members: true,
            message: true,
            image: true,
            _count: true
        }
    })
}

export const createGroup = async (data: any) => {
    return await db.group.create({
        data: {
            name: data.name,
            description: data.description || null
        }})
}

export const deleteGroup = async (id: string) => {
    return await db.group.delete({
        where: {id}
    })
}

export const updateGrp = async (id: string, data: any) => {
    const grp = await db.group.findUnique({
        where: {id: id}
    })
    
    return await db.group.update({
        where: {id: id},
        data: {
            name: data.name || grp?.name,
            description: data.description || grp?.description || null,
            image: data.image || grp?.image || null,
        }
    })
}

// export const updateMembers = async ()