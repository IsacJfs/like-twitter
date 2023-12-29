// Note: Página de perfil do usuário
// hooks personalizados
// import { useUser } from '@/features/hooks/useUser';

// components
import ProfileHero from '@/components/profile/ProfileHero';
import ProfileUser from '@/components/profile/ProfileUser';
import PostFeed from '@/components/posts/PostFeed';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const params = useParams();
  const username = params.username as string; // aqui ta puxando o username da url

  return (
    <div>
      <ProfileHero userId={username} />
      <ProfileUser userId={username} />
      <PostFeed username={username}/>
    </div>
  );
};

export default Profile;
