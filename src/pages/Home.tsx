import Post from '@/components/Post'
import PostFeed from '@/components/posts/PostFeed'

const Home = () => {

  return (
    <div className="text-white">
      <Post/>
      <PostFeed/>
    </div>
  )
}

export default Home
