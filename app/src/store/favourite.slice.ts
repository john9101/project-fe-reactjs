import {CartItem} from "../types/cartItem.type";
import {Product} from "../types/product.type";
import WishList from "../pages/WishList";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface FovouriteState {
    products: Product[],
    totalItem: number
}

const initialState: FovouriteState = {
    products: localStorage.getItem("productFavouriteItem") ? JSON.parse(localStorage.getItem("productFavouriteItem")!) : [],
    totalItem: localStorage.getItem("totalFavouriteItem") ? Number(localStorage.getItem("totalFavouriteItem")) : 0
};

const favouriteSlice = createSlice({
    name: "favourite",
    initialState,
    reducers:{
        addToFavourite: (state, action: PayloadAction<Product>) => {
            const product = action.payload;
            state.products.push(product);
            state.totalItem = state.totalItem + 1;
            localStorage.setItem("productFavouriteItem", JSON.stringify(state.products));
            localStorage.setItem("totalFavouriteItem", state.totalItem.toString());
        },
        removeFromFavourite: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state.totalItem = state.products.length - 1;
            state.products = state.products.filter(item => item._id !== id);
            localStorage.setItem("productFavouriteItem", JSON.stringify(state.products));
            localStorage.setItem("totalFavouriteItem", state.totalItem.toString());
        }
    }
});
export const {addToFavourite, removeFromFavourite} = favouriteSlice.actions;
export const favouriteProducer = favouriteSlice.reducer;