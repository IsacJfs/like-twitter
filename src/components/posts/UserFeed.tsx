import { usePost } from '@/features/posts/usePost'

import PostItem from './PostItem'
import { useEffect } from 'react'
import { ProfileState } from '@/features/profile/types'
import toast from 'react-hot-toast'

interface PostFeedProps {
  profile: ProfileState
  home?: boolean
}

const UserFeed: React.FC<PostFeedProps> = ({ profile, home }) => {
  const { posts, loadPosts, loadPostsByUser } = usePost()

  useEffect(() => {
    if (home) {
      loadPosts()
      return
    } else if (profile.username) {
      loadPostsByUser(profile.username)
      return
    } else if (!profile.username) {
      toast.loading('Carregando feed')
      return
    }
  }, [home, loadPosts, loadPostsByUser, profile.username])

  return (
    <>
      {posts.posts.map((post) => (
        <PostItem post={post} profile={profile} key={post.id} />
      ))}
    </>
  )
}

export default UserFeed
