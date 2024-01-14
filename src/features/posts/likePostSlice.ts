import { createSlice } from '@reduxjs/toolkit'
import { fetchLikePost } from './getThunk'

interface CurtirState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: CurtirState = {
  status: 'idle',
  error: null
}

const curtirSlice = createSlice({
  name: 'curtir',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikePost.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchLikePost.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(fetchLikePost.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message as string
      })
  }
})

export default curtirSlice.reducer
