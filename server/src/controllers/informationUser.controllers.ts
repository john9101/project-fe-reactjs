import { Request, Response } from "express";
import informationUserService from "../services/informationUser.services";
import * as _ from "lodash";

export const getInformationUser = async (req: Request, res: Response) => {
    try {
        const user = await informationUserService.getInformationById(req.params.id);
        if (_.isEmpty(user)) {
            return res.status(200).json({ message: "User not found" });
        } else {
            return res.status(200).json(user);
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        const newUser = await informationUserService.createUser(userData);
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;
        const updatedUser = await informationUserService.updateInformation(userId, updateData);
        if (_.isEmpty(updatedUser)) {
            return res.status(404).json({ message: "User not found" });
        } else {
            return res.status(200).json(updatedUser);
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
