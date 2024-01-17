import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BaseUrl } from '@/utils/BaseUrl'
import toast from 'react-hot-toast';

const API_BASE_URL = `${BaseUrl()}/api`

export const handleFollower = createAsyncThunk(
  'followers/addFollower',
  async ({ followerUsername, token } : { followerUsername: string, token: string}, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/follow/`,
        {username: followerUsername },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );
      toast.success(response.data['message'])
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response?.data?.message || 'Erro ao adicionar seguidor.');
      }
      return rejectWithValue('Erro desconhecido ao adicionar seguidor.');
    }
  }
);

export const handleUnfollower = createAsyncThunk(
  'followers/removeFollower',
  async ({ followerUsername, token } : { followerUsername: string, token: string}, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/unfollow/`,
        {username: followerUsername },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );
      toast.success(response.data['message'])
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response?.data?.message || 'Erro ao remover seguidor.');
      }
      return rejectWithValue('Erro desconhecido ao remover seguidor.');
    }
  }
);
