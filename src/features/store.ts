import { configureStore } from '@reduxjs/toolkit';
import loginModalReducer from './slicers/loginModalSlice';
import registerModalReducer from './slicers/registerSlice';
import authReducer from './slicers/authSlice';

export const store = configureStore({
  reducer: {
    loginModal: loginModalReducer,
    registerModal: registerModalReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
