import { Contact } from '../models/model';

class ContactService {
    async createContact(data: { username: string, email: string, topic: string, message: string }) {
        try {
            const contact = new Contact(data);
            const newContact = await contact.save();
            return newContact;
        } catch (error: any) {
            throw new Error(`Lỗi: ${error.message}`);
        }
    }
}

const contactService = new ContactService();
export default contactService;
