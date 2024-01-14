import { useCallback, useEffect } from "react";
import Button from "./Button";
import { useFollow } from "@/features/follow/useFollow";
import toast from "react-hot-toast";
import { useLocalUser } from "@/features/profile/useLocalUser";
import { handleFollower } from "@/features/follow/postThunk";

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

      const actionResult = await addFollowerToUser(targetUser, token)
      if (handleFollower.fulfilled.match(actionResult)) {
        toast.success('Usuário seguido com sucesso!')
      } else {
        throw new Error('Error following user:' + actionResult.payload)
      }
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

      const actionResult = await removeFollowerToUser(targetUser, token)
      if (handleFollower.fulfilled.match(actionResult)) {
        toast.success('Usuário seguido com sucesso!')
      } else {
        throw new Error('Error following user:' + actionResult.payload)
      }
    } catch (error) {
        toast.error('Erro inesperado:' + error)
      }
  }, [targetUser, token, removeFollowerToUser])

  let label = '...'
  let onClick = () => {}
  console.log('targetUser', targetUser)
  console.log('localUser.username', localUser)
  console.log('localUser.following_username', localUser.following_username)

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

