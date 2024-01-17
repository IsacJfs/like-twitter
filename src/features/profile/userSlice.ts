import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setUser } from '../users/userSlice'
import { fetchLocalUser } from './getThunk'
import { ProfileState } from './types'

const initialState: ProfileState = {
  id: 0,
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
  following_username: [],
  followers_count: 0,
  isLoading: false,
  error: null,
  username: null
}

export const localUserSlice = createSlice({
  name: 'localUser',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileState>) => {
      Object.assign(state, action.payload)
    },
    updateFollowing: (state, action: PayloadAction<string[]>) => {
      state.following_username = action.payload
    },
    clearProfile: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocalUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchLocalUser.fulfilled, (state, action) => {
        Object.assign(state, action.payload)
        state.isLoading = false
      })
      .addCase(fetchLocalUser.rejected, (state, action) => {
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
  localUserSlice.actions

export default localUserSlice.reducer
