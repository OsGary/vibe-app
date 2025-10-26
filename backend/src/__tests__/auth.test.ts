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
import authRouter from '../routes/auth';

describe('Auth Routes', () => {
  let app: Express;

  beforeEach(async () => {
    app = express();
    app.use(express.json());
    app.use('/api/auth', authRouter);
    
    // Get the mocked pool and reset it
    const pool = await import('../db/connection');
    const mockPool = pool.default as any;
    mockPool.query.mockReset();
    mockPool.query.mockResolvedValue({ rows: [], rowCount: 0 });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should return 400 if email is missing', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          password: 'password123',
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Email and password are required');
    });

    it('should return 400 if password is missing', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@test.com',
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Email and password are required');
    });

    it('should return 400 if password is too short', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@test.com',
          password: '12345', // Less than 6 characters
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Password must be at least 6 characters');
    });

    it('should return 409 if user already exists', async () => {
      // Mock existing user
      const pool = await import('../db/connection');
      const mockPool = pool.default as any;
      mockPool.query.mockResolvedValueOnce({
        rows: [{ id: '123' }],
        rowCount: 1,
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'existing@test.com',
          password: 'password123',
        });

      expect(response.status).toBe(409);
      expect(response.body.error).toBe('User already exists with this email');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should return 400 if email is missing', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          password: 'password123',
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Email and password are required');
    });

    it('should return 400 if password is missing', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@test.com',
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Email and password are required');
    });

    it('should return 401 if user does not exist', async () => {
      const pool = await import('../db/connection');
      const mockPool = pool.default as any;
      mockPool.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0,
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@test.com',
          password: 'password123',
        });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Invalid email or password');
    });
  });

  describe('GET /api/auth/me', () => {
    it('should return 401 without token', async () => {
      const response = await request(app)
        .get('/api/auth/me');

      expect(response.status).toBe(401);
    });

    it('should return 401 with invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).toBe(401);
    });

    it('should return 404 if user not found', async () => {
      const jwt = await import('jsonwebtoken');
      const token = jwt.default.sign(
        { userId: 'nonexistent' },
        process.env.JWT_SECRET || 'test-secret',
        { expiresIn: '7d' }
      );

      const pool = await import('../db/connection');
      const mockPool = pool.default as any;
      mockPool.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0,
      });

      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('User not found');
    });
  });
});
