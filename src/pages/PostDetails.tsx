import { useParams } from 'react-router-dom'
import PostItem from '@/components/posts/PostItem'
import { usePost } from '@/features/posts/usePost'
import { useEffect } from 'react'

const PostDetails = () => {
  const param = useParams()
  const id = parseInt(param.id as string) - 1
  const { posts, loadPosts } = usePost()

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  if (posts.posts[id] === undefined) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    )
  }

  return (
    <div>
      <PostItem post={posts.posts[id]} />
    </div>
  )
}

export default PostDetails
