import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/features/store'; // Importe RootState do arquivo da sua store
import { fetchProfile, setProfile, updateFollowing, clearProfile, ProfileState } from '@/features/slicers/profileSlice';

export const useProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.profile);

  const loadProfile = (userId: string) => {
    dispatch(fetchProfile(userId));
  };

  const updateProfile = (profileData: ProfileState) => {
    dispatch(setProfile(profileData));
  };

  const changeFollowing = (following: string[]) => {
    dispatch(updateFollowing(following));
  };

  const resetProfile = () => {
    dispatch(clearProfile());
  };

  return {
    profile,
    loadProfile,
    updateProfile,
    changeFollowing,
    resetProfile
  };
};
