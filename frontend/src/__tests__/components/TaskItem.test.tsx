import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskItem from '../../components/TaskItem';
import type { Task } from '../../types/task';

describe('TaskItem', () => {
  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    category: 'work',
    is_completed: false,
    created_at: new Date(),
    updated_at: new Date(),
  };

  it('should render task details', () => {
    const onToggleComplete = vi.fn();
    const onDelete = vi.fn();

    render(
      <TaskItem
        task={mockTask}
        onToggleComplete={onToggleComplete}
        onDelete={onDelete}
      />
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('work')).toBeInTheDocument();
  });

  it('should call onToggleComplete when checkbox is clicked', async () => {
    const user = userEvent.setup();
    const onToggleComplete = vi.fn();
    const onDelete = vi.fn();

    render(
      <TaskItem
        task={mockTask}
        onToggleComplete={onToggleComplete}
        onDelete={onDelete}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(onToggleComplete).toHaveBeenCalledWith('1');
  });

  it('should call onDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    const onToggleComplete = vi.fn();
    const onDelete = vi.fn();

    render(
      <TaskItem
        task={mockTask}
        onToggleComplete={onToggleComplete}
        onDelete={onDelete}
      />
    );

    const deleteButton = screen.getByLabelText(/delete task/i);
    await user.click(deleteButton);

    expect(onDelete).toHaveBeenCalledWith('1');
  });

  it('should show completed task styling when task is completed', () => {
    const onToggleComplete = vi.fn();
    const onDelete = vi.fn();

    const completedTask: Task = {
      ...mockTask,
      is_completed: true,
    };

    render(
      <TaskItem
        task={completedTask}
        onToggleComplete={onToggleComplete}
        onDelete={onDelete}
      />
    );

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);

    // Task title should have line-through when completed
    const title = screen.getByText('Test Task');
    expect(title).toHaveClass('line-through');
  });

  it('should render task without description', () => {
    const onToggleComplete = vi.fn();
    const onDelete = vi.fn();

    const taskWithoutDescription: Task = {
      ...mockTask,
      description: undefined,
    };

    render(
      <TaskItem
        task={taskWithoutDescription}
        onToggleComplete={onToggleComplete}
        onDelete={onDelete}
      />
    );

    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  });

  it('should render task without category', () => {
    const onToggleComplete = vi.fn();
    const onDelete = vi.fn();

    const taskWithoutCategory: Task = {
      ...mockTask,
      category: undefined,
    };

    render(
      <TaskItem
        task={taskWithoutCategory}
        onToggleComplete={onToggleComplete}
        onDelete={onDelete}
      />
    );

    expect(screen.queryByText('work')).not.toBeInTheDocument();
  });
});

