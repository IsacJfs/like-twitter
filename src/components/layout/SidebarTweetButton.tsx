import { useLoginModal } from '@/features/auth/useLoginModal'
import { useAddPost } from '@/features/posts/useAddPost'
import { useCallback } from 'react'
import { FaFeather } from 'react-icons/fa'

const SidebarTweetButton = () => {
  const loginModal = useLoginModal()
  const { postModalOpen } = useAddPost()

  const onClick = useCallback(() => {
    if (!sessionStorage.getItem('auth_token')) {
      loginModal.onOpen()
    } else {
      postModalOpen()
    }
  }, [loginModal, postModalOpen])

  return (
    <div onClick={onClick} className='cursor-pointer'>
      <div
        className="
        mt-6
        lg:hidden
        rounded-full
        h-14
        w-14
        p-4
        flex
        items-center
        justify-center
        bg-sky-500
        hover:bg-opacity-80
        transition
        cursor-pointer
      "
      >
        <FaFeather size={20} color="white" />
      </div>
      <div
        className="
        mt-6
        hidden
        lg:block
        px-4
        py-2
        rounded-full
        bg-sky-500
        hover:bg-opacity-90
        transition
      "
      >
        <p
          className="
          hidden
          lg:block
          text-white
          text-center
          font-semibold
          text-[20px]
        "
        >
          Tweet
        </p>
      </div>
    </div>
  )
}

export default SidebarTweetButton
