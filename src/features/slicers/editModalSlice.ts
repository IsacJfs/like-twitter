import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false
};

export const editSlice = createSlice({
  name: 'editModal',
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onOpen, onClose } = editSlice.actions;
export default editSlice.reducer;

