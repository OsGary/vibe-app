import type { Task, CreateTaskDTO, UpdateTaskDTO } from '../types/task';

const API_BASE_URL = 'http://localhost:3001/api';

// Fetch all tasks
export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_BASE_URL}/tasks`);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
};

// Fetch single task by ID
export const getTask = async (id: string): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch task');
  }
  return response.json();
};

// Create new task
export const createTask = async (task: CreateTaskDTO): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  return response.json();
};

// Update task
export const updateTask = async (id: string, task: UpdateTaskDTO): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  return response.json();
};

// Delete task
export const deleteTask = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
};
