
import express from 'express';
import { getCategoriesController} from '../controllers/categories.controllers';

const router = express.Router();

router.get('/', getCategoriesController);



export default router;
