import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RegisterData, RegisterResponse } from './types';

export const registerUserThunk = createAsyncThunk<RegisterResponse, RegisterData, { rejectValue: string }>(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post<RegisterResponse>('http://127.0.0.1:8000/auth/users/', userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.error || 'Falha no registro');
      }
      return rejectWithValue('Erro desconhecido ao fazer registro');
    }
  }
);
