import { useState, useEffect } from 'react';
import type { Task, CreateTaskDTO } from './types/task';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks. Please check if the backend is running on port 3001.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: CreateTaskDTO) => {
    try {
      setError(null);
      const newTask = await createTask(taskData);
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      setError('Failed to create task');
      console.error('Error creating task:', err);
    }
  };

  const handleToggleComplete = async (id: string) => {
    try {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      setError(null);
      const updatedTask = await updateTask(id, { is_completed: !task.is_completed });
      setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      setError(null);
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Task Manager</h1>
          <p className="text-gray-600">Organize your tasks efficiently</p>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-4 text-red-600 hover:text-red-800 underline"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <TaskForm onSubmit={handleCreateTask} />
          </div>

          <div>
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading tasks...</p>
              </div>
            ) : (
              <TaskList
                tasks={tasks}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
