import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchPosts, fetchPostsByUser, addPost, removePost, PostState } from "../slicers/postSlice";
import { useCallback } from "react";

export const usePost = () => {
  const dispatch = useDispatch<AppDispatch>();
  // Corrigir o seletor para pegar os posts do estado correto
  const posts = useSelector((state: RootState) => state.post);

  const loadPosts = () => {
    dispatch(fetchPosts());
    return posts;
  };

  const loadPostsByUser = useCallback((username: string) => {
    dispatch(fetchPostsByUser(username));
  }, [dispatch]);

  const handleAddPost = (post: PostState) => {
    dispatch(addPost(post));
  };

  const handleRemovePost = (postId: string) => {
    dispatch(removePost(postId));
  };

  return {
    posts,
    loadPosts,
    loadPostsByUser,
    handleAddPost,
    handleRemovePost
  };
};

