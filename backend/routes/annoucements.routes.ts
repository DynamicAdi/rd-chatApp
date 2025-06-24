import * as announcementController from "../controller/announcements.controller.js"
import { Router } from "express";

const router = Router();

router.get("/get-all-msg", async (req, res) => {
    await announcementController.getMsg(req, res)
})

router.post("/add-msg", async (req, res) => {
    await announcementController.addNewMessage(req, res)
})

router.delete("/del-msg/:id", async (req, res) => {
    await announcementController.deleteAMessage(req, res)
})

export default router