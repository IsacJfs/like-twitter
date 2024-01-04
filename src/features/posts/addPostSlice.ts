import { createSlice } from '@reduxjs/toolkit'
import { NewPost } from './types'
import { fentchAddPost } from './postThunk'

const initialState: NewPost = {
  autor: '',
  conteudo: '',
  isLoading: false,
  error: null
}

const addPostSlice = createSlice({
  name: 'addPosts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fentchAddPost.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fentchAddPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.autor = action.payload.autor
        state.conteudo = action.payload.conteudo
      })
      .addCase(fentchAddPost.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  }
})

export default addPostSlice.reducer
