import { configureStore } from '@reduxjs/toolkit'
import loginModalReducer from './auth/loginModalSlice'
import registerModalReducer from './users/registerSlice'
import userReducer from './users/userSlice'
import profileReducer from './profile/profileSlice'
import editReducer from './profile/editModalSlice'
import postReducer from './posts/postSlice'
import curtirReducer from './posts/likePost'
import loginReducer from './auth/loginSlice'

export const store = configureStore({
  reducer: {
    loginModal: loginModalReducer,
    registerModal: registerModalReducer,
    user: userReducer,
    profile: profileReducer,
    editModal: editReducer,
    post: postReducer,
    curtir: curtirReducer,
    login: loginReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
