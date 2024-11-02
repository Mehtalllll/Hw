import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProducts } from '../../api/Listapi';

const initialState: IProducts = {
  products: [],
  total: 0,
  skip: 0,
  limit: 10,
};
export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addtoListItem: (state, action: PayloadAction<any>) => {
      state.products.push(action.payload);
    },
  },
});

export const productsSliceactions = productsSlice.actions;
export const productsSlicereducer = productsSlice.reducer;
