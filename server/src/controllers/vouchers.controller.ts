import { Request, Response } from 'express';
import contactService from "../services/contacts.services";
import voucherService from "../services/vouchers.services";
export const findAllVouchersController = async (req: Request, res: Response) => {
    try {
        const vouchers = await voucherService.findAll();
        res.status(200).json(vouchers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'lấy voucher lõi' });
    }
};