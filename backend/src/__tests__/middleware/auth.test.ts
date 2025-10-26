import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../../middleware/auth';

// Mock the process.env
vi.mock('dotenv', () => ({
  default: {
    config: vi.fn(),
  },
}));

// Set JWT_SECRET for testing
process.env.JWT_SECRET = 'test-secret-key-for-testing';

describe('Auth Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let statusMock: any;
  let jsonMock: any;

  beforeEach(() => {
    statusMock = vi.fn().mockReturnThis();
    jsonMock = vi.fn().mockReturnThis();

    mockRequest = {
      headers: {},
      userId: undefined,
    };

    mockResponse = {
      status: statusMock,
      json: jsonMock,
    };

    mockNext = vi.fn();
  });

  describe('Token validation', () => {
    it('should return 401 if no authorization header is provided', async () => {
      await authMiddleware(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(statusMock).toHaveBeenCalledWith(401);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'No token provided' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 401 if authorization header does not start with Bearer', async () => {
      mockRequest.headers = {
        authorization: 'Invalid token',
      };

      await authMiddleware(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(statusMock).toHaveBeenCalledWith(401);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'No token provided' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next() with valid JWT token', async () => {
      const token = jwt.sign({ userId: 'test-user-id' }, process.env.JWT_SECRET!);
      
      mockRequest.headers = {
        authorization: `Bearer ${token}`,
      };

      await authMiddleware(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalled();
      expect(mockRequest.userId).toBe('test-user-id');
      expect(statusMock).not.toHaveBeenCalled();
    });

    it('should return 401 if token is invalid', async () => {
      mockRequest.headers = {
        authorization: 'Bearer invalid-token',
      };

      await authMiddleware(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(statusMock).toHaveBeenCalledWith(401);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Invalid or expired token' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 401 if token is expired', async () => {
      const expiredToken = jwt.sign(
        { userId: 'test-user-id' },
        process.env.JWT_SECRET!,
        { expiresIn: '-1h' }
      );

      mockRequest.headers = {
        authorization: `Bearer ${expiredToken}`,
      };

      await authMiddleware(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(statusMock).toHaveBeenCalledWith(401);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Invalid or expired token' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should extract token correctly when Bearer prefix is present', async () => {
      const token = jwt.sign({ userId: 'test-user-id' }, process.env.JWT_SECRET!);
      
      mockRequest.headers = {
        authorization: `Bearer ${token}`,
      };

      await authMiddleware(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockRequest.userId).toBe('test-user-id');
      expect(mockNext).toHaveBeenCalled();
    });
  });
});

