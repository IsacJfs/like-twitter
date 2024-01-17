import { useAddPost } from "@/features/posts/useAddPost";
import Modal from "../Modal";
import Post from "../Post";

const PostModal = () => {
  const { postModalClose, isOpen } = useAddPost()
  const onSubmit = () => {
    postModalClose()
  }

  return (
    <Modal
    title="Postagem"
    onClose={postModalClose}
    onSubmit={onSubmit}
    body={<Post />}
    isOpen={isOpen}
    actionLabel="Sair"
    />
  );
}

export default PostModal;
