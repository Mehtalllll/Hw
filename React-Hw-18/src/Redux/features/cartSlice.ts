import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProducts } from '../../api/Listapi';
import { Icard } from '../../Types/Card.type';

const initialState: IProducts = {
  products: [],
  total: 0,
  skip: 0,
  limit: 10,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Icard>) => {
      state.products.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<any>) => {
      state.products = state.products.filter(
        item => item.id !== action.payload,
      );
    },
  },
});
export const cartActions = cartSlice.actions;
export const cartReduser = cartSlice.reducer;
