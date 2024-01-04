import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const profileUrl = 'http://127.0.0.1:8000/api/profile'

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (userId: string, thunkAPI) => {
    try {
      const response = await axios.get(`${profileUrl}/${userId}/`)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Agora sabemos que 'error' é um AxiosError
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || 'An unknown error occurred'
        )
      }
      return thunkAPI.rejectWithValue('An unknown error occurred')
    }
  }
)
