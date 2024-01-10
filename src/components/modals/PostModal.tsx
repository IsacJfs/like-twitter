import { useState } from "react";
import { useAddPost } from "@/features/posts/useAddPost";
import Modal from "../Modal";
import Input from "../Input";
import { NewPost } from "@/features/posts/types";

const PostModal = () => {
  const { addNewPost, postModalClose, isOpen } = useAddPost()
  const [ post, setPost ] = useState('')
  const autor = localStorage.getItem('user')

  const onSubmit = () => {
    addNewPost({autor: autor, conteudo: post} as NewPost)
    postModalClose()
  }

  const bodyContent = (
    <div>
      <Input
        placeholder="O que você está pensando?"
        onChange={(e) => setPost(e.target.value)}
        type="textarea"
        value={post}
        label="Digite a mensagem"
      />
    </div>
  )


  return (
    <Modal
    actionLabel="Postar"
    title="Postagem"
    onClose={postModalClose}
    onSubmit={onSubmit}
    body={bodyContent}
    isOpen={isOpen}
    />
  );
}

export default PostModal;
