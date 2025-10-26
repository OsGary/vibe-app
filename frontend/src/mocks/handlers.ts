import { http, HttpResponse } from 'msw';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const handlers = [
  // Mock login
  http.post(`${API_BASE_URL}/api/auth/login`, async ({ request }) => {
    const body = await request.json() as { email: string; password: string };
    
    if (body.email === 'test@example.com' && body.password === 'password123') {
      return HttpResponse.json({
        token: 'mock-jwt-token',
        user: {
          id: '1',
          email: 'test@example.com',
          created_at: new Date().toISOString(),
        },
      });
    }
    
    return new HttpResponse(null, { status: 401 });
  }),

  // Mock register
  http.post(`${API_BASE_URL}/api/auth/register`, async () => {
    return HttpResponse.json({
      token: 'mock-jwt-token',
      user: {
        id: '2',
        email: 'newuser@example.com',
        created_at: new Date().toISOString(),
      },
    });
  }),

  // Mock get tasks
  http.get(`${API_BASE_URL}/api/tasks`, () => {
    return HttpResponse.json([
      {
        id: '1',
        title: 'Test Task 1',
        description: 'Description 1',
        category: 'work',
        is_completed: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Test Task 2',
        description: 'Description 2',
        category: 'personal',
        is_completed: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
  }),

  // Mock create task
  http.post(`${API_BASE_URL}/api/tasks`, async ({ request }) => {
    const body = await request.json() as { title: string; description?: string; category?: string };
    return HttpResponse.json({
      id: Date.now().toString(),
      title: body.title,
      description: body.description || null,
      category: body.category || null,
      is_completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, { status: 201 });
  }),

  // Mock update task
  http.put(`${API_BASE_URL}/api/tasks/:id`, async ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      title: 'Updated Task',
      description: 'Updated Description',
      category: 'work',
      is_completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }),

  // Mock delete task
  http.delete(`${API_BASE_URL}/api/tasks/:id`, () => {
    return HttpResponse.json({
      message: 'Task deleted successfully',
      task: {
        id: '1',
        title: 'Deleted Task',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    });
  }),
];

