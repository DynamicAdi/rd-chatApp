import { Request, Response } from "express";
import * as WorkModel from "../model/work.model.js";

// Get all work
export const getAllWork = async (req: Request, res: Response) => {
    try {
        const data = await WorkModel.getAllWork();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch work" });
    }
};

// Get work for a specific user
// export const getEmp = async (req: Request, res: Response) => {
//     const { userId } = req.params;
//     try {
//         const data = await WorkModel.getSpecific(userId);
//         res.json(data);
//     } catch (err) {
//         res.status(500).json({ error: "Failed to fetch user work" });
//     }
// };

export const getSpecific = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const data = await WorkModel.getSpecific(userId);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch user work" });
    }
};

// Create new work
export const createWork = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const data = await WorkModel.createWork(req.body);
        res.status(201).json(data);
    } 
    catch (err) {
        res.status(500).json({ error: "Failed to create work", e: err });
    }
};

// Update status
export const updateStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const data = await WorkModel.updateStatus(id, status);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to update status" });
    }
};

// Delete all work from a user
export const deleteAllFromUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        await WorkModel.deleteAllFromUser(userId);
        res.json({ message: "Deleted all work for user" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete work" });
    }
};

// Delete specific work
export const deleteSpefic = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await WorkModel.deleteSpefic(id);
        res.json({ message: "Deleted work" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete work" });
    }
};