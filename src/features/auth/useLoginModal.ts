import { useDispatch, useSelector } from 'react-redux'
import { onOpen, onClose } from '@/features/auth/loginModalSlice'
import { RootState } from '@/features/store'

export const useLoginModal = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector((state: RootState) => state.loginModal.isOpen)

  const handleOpen = () => dispatch(onOpen())
  const handleClose = () => dispatch(onClose())

  return { isOpen, onOpen: handleOpen, onClose: handleClose }
}
