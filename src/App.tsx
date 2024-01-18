import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from '@/features/store'
import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'
import Rotas from './routes'
import PostModal from './components/modals/PostModal'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster />
        <Rotas />
        <LoginModal />
        <RegisterModal />
        <PostModal />
      </BrowserRouter>
    </Provider>
  )
}

export default App
