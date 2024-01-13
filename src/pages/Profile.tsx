// Note: Página de perfil do usuário
// hooks personalizados
// import { useUser } from '@/features/hooks/useUser';

// components
import ProfileHero from '@/components/profile/ProfileHero'
import ProfileUser from '@/components/profile/ProfileUser'
import PostFeed from '@/components/posts/PostFeed'
import { useParams } from 'react-router-dom'
import { useProfile } from '@/features/profile/useProfile'
import { useEffect } from 'react'

const Profile = () => {
  const params = useParams()
  const username = params.username as string // aqui ta puxando o username da url
  const { loadProfile, profile } = useProfile()

  useEffect(() => {
    if (username === 'me') {
      loadProfile(localStorage.getItem('user')!)
      console.log('username', username)
    } else {
      loadProfile(username)
    }
  }, [loadProfile, username])

  return (
    <div>
      <ProfileHero userId={profile.id} coverPicture={profile.coverPicture || ''} />
      <ProfileUser profile={profile}/>
      <PostFeed profile={profile} />
    </div>
  )
}

export default Profile
