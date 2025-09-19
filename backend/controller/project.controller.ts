// controllers/projectsController.ts
import { Request, Response } from "express"
import {
  getAllProjects,
  getSpeciProject,
  createProject,
  updateProject,
  deleteSpecific,
  updateStatusModel,
  uploadDocs,
  getDocs,
  deleteDoc,
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

export const createDocController = async (req: Request, res: Response) => {
  try {
    const { title, projectId, fileUrl } = req.body;
    
    if (!title || !fileUrl || !projectId) {
      return res.status(400).json({ error: "title, fileUrl and projectId are required" });
    }

    const doc = await uploadDocs(title, fileUrl, projectId);
    res.status(201).json(doc);
  } catch (err: any) {
    console.error("Error creating doc:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

// Get all documents for a project
export const getDocsController = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({ error: "projectId is required" });
    }

    const docs = await getDocs(projectId);
    res.json(docs);
  } catch (err: any) {
    console.error("Error fetching docs:", err);
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

    const deleted = await deleteDoc(id);
    res.json({ message: "Document deleted successfully", deleted });
  } catch (err: any) {
    console.error("Error deleting doc:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};