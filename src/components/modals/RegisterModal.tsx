import { useCallback, useEffect, useState } from 'react'
import { useRegisterModal } from '@/features/register/useRegisterModal'
import { useLoginModal } from '@/features/auth/useLoginModal'
import Input from '../Input'
import Modal from '../Modal'
import { RegisterData } from '@/features/register/types'
import toast from 'react-hot-toast'

const RegisterModal = () => {
  const {register, onClose, isLoading, isOpen, registerSuccess } = useRegisterModal()
  const loginModal = useLoginModal()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const onToggle = useCallback(() => {
    onClose()
    loginModal.onOpen()
  }, [onClose, loginModal])

  useEffect(() => {
    if (registerSuccess) {
      setEmail('')
      setPassword('')
      setFirstName('')
      setUsername('')
      setConfirmPassword('')
      setLastName('')
      onClose()
    }
  }, [registerSuccess, onToggle, onClose])

  const onSubmit = useCallback(async () => {
    const userData: RegisterData = {
      email: email,
      password: password,
      username: username,
      first_name: firstName,
      last_name: lastName
    }
    try {
      if (password !== confirmPassword) {
        throw new Error('As senhas não coincidem')
      }
      await register(userData)

    } catch (e) {
      toast.error('Erro na submissão:' + e)
    }
  }, [email, password, username, firstName, lastName, confirmPassword, register])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Primeiro nome"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Último nome"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Senha"
        value={password}
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Confirmar senha"
        value={confirmPassword}
        type='password'
        onChange={(e) => setConfirmPassword(e.target.value)}
        disabled={isLoading}
      />
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Já possui conta?
        <span
          onClick={onToggle}
          className="
          text-white
          cursor-pointer
          hover:underline
          pl-1
          "
        >
          Entrar
        </span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      title="Criar uma conta"
      actionLabel="Registrar"
      body={bodyContent}
      isOpen={isOpen}
      onSubmit={onSubmit}
      onClose={onClose}
      footer={footerContent}
    />
  )
}

export default RegisterModal
