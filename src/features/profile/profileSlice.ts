import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setUser } from '../users/userSlice'
import { fetchProfile } from './getThunk'

export interface UserState {
  id: string
  username: string | null
  email: string | null
  first_name: string | null
  last_name: string | null
  date_joined: string | null
}

export interface ProfileState {
  user: UserState
  description: string | null
  birthday: string | null
  profilePicture: string | null
  coverPicture: string | null
  following_usernames: string[]
  followers_count: number
  isLoading: boolean
  error: string | null | unknown
}

const initialState: ProfileState = {
  user: {
    id: '',
    username: null,
    email: null,
    first_name: null,
    last_name: null,
    date_joined: null
  },
  description: null,
  birthday: null,
  profilePicture: null,
  coverPicture: null,
  following_usernames: [],
  followers_count: 0,
  isLoading: false,
  error: null
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileState>) => {
      Object.assign(state, action.payload)
    },
    updateFollowing: (state, action: PayloadAction<string[]>) => {
      state.following_usernames = action.payload
    },
    clearProfile: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        Object.assign(state, action.payload)
        state.isLoading = false
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.error = action.payload as string
        state.isLoading = false
      })
      // gambiarra => Corrigir
      .addCase(setUser, (state, action) => {
        const userId = action.payload.username
        if (userId) {
          state.user.id = userId
        }
      })
  }
})

export const { setProfile, updateFollowing, clearProfile } =
  profileSlice.actions

export default profileSlice.reducer
