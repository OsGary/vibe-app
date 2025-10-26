import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TaskList from '../../components/TaskList';
import type { Task } from '../../types/task';

describe('TaskList', () => {
  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      category: 'work',
      is_completed: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Description 2',
      category: 'personal',
      is_completed: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '3',
      title: 'Task 3',
      description: 'Description 3',
      category: 'work',
      is_completed: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  it('should show empty state when no tasks', () => {
    const onToggleComplete = vi.fn();
    const onDelete = vi.fn();

    render(
      <TaskList
        tasks={[]}
        onToggleComplete={onToggleComplete}
        onDelete={onDelete}
      />
    );

    expect(screen.getByText(/no tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/get started by creating a new task/i)).toBeInTheDocument();
  });

  it('should display active tasks', () => {
    const onToggleComplete = vi.fn();
    const onDelete = vi.fn();

    render(
      <TaskList
        tasks={mockTasks}
        onToggleComplete={onToggleComplete}
        onDelete={onDelete}
      />
    );

    expect(screen.getByText('Active Tasks (2)')).toBeInTheDocument();
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('should display completed tasks', () => {
    const onToggleComplete = vi.fn();
    const onDelete = vi.fn();

    render(
      <TaskList
        tasks={mockTasks}
        onToggleComplete={onToggleComplete}
        onDelete={onDelete}
      />
    );

    expect(screen.getByText('Completed Tasks (1)')).toBeInTheDocument();
    expect(screen.getByText('Task 3')).toBeInTheDocument();
  });

  it('should separate active and completed tasks', () => {
    const onToggleComplete = vi.fn();
    const onDelete = vi.fn();

    render(
      <TaskList
        tasks={mockTasks}
        onToggleComplete={onToggleComplete}
        onDelete={onDelete}
      />
    );

    const allTasks = screen.getAllByText(/task \d/i);
    expect(allTasks).toHaveLength(3);
  });

  it('should only show active tasks section when there are no completed tasks', () => {
    const onToggleComplete = vi.fn();
    const onDelete = vi.fn();

    const activeTasksOnly = mockTasks.filter((task) => !task.is_completed);

    render(
      <TaskList
        tasks={activeTasksOnly}
        onToggleComplete={onToggleComplete}
        onDelete={onDelete}
      />
    );

    expect(screen.getByText('Active Tasks (2)')).toBeInTheDocument();
    expect(screen.queryByText(/completed tasks/i)).not.toBeInTheDocument();
  });

  it('should only show completed tasks section when there are no active tasks', () => {
    const onToggleComplete = vi.fn();
    const onDelete = vi.fn();

    const completedTasksOnly = mockTasks.filter((task) => task.is_completed);

    render(
      <TaskList
        tasks={completedTasksOnly}
        onToggleComplete={onToggleComplete}
        onDelete={onDelete}
      />
    );

    expect(screen.getByText('Completed Tasks (1)')).toBeInTheDocument();
    expect(screen.queryByText(/active tasks/i)).not.toBeInTheDocument();
  });
});

