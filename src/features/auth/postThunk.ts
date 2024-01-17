import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { BaseUrl } from '@/utils/BaseUrl'
import toast from 'react-hot-toast'
// Definindo os tipos para os parâmetros da função de login
interface LoginParams {
  username: string
  password: string
}

// Tipo para a resposta da API de login
interface LoginResponse {
  auth_token: string
}

// Thunk para a operação de login
export const loginThunk = createAsyncThunk<
  { username: string; token: string }, // Tipo de retorno em caso de sucesso
  LoginParams, // Tipo dos parâmetros da função de login
  { rejectValue: string } // Tipo de retorno em caso de erro
>('user/login', async ({ username, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post<LoginResponse>(
      `${BaseUrl()}/auth/token/login/`,
      {
        username,
        password
      }
    )
    localStorage.setItem('user', username)
    sessionStorage.setItem('auth_token', response.data.auth_token)
    if (response.data.auth_token) {
      toast.success('Login realizado com sucesso!')
    }
    return { username, token: response.data.auth_token }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error('Usuário ou senha inválidos!')
      return rejectWithValue(error.message)
    }
    return rejectWithValue('Erro desconhecido ao fazer login')
  }
})
