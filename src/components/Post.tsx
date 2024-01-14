import { useCallback, useEffect, useState } from 'react'
import Avatar from './Avatar'
import Button from './Button'
import Input from './Input'
import PostFeed from './posts/PostFeed'
import { NewPost } from '@/features/posts/types'
import { useAddPost } from '@/features/posts/useAddPost'
import toast from 'react-hot-toast'
import { useLocalUser } from '@/features/profile/useLocalUser'

const Post = () => {
  const [posts, setPosts] = useState('')
  const { localUser, loadLocalUser } = useLocalUser()
  const { addNewPost } = useAddPost()

  const user = localStorage.getItem('user')

  useEffect(() => {
    if (!user) {
      return
    }
    loadLocalUser(user)
  }, [loadLocalUser, user])


  const onSubmit = useCallback(async () => {
    try {
      if (!localUser.user.id) {
        throw new Error('Usuário não logado')
      }
      addNewPost({ autor: localUser.user.id, conteudo: posts } as NewPost),
      toast.success('Post criado com sucesso!')
      setPosts('') // limpar o campo
    } catch (error) {
      toast.error('Erro ao fazer post:'+ error)
    }
  }, [addNewPost, posts, localUser.user.id])

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
      <PostFeed/>
    </div>
  )
}

export default Post
