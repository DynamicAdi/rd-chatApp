import db from "../client/connect.js";



export const getMessage = async () => {
    const data = await db.announcements.findMany({select: {
        messageBy: true,
        message: true,
        id: true
    }})
    return data
}

export const deleteMessage = async (id: string) => {
    await db.announcements.delete({
        where: {id: id}
    })
}

export const addMessage = async (data: {message: string}, messageBy: string) => {
    const saveTodb = await db.announcements.create({
        data: {
            message: data.message,
            msgBy: `${messageBy}`
        }
    })
    if (saveTodb) return saveTodb
}