import {Router} from 'express';
import { getUserController, updateUserController , loginAccountController, registerAccountController} from '../controllers/users.controllers';

const usersRouter = Router();

usersRouter.get('/:id', getUserController);
usersRouter.put('/:id', updateUserController);
usersRouter.post('/login', loginAccountController)
usersRouter.post('/register', registerAccountController)

export default usersRouter;
