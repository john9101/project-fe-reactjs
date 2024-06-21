import {Product} from "./product.type";

export interface CartItem {
    id: string,
    product: Product,
    selectedOption: string,
    selectedSize: string,
    quantity: number,
}