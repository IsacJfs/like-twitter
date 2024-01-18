import { useDispatch, useSelector } from 'react-redux'
import { onClose, onOpen, setLoginSuccess } from './loginSlice'
import { AppDispatch, RootState } from '../store'
import { loginThunk } from './postThunk'

export const useUser = () => {
  const dispatch = useDispatch<AppDispatch>()
  const isOpen = useSelector((state: RootState) => state.login.isOpen)
  const userData = useSelector((state: RootState) => state.login.userData)
  const loading = useSelector((state: RootState) => state.login.loading)
  const error = useSelector((state: RootState) => state.login.error)
  const loginSuccess = useSelector((state: RootState) => state.login.loginSuccess)

  const handleOpen = () => dispatch(onOpen())
  const handleClose = () => dispatch(onClose())
  const hadleLoginSuccess = () => {
    dispatch(setLoginSuccess(true))
  }

  const hadleLogoutSuccess = () => {
    dispatch(setLoginSuccess(false))
  }

  const login = (username: string, password: string) => {
    dispatch(loginThunk({ username, password }))
  }

  return {
    isOpen,
    onOpen: handleOpen,
    onClose: handleClose,
    userData,
    loading,
    error,
    login,
    loginSuccess,
    hadleLoginSuccess,
    hadleLogoutSuccess
  }
}
