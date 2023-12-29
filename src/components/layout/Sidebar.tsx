import { BsBell, BsPerson } from 'react-icons/bs'
import { GoHomeFill } from 'react-icons/go'
import { BiLogOut } from 'react-icons/bi'
import SidebarLogo from './SidebarLogo'
import SidebarItem from './SidebarItem'
import SidebarTweetButton from './SidebarTweetButton'
import { useNavigate } from 'react-router'
import { useLoginModal } from '@/features/hooks/useLoginModal'

const Sidebar = () => {
  const navigate = useNavigate()
  const { onOpen } = useLoginModal()

  const handleLogout = async () => {
    console.log('Fazendo logout...');
    console.log(sessionStorage.getItem('auth_token'));
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/token/logout/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${sessionStorage.getItem('auth_token')}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Falha ao fazer logout');
      }
      navigate('/'); // Redirecione para a página de login ou outra página
      window.location.reload();
      console.log('Logout bem-sucedido');
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {

      sessionStorage.removeItem('auth_token');
 
      localStorage.removeItem('user');
      onOpen();
    }
  };

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
      href: '/users/me',
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
          <SidebarItem icon={BiLogOut} label="Logout" onClick={handleLogout}/>
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
