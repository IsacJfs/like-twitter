import { useCallback, useEffect, useState } from "react";
import Button from "../Button";
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
  const [localUserFollowing, setLocalUserFollowing] = useState(localUser.following_username)


  useEffect(() => {
    if (user) {
      loadLocalUser(user)
    }
  }, [user, loadLocalUser])

  useEffect(() => {
    if (localUser.following_username) {
      setLocalUserFollowing(localUser.following_username)
    }
  }, [localUser.following_username])


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

      await addFollowerToUser(targetUser, token)
      setLocalUserFollowing([...localUserFollowing, targetUser])
    } catch (error) {
        toast.error('Erro inesperado:' + error)
      }
  }, [addFollowerToUser, localUser.username, localUserFollowing, targetUser, token])

  const onUnfollow = useCallback(async () => {
    try {
      if (!token) {
        toast.error('Usuário não logado!')
        throw new Error('Usuário não logado!')
      }
      await removeFollowerToUser(targetUser, token)
      setLocalUserFollowing(localUserFollowing.filter((user) => user !== targetUser))
    } catch (error) {
        toast.error('Erro inesperado:' + error)
      }
  }, [token, removeFollowerToUser, targetUser, localUserFollowing])



  let label = '...'
  let onClick = () => {}

  if (localUser.username === targetUser) {
    label = 'Editar'
    onClick = () => {}
  } else if (localUserFollowing.includes(targetUser)) {
    label = 'Unfollow'
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

