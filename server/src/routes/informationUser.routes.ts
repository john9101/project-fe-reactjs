import express from 'express';
import { getInformationUser, createUser, updateUser } from '../controllers/informationUser.controllers';

const router = express.Router();

router.get('/:id', getInformationUser);
router.post('/', createUser);
router.put('/:id', updateUser);

export default router;