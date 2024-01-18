import { useNavigate } from 'react-router-dom'
import { BsBell, BsPerson } from 'react-icons/bs'
import { GoHomeFill } from 'react-icons/go'
import { BiLogOut } from 'react-icons/bi'
import SidebarLogo from './SidebarLogo'
import SidebarItem from './SidebarItem'
import SidebarTweetButton from './SidebarTweetButton'
import { useLogout } from '@/features/auth/useLogout'
import toast from 'react-hot-toast'
import { useUser } from '@/features/auth/useLogin'

const Sidebar = () => {
  const navigate = useNavigate()
  const {logout} = useLogout()
  const { hadleLogoutSuccess } = useUser()
  const handleLogout = () => {
    try {
      logout()
      hadleLogoutSuccess()
      navigate(`/`)
    } catch (error) {
      toast.error('Erro ao fazer logout')
      console.log(error)
    }
  }
  const items = [
    {
      label: 'Home',
      href: '/',
      icon: GoHomeFill
    },
    {
      label: 'Notifications',
      href: '/notifications',
      icon: BsBell
    },
    {
      label: 'Profile',
      href: '/home',
      icon: BsPerson
    }
  ]

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
            />
          ))}
          <SidebarItem icon={BiLogOut} label="Logout" onClick={handleLogout} />
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
