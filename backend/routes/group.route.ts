import express from "express";
import * as groupController from "../controller/group.controller.js"

const router = express.Router()

router.get("/get-all", async (req, res) => {
    await groupController.getGroupsController(req, res)  
})

router.get("/get-by-id/:id", async (req, res) => {
    await groupController.getGroupByGrpId(req, res)  
});
router.post("/create-grp", async (req, res) => {
    await groupController.createGroupController(req, res)  
});
router.delete("delete/:id", async (req, res) => {
    await groupController.deleteGroupController(req, res)  
});
router.put("update-grp/:id", async (req, res) => {
    await groupController.updateGroupController(req, res)  
});

export default router;