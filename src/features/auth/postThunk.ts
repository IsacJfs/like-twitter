import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { BaseUrl } from '@/utils/BaseUrl'
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
      `${BaseUrl}/auth/token/login/`,
      {
        username,
        password
      }
    )
    localStorage.setItem('user', username)
    sessionStorage.setItem('auth_token', response.data.auth_token)
    return { username, token: response.data.auth_token }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Tratamento de erro de Axios
      return rejectWithValue(error.response.data.error || 'Erro ao fazer login')
    }
    return rejectWithValue('Erro desconhecido ao fazer login')
  }
})
