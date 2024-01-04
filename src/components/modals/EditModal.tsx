import { useCallback, useEffect, useState } from 'react'

import { useProfile } from '@/features/profile/useProfile'
import { useEditModal } from '@/features/profile/useEditModal'

import Input from '../Input'
import Modal from '../Modal'
import ImageUpload from '../ImageUpload'

const EditModal = () => {
  const { profile } = useProfile()
  const { editProfile, isOpen, isLoading, onClose } = useEditModal()

  const [profilePicture, setProfilePicture] = useState('')
  const [coverPicture, setCoverPicture] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    setProfilePicture(profile?.profilePicture || '')
    setCoverPicture(profile?.coverPicture || '')
    setName(profile.user?.first_name + ' ' + profile.user?.last_name)
    setUsername(profile.user?.username || '')
    setDescription(profile?.description || '')
  }, [
    profile?.user,
    profile?.description,
    profile?.profilePicture,
    profile?.coverPicture
  ])

  const onSubmit = useCallback(async () => {
    try {
      isLoading
      editProfile({
        coverPicture,
        description,
        name,
        profilePicture,
        username
      })
      onClose()
    } catch (error) {
      console.log(error)
    } finally {
      isLoading
    }
  }, [
    coverPicture,
    description,
    editProfile,
    isLoading,
    name,
    onClose,
    profilePicture,
    username
  ])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profilePicture}
        disabled={isLoading}
        onChange={(image) => setProfilePicture(image)}
        label="Upload profile image"
      />
      <ImageUpload
        value={coverPicture}
        disabled={isLoading}
        onChange={(image) => setCoverPicture(image)}
        label="Upload cover image"
      />
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
      isOpen={isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  )
}

export default EditModal
