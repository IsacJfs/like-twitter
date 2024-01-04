import { useDispatch, useSelector } from 'react-redux'
import { onOpen, onClose } from './editModalSlice'
import { AppDispatch, RootState } from '../store'
import { useCallback } from 'react'
import { EditProfileParams, editProfileThunk } from './patchThunk'

export const useEditModal = () => {
  const dispatch = useDispatch<AppDispatch>()
  const isOpen = useSelector((state: RootState) => state.editModal.isOpen)
  const isLoading = useSelector((state: RootState) => state.editModal.isLoading)
  const error = useSelector((state: RootState) => state.editModal.error)

  const handleOpen = () => dispatch(onOpen())
  const handleClose = () => dispatch(onClose())

  const editProfile = useCallback(
    (EditProfileParams: EditProfileParams) =>
      dispatch(editProfileThunk(EditProfileParams)),
    [dispatch]
  )

  return {
    onOpen: handleOpen,
    onClose: handleClose,
    isOpen,
    editProfile,
    isLoading,
    error
  }
}
