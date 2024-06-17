import { Request, Response, query } from "express";
import { Categories } from '../models/model'
import categoryService from '../services/categories.services';


// Controller để lấy danh sách các category
export const getCategoriesController = async (req:Request, res: Response) => {
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


