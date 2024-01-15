import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'

import { handleFollower, handleUnfollower } from './postThunk'

export const useFollow = () => {
  const dispatch = useDispatch<AppDispatch>()

  const addFollowerToUser = async (followerUsername: string, token: string) =>{
    const response = await dispatch(handleFollower({ followerUsername, token }))
    return response
  }
  const removeFollowerToUser = (followerUsername: string, token: string) => {
    const response = dispatch(handleUnfollower({ followerUsername, token }))
    return response
  }

  return {
    addFollowerToUser,
    removeFollowerToUser
  }
}
