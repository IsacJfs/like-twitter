import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { editProfileThunk } from './patchThunk';

interface ProfileState {
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  isOpen: false,
  isLoading: false,
  error: null
}

export const editSlice = createSlice({
  name: 'editModal',
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
      .addCase(editProfileThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editProfileThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(editProfileThunk.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Ocorreu um erro desconhecido';
      });
  }
})

export const { onOpen, onClose } = editSlice.actions
export default editSlice.reducer
