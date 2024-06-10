import {Router} from 'express'
import { allCategoriesController } from '../controllers/categories.controllers'
const categoriesRouter = Router()

categoriesRouter.get('/', allCategoriesController)
categoriesRouter.get('/:id', )
export default categoriesRouter