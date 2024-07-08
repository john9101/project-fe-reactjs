import {Router} from 'express';
import {saveContactController} from "../controllers/contacts.controllers";
// @ts-ignore
const contactsRouter = new Router();

contactsRouter.use('/', saveContactController);
export default contactsRouter;