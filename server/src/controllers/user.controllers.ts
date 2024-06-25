import { Request, Response } from "express";
import userService from "../services/user.services";
import * as _ from "lodash";

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.getInformationById(req.params.id);
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
        const newUser = await userService.createUser(userData);
        return res.status(200).json(newUser);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;
        const updatedUser = await userService.updateInformation(userId, updateData);
        if (_.isEmpty(updatedUser)) {
            return res.status(404).json({ message: "User not found" });
        } else {
            return res.status(200).json(updatedUser);
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await userService.authenticateUser(username, password);
        console.log(user)
        return res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        return res.status(400).json({ message: "Invalid username or password" });
    }
};
