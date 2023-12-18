import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false
};

const registerModalSlice = createSlice({
  name: 'registerModal',
  initialState,
  reducers: {
    // Ações para abrir e fechar o modal. O state é o estado atual do slice.
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    }
  }
});

export const { onOpen, onClose } = registerModalSlice.actions;

export default registerModalSlice.reducer;
