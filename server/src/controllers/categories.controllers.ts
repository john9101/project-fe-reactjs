import { Request, Response } from "express";
import categoriesService from "../services/categories.services";

export const allCategoriesController = async (req: Request, res: Response)=>{
    try{
        const allCategories = await categoriesService.getAllCategories();
        res.status(200).json(allCategories)
    }catch(error: any){
        res.status(500).json({message: error.message})
    }
}