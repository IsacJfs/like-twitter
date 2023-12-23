
import ProfileHero from './profile/ProfileHero';
import ProfileUser from './profile/ProfileUser';
import { useUser } from '@/features/hooks/useUser';

const Perfil = () => {
  const user = useUser();

  if (!user.user) {
    return <div>User não carregado</div>;
  }

  if (user.user.username === null) {
    return <div>Carregando...</div>;
  }

  if (user.user.username === undefined) {
    console.log(user);
    return <div>Erro ao carregar o usuário</div>;
  }

  return (
    <div>
      <ProfileHero userId={user.user.username} />
      <ProfileUser userId={user.user.username} />
    </div>
  );
};

export default Perfil;

// loginSuccess: (state, action: PayloadAction<{userId: number}>) => {
//   state.userId = action.payload.userId;
// },
