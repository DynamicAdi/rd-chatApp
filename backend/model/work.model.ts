import db from "../client/connect.js";

type Status = "Pending" | "WorkStarted" | "Completed"

interface TaskObj {
  subject: string;
  description: string;
  status: string;
  projectName: string;
  deadline: string;
  assignedBy: string;
  assignedTo: any;
}

export const getAllWork = async () => {
    return await db.work.findMany({})
}

export const getSpecific = async (userId: string) => {
    if (!userId) {
        return {error: "No User ID Found"}
    }
    const data = await db.work.findMany({
        where: {userId: userId}
    })
    return data
}

export const createWork = async (props: TaskObj) => {
      const { subject, assignedBy, deadline, description, projectName, assignedTo } = props;
    const createData = await db.work.create({
        data: {
            projectName,
            assignedBy,
            deadline,
            description,
            subject,
            assignedTo
        }
    })
    return createData
}


export const updateStatus = async (id: string, status: Status) => {
    if (!status && !id) {
        return {error: "Can't update"}
    }
    await db.work.update({
        where: {id: id},
        data: {
            status: status
        }
    })
    return {data: "updated status"}
}

export const deleteAllFromUser = async (id: string) => {
    await db.work.deleteMany({
        where: {userId: id}
    })
}

export const deleteSpefic = async (id: string) => {
        await db.work.deleteMany({
        where: {id: id}
    })
}