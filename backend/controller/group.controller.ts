import { Request, Response } from "express";
import {
  getAllGroups,
  getGroupById,
  createGroup,
  deleteGroup,
  updateGrp,
} from "../model/group.model.js";

export const getGroupsController = async (req: Request, res: Response) => {
  try {
    const groups = await getAllGroups();
    return res.status(200).json(groups);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch groups", details: error });
  }
};

export const getGroupByGrpId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const group = await getGroupById(id);

    if (!group) return res.status(404).json({ error: "Group not found" });

    return res.status(200).json(group);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch group", details: error });
  }
};

export const createGroupController = async (req: Request, res: Response) => {
  try {
    const newGroup = await createGroup(req.body);
    return res.status(201).json(newGroup);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create group", details: error });
  }
};

export const deleteGroupController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await deleteGroup(id);
    return res.status(200).json({ message: "Group deleted", deleted });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete group", details: error });
  }
};

export const updateGroupController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedGroup = await updateGrp(id, req.body);
    return res.status(200).json(updatedGroup);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update group", details: error });
  }
};
