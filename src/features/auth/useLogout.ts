import { useDispatch, useSelector } from "react-redux"
import { logoutThunk } from "./postThunk"
import { AppDispatch, RootState } from "../store"

export const useLogout = () => {
  const dispatch = useDispatch<AppDispatch>()
  const isLogout = useSelector((state: RootState) => state.logout.isLogout)
  const logout = () => {
    dispatch(logoutThunk())
  }
  return {
    logout,
    isLogout
  }
}
