import { useProfile } from '@/features/hooks/useProfile'
import Avatar from '../Avatar'

interface UserHeroProps {
  userId: string
}

const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  const { profile } = useProfile()

  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {profile?.coverPicture && (
          <img
            src={profile?.coverPicture}
            alt="Cover Image"
            style={{ objectFit: 'cover' }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  )
}

export default UserHero
