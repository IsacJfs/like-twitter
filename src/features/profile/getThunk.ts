import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BaseUrl } from '@/utils/BaseUrl'

const profileUrl = `${BaseUrl}/api/profile`

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
