import {CartItem} from "../types/cartItem.type";
import {Product} from "../types/product.type";
import Wishlist from "../pages/Wishlist";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface WishlistState {
    products: Product[],
    totalItem: number
}

const initialState: WishlistState = {
    products: localStorage.getItem("productFavouriteItem") ? JSON.parse(localStorage.getItem("productFavouriteItem")!) : [],
    totalItem: localStorage.getItem("totalFavouriteItem") ? Number(localStorage.getItem("totalFavouriteItem")) : 0
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers:{
        addToWishlist: (state, action: PayloadAction<Product>) => {
            const product = action.payload;
            state.products.push(product);
            state.totalItem = state.totalItem + 1;
            localStorage.setItem("productFavouriteItem", JSON.stringify(state.products));
            localStorage.setItem("totalFavouriteItem", state.totalItem.toString());
        },
        removeFromWishlist: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state.totalItem = state.products.length - 1;
            state.products = state.products.filter(item => item._id !== id);
            localStorage.setItem("productFavouriteItem", JSON.stringify(state.products));
            localStorage.setItem("totalFavouriteItem", state.totalItem.toString());
        }
    }
});
export const {addToWishlist, removeFromWishlist} = wishlistSlice.actions;
export const wishlistProducer = wishlistSlice.reducer;