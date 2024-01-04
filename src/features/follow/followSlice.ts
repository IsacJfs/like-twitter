import { createSlice } from '@reduxjs/toolkit'
import {addFollower} from './postThunk'

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
    builder.addCase(addFollower.pending, (state) => {
      state.isLoading = true
      state.followSuccess = false
    })
    builder.addCase(addFollower.fulfilled, (state) => {
      state.isLoading = false
      state.followSuccess = true
    })
    builder.addCase(addFollower.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
      state.followSuccess = false
    })
  }
})

export default profileSlice.reducer
