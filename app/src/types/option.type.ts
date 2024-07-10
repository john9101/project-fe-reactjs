import {Stock} from "./stock.type";

export interface Option {
    _id: string
    stocks: Stock[],
    name: string | null
    image: string
    productId: string
    description: string | null
}