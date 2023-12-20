import { useCallback, useState } from 'react'
import { useRegisterModal } from '@/features/hooks/useRegisterModal'
import { useLoginModal } from "@/features/hooks/useLoginModal"
import Input from '../Input'
import Modal from '../Modal'

const RegisterModal = () => {

  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Registers a user with the provided user data.
   * @param userData - The user data including email, username, and password.
   * @returns A Promise that resolves to the response data from the registration API.
   */
  async function registerUser(userData: { email: string; username: string; password: string; name: string }) {
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Falha no registro');
      }
      console.log(response)
      return await response.json(); // { user: { id, email, username }, token }

    } catch (error) {
      console.log(error);
    }
  }

  const onToggle = useCallback(() => {
    if (isLoading) {
      return
    }

    registerModal.onClose()
    loginModal.onOpen()
  }, [registerModal, loginModal, isLoading])

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      if (password !== confirmPassword) {
        throw new Error('As senhas não coincidem');
      }

      await registerUser({ email, username, password, name });

      registerModal.onClose()
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }, [registerModal, email, username, password, confirmPassword, name])

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
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Confirmar senha"
        value={confirmPassword}
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
      isOpen={registerModal.isOpen}
      onSubmit={onSubmit}
      onClose={registerModal.onClose}
      footer={footerContent}
    />
  )
}

export default RegisterModal
