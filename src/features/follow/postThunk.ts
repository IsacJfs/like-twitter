import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BaseUrl } from '@/utils/BaseUrl'

const API_BASE_URL = `${BaseUrl()}/api/profile`

export const handleFollower = createAsyncThunk(
  'followers/addFollower',
  async ({ username, followwerUsername, token, action } : { username: string, followwerUsername: string, token: string, action: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/${username}/is-following/`,
        {follower_username: followwerUsername, action: action},
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
