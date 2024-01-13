import { usePost } from '@/features/posts/usePost'

import PostItem from './PostItem'
import { useEffect } from 'react'

interface PostFeedProps {
  username?: string
}

const PostFeed: React.FC<PostFeedProps> = ({ username }) => {
  const { posts, loadPosts, loadPostsByUser } = usePost()

  useEffect(() => {
    if (username) {
      loadPostsByUser(username)
      return
    }
    if (!username) {
      loadPosts()
      return
    }
  }, [loadPosts, loadPostsByUser, username])

  return (
    <>
      {posts.posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </>
  )
}

export default PostFeed
