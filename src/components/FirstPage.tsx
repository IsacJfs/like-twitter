import { useUser } from '@/features/auth/useLogin'
import TwitterX from '../assets/twitterX.svg'
import Button from './Button'
import { useRegisterModal } from '@/features/register/useRegisterModal'

const FirstPage = () => {
  const { onOpen: loginModal } = useUser()
  const { onOpen: registerModal } = useRegisterModal()
  const clickCreateAccount = () => {
    registerModal()
  }

  const clickLogin = () => {
    loginModal()
  }

  return (
    <div className='bg-black'>
      <div className="block md:grid grid-cols-2 text-white">
        <div className="hidden md:flex">
          <picture className="m-auto">
            <img src={TwitterX} alt="Logo X" />
          </picture>
        </div>
        <div className="flex h-screen">
          <div className="m-auto w-[90vw]">
            <picture className="md:hidden m-auto mb-4 flex">
              <img src={TwitterX} className="w-32 p-4" alt="Logo X" />
            </picture>
            <div className="text-6xl font-bold mb-12">
              <span>Happening now</span>
            </div>
            <div className="text-2xl font-bold mb-8">
              <span>Join Xuitter today.</span>
            </div>
            <div className='flex flex-col md:block justify-center items-center'>
              <div className="w-72">
                <Button
                  label="Create account"
                  onClick={clickCreateAccount}
                  fullWidth
                />
              </div>
              <div className="w-screen md:w-72 flex justify-center items-center py-4">
                <span className="bg-neutral-800 h-px w-32" />
                <p className="px-4">or</p>
                <span className="bg-neutral-800 h-px w-32" />
              </div>
              <div className="w-72">
                <Button
                  label="Sign in"
                  onClick={clickLogin}
                  fullWidth
                  outline
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <p className="text-center text-white flex-wrap text-sm">
          Projeto pessoal sem nenhuma relação com a rede social Twitter, sem
          fins lucrativos. Criado apenas para fins educativos.{' '}
          <a
            href="https://github.com/IsacJfs/like-twitter"
            className="underline text-blue-500 cursor-pointer"
          >
            Respositório do projeto
          </a>
        </p>
      </footer>
    </div>
  )
}

export default FirstPage
