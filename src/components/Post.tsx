import { useCallback, useEffect, useState } from 'react'
import Avatar from './Avatar'
import Button from './Button'
import Input from './Input'
import { NewPost } from '@/features/posts/types'
import { useAddPost } from '@/features/posts/useAddPost'
import toast from 'react-hot-toast'
import { useLocalUser } from '@/features/profile/useLocalUser'
import { usePost } from '@/features/posts/usePost'

type PostProps = {
  onSubmitSuccess: () => void
}

const Post = ({ onSubmitSuccess }: PostProps) => {
  const [posts, setPosts] = useState('')
  const { localUser, loadLocalUser } = useLocalUser()
  const { addNewPost } = useAddPost()
  const { loadPosts } = usePost()
  const user = localStorage.getItem('user')

  useEffect(() => {
    if (!user) {
      return
    }
    loadLocalUser(user)
  }, [loadLocalUser, loadPosts, user])

  const onSubmit = useCallback(async () => {
    try {
      if (!localUser.user.id) {
        throw new Error('Usuário não logado')
      }
      if (posts.length === 0) {
        throw new Error('Preencha o campo de postagem')
      }
      await addNewPost({
        autor: localUser.user.id,
        conteudo: posts
      } as NewPost),
      onSubmitSuccess()
      loadPosts() // solução provisória de atualização, deve ser refatorada para que a atualização seja feita em um estado local
      setPosts('') // limpar o campo
    } catch (error) {
      toast.error('' + error)
    }
  }, [localUser.user.id, posts, addNewPost, onSubmitSuccess, loadPosts])

  return (
    <div className="text-white">
      <section className="grid grid-cols-[40px_auto] gap-2 px-3 pt-3">
        <div className="max-w-40 pt-3">
          <Avatar userId="5" />
        </div>
        <div className="">
          <Input
            placeholder="O que você está pensando?"
            onChange={(e) => setPosts(e.target.value)}
            type="textarea"
            value={posts}
          />
          <div className="py-3 flex justify-end">
            <Button label="Postar" onClick={onSubmit} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Post
