import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'

import { handleFollower, handleUnfollower } from './postThunk'

export const useFollow = () => {
  const dispatch = useDispatch<AppDispatch>()

  const addFollowerToUser = (followwerUsername: string, token: string) => {
    return dispatch(handleFollower({ followwerUsername, token}))
  }

  const removeFollowerToUser = (followwerUsername: string, token: string) => {
    return dispatch(handleUnfollower({ followwerUsername, token}))
  }

  return {
    addFollowerToUser,
    removeFollowerToUser
  }
}
