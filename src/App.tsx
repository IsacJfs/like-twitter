import Layout from '@/components/Layout'
import { BrowserRouter } from 'react-router-dom'
import Header from '@/components/Header'
import Modal from '@/components/Modal'
import { store } from '@/features/store'
import { Provider } from 'react-redux'
import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'
import Perfil from './components/perfil'
import EditModal from './components/modals/EditModal'

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
          <div className="text-3xl text-sky-500">
            <Header label="Home" />
            <Perfil />
            <EditModal />
          </div>
        </Layout>
        <LoginModal />
        <RegisterModal />
      </BrowserRouter>
    </Provider>
  )
}

export default App
