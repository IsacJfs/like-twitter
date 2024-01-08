import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from '@/utils/BaseUrl';

export interface EditProfileParams {
  name: string
  username: string
  description: string
  profilePicture: string
  coverPicture: string
}

interface EditProfileResponse {
  name: string
  username: string
  description: string
  profilePicture: string
  coverPicture: string
}

export const editProfileThunk = createAsyncThunk<EditProfileResponse, EditProfileParams, { rejectValue: string }>(
  'profile/editProfile',
  async (EditProfileParams, { rejectWithValue }) => {
    try {
      const response = await axios.patch<EditProfileResponse>(`${BaseUrl}/api/profile/`, EditProfileParams, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${sessionStorage.getItem('auth_token')}`
        }
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.error || 'Erro ao editar perfil');
      }
      return rejectWithValue('Erro desconhecido ao editar perfil');
    }
  }
);
