export interface User {
    _id?: string;
    username: string;
    password: string;
    fullName: string;
    gender?: number;
    phone: string;
    email: string;
    companyName?: string;
    avatar?: string;
    birthDate?: Date;
    address: {
        province: string,
        district: string,
        ward: string,
        specific: string
    };
}