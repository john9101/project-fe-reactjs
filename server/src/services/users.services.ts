import {IUser, User} from './../models/model';

class UserService {
    async getUserById(id: string) {
        return await User.findById(id);
    }

    async registerAccount(newUserData: IUser) {
        const newUser = new User(newUserData);
        return await newUser.save();
    }

    async updateUser(userId: string, updateUserData: IUser) {
        return await User.findByIdAndUpdate(userId, updateUserData, { new: true });
    }

    async loginAccount(username: string, password: string) {
        return await User.findOne({username, password});
    }

    async existUserWithUsername(username: string) {
        return await User.findOne({username}) as IUser;
    }
}

const usersService = new UserService();
export default usersService;
