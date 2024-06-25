import {Address} from './address.type'

export interface User {
    _id: string;
    username: string;
    password: string;
    fullName: string;
    gender: string;
    phone: string;
    email: string;
    address: Address;
    companyName: string;
    avatar: string;
}