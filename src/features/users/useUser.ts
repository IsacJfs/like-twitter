import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { setUser, logoutUser } from './userSlice'

export const useUser = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)

  const login = (username: string, token: string) => {
    dispatch(setUser({ username, token }))
  }

  const logout = () => {
    dispatch(logoutUser())
    sessionStorage.removeItem('auth_token')
  }

  return {
    user,
    login,
    logout
  }
}
