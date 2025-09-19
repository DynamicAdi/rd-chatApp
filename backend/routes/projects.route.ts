import { Router, Request, Response } from "express"
import {
  getProjectsController,
  getProjectController,
  createProjectController,
  updateProjectController,
  deleteProjectController,
  updateProjectStatus,
  createDocController,
  getDocsController,
  deleteDocController,
} from "../controller/project.controller.js"

const router = Router()

router.get("/get-all", async (req: Request, res: Response) => {
  await getProjectsController(req, res)
})

router.get("/get-by/:id", async (req: Request, res: Response) => {
  await getProjectController(req, res)
})

router.post("/create", async (req: Request, res: Response) => {
  await createProjectController(req, res)
})

router.put("/update/:id", async (req: Request, res: Response) => {
  await updateProjectController(req, res)
})

router.put("/update-progress/:id", async (req: Request, res: Response) => {
  await updateProjectStatus(req, res)
})


router.post("/docs-upload", async (req: Request, res: Response) => {await createDocController(req, res)});

// Get all docs for a project
router.get("/docs/:projectId", async (req: Request, res: Response) => {
  await getDocsController(req, res)
});

// Delete doc by id
router.delete("/docs/delete/:id", async (req: Request, res: Response) => {
  await deleteDocController(req, res)
});


router.delete("/delete/:id", async (req: Request, res: Response) => {
  await deleteProjectController(req, res)
})

export default router
