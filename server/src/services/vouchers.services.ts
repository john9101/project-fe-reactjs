import { Voucher } from '../models/model';

class VoucherService {
    async findAll() {
        try {
            return await Voucher.find();
        } catch (error: any) {
            throw new Error(`không lấy được voucher: ${error.message}`);
        }
    }
}

const voucherService = new VoucherService();
export default voucherService;
