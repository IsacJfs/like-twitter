import { useEffect } from 'react'
import FollowBar from './layout/FollowBar'
import Sidebar from './layout/Sidebar'
import { useDispatch } from 'react-redux'
import { setUser } from '@/features/users/userSlice'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch()

  const storedUser = localStorage.getItem('user')
  const storedPass = sessionStorage.getItem('auth_token')

  useEffect(() => {
    if (storedUser) {
      dispatch(setUser({ username: storedUser, token: storedPass }))
    }
  }, [dispatch, storedPass, storedUser])

  return (
    <div className="h-screen bg-black">
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        <div className="grid grid-cols-4 h-full">
          <Sidebar />
          <div
            className="
            col-span-3
            lg:col-span-2
            border-x-[1px]
            border-neutral-800
          "
          >
            {children}
          </div>
          <FollowBar />
        </div>
      </div>
    </div>
  )
}

export default Layout
