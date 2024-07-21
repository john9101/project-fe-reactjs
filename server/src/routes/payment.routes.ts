
// @ts-ignore
import express from 'express';
import {paymentController} from "../controllers/payments.controller";

const paymentRouter = express.Router();

paymentRouter.post('/', paymentController);

export default paymentRouter;
