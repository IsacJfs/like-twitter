import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BaseUrl } from '@/utils/BaseUrl'

const API_BASE_URL = `${BaseUrl()}/api/profile`

export const addFollower = createAsyncThunk(
  'followers/addFollower',
  async ({ username, followwerUsername, token } : { username: string, followwerUsername: string, token: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/${username}/follow/`,
        {follower_username: followwerUsername},
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Erro ao adicionar seguidor.');
      }
      return rejectWithValue('Erro desconhecido ao adicionar seguidor.');
    }
  }
);
