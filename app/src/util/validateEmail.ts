import {EmailValidationResponse} from "../types/response/emailValidationResponse";
import axios from "axios";

const apiKey = 'bdc_4ec4f3f1888344bf879c93b0c2b80894'

export const isValidEmail = async (email: string) => {
    try {
        const response = await axios.get<EmailValidationResponse>(`https://api-bdc.net/data/email-verify?emailAddress=${email}&key=${apiKey}`)
        return response.data.isValid
    }catch (error){
        return false;
    }
}