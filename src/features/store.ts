import { configureStore } from '@reduxjs/toolkit';
import loginModalReducer from './slicers/loginModalSlice';

export const store = configureStore({
  reducer: {
    loginModal: loginModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
