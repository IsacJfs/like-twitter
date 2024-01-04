import { createSlice } from '@reduxjs/toolkit'
import { curtirPostagem } from './postThunk'

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
      .addCase(curtirPostagem.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(curtirPostagem.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(curtirPostagem.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message as string
      })
  }
})

export default curtirSlice.reducer
