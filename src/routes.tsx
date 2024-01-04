import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import PostDetails from './pages/PostDetails'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/users/:username" element={<Profile />} />
    <Route path="/postagens/:id" element={<PostDetails />} />
  </Routes>
)

export default Rotas
