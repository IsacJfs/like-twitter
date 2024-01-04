import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '@/features/store'
import {
  setProfile,
  updateFollowing,
  clearProfile,
  ProfileState
} from '@/features/profile/profileSlice'
import { fetchProfile } from './getThunk'

export const useProfile = () => {
  const dispatch = useDispatch<AppDispatch>()
  const profile = useSelector((state: RootState) => state.profile)

  const loadProfile = useCallback(
    (userId: string) => {
      dispatch(fetchProfile(userId))
    },
    [dispatch]
  )

  const updateProfile = (profileData: ProfileState) => {
    dispatch(setProfile(profileData))
  }

  const changeFollowing = (following: string[]) => {
    dispatch(updateFollowing(following))
  }

  const resetProfile = () => {
    dispatch(clearProfile())
  }

  return {
    profile,
    loadProfile,
    updateProfile,
    changeFollowing,
    resetProfile
  }
}
