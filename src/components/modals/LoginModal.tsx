import { useCallback, useState } from 'react'
import { useRegisterModal } from '@/features/register/useRegisterModal'
import Input from '../Input'
import Modal from '../Modal'
import { useUser } from '@/features/auth/useLogin'

const LoginModal = () => {
  const registerModal = useRegisterModal()
  const { login, onClose, isOpen, userData } = useUser()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onToggle = useCallback(() => {
    if (isLoading) {
      return
    }
    onClose()
    registerModal.onOpen()
  }, [isLoading, registerModal, onClose])

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      login(username, password)
      localStorage.setItem('user', username)
      sessionStorage.setItem('auth_token', userData?.token || '')
      onClose()
      setUsername('')
      setPassword('')
    } catch (e) {
      console.error('Erro na submissão:', e)
    } finally {
      setIsLoading(false)
    }
  }, [login, username, password, userData?.token, onClose])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Senha"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
        type="password"
      />
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Não possui conta?
        <span
          onClick={onToggle}
          className="
          text-white
          cursor-pointer
          hover:underline
          pl-1
          "
        >
          Crie uma conta
        </span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      title="Login"
      actionLabel="Entrar"
      body={bodyContent}
      isOpen={isOpen}
      onSubmit={onSubmit}
      onClose={onClose}
      footer={footerContent}
    />
  )
}

export default LoginModal
