import {Product} from "./product.type";

export interface CartItem {
    id: string,
    product: Product,
    selectedOption: {
        name: string,
        description: string
    },
    selectedSize: {
        name: string,
        index: number
    },
    quantity: number,
}