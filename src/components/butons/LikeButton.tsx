import { BiHeart } from 'react-icons/bi'

interface LikeButtonProps {
  curtidas_count: number
}
const LikeButton = ({ curtidas_count }: LikeButtonProps) => {

  const onLike = () => {}

  return (
    <div
      onClick={onLike}
      className="
                flex
                flex-row
                items-center
                text-neutral-500
                gap-2
                cursor-pointer
                transition
                hover:text-red-500
            "
    >
      <BiHeart size={20} />
      <p>{curtidas_count}</p>
    </div>
  )
}

export default LikeButton
