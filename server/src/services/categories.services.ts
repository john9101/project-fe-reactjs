import { Category } from '../models/model';

class CategoryService {
    async getAllCategories() {
    try {
      const categories = await Category.find(); // Fetch all categories from the database
    //   console.log('Fetched categories:', categories);
        return categories;
    } catch (error:any) {
      throw new Error(`Error fetching categories: ${error.message}`);
    }
  }

    // async createCategory(categoryData) {
    //     try {
    //         const newCategory = new Category(categoryData);
    //         const savedCategory = await newCategory.save();
    //         return savedCategory;
    //     } catch (error) {
    //         throw new Error(`Error creating category: ${error.message}`);
    //     }
    // }
}

const categoryService = new CategoryService();
export default categoryService;
