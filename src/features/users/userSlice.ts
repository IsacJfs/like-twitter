import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Tarefa futura, transferir o logout para a feature/auth
// Verificar a possibilidade de remover a feature/user

interface UserState {
  username: string | null
  token: string | null
}

const initialState: UserState = {
  username: null,
  token: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.username = action.payload.username
      state.token = action.payload.token
    },
    logoutUser: (state) => {
      state.username = null
      state.token = null
    }
  }
})

export const { setUser, logoutUser } = userSlice.actions

export default userSlice.reducer
