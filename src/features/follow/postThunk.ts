import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BaseUrl } from '@/utils/BaseUrl'

const API_BASE_URL = `${BaseUrl()}/api`

export const handleFollower = createAsyncThunk(
  'followers/addFollower',
  async ({ followwerUsername, token } : { followwerUsername: string, token: string}, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/follow/`,
        {username: followwerUsername },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.detail || 'Erro ao adicionar seguidor.');
      }
      return rejectWithValue('Erro desconhecido ao adicionar seguidor.');
    }
  }
);

export const handleUnfollower = createAsyncThunk(
  'followers/removeFollower',
  async ({ followwerUsername, token } : { followwerUsername: string, token: string}, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/unfollow/`,
        {username: followwerUsername },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.detail || 'Erro ao adicionar seguidor.');
      }
      return rejectWithValue('Erro desconhecido ao adicionar seguidor.');
    }
  }
);
