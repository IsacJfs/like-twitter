import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loginThunk } from './loginThunk'

interface UserState {
  isOpen: boolean
  userData: { username: string; token: string } | null
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  isOpen: false,
  userData: null,
  loading: false,
  error: null
}

const loginSlice = createSlice({
  name: 'loginModal',
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true
    },
    onClose: (state) => {
      state.isOpen = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        loginThunk.fulfilled,
        (state, action: PayloadAction<{ username: string; token: string }>) => {
          state.userData = action.payload
          state.loading = false
        }
      )
      .addCase(
        loginThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload ?? 'Ocorreu um erro desconhecido'
          state.loading = false
        }
      )
  }
})

export const { onOpen, onClose } = loginSlice.actions

export default loginSlice.reducer
