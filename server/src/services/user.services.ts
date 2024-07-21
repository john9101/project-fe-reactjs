import { User } from './../models/model';

class InformationUserService {
    async getInformationById(id: string) {
        try {
            const user = await User.findById(id).populate('address');
            return user;
        } catch (error) {
            throw new Error('Get API User fail!');
        }
    }

    async register(dataUser: any) {
        try {
            const user = new User(dataUser);
            return await user.save();
        } catch (error) {
            throw new Error('Create API User fail!');
        }
    }

    async updateInformation(id: string, dataUpdate: any) {
        try {
            const updatedUser = await User.findByIdAndUpdate(id, dataUpdate, { new: true });
            return updatedUser;
        } catch (error) {
            throw new Error('Update data fail');
        }
    }
    async authenticateUser(username: any, password: any) {
        try {
            const user = await User.findOne({ username, password });
            if (!user) {
                throw new Error('Invalid username or password');
            }
            return user;
        } catch (error) {
            throw new Error('Authentication failed');
        }
    }
}

const informationUserService = new InformationUserService();
export default informationUserService;
