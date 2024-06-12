import {Product} from "./product.type";
import {Option} from "./option.type";

// export interface CartItem {
//     id?: string,
//     productName?: string,
//     productPrice?: number,
//     productImage?: string,
//     quantity?: number,
//     optionName?: string
//     size?: string
// }

export interface CartItem {
    id: string,
    product:Product,
    selectedOption:string,
    selectedSize:string,
    price: string | null,
    quantity: number,
}