import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../Redux/Store';

export const loggerMiddleware: Middleware<{}, RootState> =
  store => next => action => {
    console.log('Dispatching action:', action);
    const result = next(action);
    console.log('Next state:', store.getState());
    return result;
  };
