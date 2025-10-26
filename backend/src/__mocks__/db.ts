import { vi } from 'vitest';

// Mock database pool for testing
export interface MockQueryResult {
  rows: any[];
  rowCount: number;
}

export const createMockPool = () => {
  const mockPool = {
    query: vi.fn<(text: string, values?: any[]) => Promise<MockQueryResult>>()
      .mockResolvedValue({
        rows: [],
        rowCount: 0,
      } as MockQueryResult),
    
    connect: vi.fn(),
    end: vi.fn(),
  };
  
  return mockPool;
};

// Default mock instance
export const mockPool = createMockPool();

// Helper function to set up mock query responses
export const setupMockQuery = (mockPool: any) => {
  return {
    // Set up a mock query result based on SQL pattern
    mockQueryOnce: (pattern: string | RegExp, result: any[]) => {
      mockPool.query.mockImplementationOnce((text: string, values?: any[]) => {
        const textLower = text.toLowerCase();
        const patternLower = typeof pattern === 'string' ? pattern.toLowerCase() : pattern;
        
        if (typeof pattern === 'string') {
          if (textLower.includes(patternLower)) {
            return Promise.resolve({
              rows: result,
              rowCount: result.length,
            });
          }
        } else {
          if (pattern.test(text)) {
            return Promise.resolve({
              rows: result,
              rowCount: result.length,
            });
          }
        }
        
        // Fallback to default empty result
        return Promise.resolve({
          rows: [],
          rowCount: 0,
        });
      });
    },
    
    // Set up a mock query that always returns the same result
    mockQueryAlways: (pattern: string | RegExp, result: any[]) => {
      mockPool.query.mockImplementation((text: string, values?: any[]) => {
        const textLower = text.toLowerCase();
        const patternLower = typeof pattern === 'string' ? pattern.toLowerCase() : pattern;
        
        if (typeof pattern === 'string') {
          if (textLower.includes(patternLower)) {
            return Promise.resolve({
              rows: result,
              rowCount: result.length,
            });
          }
        } else {
          if (pattern.test(text)) {
            return Promise.resolve({
              rows: result,
              rowCount: result.length,
            });
          }
        }
        
        // Fallback to default empty result
        return Promise.resolve({
          rows: [],
          rowCount: 0,
        });
      });
    },
    
    // Reset all mocks
    reset: () => {
      mockPool.query.mockReset();
      mockPool.query.mockResolvedValue({ rows: [], rowCount: 0 });
    },
    
    // Get all call arguments
    getCalls: () => mockPool.query.mock.calls,
  };
};

export default mockPool;

