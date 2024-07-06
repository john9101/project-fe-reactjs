import {Router} from 'express'
import {getPagingProductsController, getProductDetailController } from '../controllers/products.controllers'
const productsRouter = Router()

productsRouter.get('/', getPagingProductsController)
productsRouter.get('/:id', getProductDetailController)

export default productsRouter