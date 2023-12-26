import { useCallback, useEffect, useState } from 'react'
import Avatar from './Avatar'
import Button from './Button'
import Input from './Input'
import { useUser } from '@/features/hooks/useUser'
import PostFeed from './posts/PostFeed'
import { useProfile } from '@/features/hooks/useProfile'

const Post = () => {
  const [posts, setPosts] = useState('')
  const { profile, loadProfile } = useProfile()

  const user = useUser();

  useEffect(() => {
    if (!user.user.username) {
      return
    }
    loadProfile(user.user.username)
  }, [loadProfile, user.user.username])

  const post = useCallback(async (conteudo: string, autor: string) => {
    try {
      const response = await fetch(
        'http://127.0.0.1:8000/api/postagens/adicionar/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ autor: autor, conteudo: conteudo })
        }
      )
      console.log('response', response)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro ao fazer post')
      }
    } catch (error) {
      console.error('Erro ao fazer post:', error)
    }
  }, [])

  const onSubmit = useCallback(async () => {
    try {
      if (!profile.user.id) {
        throw new Error('Usuário não logado')
      }
      await post(posts, profile.user.id)
      setPosts('')
    } catch (error) {
      console.error('Erro ao fazer post:', error)
    }
  }, [post, posts, profile.user.id])

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
