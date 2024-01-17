export interface UserState {
  id: string
  username: string | null
  email: string | null
  first_name: string | null
  last_name: string | null
  date_joined: string | null
}

export interface ProfileState {
  id: number
  user: UserState
  description: string | null
  birthday: string | null
  profilePicture: string | null
  coverPicture: string | null
  following_username: string[]
  followers_count: number
  isLoading: boolean
  error: string | null | unknown
  username: string | null
}
