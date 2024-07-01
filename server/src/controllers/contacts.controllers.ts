import { Request, Response } from 'express';
import contactService from "../services/contacts.services";
export const saveContactController = async (req: Request, res: Response) => {
    try {
        const { username, email, topic, message } = req.body;
        const newContact = await contactService.saveContact({ username, email, topic, message });
        res.status(201).json(newContact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Thêm liên hệ thất bại' });
    }
};