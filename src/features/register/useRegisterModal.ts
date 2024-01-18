import { useDispatch, useSelector } from 'react-redux'
import { onOpen, onClose } from '@/features/register/registerSlice'
import { AppDispatch, RootState } from '@/features/store'
import { registerUserThunk } from './postThunk'
import { RegisterData } from './types'

export const useRegisterModal = () => {
  const dispatch = useDispatch<AppDispatch>()
  const isOpen = useSelector((state: RootState) => state.registerModal.isOpen)
  const isLoading = useSelector((state: RootState) => state.registerModal.isLoading);
  const error = useSelector((state: RootState) => state.registerModal.error);
  const registerSuccess = useSelector((state: RootState) => state.registerModal.registerSuccess);

  const handleOpen = () => dispatch(onOpen())
  const handleClose = () => dispatch(onClose())

  const register = async (userData: RegisterData) => {
    const response = await dispatch(registerUserThunk(userData));
    return response
  };

  return { isOpen, onOpen: handleOpen, onClose: handleClose, isLoading, error, register, registerSuccess }
}
