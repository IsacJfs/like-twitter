import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '@/features/store'
import { fetchLocalUser } from './getThunk'

export const useLocalUser = () => {
  const dispatch = useDispatch<AppDispatch>()
  const localUser = useSelector((state: RootState) => state.localUser)

  const loadLocalUser = useCallback(
    (userId: string) => {
      dispatch(fetchLocalUser(userId))
    },
    [dispatch]
  )

  return {
    localUser,
    loadLocalUser,
  }
}
