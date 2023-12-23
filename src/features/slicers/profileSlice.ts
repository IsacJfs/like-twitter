import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setUser } from './userSlice';

export interface UserState {
  id: string | null;
  username: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  date_joined: string | null;
}

export interface ProfileState {
  user: UserState;
  description: string | null;
  birthday: string | null;
  profilePicture: string | null;
  coverPicture: string | null;
  following_usernames: string[];
  followers_count: number;
  isLoading: boolean;
  error: string | null | unknown;
}

const initialState: ProfileState = {
  user: {
    id: null,
    username: null,
    email: null,
    first_name: null,
    last_name: null,
    date_joined: null,
  },
  description: null,
  birthday: null,
  profilePicture: null,
  coverPicture: null,
  following_usernames: [],
  followers_count: 0,
  isLoading: false,
  error: null,
};

const profileUrl = 'http://127.0.0.1:8000/api/profile';

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (userId: string, thunkAPI) => {
    try {
      const response = await axios.get(`${profileUrl}/${userId}/`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Agora sabemos que 'error' é um AxiosError
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'An unknown error occurred');
    }
    return thunkAPI.rejectWithValue('An unknown error occurred');
  }
}
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileState>) => {
      Object.assign(state, action.payload);
    },
    updateFollowing: (state, action: PayloadAction<string[]>) => {
      state.following_usernames = action.payload;
    },
    clearProfile: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.isLoading = false;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      .addCase(setUser, (state, action) => {
        const userId = action.payload.id;
        if (userId) {
          state.user.id = userId;
        }
        })
      }
});

export const { setProfile, updateFollowing, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;

