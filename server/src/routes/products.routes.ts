import {Router} from 'express'
import {pagingProductsController, productDetailController } from '../controllers/products.controllers'
const productsRouter = Router()

productsRouter.get('/', pagingProductsController)
productsRouter.get('/:id', productDetailController)

export default productsRouter