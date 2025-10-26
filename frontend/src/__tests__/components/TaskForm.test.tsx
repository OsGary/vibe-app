import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskForm from '../../components/TaskForm';

describe('TaskForm', () => {
  it('should render form fields', () => {
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  it('should call onSubmit with correct data when form is submitted', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} />);

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const categoryInput = screen.getByLabelText(/category/i);
    const submitButton = screen.getByRole('button', { name: /add task/i });

    await user.type(titleInput, 'Test Task');
    await user.type(descriptionInput, 'Test Description');
    await user.type(categoryInput, 'work');
    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Test Task',
      description: 'Test Description',
      category: 'work',
    });
  });

  it('should clear form fields after submission', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} />);

    const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
    const descriptionInput = screen.getByLabelText(/description/i) as HTMLTextAreaElement;

    await user.type(titleInput, 'Test Task');
    await user.type(descriptionInput, 'Test Description');
    await user.click(screen.getByRole('button', { name: /add task/i }));

    expect(titleInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
  });

  it('should trim whitespace from inputs', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} />);

    const titleInput = screen.getByLabelText(/title/i);
    await user.type(titleInput, '  Test Task  ');
    await user.click(screen.getByRole('button', { name: /add task/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Test Task',
      description: undefined,
      category: undefined,
    });
  });

  it('should handle optional fields', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} />);

    const titleInput = screen.getByLabelText(/title/i);
    await user.type(titleInput, 'Task without description');
    await user.click(screen.getByRole('button', { name: /add task/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Task without description',
      description: undefined,
      category: undefined,
    });
  });
});

