// Note: Página de perfil do usuário
// hooks personalizados
import { useUser } from '@/features/hooks/useUser';

// components
import ProfileHero from '@/components/profile/ProfileHero';
import ProfileUser from '@/components/profile/ProfileUser';
import PostFeed from '@/components/posts/PostFeed';


const Profile = () => {
  const user = useUser();

  if (!user.user) {
    return <div>User não carregado</div>;
  }

  if (user.user.username === null) {
    return <div>Faça Login para carregar o conteúdo</div>;
  }

  if (user.user.username === undefined) {
    console.log(user);
    return <div>Erro ao carregar o usuário</div>;
  }

  return (
    <div>
      <ProfileHero userId={user.user.username} />
      <ProfileUser userId={user.user.username} />
      <PostFeed />
    </div>
  );
};

export default Profile;
