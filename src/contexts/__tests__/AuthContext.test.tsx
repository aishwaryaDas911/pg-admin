import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';
import { mockAuthUser, mockFetchSuccess, mockFetchError } from '@/test/test-utils';
import * as authService from '@/services/authService';

// Mock the auth service
vi.mock('@/services/authService', () => ({
  authenticateUser: vi.fn(),
  getCurrentUser: vi.fn(),
  clearAuthData: vi.fn(),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('useAuth Hook', () => {
    it('should throw error when used outside AuthProvider', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        renderHook(() => useAuth());
      }).toThrow('useAuth must be used within an AuthProvider');
      
      consoleSpy.mockRestore();
    });

    it('should provide auth context when used within AuthProvider', () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current).toEqual(
        expect.objectContaining({
          user: null,
          login: expect.any(Function),
          logout: expect.any(Function),
          isLoading: false,
          isAuthenticated: false,
        })
      );
    });
  });

  describe('Initial State', () => {
    it('should start with null user and loading false', () => {
      vi.mocked(authService.getCurrentUser).mockReturnValue(null);
      
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });

    it('should load existing user from localStorage on mount', async () => {
      vi.mocked(authService.getCurrentUser).mockReturnValue(mockAuthUser);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.user).toEqual(
          expect.objectContaining({
            id: mockAuthUser.id,
            username: mockAuthUser.username,
            isAuthenticated: true,
          })
        );
        expect(result.current.isAuthenticated).toBe(true);
      });
    });

    it('should handle corrupted localStorage data on mount', async () => {
      vi.mocked(authService.getCurrentUser).mockImplementation(() => {
        throw new Error('Corrupted data');
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.user).toBeNull();
        expect(result.current.isAuthenticated).toBe(false);
        expect(authService.clearAuthData).toHaveBeenCalled();
      });
    });
  });

  describe('Login Function', () => {
    it('should successfully login with valid credentials', async () => {
      vi.mocked(authService.authenticateUser).mockResolvedValue(true);
      vi.mocked(authService.getCurrentUser).mockReturnValue(mockAuthUser);

      const { result } = renderHook(() => useAuth(), { wrapper });

      let loginResult: boolean;

      await act(async () => {
        loginResult = await result.current.login('testuser', 'password');
      });

      expect(loginResult!).toBe(true);
      expect(result.current.user).toEqual(
        expect.objectContaining({
          id: mockAuthUser.id,
          username: mockAuthUser.username,
          isAuthenticated: true,
        })
      );
      expect(result.current.isAuthenticated).toBe(true);
    });

    it('should handle login failure', async () => {
      vi.mocked(authService.authenticateUser).mockResolvedValue(false);

      const { result } = renderHook(() => useAuth(), { wrapper });

      let loginResult: boolean;

      await act(async () => {
        loginResult = await result.current.login('wronguser', 'wrongpass');
      });

      expect(loginResult!).toBe(false);
      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });

    it('should show loading state during login', async () => {
      let resolveLogin: (value: boolean) => void;
      const loginPromise = new Promise<boolean>((resolve) => {
        resolveLogin = resolve;
      });

      vi.mocked(authService.authenticateUser).mockReturnValue(loginPromise);

      const { result } = renderHook(() => useAuth(), { wrapper });

      act(() => {
        result.current.login('testuser', 'password');
      });

      expect(result.current.isLoading).toBe(true);

      await act(async () => {
        resolveLogin!(true);
        await loginPromise;
      });

      expect(result.current.isLoading).toBe(false);
    });

    it('should handle login errors gracefully', async () => {
      vi.mocked(authService.authenticateUser).mockRejectedValue(
        new Error('Network error')
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      let loginResult: boolean;

      await act(async () => {
        loginResult = await result.current.login('testuser', 'password');
      });

      expect(loginResult!).toBe(false);
      expect(result.current.user).toBeNull();
      expect(result.current.isLoading).toBe(false);
    });

    it('should handle successful auth but missing user data', async () => {
      vi.mocked(authService.authenticateUser).mockResolvedValue(true);
      vi.mocked(authService.getCurrentUser).mockReturnValue(null);

      const { result } = renderHook(() => useAuth(), { wrapper });

      let loginResult: boolean;

      await act(async () => {
        loginResult = await result.current.login('testuser', 'password');
      });

      expect(loginResult!).toBe(false);
      expect(result.current.user).toBeNull();
    });

    it('should validate required parameters', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      // Test empty username
      await act(async () => {
        const result1 = await result.current.login('', 'password');
        expect(result1).toBe(false);
      });

      // Test empty password
      await act(async () => {
        const result2 = await result.current.login('username', '');
        expect(result2).toBe(false);
      });

      expect(authService.authenticateUser).not.toHaveBeenCalled();
    });

    it('should include additional user data from auth response', async () => {
      const userWithExtraData = {
        ...mockAuthUser,
        role: 'admin',
        permissions: ['read', 'write'],
        isDevelopmentMode: true,
      };

      vi.mocked(authService.authenticateUser).mockResolvedValue(true);
      vi.mocked(authService.getCurrentUser).mockReturnValue(userWithExtraData);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await result.current.login('testuser', 'password');
      });

      expect(result.current.user).toEqual(
        expect.objectContaining({
          role: 'admin',
          permissions: ['read', 'write'],
          isDevelopmentMode: true,
        })
      );
    });
  });

  describe('Logout Function', () => {
    it('should clear user data on logout', async () => {
      vi.mocked(authService.getCurrentUser).mockReturnValue(mockAuthUser);

      const { result } = renderHook(() => useAuth(), { wrapper });

      // Wait for initial load
      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(true);
      });

      act(() => {
        result.current.logout();
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(authService.clearAuthData).toHaveBeenCalled();
    });

    it('should handle logout when no user is logged in', () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      act(() => {
        result.current.logout();
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(authService.clearAuthData).toHaveBeenCalled();
    });
  });

  describe('Authentication State Management', () => {
    it('should correctly calculate isAuthenticated based on user state', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      // Initially not authenticated
      expect(result.current.isAuthenticated).toBe(false);

      // Mock successful login
      vi.mocked(authService.authenticateUser).mockResolvedValue(true);
      vi.mocked(authService.getCurrentUser).mockReturnValue(mockAuthUser);

      await act(async () => {
        await result.current.login('testuser', 'password');
      });

      expect(result.current.isAuthenticated).toBe(true);

      // Logout
      act(() => {
        result.current.logout();
      });

      expect(result.current.isAuthenticated).toBe(false);
    });

    it('should handle user with isAuthenticated false', async () => {
      const unauthenticatedUser = {
        ...mockAuthUser,
        isAuthenticated: false,
      };

      vi.mocked(authService.getCurrentUser).mockReturnValue(unauthenticatedUser);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.user).toEqual(
          expect.objectContaining({
            isAuthenticated: false,
          })
        );
        expect(result.current.isAuthenticated).toBe(false);
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle getCurrentUser errors during initialization', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      vi.mocked(authService.getCurrentUser).mockImplementation(() => {
        throw new Error('Storage error');
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.user).toBeNull();
        expect(result.current.isLoading).toBe(false);
        expect(authService.clearAuthData).toHaveBeenCalled();
      });

      consoleErrorSpy.mockRestore();
    });

    it('should handle partial user data gracefully', async () => {
      const partialUser = {
        id: 'user123',
        username: 'testuser',
        // Missing loginTime and other fields
      };

      vi.mocked(authService.authenticateUser).mockResolvedValue(true);
      vi.mocked(authService.getCurrentUser).mockReturnValue(partialUser as any);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await result.current.login('testuser', 'password');
      });

      expect(result.current.user).toEqual(
        expect.objectContaining({
          id: 'user123',
          username: 'testuser',
          isAuthenticated: true,
        })
      );
    });
  });

  describe('Concurrent Operations', () => {
    it('should handle multiple concurrent login attempts', async () => {
      vi.mocked(authService.authenticateUser).mockResolvedValue(true);
      vi.mocked(authService.getCurrentUser).mockReturnValue(mockAuthUser);

      const { result } = renderHook(() => useAuth(), { wrapper });

      const loginPromises = [
        result.current.login('user1', 'pass1'),
        result.current.login('user2', 'pass2'),
        result.current.login('user3', 'pass3'),
      ];

      const results = await Promise.all(loginPromises);

      // All should succeed
      expect(results).toEqual([true, true, true]);
      expect(result.current.isAuthenticated).toBe(true);
    });

    it('should handle login followed by immediate logout', async () => {
      vi.mocked(authService.authenticateUser).mockResolvedValue(true);
      vi.mocked(authService.getCurrentUser).mockReturnValue(mockAuthUser);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await result.current.login('testuser', 'password');
        result.current.logout();
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });
  });
});
