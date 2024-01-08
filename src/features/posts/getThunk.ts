import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { BaseUrl } from '@/utils/BaseUrl'

const postsUrl = `${BaseUrl()}/api/postagens/`

// Thunk para o carregamento de todas as postagens
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(postsUrl)
      console.log(response)
      console.log(postsUrl)
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
export const fentchPost = createAsyncThunk(
  'posts/fentchPost',
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
export const curtirPostagem = createAsyncThunk(
  'postagens/curtir',
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
    console.log(response.data)
    return response.data
  }
)

