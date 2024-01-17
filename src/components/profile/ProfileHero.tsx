import Avatar from '../Avatar'

interface UserHeroProps {
  coverPicture: string
  userId: number
}

const UserHero: React.FC<UserHeroProps> = ({ coverPicture, userId }) => {

  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {coverPicture && (
          <img
            src={coverPicture}
            alt="Cover Image"
            style={{ objectFit: 'cover' }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId.toString()} isLarge hasBorder />
        </div>
      </div>
    </div>
  )
}

export default UserHero
