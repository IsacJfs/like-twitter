import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'


import { useProfile } from '@/features/hooks/useProfile'
import { useUser } from '@/features/hooks/useUser'

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
    [ user, navigate]
  )

  return (
    <div
      className={`
        ${hasBorder ? 'border-4 border-black' : ''}
        ${isLarge ? 'h-32' : 'h-12'}
        ${isLarge ? 'w-32' : 'w-12'}
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
          height: '100%',
        }}
        alt="Avatar"
        onClick={onClick}
        src={profile.profilePicture || '/images/placeholder.avif'}
      />
    </div>
  )
}

export default Avatar
