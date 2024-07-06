import {User} from "./user.type";

export interface QuestionAnswer{
    _id?: string
    question: string;
    productId: string;
    user?: Pick<User, 'fullName' | 'avatar'>;
    sentDate: string;
}

