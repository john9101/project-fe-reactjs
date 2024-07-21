import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./product.slice";
import {cartProducer} from "./cart.slice";
import categoryProducer from "./category.slice";
import userReducer from "./user.slice";

export const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartProducer,
        categories: categoryProducer,
        users: userReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;