import { Category } from '../models/model';

class CategoryService {
    async getAllCategories() {
    try {
      const categories = await Category.find(); 
        return categories;
    } catch (error:any) {
      throw new Error(`Error fetching categories: ${error.message}`);
    }
  }

}

const categoryService = new CategoryService();
export default categoryService;
