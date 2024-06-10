import {Product} from "./product.type";

export interface CartItem {
    id?: string,
    productName?: string,
    productPrice?: number,
    productImage?: string,
    quantity?: number,
    optionName?: string 
    size?: string
}