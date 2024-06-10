import { Category } from "../models/model"

class CategoryService{
    async getAllCategories(){
        return await Category.find()
    }

    async getAllProductsByCategoryName(categoryName: string){
        return await
    }
}

const categoriesService = new CategoryService()
export default categoriesService