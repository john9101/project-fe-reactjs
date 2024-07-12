// @ts-ignore
import {IOption, IRequire, Require} from "../models/model";
class RequireService{
    async saveNewRequire(data: IRequire){
        const newRequire = new Require(data)
        return await newRequire.save()
    }
}

const requiresService = new RequireService()
export default requiresService