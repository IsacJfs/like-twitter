import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'

import { handleFollower } from './postThunk'

export const useFollow = () => {
  const dispatch = useDispatch<AppDispatch>()

  const addFollowerToUser = (username: string, followwerUsername: string, token: string) => {
    console.log(username, followwerUsername, token)
    return dispatch(handleFollower({ username, followwerUsername, token, action: 'follow' }))
  }

  const removeFollowerToUser = (username: string, followwerUsername: string, token: string) => {
    return dispatch(handleFollower({ username, followwerUsername, token, action: 'unfollow' }))
  }

  return {
    addFollowerToUser,
    removeFollowerToUser
  }
}
