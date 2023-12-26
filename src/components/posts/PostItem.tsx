import { useCallback, useMemo } from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
import { formatDistanceToNowStrict } from 'date-fns';

import { useLoginModal } from '@/features/hooks/useLoginModal';
import { useProfile } from '@/features/hooks/useProfile';

import Avatar from '../Avatar';
import { useNavigate } from 'react-router';
import { PostState } from '@/features/slicers/postSlice';
interface PostItemProps {
  post: PostState;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const navigate = useNavigate();
  const loginModal = useLoginModal();
  console.log('O Post está sendo carregado');
  console.log(post);

  const { profile: currentUser } = useProfile();

  const goToUser = useCallback((ev: { stopPropagation: () => void; }) => {
    ev.stopPropagation();
    navigate(`/users/${currentUser.user?.username}`)
  }, [navigate, currentUser]);

  const goToPost = useCallback(() => {
    navigate(`/postagens/${currentUser.user.username}`);
  }, [navigate, currentUser]);

  const onLike = useCallback(async (ev: { stopPropagation: () => void; }) => {
    ev.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

  }, [loginModal, currentUser]);

  const createdAt = useMemo(() => {
    if (!post.data_criacao) {
      return null;
    }

    return formatDistanceToNowStrict(new Date());
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
      ">
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={currentUser.user.id} hasBorder/>
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="
                text-white
                font-semibold
                cursor-pointer
                hover:underline
            ">
              {currentUser.user?.first_name + ' ' + currentUser.user?.last_name}
            </p>
            <span
              onClick={goToUser}
              className="
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            ">
              @{currentUser.user?.username}
            </span>
            <span className="text-neutral-500 text-sm">
              {createdAt}
            </span>
          </div>
          <div className="text-white mt-1">
            {post.conteudo}
          </div>
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
            ">
              <AiOutlineMessage size={20} />
              <p>
                5
                {/* {post?. || 0} */}
              </p>
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
            ">
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem;
