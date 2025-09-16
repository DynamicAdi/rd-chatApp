// controllers/projectsController.ts
import { Request, Response } from "express"
import {
  getAllProjects,
  getSpeciProject,
  createProject,
  updateProject,
  deleteSpecific,
  updateStatusModel,
} from "../model/projects.model.js"

// Get all projects
export const getProjectsController = async (req: Request, res: Response) => {
  try {
    const projects = await getAllProjects()
    res.status(200).json({ success: true, data: projects })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Get a specific project
export const getProjectController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const project = await getSpeciProject(id)

    if (!project || project.length === 0) {
      return res.status(404).json({ success: false, message: "Project not found" })
    }

    res.status(200).json({ success: true, data: project })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Create a new project
export const createProjectController = async (req: Request, res: Response) => {
  try {
    const project = await createProject(req.body)
    res.status(201).json({ success: true, data: project })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Update a project
export const updateProjectController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const project = await updateProject(req.body, id)
    res.status(200).json({ success: true, data: project })
  } catch (error: any) {
    if (error.code === "P2025") {
      // Prisma record not found
      return res.status(404).json({ success: false, message: "Project not found" })
    }
    res.status(500).json({ success: false, message: error.message })
  }
}

export const updateProjectStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const project = await updateStatusModel(req.body, id)
    res.status(200).json({ success: true, data: project })
  } catch (error: any) {
    if (error.code === "P2025") {
      // Prisma record not found
      return res.status(404).json({ success: false, message: "Project not found" })
    }
    res.status(500).json({ success: false, message: error.message })
  }
}

// Delete a project
export const deleteProjectController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await deleteSpecific(id)
    res.status(200).json({ success: true, message: "Project deleted successfully" })
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ success: false, message: "Project not found" })
    }
    res.status(500).json({ success: false, message: error.message })
  }
}
