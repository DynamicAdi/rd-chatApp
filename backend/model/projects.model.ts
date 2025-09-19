import db from "../client/connect.js";


interface Projects {   
    name: string
    description: string
    budget: number
    startDate: any
    endDate: any
    teamLeader: string
    department: string
    priority: string
    assignedEmployee: string[]
    progress: number
}
    

export const getAllProjects = async () => {
    return await db.projects.findMany({
        include: {
            teamLeader: true,
            assignedEmployee: true,
        }
    })
}


export const getSpeciProject = async (id: string) => {
    return await db.projects.findMany({
        where: {id: id},
        include: {
            teamLeader: true,
            assignedEmployee: true,
            WorkAssign: {
                include: {
                    assignedTo: true
                }
            },
            Document: true
        }
    })
}

export const createProject = async (data: Projects) => {
    return await db.projects.create({
        data: {
            name: data.name,
            description: data.description,
            budget: data.budget,
            startDate: data.startDate,
            endDate: data.endDate,
            department: data.department,
            priority: data.priority,
            teamLeaderId: data.teamLeader,
            assignedEmployee: {
                connect: data.assignedEmployee.map((id) => ({id}))
            },
        },
        include: {
            assignedEmployee: true
        }
    })
}

export const updateProject = async (data: Projects, id: string) => {
    const exist = await db.projects.findMany({where: {id}}) 
    return await db.projects.update({
        where: {id},
        data: {
            name: data.name || exist[0].name,
            description: data.description || exist[0].description,
            budget: data.budget || exist[0].budget,
            startDate: data.startDate || exist[0].startDate,
            endDate: data.endDate || exist[0].endDate,
            department: data.department || exist[0].department,
            priority: data.priority || exist[0].priority,
            teamLeaderId: data.teamLeader || exist[0].teamLeaderId,
        }
    })}

export const updateStatusModel = async (data: Projects, id: string) => {
    return await db.projects.update({
        where: {id},
        data: {
            progress: data.progress
        }
    })}

export const deleteSpecific = async (id: string) => {
    return await db.projects.delete({where: {id}})
}

export const uploadDocs = async (title: string, fileUrl: string, projectId: string) => {
    return await db.docs.create({
        data: {
            title,
            fileUrl,
            Project: {
                connect: {id: projectId}
            }
        }
    })
}

export const getDocs = async (projectId: string) => {
    return await db.docs.findMany({
        where: {projectId}
    })
}

export const deleteDoc = async (id: string) => {
    return await db.docs.delete({where: {id}})
}