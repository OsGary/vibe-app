export interface Task {
  id: string;
  title: string;
  description?: string;
  category?: string;
  is_completed: boolean;
  created_at: Date;
  updated_at: Date;
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
