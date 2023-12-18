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
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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

      registerModal.onClose()
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }, [registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
