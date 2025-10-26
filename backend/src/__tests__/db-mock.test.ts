import { describe, it, expect, beforeEach } from 'vitest';
import { createMockPool, setupMockQuery, mockPool } from '../__mocks__/db';

describe('Database Mock', () => {
  it('should create a mock pool', () => {
    const pool = createMockPool();
    expect(pool).toBeDefined();
    expect(pool.query).toBeDefined();
    expect(pool.connect).toBeDefined();
    expect(pool.end).toBeDefined();
  });

  it('should execute a mock query and return empty results by default', async () => {
    const pool = createMockPool();
    const result = await pool.query('SELECT * FROM users');
    
    expect(result).toBeDefined();
    expect(result.rows).toEqual([]);
    expect(result.rowCount).toBe(0);
  });

  it('should allow setting up custom query responses', async () => {
    const pool = createMockPool();
    const mockHelpers = setupMockQuery(pool);
    
    const mockUsers = [
      { id: '1', email: 'test@example.com', created_at: new Date() },
      { id: '2', email: 'test2@example.com', created_at: new Date() },
    ];
    
    // Mock a SELECT query
    mockHelpers.mockQueryAlways('SELECT', mockUsers);
    
    const result = await pool.query('SELECT * FROM users WHERE id = $1', ['1']);
    
    expect(result.rows).toHaveLength(2);
    expect(result.rows[0].email).toBe('test@example.com');
  });

  it('should track query calls', async () => {
    const pool = createMockPool();
    const mockHelpers = setupMockQuery(pool);
    
    await pool.query('SELECT * FROM users');
    await pool.query('INSERT INTO users VALUES ($1)', ['newuser@test.com']);
    
    const calls = mockHelpers.getCalls();
    expect(calls).toHaveLength(2);
  });

  it('should reset mocks', async () => {
    const pool = createMockPool();
    const mockHelpers = setupMockQuery(pool);
    
    // Set up a custom response
    mockHelpers.mockQueryAlways('SELECT', [{ id: '1', name: 'test' }]);
    
    const result1 = await pool.query('SELECT * FROM users');
    expect(result1.rows).toHaveLength(1);
    
    // Reset
    mockHelpers.reset();
    
    const result2 = await pool.query('SELECT * FROM users');
    expect(result2.rows).toEqual([]);
    expect(result2.rowCount).toBe(0);
  });

  it('should use the default mock pool instance', () => {
    expect(mockPool).toBeDefined();
    expect(mockPool.query).toBeDefined();
  });
});

