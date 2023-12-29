import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchPosts, fentchPost, fetchPostsByUser, addPost, removePost, PostState } from "../slicers/postSlice";
import { useCallback } from "react";

export const usePost = () => {
  const dispatch = useDispatch<AppDispatch>();
  // Corrigir o seletor para pegar os posts do estado correto
  const posts = useSelector((state: RootState) => state.post);

  const loadPosts = useCallback(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const loadPost = useCallback((postId: number) => {
    dispatch(fentchPost(postId));
  }, [dispatch]);

  const loadPostsByUser = useCallback((username: string) => {
    dispatch(fetchPostsByUser(username));
  }, [dispatch]);

  const handleAddPost = (post: PostState) => {
    dispatch(addPost(post));
  };

  const handleRemovePost = (postId: number) => {
    dispatch(removePost(postId));
  };

  return {
    posts,
    loadPosts,
    loadPost,
    loadPostsByUser,
    handleAddPost,
    handleRemovePost
  };
};

