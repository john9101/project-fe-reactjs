import { Contact } from '../models/model';

class ContactService {
    async saveContact(data: { username: string, email: string, topic: string, message: string }) {
        try {
            const newContact = new Contact(data);
            return await newContact.save();
        } catch (error: any) {
            throw new Error(`Lỗi: ${error.message}`);
        }
    }
}

const contactService = new ContactService();
export default contactService;
