import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { useProfile } from '@/features/profile/useProfile'
import { useUser } from '@/features/users/useUser'

interface AvatarProps {
  userId: string
  isLarge?: boolean
  hasBorder?: boolean
}

const Avatar: React.FC<AvatarProps> = ({ isLarge, hasBorder }) => {
  const navigate = useNavigate()

  const { user } = useUser()
  const { profile } = useProfile()

  const onClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()

      const url = `/api/users/${user.username}`
      navigate(url)
    },
    [user, navigate]
  )

  return (
    <div
      className={`
        ${hasBorder ? 'border-4 border-black' : ''}
        ${isLarge ? 'h-32' : 'h-10'}
        ${isLarge ? 'w-32' : 'w-10'}
        rounded-full
        hover:opacity-90
        transition
        cursor-pointer
        relative
      `}
    >
      <img
        style={{
          objectFit: 'cover',
          borderRadius: '100%',
          height: '100%'
        }}
        alt="Avatar"
        onClick={onClick}
        src={profile.profilePicture || '/images/placeholder.avif'}
      />
    </div>
  )
}

export default Avatar
