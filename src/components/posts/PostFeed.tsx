import { usePost } from '@/features/posts/usePost'

import PostItem from './PostItem'
import { useEffect } from 'react'
import Post from '../Post'

const PostFeed: React.FC = () => {
  const { posts, loadPosts } = usePost()
  useEffect(() => {
    loadPosts()
  }, [loadPosts])
  const reversedPosts = [...posts.posts].reverse();
  return (
    <>
      <Post onSubmitSuccess={loadPosts} />
      {reversedPosts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </>
  )
}

export default PostFeed
