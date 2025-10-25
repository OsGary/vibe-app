export interface Task {
  id: string;
  title: string;
  description?: string;
  category?: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskDTO {
  title: string;
  description?: string;
  category?: string;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  category?: string;
  is_completed?: boolean;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
