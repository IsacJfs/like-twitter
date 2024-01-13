import { useState } from "react";
import { useAddPost } from "@/features/posts/useAddPost";
import Modal from "../Modal";
import Input from "../Input";
import { NewPost } from "@/features/posts/types";
import toast from "react-hot-toast";

const PostModal = () => {
  const { addNewPost, postModalClose, isOpen } = useAddPost()
  const [ post, setPost ] = useState('')
  const autor = localStorage.getItem('user')

  const onSubmit = () => {
    try {
      addNewPost({autor: autor, conteudo: post} as NewPost)
      toast.success('Post criado com sucesso!')
      postModalClose()
    } catch (e) {
      toast.error('Erro na submissão:' + e)
    }
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
