import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'

import { handleFollower, handleUnfollower } from './postThunk'

export const useFollow = () => {
  const dispatch = useDispatch<AppDispatch>()

  const addFollowerToUser = (username: string, followwerUsername: string, token: string) => {
    return dispatch(handleFollower({ username, followwerUsername, token}))
  }

  const removeFollowerToUser = (username: string, followwerUsername: string, token: string) => {
    return dispatch(handleUnfollower({ username, followwerUsername, token}))
  }

  return {
    addFollowerToUser,
    removeFollowerToUser
  }
}
