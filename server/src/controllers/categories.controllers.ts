import { Request, Response, query } from "express";
import { Category } from '../models/model'
import categoryService from '../services/categories.services';


// Controller để lấy danh sách các category
export const getCategories = async (req:Request, res: Response) => {
  try {

    const categories = await categoryService.getAllCategories()
    console.log('Fetched categories:', categories);
    res.status(200).json(categories)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching categories' }); // Send a 500 status code with an error message
  }
};


// Controller để tạo một category mới
export const createCategory = async (req:Request, res: Response) => {
  const category = new Category({
    name: req.body.name,
    description: req.body.description
  });

  try {
    const newCategory = await category.save();
    res.status(200).json(newCategory);
  } catch (error: any) {
   res.status(500).json({message: error.message})
  }
};


