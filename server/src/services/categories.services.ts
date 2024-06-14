import { Category } from '../models/model';

class CategoryService {
    async getAllCategories() {
        try {
            const categories = await Category.find();
            return categories;
        } catch (error) {
            throw new Error(`Error fetching categories: ${error.message}`);
        }
    }

    async createCategory(categoryData) {
        try {
            const newCategory = new Category(categoryData);
            const savedCategory = await newCategory.save();
            return savedCategory;
        } catch (error) {
            throw new Error(`Error creating category: ${error.message}`);
        }
    }
}

const categoryService = new CategoryService();
export default categoryService;
