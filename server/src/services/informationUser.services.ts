
import { InformationUser } from './../models/model';
class InformationUserService{
    async getInformation(queryInformation: any) {
        try {
            return await InformationUser.findById({ ...queryInformation });
        }
        catch (error) {
            throw new Error('Get API User fail!');
        }
    }
    async createUser(dataUser: any) {
        try { 
            const user = new InformationUser(dataUser);
            return await user.save();
        }
        catch (error) {
            throw new Error('Create API User fail!');
         }
    }
    async updateInformation(id: any, dataUpdate: any) {
        try {
            
        }
        catch (error) {
            throw new Error('Update data fail');
        }
    }
}
const informationUserService = new InformationUserService()
export default informationUserService