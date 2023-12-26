import { configureStore } from '@reduxjs/toolkit';
import loginModalReducer from './slicers/loginModalSlice';
import registerModalReducer from './slicers/registerSlice';
import userReducer from './slicers/userSlice';
import profileReducer from './slicers/profileSlice';
import editReducer from './slicers/editModalSlice';
import postReducer from './slicers/postSlice';

export const store = configureStore({
  reducer: {
    loginModal: loginModalReducer,
    registerModal: registerModalReducer,
    user: userReducer,
    profile: profileReducer,
    editModal: editReducer,
    post: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
