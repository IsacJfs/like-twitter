import { useEffect } from 'react'
// Note: Página de perfil do usuário
// hooks personalizados
// import { useUser } from '@/features/hooks/useUser';

// components
import ProfileHero from '@/components/profile/ProfileHero'
import ProfileUser from '@/components/profile/ProfileUser'

import { useLocalUser } from '@/features/profile/useLocalUser'
import UserFeed from '@/components/posts/UserFeed'

const HomeOthers = () => {
  const { loadLocalUser, localUser } = useLocalUser()
  const user = localStorage.getItem('user')

  useEffect(() => {
    loadLocalUser(user || '')
  }, [loadLocalUser, user])

  return (
    <div>
      <ProfileHero userId={localUser.id} coverPicture={localUser.coverPicture || ''} />
      <ProfileUser profile={localUser}/>
      <UserFeed profile={localUser} />
    </div>
  )
}

export default HomeOthers
