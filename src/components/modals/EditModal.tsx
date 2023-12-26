import { useCallback, useEffect, useState } from "react";

import { useProfile } from "@/features/hooks/useProfile";
import { useEditModal } from "@/features/hooks/useEditModal";

import Input from "../Input";
import Modal from "../Modal";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
  const { profile } = useProfile();
  const editModal = useEditModal();

  const [profilePicture, setProfilePicture] = useState('');
  const [coverPicture, setCoverPicture] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setProfilePicture(profile?.profilePicture || '')
    setCoverPicture(profile?.coverPicture || '')
    setName(profile.user?.first_name + ' ' + profile.user?.last_name)
    setUsername(profile.user?.username || '')
    setDescription(profile?.description || '')
  }, [profile?.user, profile?.description, profile?.profilePicture, profile?.coverPicture]);

  const [isLoading, setIsLoading] = useState(false);

  const edit = useCallback(async (name: string, username: string, description: string, profilePicture: string, coverPicture: string) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/profile/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${sessionStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({ name, username, description, profilePicture, coverPicture }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao fazer login');
      }

      const data = await response.json();

      console.log('Edit bem-sucedido:', data);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  } , []);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await edit(name, username, description, profilePicture, coverPicture);
      editModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [edit, name, username, description, profilePicture, coverPicture, editModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload value={profilePicture} disabled={isLoading} onChange={(image) => setProfilePicture(image)} label="Upload profile image" />
      <ImageUpload value={coverPicture} disabled={isLoading} onChange={(image) => setCoverPicture(image)} label="Upload cover image" />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        disabled={isLoading}
      />
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
}

export default EditModal;
