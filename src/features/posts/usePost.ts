import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { useCallback } from 'react'
import { fetchPostList, fentchPostUser, fetchPostsByUser } from './getThunk'
import { fentchAddPost } from './postThunk'
import { NewPost } from './types'

export const usePost = () => {
  const dispatch = useDispatch<AppDispatch>()
  const posts = useSelector((state: RootState) => state.post)

  const loadPosts = useCallback(async () => {
    await dispatch(fetchPostList())
  }, [dispatch])

  const loadPost = useCallback( async (postId: number) => {
    await dispatch(fentchPostUser(postId))
    },
    [dispatch]
  )

  const loadPostsByUser = useCallback(
    (username: string) => {
      dispatch(fetchPostsByUser(username))
    },
    [dispatch]
  )

  const handleAddPost = (post: NewPost) => {
    dispatch(fentchAddPost(post))
  }

  return {
    posts,
    loadPosts,
    loadPost,
    loadPostsByUser,
    handleAddPost
  }
}
