// Note: Página de perfil do usuário
// hooks personalizados
// import { useUser } from '@/features/hooks/useUser';

// components
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProfileHero from '@/components/profile/ProfileHero'
import ProfileUser from '@/components/profile/ProfileUser'
import { useProfile } from '@/features/profile/useProfile'
import ProfileFeed from '@/components/posts/ProfileFeed'

const Profile = () => {
  const params = useParams()
  const { loadProfile, profile } = useProfile()

  useEffect(() => {
    const username = params.username as string // aqui ta puxando o username da url
    loadProfile(username)
  }, [loadProfile, params.username])

  return (
    <div>
      <ProfileHero userId={profile.id} coverPicture={profile.coverPicture || ''} />
      <ProfileUser profile={profile}/>
      <ProfileFeed profile={profile} />
    </div>
  )
}

export default Profile
