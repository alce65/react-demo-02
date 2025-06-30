import type { Product } from '@products/types/product';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CartState {
    products: Product[];
    loading: boolean;
    error: string | null;
    // total: number,
    // totalItems: number,
}

const InicialState: CartState = {
    products: [],
    loading: false,
    error: null,
    // total: 0,
    // totalItems: 0,
};

const slice = createSlice({
    name: 'cart',
    initialState: InicialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
            // state.total += action.payload.price;
            // state.totalItems += 1;
        },
        removeProduct: (state, action: PayloadAction<Product>) => {
            const index = state.products.findIndex(
                (p) => p.id === action.payload.id,
            );
            if (index !== -1) {
                state.products.splice(index, 1);
                // state.total -= action.payload.price;
                // state.totalItems -= 1;
            }
        },
        clearCart: (state) => {
            state.products = [];
            // state.total = 0;
            // state.totalItems = 0;
        },
    },
});

export default slice.reducer;
export const { actions } = slice;
