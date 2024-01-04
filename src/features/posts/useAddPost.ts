import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'

import { NewPost } from './types'
import { fentchAddPost } from './postThunk'

export const useAddPost = () => {
  const dispatch = useDispatch<AppDispatch>()

  const addNewPost = (post: NewPost) => {
    dispatch(fentchAddPost(post))
  }

  return {
    addNewPost
  }
}
