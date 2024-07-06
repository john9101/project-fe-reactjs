import {PhoneValidationResponse} from "../types/response/phoneValidationResponse";
import axios from "axios";

const countryCode = 'vn'
const apiKey = 'bdc_4ec4f3f1888344bf879c93b0c2b80894'

export const isValidPhone = async (phone: string) => {
    try {
        const response = await axios.get<PhoneValidationResponse>(`https://api-bdc.net/data/phone-number-validate?number=${phone}&countryCode=${countryCode}&key=${apiKey}`)
        return response.data.isValid
    }catch (error){
        return false;
    }
}

