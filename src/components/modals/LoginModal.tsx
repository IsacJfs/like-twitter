import { useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { useLoginModal } from "@/features/hooks/useLoginModal"
import { useRegisterModal } from "@/features/hooks/useRegisterModal"
import Input from "../Input"
import Modal from "../Modal"
import { setUser } from "@/features/slicers/userSlice"

const LoginModal = () => {

  const dispatch = useDispatch()

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

  const login = useCallback(async (username:string, password: string) => {
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

      const data = await response.json(); // armazena o token de autenticação no localStorage
      sessionStorage.setItem('auth_token', data.auth_token); // expires when browser closed
      localStorage.setItem('user', username); // never expires (unless user clicks "logout")

      console.log('Login bem-sucedido:', data);
      dispatch(setUser({username, token:data.auth_token}))

    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  }, [dispatch]);

  const onSubmit = useCallback( async () => {
    try {
      setIsLoading(true)
      await login(username, password)

      loginModal.onClose()
      setUsername('')
      setPassword('')
    } catch (e) {
      console.error('Erro na submissão:', e)
    } finally {
      setIsLoading(false)

    }
  }, [loginModal, username, password, login])

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
      isOpen={loginModal.isOpen}
      onSubmit={onSubmit}
      onClose={loginModal.onClose}
      footer={footerContent}
    />
  )

}

export default LoginModal
