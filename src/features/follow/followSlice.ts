import { createSlice } from '@reduxjs/toolkit'
import {handleFollower} from './postThunk'

interface Follow {
  isLoading: boolean
  error: string | null
  followSuccess: boolean
  message?: string
}

const initialState: Follow = {
  isLoading: false,
  error: null,
  followSuccess: false,
  message: undefined
}

const followSlice = createSlice({
  name: 'follow',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleFollower.pending, (state) => {
      state.isLoading = true
      state.followSuccess = false
      state.message = undefined
      state.error = null
    })
    builder.addCase(handleFollower.fulfilled, (state, action) => {
      state.isLoading = false
      state.followSuccess = true
      state.message = action.payload.message || 'Seguidor adicionado com sucesso.'
      state.error = null
    })
    builder.addCase(handleFollower.rejected, (state, action) => {
      state.isLoading = false
      state.followSuccess = false
      state.error = action.payload as string || 'Erro ao adicionar seguidor.'
    })
  }
})

export default followSlice.reducer
