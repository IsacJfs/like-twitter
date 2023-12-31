import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const curtirPostagem = createAsyncThunk(
  'postagens/curtir',
  async ({ postId, token }: { postId: string, token: string }) => {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/postagens/${postId}/curtir/`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    );
    console.log(response.data);
    return response.data;
  }
);

interface CurtirState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CurtirState = {
  status: 'idle',
  error: null,
};

const curtirSlice = createSlice({
  name: 'curtir',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(curtirPostagem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(curtirPostagem.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(curtirPostagem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      });
  },
});

export default curtirSlice.reducer;

