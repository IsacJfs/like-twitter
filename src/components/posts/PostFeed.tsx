import {usePost} from '@/features/hooks/usePost';

import PostItem from './PostItem';
import { useEffect } from 'react';

const PostFeed: React.FC = () => {
  const { posts, loadPosts} = usePost();

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <>
      {posts.posts.map((post) => (
        <PostItem post={post} key={post.id}/>
      ))}
    </>
  );
};

export default PostFeed;
