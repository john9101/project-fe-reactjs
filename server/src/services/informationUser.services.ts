import { InformationUser } from './../models/model';

class InformationUserService {
    async getInformationById(id: string) {
        try {
            const user = await InformationUser.findById(id).populate('address');
            return user;
        } catch (error) {
            throw new Error('Get API User fail!');
        }
    }

    async createUser(dataUser: any) {
        try {
            const user = new InformationUser(dataUser);
            return await user.save();
        } catch (error) {
            throw new Error('Create API User fail!');
        }
    }

    async updateInformation(id: string, dataUpdate: any) {
        try {
            const updatedUser = await InformationUser.findByIdAndUpdate(id, dataUpdate, { new: true });
            return updatedUser;
        } catch (error) {
            throw new Error('Update data fail');
        }
    }
}

const informationUserService = new InformationUserService();
export default informationUserService;
