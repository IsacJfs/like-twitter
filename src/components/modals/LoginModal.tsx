import { useCallback, useState } from "react"
import { useLoginModal } from "@/features/hooks/useLoginModal"
import { useRegisterModal } from "@/features/hooks/useRegisterModal"
import Input from "../Input"
import Modal from "../Modal"

const RegisterModal = () => {

  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const onToggle = useCallback(() => {
    if (isLoading) {
      return
    }

    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, isLoading, registerModal])

  const login = async (username:string, password: string) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/token/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao fazer login');
      }

      const data = await response.json();
      // armazena o token de autenticação no localStorage
      localStorage.setItem('auth_token', data.auth_token); // never expires (unless user clicks "logout")
      // sessionStorage.setItem('auth_token', data.auth_token); // expires when browser closed
      console.log('Login bem-sucedido:', data);

    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const onSubmit = useCallback( async () => {
    try {
      setIsLoading(true)
      await login(username, password)
      loginModal.onClose()
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }, [loginModal, username, password])

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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
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
      isOpen={loginModal.isOpen}
      onSubmit={onSubmit}
      onClose={loginModal.onClose}
      footer={footerContent}
    />
  )

}

export default RegisterModal
