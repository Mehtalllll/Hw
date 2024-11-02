import { configureStore } from '@reduxjs/toolkit';
import { cartReduser } from './features/cartSlice';
import { productsSlicereducer } from './features/productsSlice';

export const reduxStore = configureStore({
  reducer: {
    products: productsSlicereducer,
    cart: cartReduser,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
