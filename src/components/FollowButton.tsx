import { useCallback, useEffect } from "react";
import Button from "./Button";
import { useFollow } from "@/features/follow/useFollow";
import toast from "react-hot-toast";
import { useLocalUser } from "@/features/profile/useLocalUser";

interface FollowButtonProps {
  targetUser: string;
}

const FollowButton = ({ targetUser }: FollowButtonProps) => {
  const { localUser, loadLocalUser } = useLocalUser()
  const { addFollowerToUser, removeFollowerToUser } = useFollow()
  const user = localStorage.getItem('user')
  const token = sessionStorage.getItem('auth_token')

  useEffect(() => {
    if (user) {
      loadLocalUser(user)
    }
  }, [user, loadLocalUser])

  const onFollow = useCallback(async () => {
    try {
      if (localUser.username === targetUser) {
        toast.error('Você não pode seguir a si mesmo')
        throw new Error('Você não pode seguir a si mesmo')
      }

      if (!token) {
        toast.error('Usuário não logado!')
        throw new Error('Usuário não logado!')
      }

      addFollowerToUser(targetUser, token)

    } catch (error) {
        toast.error('Erro inesperado:' + error)
      }
  }, [addFollowerToUser, localUser.username, targetUser, token])

  const onUnfollow = useCallback(async () => {
    try {
      if (!token) {
        toast.error('Usuário não logado!')
        throw new Error('Usuário não logado!')
      }
      removeFollowerToUser(targetUser, token)
    } catch (error) {
        toast.error('Erro inesperado:' + error)
      }
  }, [targetUser, token, removeFollowerToUser])

  let label = '...'
  let onClick = () => {}

  if (localUser.username === targetUser) {
    label = 'Editar'
    onClick = () => {}
  } else if (localUser.following_username.includes(targetUser)) {
    label = 'unFollow'
    onClick = () => {onUnfollow()}
  } else {
    label = 'Follow'
    onClick = () => {onFollow()}
  }

  return (
    <Button label={label} onClick={onClick} />
  );
};

export default FollowButton

