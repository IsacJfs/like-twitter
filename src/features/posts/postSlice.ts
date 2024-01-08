import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchPosts, fentchPost, fetchPostsByUser } from './getThunk'
import { PostsState, PostState } from './types'

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: null
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<PostState>) {
      state.posts.push(action.payload)
    },
    removePost(state, action: PayloadAction<number>) {
      state.posts = state.posts.filter((post) => post.id !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
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
      .addCase(fentchPost.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fentchPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.posts = action.payload
      })
      .addCase(fentchPost.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  }
})

export const { addPost, removePost } = postsSlice.actions

export default postsSlice.reducer
