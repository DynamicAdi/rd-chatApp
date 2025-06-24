import * as userController from "../controller/user.controller.js"

import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  await userController.getAllUsers(req, res);
});;
router.get("/get-by/:id", async (req, res) => {
  await userController.getUserById(req, res);
});

router.post("/create", async (req, res) => {
    await userController.createUser(req, res)
})

router.put("/update/:id", async (req, res) => {
    await userController.updateUser(req, res)
})

router.delete("/delete/:id", async (req, res) => {
    await userController.deleteUser(req, res)
})


router.post("/login", async (req, res) => {
    await userController.LoginUser(req, res)
})

router.get("/check-token", async (req, res) => {
    await userController.checkToken(req, res)
})


export default router