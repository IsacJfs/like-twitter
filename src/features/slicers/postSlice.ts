import axios from 'axios'
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { UserState } from './profileSlice';


export interface PostState {
  id: string;
  autor: UserState;
  conteudo: string | null;
  data_criacao: string | null;
  data_atualizacao: string | null;
}

export interface PostsState {
  posts: PostState[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: null,
};

const postsUrl = 'http://127.0.0.1:8000/api/postagens';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(postsUrl);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || 'Erro ao buscar postagens.'
        );
      }
      return thunkAPI.rejectWithValue('Erro desconhecido ao buscar postagens.');
    }
  }
);

export const fetchPostsByUser = createAsyncThunk(
  'posts/fetchPostsByUser',
  async (username: string, thunkAPI) => {
    try {
      const url = `${postsUrl}/${username}/`; // Supondo que a API usa query para filtrar por usuário
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || 'Erro ao buscar postagens por usuário.'
        );
      }
      return thunkAPI.rejectWithValue('Erro desconhecido ao buscar postagens por usuário.');
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<PostState>) {
      state.posts.push(action.payload);
    },
    removePost(state, action: PayloadAction<string>) {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPostsByUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPostsByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addPost, removePost } = postsSlice.actions;

export default postsSlice.reducer;
