import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {Product} from "../types/product.type";
import {toast} from "react-toastify";
import {CartItem} from "../types/cartItem.type";
import {RootState} from "./store";

export interface CartState {
    cartItems: CartItem[],
    totalPrice: number,
    totalItem: number
}

const initialState: CartState = {
    cartItems:  [],
    totalPrice: 0,
    totalItem: 0
};

const cartSlide = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addtoCart: (state, action:PayloadAction<CartItem>) => {
            if (state.cartItems.length === 0){
                let cartItem = action.payload;
                cartItem.id= nanoid();
                state.cartItems.push(action.payload);
                state.totalPrice += action.payload.productPrice! * action.payload.quantity!;

            } else {
                const cartItem = state.cartItems.find(item =>
                    item.optionName === action.payload.optionName && item.size === action.payload.size);
                if (cartItem){
                    cartItem.quantity! += action.payload.quantity!;
                    state.totalPrice += action.payload.productPrice! * action.payload.quantity!;

                } else {
                    state.cartItems.push(action.payload);
                    state.totalPrice += action.payload.productPrice! * action.payload.quantity!;
                }
            }
            state.totalItem = state.cartItems.length;
        }
    }
});
export const {addtoCart} = cartSlide.actions;
export const cartProducer = cartSlide.reducer;
