import { PostsState } from '@/features/slicers/postSlice';
interface PostItemProps {
  post: PostsState;
  userId: number;
}

const PostTest = ({post, userId}: PostItemProps) => {

  return (
  <div>
    {post.posts[userId].id}

    <div>
      <h1>
        valor {userId}
      </h1>
    </div>
  </div>
  );
}

export default PostTest;
