import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'

import { onClose, onOpen } from './addPostSlice'
import { fentchAddPost } from './postThunk'
import { NewPost } from './types'

export const useAddPost = () => {
  const dispatch = useDispatch<AppDispatch>()
  const isOpen = useSelector((state: RootState) => state.addPost.isOpen)

  const postModalOpen = () => dispatch(onOpen())
  const postModalClose = () => dispatch(onClose())

  const addNewPost = async (post: NewPost) => {
    const response = await dispatch(fentchAddPost(post))
    return response
  }

  return {
    addNewPost,
    postModalClose,
    postModalOpen,
    isOpen
  }
}
