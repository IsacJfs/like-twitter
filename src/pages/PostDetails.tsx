import PostItem from "@/components/posts/PostItem";
import { usePost } from "@/features/hooks/usePost"
import { useParams } from "react-router";

const PostDetails = () => {

  const param = useParams();
  const id = (parseInt(param.id as string)) - 1;
  const { posts, loadPost } = usePost();

  if (!posts.posts[id]) {
    loadPost(id);
  }

  return (
    <div>
      <PostItem post={posts.posts[id]} />
    </div>
  )
}

export default PostDetails
