import { Request, Response } from "express";
import userService from "../services/users.services";
import * as _ from "lodash";
import {IUser} from "../models/model";

export const getUserController = async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (_.isEmpty(user)) {
            return res.status(200).json({ message: "User not found" });
        } else {
            return res.status(200).json(user);
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const registerAccountController = async (req: Request, res: Response) => {
    console.log(11111111)
    try {

        const newUserData = req.body as IUser;
        const existUserWithUsername = await userService.existUserWithUsername(newUserData.username)
        if (existUserWithUsername) {
            return res.status(400).json({message: {username: 'Tên người dùng đã tồn tại'}});
        }else {
            const newUser = await userService.registerAccount(newUserData);
            return res.status(200).json(newUser);
        }
    } catch (error: any) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateUserController = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const updateUserData = req.body as IUser;
        const updatedUser = await userService.updateUser(userId, updateUserData);
        if (_.isEmpty(updatedUser)) {
            return res.status(404).json({ message: "User not found" });
        } else {
            return res.status(200).json(updatedUser);
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const loginAccountController = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const existUserWithUsername = await userService.existUserWithUsername(username)
        const error = {username: '', password: ''}
        if (existUserWithUsername) {
            if (existUserWithUsername.password === password){
                return res.status(200).json(existUserWithUsername)
            }else {
                error.password = 'Mật khẩu không đúng'
                return res.status(400).json({message: error})
            }
        }else {
            error.username = 'Không tìm thấy tên người dùng'
            return res.status(400).json({message: error})
        }
        // const user = await userService.loginAccount(username, password);
        // return res.status(200).json({ message: "Login successful", user });
    } catch (error: any) {
        return res.status(500).json({ message: error.message});
    }
};
