import { UserState } from '../profile/types'

export interface NewPost {
  autor: string
  conteudo: string
  isLoading: boolean
  error: string | null
  isOpen: boolean
}

export interface PostState {
  id: number
  autor: number | UserState
  autor_name: string
  autor_username: string
  comentarios: string[]
  conteudo: string | null
  curtidas_count: number
  data_criacao: string | null
  data_atualizacao: string | null
}

export interface PostsState {
  posts: PostState[]
  isLoading: boolean
  error: string | null
}
