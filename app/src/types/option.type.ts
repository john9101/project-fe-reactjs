import {Stock} from "./stock.type";

export interface Option {
    _id: string
    stocks: Stock[]
    price: number,
    option_name: string
}