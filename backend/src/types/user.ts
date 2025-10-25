export interface User {
  id: string;
  email: string;
  password_hash: string;
  created_at: Date;
}

export interface RegisterDTO {
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    created_at: Date;
  };
}
