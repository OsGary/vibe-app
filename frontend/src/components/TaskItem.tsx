import type { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggleComplete, onDelete }: TaskItemProps) {
  return (
    <div className={`p-4 border rounded-lg shadow-sm ${task.is_completed ? 'bg-gray-50 opacity-60' : 'bg-white'}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <input
            type="checkbox"
            checked={task.is_completed}
            onChange={() => onToggleComplete(task.id)}
            className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex-1">
            <h3 className={`font-semibold text-lg ${task.is_completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`text-sm mt-1 ${task.is_completed ? 'text-gray-400' : 'text-gray-600'}`}>
                {task.description}
              </p>
            )}
            {task.category && (
              <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                {task.category}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded transition-colors"
          aria-label="Delete task"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
