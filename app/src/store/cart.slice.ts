import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CartItem} from "../types/cartItem.type";

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
        addToCart: (state, action:PayloadAction<CartItem>) => {const cartItem = action.payload;
           const isExist = state.cartItems.find(item => item.product._id === cartItem.product._id && item.selectedOption === cartItem.selectedOption && item.selectedSize === cartItem.selectedSize);
            if(!isExist){
                state.cartItems.push(cartItem);
                state.totalItem = state.cartItems.length;
            }
            else{
                const targetCartItem = state.cartItems.find(item => item.product._id === cartItem.product._id && item.selectedOption === cartItem.selectedOption && item.selectedSize === cartItem.selectedSize);
                targetCartItem!.quantity += cartItem.quantity;
                state.totalItem = state.cartItems.length;
            }
            state.totalPrice  = state.cartItems.reduce((total, item) => total + item.quantity * Number(item.price), 0);
        },
        removeFromCart: (state, action:PayloadAction<string>) => {
            const id = action.payload;
            state.totalItem = state.cartItems.length - 1;
            state.cartItems = state.cartItems.filter(item => item.id !== id);
            state.totalPrice  = state.cartItems.reduce((total, item) => total + item.quantity * Number(item.price), 0);

        }
    }
});
export const {addToCart, removeFromCart} = cartSlide.actions;
export const cartProducer = cartSlide.reducer;
