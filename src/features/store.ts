import { configureStore } from '@reduxjs/toolkit';
import loginModalReducer from './slicers/loginModalSlice';
import registerModalReducer from './slicers/registerSlice';
import userReducer from './slicers/userSlice';
import profileReducer from './slicers/profileSlice';
import editReducer from './slicers/editModalSlice';
import postReducer from './slicers/postSlice';
import curtirReducer from './slicers/LikePost'

export const store = configureStore({
  reducer: {
    loginModal: loginModalReducer,
    registerModal: registerModalReducer,
    user: userReducer,
    profile: profileReducer,
    editModal: editReducer,
    post: postReducer,
    curtir: curtirReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
