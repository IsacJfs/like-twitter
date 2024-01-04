import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { UserState } from '../profile/profileSlice'

export interface CommentState {
  id: string
  postagem: string
  autor: UserState
  conteudo: string | null
  data_criacao: string | null
  data_atualizacao: string | null
}

export interface CommentsState {
  comments: CommentState[]
  isLoading: boolean
  error: string | null
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  error: null
}

const commentsUrl = 'http://127.0.0.1:8000/api/postagens/1/comentarios'

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(commentsUrl)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || 'Erro ao buscar comentários.'
        )
      }
      return thunkAPI.rejectWithValue(
        'Erro desconhecido ao buscar comentários.'
      )
    }
  }
)

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.isLoading = false
      state.comments = action.payload
    })
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
    })
  }
})
