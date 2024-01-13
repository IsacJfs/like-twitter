import { usePost } from '@/features/posts/usePost'

import PostItem from './PostItem'
import { useEffect } from 'react'
import { ProfileState } from '@/features/profile/profileSlice'

interface PostFeedProps {
  profile: ProfileState
  home?: boolean
}

const PostFeed: React.FC<PostFeedProps> = ({ profile, home }) => {
  const { posts, loadPosts, loadPostsByUser } = usePost()

  useEffect(() => {
    if (home) {
      loadPosts()
      return
    } else if (profile.username) {
      console.log('profile.username', profile.username)
      loadPostsByUser(profile.username)
      return
    } else if (!profile.username) {
      loadPosts()
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

export default PostFeed
