import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'

import { addFollower } from './postThunk'

export const useFollow = () => {
  const dispatch = useDispatch<AppDispatch>()

  const addFollowerToUser = (username: string, followwerUsername: string, token: string) => {
    dispatch(addFollower({ username, followwerUsername, token }))
  }

  return {
    addFollowerToUser
  }
}
