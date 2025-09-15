import * as profileController from "../controller/profile.controller.js"

import { Request, Router } from "express";

const router = Router();

router.get("/user", async (req, res) => {
    await profileController.getUserById(req, res)
})


export default router