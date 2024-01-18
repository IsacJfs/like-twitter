import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RegisterData, RegisterResponse } from './types';
import { BaseUrl } from '@/utils/BaseUrl';
import toast from 'react-hot-toast';

export const registerUserThunk = createAsyncThunk<RegisterResponse, RegisterData, { rejectValue: string }>(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post<RegisterResponse>(`${BaseUrl()}/auth/users/`, userData);
      toast.success('Registro realizado com sucesso!');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error('Falha no registro');
        return rejectWithValue(error.response.data.error || 'Falha no registro');
      }
      return rejectWithValue('Erro desconhecido ao fazer registro');
    }
  }
);
