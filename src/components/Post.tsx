import { useCallback, useEffect, useState } from 'react'
import Avatar from './Avatar'
import Button from './Button'
import Input from './Input'
import { useUser } from '@/features/users/useUser'
import PostFeed from './posts/PostFeed'
import { useProfile } from '@/features/profile/useProfile'
import { NewPost } from '@/features/posts/types'
import { useAddPost } from '@/features/posts/useAddPost'

const Post = () => {
  const [posts, setPosts] = useState('')
  const { profile, loadProfile } = useProfile()
  const { addNewPost } = useAddPost()

  const user = useUser()

  useEffect(() => {
    if (!user.user.username) {
      return
    }
    loadProfile(user.user.username)
  }, [loadProfile, user.user.username])
  console.log(user)
  console.log('profile')
  console.log(profile.user.id)

  const onSubmit = useCallback(async () => {
    try {
      if (!profile.user.id) {
        throw new Error('Usuário não logado')
      }
      console.log(profile.user.id)
      console.log(posts)
      addNewPost({ autor: profile.user.id, conteudo: posts } as NewPost),
      setPosts('') // limpar o campo
    } catch (error) {
      console.error('Erro ao fazer post:', error)
      alert('Erro ao fazer post')
    }
  }, [addNewPost, posts, profile.user.id])

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
      <PostFeed />
    </div>
  )
}

export default Post
