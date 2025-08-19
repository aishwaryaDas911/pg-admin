import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { 
  authenticateUser, 
  clearAuthData, 
  getCurrentUser, 
  isUserAuthenticated,
  testApiConnection
} from '../authService';
import { mockFetchSuccess, mockFetchError, mockFetchResponse } from '@/test/test-utils';

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('authenticateUser', () => {
    it('should successfully authenticate with valid credentials', async () => {
      const mockResponse = {
        status: true,
        user: {
          id: 'user123',
          username: 'testuser',
          email: 'test@example.com'
        }
      };

      mockFetchSuccess(mockResponse);

      const result = await authenticateUser('testuser', 'password123');

      expect(result).toBe(true);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'authUser',
        expect.stringContaining('testuser')
      );
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('192.168.12.7:9996'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          credentials: 'include',
          body: expect.stringContaining('testuser')
        })
      );
    });

    it('should reject invalid credentials', async () => {
      const mockResponse = {
        status: false,
        message: 'Invalid credentials'
      };

      mockFetchSuccess(mockResponse);

      const result = await authenticateUser('wronguser', 'wrongpass');

      expect(result).toBe(false);
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });

    it('should handle network errors with fallback authentication', async () => {
      mockFetchError();

      const result = await authenticateUser('admin', 'password');

      expect(result).toBe(true); // Should use fallback
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'authUser',
        expect.stringContaining('admin')
      );
    });

    it('should handle API server errors (500, 404, etc.)', async () => {
      mockFetchResponse({}, 500, false);

      const result = await authenticateUser('testuser', 'password');

      expect(result).toBe(false);
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });

    it('should validate input parameters', async () => {
      expect(await authenticateUser('', 'password')).toBe(false);
      expect(await authenticateUser('username', '')).toBe(false);
      expect(await authenticateUser('', '')).toBe(false);
      
      expect(fetch).not.toHaveBeenCalled();
    });

    it('should include correct payload structure', async () => {
      mockFetchSuccess({ status: true, user: {} });

      await authenticateUser('testuser', 'testpass');

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('"acqU":"testuser"')
        })
      );

      const callArgs = (fetch as any).mock.calls[0];
      const payload = JSON.parse(callArgs[1].body);
      
      expect(payload).toEqual({
        acqU: 'testuser',
        acqP: 'testpass',
        jSession: 'subh',
        loginIpAddress: '2345',
        currentLoginTime: 'GMT+0530',
        timeZoneRegion: 'Asia/Kolkata'
      });
    });

    it('should handle malformed JSON responses', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => { throw new SyntaxError('Invalid JSON'); }
      });

      const result = await authenticateUser('admin', 'password');
      
      expect(result).toBe(true); // Should fallback to demo auth
    });

    it('should test all fallback credentials', async () => {
      mockFetchError();

      // Test valid fallback credentials
      expect(await authenticateUser('admin', 'password')).toBe(true);
      expect(await authenticateUser('demo', 'demo123')).toBe(true);
      expect(await authenticateUser('test', 'test123')).toBe(true);
      expect(await authenticateUser('Shruthi', 'Subhas@321')).toBe(true);

      // Test invalid fallback credentials
      expect(await authenticateUser('invalid', 'invalid')).toBe(false);
    });

    it('should handle request timeout errors', async () => {
      const timeoutError = new Error('AbortError');
      timeoutError.name = 'AbortError';
      (global.fetch as any).mockRejectedValueOnce(timeoutError);

      const result = await authenticateUser('admin', 'password');
      
      expect(result).toBe(true); // Should fallback
    });
  });

  describe('clearAuthData', () => {
    it('should remove auth data from localStorage', () => {
      localStorage.setItem('authUser', 'test-data');
      
      clearAuthData();
      
      expect(localStorage.removeItem).toHaveBeenCalledWith('authUser');
    });
  });

  describe('getCurrentUser', () => {
    it('should return user data from localStorage', () => {
      const userData = {
        id: 'user123',
        username: 'testuser',
        loginTime: new Date().toISOString(),
        isAuthenticated: true
      };
      
      localStorage.setItem('authUser', JSON.stringify(userData));
      (localStorage.getItem as any).mockReturnValueOnce(JSON.stringify(userData));

      const result = getCurrentUser();

      expect(result).toEqual(expect.objectContaining({
        id: 'user123',
        username: 'testuser',
        isAuthenticated: true
      }));
      expect(result?.loginTime).toBeInstanceOf(Date);
    });

    it('should return null when no user data exists', () => {
      (localStorage.getItem as any).mockReturnValueOnce(null);

      const result = getCurrentUser();

      expect(result).toBeNull();
    });

    it('should handle corrupted localStorage data', () => {
      (localStorage.getItem as any).mockReturnValueOnce('invalid-json');

      const result = getCurrentUser();

      expect(result).toBeNull();
      expect(localStorage.removeItem).toHaveBeenCalledWith('authUser');
    });
  });

  describe('isUserAuthenticated', () => {
    it('should return true for authenticated user', () => {
      const userData = {
        id: 'user123',
        username: 'testuser',
        loginTime: new Date().toISOString(),
        isAuthenticated: true
      };
      
      (localStorage.getItem as any).mockReturnValueOnce(JSON.stringify(userData));

      expect(isUserAuthenticated()).toBe(true);
    });

    it('should return false for non-authenticated user', () => {
      const userData = {
        id: 'user123',
        username: 'testuser',
        loginTime: new Date().toISOString(),
        isAuthenticated: false
      };
      
      (localStorage.getItem as any).mockReturnValueOnce(JSON.stringify(userData));

      expect(isUserAuthenticated()).toBe(false);
    });

    it('should return false when no user data exists', () => {
      (localStorage.getItem as any).mockReturnValueOnce(null);

      expect(isUserAuthenticated()).toBe(false);
    });
  });

  describe('testApiConnection', () => {
    it('should return true for successful connection', async () => {
      mockFetchResponse({}, 200, true);

      const result = await testApiConnection();

      expect(result).toBe(true);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('192.168.12.7:9996'),
        expect.objectContaining({
          method: 'OPTIONS',
          credentials: 'include'
        })
      );
    });

    it('should return true for 405 Method Not Allowed (acceptable for OPTIONS)', async () => {
      mockFetchResponse({}, 405, false);

      const result = await testApiConnection();

      expect(result).toBe(true);
    });

    it('should return false for connection failures', async () => {
      mockFetchError();

      const result = await testApiConnection();

      expect(result).toBe(false);
    });
  });

  describe('Security Tests', () => {
    it('should not store sensitive data in logs', async () => {
      const consoleSpy = vi.spyOn(console, 'log');
      mockFetchSuccess({ status: true, user: {} });

      await authenticateUser('secretuser', 'secretpass');

      const logCalls = consoleSpy.mock.calls.flat().join(' ');
      expect(logCalls).not.toContain('secretpass');
      
      consoleSpy.mockRestore();
    });

    it('should include credentials in request for CORS', async () => {
      mockFetchSuccess({ status: true, user: {} });

      await authenticateUser('testuser', 'testpass');

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          credentials: 'include'
        })
      );
    });

    it('should clear auth data on logout', () => {
      localStorage.setItem('authUser', 'test-data');
      
      clearAuthData();
      
      expect(localStorage.removeItem).toHaveBeenCalledWith('authUser');
    });
  });
});
