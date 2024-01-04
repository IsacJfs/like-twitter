export interface RegisterData {
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface RegisterResponse {
  // Estrutura da resposta da API (ajuste conforme necessário)
  user: {
    id: string;
    email: string;
    username: string;
  };
  token: string;
}
