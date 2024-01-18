import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import PostDetails from './pages/PostDetails'
import HomeUser from './pages/HomeUser'
import Layout from './components/Layout'
import { useEffect, useState } from 'react'
import FirstPage from './components/FirstPage'
import { useUser } from './features/auth/useLogin'
import { useLogout } from './features/auth/useLogout'

const Rotas = () => {
  const { loginSuccess } = useUser()
  const { isLogout } = useLogout()
  const [isLogedIn, setIsLoggedIn] = useState(false)
  const token = sessionStorage.getItem('auth_token')
  const user = sessionStorage.getItem('user')

  useEffect(() => {
    if (token && user) {
      setIsLoggedIn(true)
    } else if (isLogout) {
      setIsLoggedIn(false)
    }else{
      setIsLoggedIn(false)
    }
  }, [token, user, loginSuccess, isLogout])
  return (
    <>
      {isLogedIn ? (
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<HomeUser />} />
            <Route path="/users/:username" element={<Profile />} />
            <Route path="/postagens/:id" element={<PostDetails />} />
          </Routes>
        </Layout>
      ) : (
        <FirstPage />
      )}
    </>
  )
}

export default Rotas
