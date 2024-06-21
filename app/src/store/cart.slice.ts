import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CartItem} from "../types/cartItem.type";

export interface CartState {
    cartItems: CartItem[],
    totalPrice: number,
    totalItem: number
}

const initialState: CartState = {
    cartItems: localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")!) : [],
    totalPrice: localStorage.getItem("totalPrice") ? Number(localStorage.getItem("totalPrice")) : 0,
    totalItem: localStorage.getItem("totalItem") ? Number(localStorage.getItem("totalItem")) : 0

};

const cartSlide = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const cartItem = action.payload;
            const isExist = state.cartItems.find(item => item.product._id === cartItem.product._id && item.selectedOption === cartItem.selectedOption && item.selectedSize === cartItem.selectedSize);
            if (!isExist) {
                state.cartItems.push(cartItem);
                state.totalItem = state.cartItems.length;
            } else {
                const targetCartItem = state.cartItems.find(item => item.product._id === cartItem.product._id && item.selectedOption === cartItem.selectedOption && item.selectedSize === cartItem.selectedSize);
                targetCartItem!.quantity += cartItem.quantity;
                state.totalItem = state.cartItems.length;
            }
            state.totalPrice = state.cartItems.reduce((total, item) => total + item.quantity * cartItem.product.originalPrice, 0);
            localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
            localStorage.setItem("totalPrice", state.totalPrice.toString());
            localStorage.setItem("totalItem", state.totalItem.toString());
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state.totalItem = state.cartItems.length - 1;
            state.cartItems = state.cartItems.filter(item => item.id !== id);
            state.totalPrice = state.cartItems.reduce((total, item) => total + item.quantity * item.product.originalPrice, 0);
            localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
            localStorage.setItem("totalPrice", state.totalPrice.toString());
            localStorage.setItem("totalItem", state.totalItem.toString());
        },
        updateCartItemQuantity(state, action: PayloadAction<{ id: string, newQuantity: number }>) {
            const {id, newQuantity} = action.payload;
            const item = state.cartItems.find(item => item.id === id);
            if (item) {
                item.quantity = newQuantity;
            }
            state.totalPrice = state.cartItems.reduce((total, item) => total + item.quantity * item.product.originalPrice, 0);
            localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
            localStorage.setItem("totalPrice", state.totalPrice.toString());

        },
    }
});
export const {addToCart, removeFromCart, updateCartItemQuantity} = cartSlide.actions;
export const cartProducer = cartSlide.reducer;
