import { usePost } from '@/features/posts/usePost'

import PostItem from './PostItem'
import { useEffect } from 'react'
import { ProfileState } from '@/features/profile/types'

interface PostFeedProps {
  profile: ProfileState
}

const ProfileFeed: React.FC<PostFeedProps> = ({ profile }) => {
  const { posts, loadPostsByUser } = usePost()

  useEffect(() => {
    if (profile.username) {
      loadPostsByUser(profile.username)
    }
  }, [ loadPostsByUser, profile.username])

  return (
    <>
      {posts.posts.map((post) => (
        <PostItem post={post} profile={profile} key={post.id} />
      ))}
    </>
  )
}

export default ProfileFeed
