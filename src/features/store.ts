import { configureStore } from '@reduxjs/toolkit';
import loginModalReducer from './slicers/loginModalSlice';
import registerModalReducer from './slicers/registerSlice';

export const store = configureStore({
  reducer: {
    loginModal: loginModalReducer,
    registerModal: registerModalReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
