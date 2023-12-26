import {usePost} from '@/features/hooks/usePost';

import PostItem from './PostItem';
import { useEffect } from 'react';
import { useUser } from '@/features/hooks/useUser';

const PostFeed: React.FC = () => {
  const { posts, loadPostsByUser} = usePost();
  const { user } = useUser();
  useEffect(() => {
    if (!user.username) {
      return;
    }
    return loadPostsByUser(user.username);
  }, [user.username, loadPostsByUser]);

  return (
    <>
      {posts.posts.map((post) => (
        <PostItem post={post} key={post.id}/>
      ))}
    </>
  );
};

export default PostFeed;
