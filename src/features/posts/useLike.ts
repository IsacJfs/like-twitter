import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { curtirPostagem } from './getThunk'

export const useLike = () => {
  const dispatch = useDispatch<AppDispatch>()
  const status = useSelector((state: RootState) => state.curtir.status)
  const error = useSelector((state: RootState) => state.curtir.error)

  const handleCurtir = (postId: string, token: string) => {
    dispatch(curtirPostagem({ postId, token }))
  }

  return {
    handleCurtir,
    status,
    error
  }
}
