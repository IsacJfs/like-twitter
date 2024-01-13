import { createSlice } from '@reduxjs/toolkit'
import {handleFollower} from './postThunk'

interface Follow {
  isLoading: boolean
  error: string | null
  followSuccess: boolean
}

const initialState: Follow = {
  isLoading: false,
  error: null,
  followSuccess: false
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleFollower.pending, (state) => {
      state.isLoading = true
      state.followSuccess = false
      state.error = null
    })
    builder.addCase(handleFollower.fulfilled, (state, action) => {
      state.isLoading = false
      state.followSuccess = action.payload(true)
      state.error = null
    })
    builder.addCase(handleFollower.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
      state.followSuccess = false
    })
  }
})

export default profileSlice.reducer
