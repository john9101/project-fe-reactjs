import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./product.slice";
import {cartProducer} from "./cart.slice";
import favourite from "../pages/Favourite";
import {favouriteProducer} from "./favourite.slice";

export const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartProducer,
        favourite: favouriteProducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;