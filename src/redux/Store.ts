import { configureStore } from '@reduxjs/toolkit';
import { CrudFilmList } from './features/crudslice';

export const tablestore = configureStore({
  reducer: {
    Crud: CrudFilmList.reducer,
  },
});

export type RootState = ReturnType<typeof tablestore.getState>;

export type AppDispatch = typeof tablestore.dispatch;
