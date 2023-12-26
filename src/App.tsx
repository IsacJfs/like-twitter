import Layout from '@/components/Layout'
import { BrowserRouter } from 'react-router-dom'
import Modal from '@/components/Modal'
import { store } from '@/features/store'
import { Provider } from 'react-redux'
import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'
import Rotas from './routes'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Modal
          actionLabel="Submit"
          title="Teste"
          onClose={App}
          onSubmit={App}
        />
        <Layout>
            <Rotas />
        </Layout>
        <LoginModal />
        <RegisterModal />
      </BrowserRouter>
    </Provider>
  )
}

export default App
