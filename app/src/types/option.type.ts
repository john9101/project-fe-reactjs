import {Stock} from "./stock.type";

export interface Option {
    _id: string
    stocks: Stock[],
    optionName: string
    image: string
    productId: string
}