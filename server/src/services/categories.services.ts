import { Categories } from '../models/model';

class CategoriesService {
    async getAllCategories() {
    try {
      const categories = await Categories.find(); 
        return categories;
    } catch (error:any) {
      throw new Error(`Error fetching categories: ${error.message}`);
    }
  }

}

const categoryService = new CategoriesService();
export default categoryService;
