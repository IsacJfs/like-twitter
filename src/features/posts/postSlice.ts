import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchPostList, fentchPostUser, fetchPostsByUser } from './getThunk'
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

export const { addPost, removePost } = postsSlice.actions

export default postsSlice.reducer
