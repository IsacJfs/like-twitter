import { useEffect, useMemo } from 'react'
import { BiCalendar } from 'react-icons/bi'
import { format } from 'date-fns'

import { useProfile } from '@/features/profile/useProfile'
import Button from '../Button'
import { useFollow } from '@/features/follow/useFollow'
interface ProfileUserProps {
  userId: string
}

const ProfileUser: React.FC<ProfileUserProps> = ({ userId }) => {
  const { profile, loadProfile } = useProfile()
  const { addFollowerToUser } = useFollow()

  useEffect(() => {
    loadProfile(userId)
  }, [userId, loadProfile])

  const createdAt = useMemo(() => {
    if (!profile.user?.date_joined) {
      return null
    }

    return format(new Date(profile.user.date_joined), 'MMMM yyyy')
  }, [profile.user.date_joined])

  const onClick = () => {
    const user = localStorage.getItem('user')
    const followerUsername = profile.user.username
    const token = sessionStorage.getItem('auth_token')
    console.log(user)
    console.log(token)
    if (user == profile.user.username) {
      throw new Error('Cannot follow yourself')
    }

    if (!user || !token || !followerUsername) {
      throw new Error('User not logged in')
    }

    addFollowerToUser(user, followerUsername, token)
  }

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="mt-2 px-4">
        <div className='flex flex-row justify-end my-3'>
          <Button label='Follow' onClick={onClick} />
        </div>
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">
            {profile.user.first_name + ' ' + profile.user.last_name}
          </p>
          <p className="text-md text-neutral-500">@{profile?.user.username}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white">{profile?.description}</p>
          <div
            className="
              flex
              flex-row
              items-center
              gap-2
              mt-4
              text-neutral-500
          "
          >
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{profile?.following_usernames?.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{profile?.followers_count || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileUser
