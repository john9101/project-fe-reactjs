
import express from 'express';
import { getCategoryController} from '../controllers/categories.controllers';

const router = express.Router();

router.get('/', getCategoryController);



export default router;
