// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
// import { loginThunk } from '../postThunk' // Atualize com o caminho correto
// import configureStore from 'redux-mock-store'
// import thunk from 'redux-thunk'

// const middlewares = [thunk]
// const mockStore = configureStore(middlewares)

// const axiosMock = new MockAdapter(axios)

// it('deve criar LOGIN/SUCESSO quando o login for bem-sucedido', async () => {
//   const mockResponse = { auth_token: 'token123' }
//   axiosMock
//     .onPost('http://127.0.0.1:8000/auth/token/login/')
//     .reply(200, mockResponse)

//   const expectedActions = [
//     { type: 'user/login/pending' },
//     {
//       type: 'user/login/fulfilled',
//       payload: { username: 'usuarioTeste', token: 'token123' }
//     }
//   ]

//   const store = mockStore({})

//   store.dispatch(loginThunk({ username: 'usuarioTeste', password: 'senha123' }))

//   expect(store.getActions()).toEqual(expectedActions)
// })

// it('deve criar LOGIN/ERROR quando o login falhar', async () => {
//   axiosMock.onPost('http://127.0.0.1:8000/auth/token/login/').networkError()

//   const expectedActions = [
//     { type: 'user/login/pending' },
//     { type: 'user/login/rejected', error: 'Erro desconhecido ao fazer login' }
//   ]

//   const store = mockStore({})

//   await store.dispatch(
//     loginThunk({ username: 'usuarioTeste', password: 'senha123' })
//   )

//   expect(store.getActions()).toEqual(expectedActions)
// })

// afterEach(() => {
//   axiosMock.reset()
// })
