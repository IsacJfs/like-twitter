import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { addPost, removePost } from './postSlice'
import { useCallback } from 'react'
import { fetchPosts, fentchPost, fetchPostsByUser } from './getThunk'
import { PostState } from './types'

export const usePost = () => {
  const dispatch = useDispatch<AppDispatch>()
  // Corrigir o seletor para pegar os posts do estado correto
  const posts = useSelector((state: RootState) => state.post)

  const loadPosts = useCallback(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const loadPost = useCallback(
    (postId: number) => {
      dispatch(fentchPost(postId))
    },
    [dispatch]
  )

  const loadPostsByUser = useCallback(
    (username: string) => {
      dispatch(fetchPostsByUser(username))
    },
    [dispatch]
  )

  const handleAddPost = (post: PostState) => {
    dispatch(addPost(post))
  }

  const handleRemovePost = (postId: number) => {
    dispatch(removePost(postId))
  }

  return {
    posts,
    loadPosts,
    loadPost,
    loadPostsByUser,
    handleAddPost,
    handleRemovePost
  }
}
