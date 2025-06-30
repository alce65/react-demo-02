import { configureStore } from "@reduxjs/toolkit";
import cartProducts from "../features/products/redux/cart.slice";

export const store = configureStore({
    reducer: {
        cartProducts
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


