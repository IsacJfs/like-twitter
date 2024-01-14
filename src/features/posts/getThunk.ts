import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { BaseUrl } from '@/utils/BaseUrl'

const postsUrl = `${BaseUrl()}/api/postagens/`

// Thunk para o carregamento de todas as postagens
export const fetchPostList = createAsyncThunk(
  'posts/fetchPostsList',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(postsUrl)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || 'Erro ao buscar postagens.'
        )
      }
      return thunkAPI.rejectWithValue('Erro desconhecido ao buscar postagens.')
    }
  }
)

// Thunk para o carregamento de uma postagem
export const fentchPostUser = createAsyncThunk(
  'posts/fentchPostUser',
  async (id: number, thunkAPI) => {
    try {
      const url = `${postsUrl}${id}/`
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || 'Erro ao buscar postagem.'
        )
      }
      return thunkAPI.rejectWithValue('Erro desconhecido ao buscar postagem.')
    }
  }
)

// Thunk para o carregamento de postagens por usuário
export const fetchPostsByUser = createAsyncThunk(
  'posts/fetchPostsByUser',
  async (username: string, thunkAPI) => {
    try {
      const url = `${postsUrl}${username}/` // Supondo que a API usa query para filtrar por usuário
      console.log('url', url)
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            'Erro ao buscar postagens por usuário.'
        )
      }
      return thunkAPI.rejectWithValue(
        'Erro desconhecido ao buscar postagens por usuário.'
      )
    }
  }
)

// Thunk para curtir uma postagem
export const fetchLikePost = createAsyncThunk(
  'posts/likePost',
  async ({ postId, token }: { postId: string; token: string }) => {
    const response = await axios.post(
      `${postsUrl}${postId}/curtir/`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    )
    return response.data
  }
)

