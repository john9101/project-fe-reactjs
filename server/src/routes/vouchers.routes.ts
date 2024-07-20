import {Router} from 'express';
import {findAllVouchersController} from "../controllers/vouchers.controller";
// @ts-ignore
const voucherRouter = new Router();

voucherRouter.get('/', findAllVouchersController);
export default voucherRouter;