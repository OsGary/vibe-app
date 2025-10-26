import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import request from 'supertest';
import express, { Express } from 'express';

// Set JWT_SECRET for testing
process.env.JWT_SECRET = 'test-secret-key-for-jwt';

// Mock the database connection before importing routes
vi.mock('../db/connection', () => ({
  default: {
    query: vi.fn(),
    connect: vi.fn(),
    end: vi.fn(),
  },
}));

// Import routes after mocking
import tasksRouter from '../routes/tasks';

describe('Tasks Routes', () => {
  let app: Express;
  let validToken: string;

  beforeEach(async () => {
    app = express();
    app.use(express.json());
    app.use('/api/tasks', tasksRouter);
    
    // Get the mocked pool and reset it
    const pool = await import('../db/connection');
    const mockPool = pool.default as any;
    mockPool.query.mockReset();
    mockPool.query.mockResolvedValue({ rows: [], rowCount: 0 });

    // Generate a valid token for authenticated requests
    const jwt = await import('jsonwebtoken');
    validToken = jwt.default.sign(
      { userId: 'test-user-id' },
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '7d' }
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/tasks', () => {
    it('should return 401 without token', async () => {
      const response = await request(app)
        .get('/api/tasks');

      expect(response.status).toBe(401);
    });

    it('should return all tasks for authenticated user', async () => {
      const mockTasks = [
        {
          id: '1',
          user_id: 'test-user-id',
          title: 'Test Task 1',
          description: 'Description 1',
          category: 'work',
          is_completed: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      const pool = await import('../db/connection');
      const mockPool = pool.default as any;
      mockPool.query.mockResolvedValueOnce({
        rows: mockTasks,
        rowCount: 1,
      });

      const response = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].title).toBe('Test Task 1');
    });

    it('should return empty array when user has no tasks', async () => {
      const pool = await import('../db/connection');
      const mockPool = pool.default as any;
      mockPool.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0,
      });

      const response = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('should return 401 without token', async () => {
      const response = await request(app)
        .get('/api/tasks/123');

      expect(response.status).toBe(401);
    });

    it('should return 404 if task does not exist', async () => {
      const pool = await import('../db/connection');
      const mockPool = pool.default as any;
      mockPool.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0,
      });

      const response = await request(app)
        .get('/api/tasks/nonexistent')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Task not found');
    });
  });

  describe('POST /api/tasks', () => {
    it('should return 401 without token', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: 'New Task' });

      expect(response.status).toBe(401);
    });

    it('should return 400 if title is missing', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${validToken}`)
        .send({
          description: 'Description only',
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Title is required');
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should return 401 without token', async () => {
      const response = await request(app)
        .put('/api/tasks/123')
        .send({ title: 'Updated Title' });

      expect(response.status).toBe(401);
    });

    it('should return 404 if task does not exist', async () => {
      const pool = await import('../db/connection');
      const mockPool = pool.default as any;
      mockPool.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0,
      });

      const response = await request(app)
        .put('/api/tasks/nonexistent')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ title: 'Updated Title' });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Task not found');
    });

    it('should return 400 if no fields to update', async () => {
      const response = await request(app)
        .put('/api/tasks/123')
        .set('Authorization', `Bearer ${validToken}`)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('No fields to update');
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should return 401 without token', async () => {
      const response = await request(app)
        .delete('/api/tasks/123');

      expect(response.status).toBe(401);
    });

    it('should return 404 if task does not exist', async () => {
      const pool = await import('../db/connection');
      const mockPool = pool.default as any;
      mockPool.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0,
      });

      const response = await request(app)
        .delete('/api/tasks/nonexistent')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Task not found');
    });
  });
});
