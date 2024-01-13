import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineMessage } from 'react-icons/ai'
import { formatDistanceToNowStrict, parseISO } from 'date-fns'

import { useUser } from '@/features/auth/useLogin'
import { useLike } from '@/features/posts/useLike'

import Avatar from '../Avatar'
import { PostState } from '@/features/posts/types'
import { BiHeart } from 'react-icons/bi'
import { ProfileState } from '@/features/profile/profileSlice'

interface PostItemProps {
  post: PostState
  profile: ProfileState
}

const PostItem: React.FC<PostItemProps> = ({ post, profile }) => {
  const navigate = useNavigate()
  const { onOpen } = useUser()
  const { handleCurtir } = useLike()
  const token = sessionStorage.getItem('auth_token')

  const goToUser = useCallback(
    (ev: { stopPropagation: () => void }) => {
      ev.stopPropagation()
      navigate(`/users/${post.autor_username}`)
    },
    [navigate, post.autor_username]
  )

  const goToPost = useCallback(() => {
    navigate(`/postagens/${post.id}`)
  }, [navigate, post.id])

  const onLike = useCallback(
    async (ev: { stopPropagation: () => void }) => {
      ev.stopPropagation()

      if (!profile) {
        return onOpen()
      }
      handleCurtir(String(post.id), token || '')
    },
    [profile, handleCurtir, post.id, token, onOpen]
  )

  const createdAt = useMemo(() => {
    if (!post.data_criacao) {
      return null
    }
    const data_criacao = parseISO(post.data_criacao)
    return formatDistanceToNowStrict(data_criacao)
  }, [post.data_criacao])

  return (
    <div
      onClick={goToPost}
      className="
        border-b-[1px]
        border-neutral-800
        p-5
        cursor-pointer
        hover:bg-neutral-900
        transition
      "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={String(post.id)} hasBorder />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="
                text-white
                font-semibold
                cursor-pointer
                hover:underline
            "
            >
              {post.autor_name}
            </p>
            <span
              onClick={goToUser}
              className="
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            "
            >
              @{post.autor_username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{post.conteudo}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div
              className="
                flex
                flex-row
                items-center
                text-neutral-500
                gap-2
                cursor-pointer
                transition
                hover:text-sky-500
            "
            >
              <AiOutlineMessage size={20} />
              <p>{post.comentarios.length}</p>
            </div>
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
              <p>{post.curtidas_count}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem
