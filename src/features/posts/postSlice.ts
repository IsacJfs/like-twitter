import { createSlice} from '@reduxjs/toolkit'
import { fetchPostList, fentchPostUser, fetchPostsByUser } from './getThunk'
import { PostsState} from './types'

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: null
}

const postsSlice = createSlice({
  name: 'getPost',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostList.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPostList.fulfilled, (state, action) => {
        state.isLoading = false
        state.posts = action.payload
      })
      .addCase(fetchPostList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(fetchPostsByUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.posts = action.payload
      })
      .addCase(fetchPostsByUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(fentchPostUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fentchPostUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.posts = action.payload
      })
      .addCase(fentchPostUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  }
})

export default postsSlice.reducer
