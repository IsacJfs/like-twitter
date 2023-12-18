import { useCallback, useState } from "react"
import { useLoginModal } from "@/features/hooks/useLoginModal"
import { useRegisterModal } from "@/features/hooks/useRegisterModal"
import Input from "../Input"
import Modal from "../Modal"

const RegisterModal = () => {

  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const onToggle = useCallback(() => {
    if (isLoading) {
      return
    }

    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, isLoading, registerModal])

  const onSubmit = useCallback( async () => {
    try {
      setIsLoading(true)

      loginModal.onClose()
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }, [loginModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
