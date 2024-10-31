import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  filmList: Ifilm[];
}
export interface Ifilm {
  name: string;
  rate: number;
  genre: string;
  id: number;
}

const initialState: CounterState = {
  filmList: [],
};

export const CrudFilmList = createSlice({
  name: 'crud',
  initialState,
  reducers: {
    addFilm: (state, actions: PayloadAction<Ifilm>) => {
      state.filmList.push(actions.payload);
    },
    removeFilm: (state, actions: PayloadAction<number>) => {
      state.filmList = state.filmList.filter(el => el.id !== actions.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const crudActions = CrudFilmList.actions;

export default CrudFilmList.reducer;
