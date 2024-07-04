import {Stock} from "./stock.type";

export interface Option {
    _id: string
    stocks: Stock[]
    price: number,
    optionName: string
    image: string
    productId?: string
    description?: string
}