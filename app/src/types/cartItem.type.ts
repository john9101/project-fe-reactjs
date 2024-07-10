import {Product} from "./product.type";
import {Option} from "./option.type";

export interface CartItem {
    id: string,
    product: Product,
    selectedOption: Pick<Option, 'name' | 'description'>,
    selectedSize: string,
    quantity: number,
}