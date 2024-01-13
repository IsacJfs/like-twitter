import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '@/features/store'
import { fetchProfile } from './getThunk'

export const useLocalUser = () => {
  const dispatch = useDispatch<AppDispatch>()
  const localUser = useSelector((state: RootState) => state.localUser)

  const loadLocalUser = useCallback(
    (userId: string) => {
      dispatch(fetchProfile(userId))
    },
    [dispatch]
  )

  return {
    localUser,
    loadLocalUser,
  }
}
