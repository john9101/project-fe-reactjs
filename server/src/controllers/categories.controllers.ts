import { Request, Response, query } from "express";
import { Category } from '../models/model'
import categoryService from '../services/categories.services';


// Controller để lấy danh sách các category
export const getCategoryController = async (req:Request, res: Response) => {
  try {

    const category = await categoryService.getAllCategories()
    console.log('Fetched categories:', category);
    res.status(200).json(category)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching categories' }); // Send a 500 status code with an error message
  }
};


// Controller để tạo một category mới


