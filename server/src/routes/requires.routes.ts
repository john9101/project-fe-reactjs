import {Router} from 'express'
import {saveNewRequireController} from "../controllers/requires.controllers";
const requiresRouter = Router()

requiresRouter.post('/', saveNewRequireController)

export default requiresRouter