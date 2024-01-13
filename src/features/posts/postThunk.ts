import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { NewPost } from './types'
import { BaseUrl } from '@/utils/BaseUrl'

const postsUrl = `${BaseUrl()}/api/postagens`

// Thunk para a criação de uma postagem
export const fentchAddPost = createAsyncThunk(
  'posts/fentchAddPost',
  async ({autor, conteudo}: NewPost, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${postsUrl}/adicionar/`, {autor, conteudo}
      )
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || 'Erro ao criar postagem.'
        )
      }
      return rejectWithValue('Erro desconhecido ao criar postagem.')
    }
  }
)


// Thunk para curtir uma postagem
export const curtirPostagem = createAsyncThunk(
  'postagens/curtir',
  async ({ postId, token }: { postId: string; token: string }) => {
    const response = await axios.post(
      `${postsUrl}/${postId}/curtir/`,
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
