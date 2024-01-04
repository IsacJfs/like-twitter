import { createSlice } from '@reduxjs/toolkit'
import { registerUserThunk } from './postThunk'

interface RegisterState {
  isOpen: boolean
  isLoading: boolean
  error: string | null
}

const initialState: RegisterState = {
  isOpen: false,
  isLoading: false,
  error: null
}

const registerModalSlice = createSlice({
  name: 'registerModal',
  initialState,
  reducers: {
    // Ações para abrir e fechar o modal. O state é o estado atual do slice.
    onOpen: (state) => {
      state.isOpen = true
    },
    onClose: (state) => {
      state.isOpen = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerUserThunk.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  }
})

export const { onOpen, onClose } = registerModalSlice.actions

export default registerModalSlice.reducer
