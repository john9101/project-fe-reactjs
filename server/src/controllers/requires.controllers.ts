import {Request, Response} from "express";
import requiresService from "../services/requires.services";
import {IRequire} from "../models/model";

export const saveNewRequireController = async (req: Request, res: Response) => {
    try {
        const newRequire = await requiresService.saveNewRequire(req.body as IRequire)
        res.status(200).json(newRequire);
    }catch (error: any){
        res.status(500).json({message: error.message})
    }
}