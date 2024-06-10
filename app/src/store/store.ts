import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./product.slice";
import {cartProducer} from "./cartSlice";

export const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartProducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch