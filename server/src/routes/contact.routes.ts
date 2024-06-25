import {Router} from 'express';
import {createContactController} from "../controllers/contact.controllers";
// @ts-ignore
const contactRoutes = new Router();

contactRoutes.use('/', createContactController);
export default contactRoutes;