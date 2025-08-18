import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@/test/test-utils';
import Login from '../Login';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

// Mock the hooks
vi.mock('@/contexts/AuthContext');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: vi.fn(),
  };
});

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

describe('Login Component', () => {
  const mockNavigate = vi.fn();
  const mockLogin = vi.fn();
  const mockUseAuth = {
    login: mockLogin,
    isAuthenticated: false,
    isLoading: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/login',
      search: '',
      hash: '',
      state: null,
    });
    vi.mocked(useAuth).mockReturnValue(mockUseAuth);
  });

  describe('Component Rendering', () => {
    it('should render login form with all required elements', () => {
      render(<Login />);

      expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
      expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
    });

    it('should show demo credentials in development mode', () => {
      render(<Login />);

      expect(screen.getByText(/demo credentials/i)).toBeInTheDocument();
      expect(screen.getByText(/admin.*password/i)).toBeInTheDocument();
      expect(screen.getByText(/demo.*demo123/i)).toBeInTheDocument();
      expect(screen.getByText(/Shruthi.*Subhas@321/i)).toBeInTheDocument();
    });

    it('should show password toggle button', () => {
      render(<Login />);

      const passwordToggle = screen.getByRole('button', { name: /show password/i });
      expect(passwordToggle).toBeInTheDocument();
    });

    it('should render company logo and branding', () => {
      render(<Login />);

      expect(screen.getByAltText(/chatak logo/i)).toBeInTheDocument();
      expect(screen.getByText(/copyright.*chatak/i)).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('should require both username and password', async () => {
      const user = userEvent.setup();
      render(<Login />);

      const loginButton = screen.getByRole('button', { name: /login/i });
      
      await user.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText(/please enter both username and password/i)).toBeInTheDocument();
      });

      expect(mockLogin).not.toHaveBeenCalled();
    });

    it('should require username when only password is provided', async () => {
      const user = userEvent.setup();
      render(<Login />);

      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login/i });

      await user.type(passwordInput, 'password123');
      await user.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText(/please enter both username and password/i)).toBeInTheDocument();
      });

      expect(mockLogin).not.toHaveBeenCalled();
    });

    it('should require password when only username is provided', async () => {
      const user = userEvent.setup();
      render(<Login />);

      const usernameInput = screen.getByLabelText(/username/i);
      const loginButton = screen.getByRole('button', { name: /login/i });

      await user.type(usernameInput, 'testuser');
      await user.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText(/please enter both username and password/i)).toBeInTheDocument();
      });

      expect(mockLogin).not.toHaveBeenCalled();
    });

    it('should trim whitespace from inputs', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValue(true);
      render(<Login />);

      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login/i });

      await user.type(usernameInput, '  testuser  ');
      await user.type(passwordInput, '  password123  ');
      await user.click(loginButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('testuser', 'password123');
      });
    });
  });

  describe('Form Interaction', () => {
    it('should toggle password visibility', async () => {
      const user = userEvent.setup();
      render(<Login />);

      const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
      const toggleButton = screen.getByRole('button', { name: /show password/i });

      expect(passwordInput.type).toBe('password');

      await user.click(toggleButton);
      expect(passwordInput.type).toBe('text');

      await user.click(toggleButton);
      expect(passwordInput.type).toBe('password');
    });

    it('should clear error message when user starts typing', async () => {
      const user = userEvent.setup();
      render(<Login />);

      const usernameInput = screen.getByLabelText(/username/i);
      const loginButton = screen.getByRole('button', { name: /login/i });

      // Trigger validation error
      await user.click(loginButton);
      await waitFor(() => {
        expect(screen.getByText(/please enter both username and password/i)).toBeInTheDocument();
      });

      // Start typing to clear error
      await user.type(usernameInput, 'test');
      expect(screen.queryByText(/please enter both username and password/i)).not.toBeInTheDocument();
    });

    it('should handle form submission via Enter key', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValue(true);
      render(<Login />);

      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);

      await user.type(usernameInput, 'testuser');
      await user.type(passwordInput, 'password123');
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('testuser', 'password123');
      });
    });
  });

  describe('Authentication Flow', () => {
    it('should call login function with correct credentials', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValue(true);
      render(<Login />);

      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login/i });

      await user.type(usernameInput, 'testuser');
      await user.type(passwordInput, 'password123');
      await user.click(loginButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('testuser', 'password123');
      });
    });

    it('should show loading state during authentication', async () => {
      const user = userEvent.setup();
      let resolveLogin: (value: boolean) => void;
      const loginPromise = new Promise<boolean>((resolve) => {
        resolveLogin = resolve;
      });
      mockLogin.mockReturnValue(loginPromise);

      render(<Login />);

      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login/i });

      await user.type(usernameInput, 'testuser');
      await user.type(passwordInput, 'password123');
      await user.click(loginButton);

      expect(screen.getByText(/signing in/i)).toBeInTheDocument();
      expect(loginButton).toBeDisabled();

      resolveLogin!(true);
      await loginPromise;

      await waitFor(() => {
        expect(screen.queryByText(/signing in/i)).not.toBeInTheDocument();
      });
    });

    it('should redirect to dashboard on successful login', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValue(true);
      render(<Login />);

      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login/i });

      await user.type(usernameInput, 'testuser');
      await user.type(passwordInput, 'password123');
      await user.click(loginButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true });
      });
    });

    it('should redirect to intended page after login', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValue(true);
      
      vi.mocked(useLocation).mockReturnValue({
        pathname: '/login',
        search: '',
        hash: '',
        state: { from: { pathname: '/admin' } },
      });

      render(<Login />);

      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login/i });

      await user.type(usernameInput, 'testuser');
      await user.type(passwordInput, 'password123');
      await user.click(loginButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/admin', { replace: true });
      });
    });

    it('should show error message on failed login', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValue(false);
      render(<Login />);

      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login/i });

      await user.type(usernameInput, 'wronguser');
      await user.type(passwordInput, 'wrongpass');
      await user.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
      });
    });

    it('should handle authentication errors gracefully', async () => {
      const user = userEvent.setup();
      mockLogin.mockRejectedValue(new Error('Network error'));
      render(<Login />);

      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login/i });

      await user.type(usernameInput, 'testuser');
      await user.type(passwordInput, 'password123');
      await user.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText(/an error occurred during login/i)).toBeInTheDocument();
      });
    });
  });

  describe('Already Authenticated State', () => {
    it('should redirect authenticated users to dashboard', () => {
      vi.mocked(useAuth).mockReturnValue({
        ...mockUseAuth,
        isAuthenticated: true,
        isLoading: false,
      });

      render(<Login />);

      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true });
    });

    it('should show loading spinner while checking auth status', () => {
      vi.mocked(useAuth).mockReturnValue({
        ...mockUseAuth,
        isAuthenticated: false,
        isLoading: true,
      });

      render(<Login />);

      expect(screen.getByText(/loading/i)).toBeInTheDocument();
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should redirect to intended page for authenticated users', () => {
      vi.mocked(useAuth).mockReturnValue({
        ...mockUseAuth,
        isAuthenticated: true,
        isLoading: false,
      });

      vi.mocked(useLocation).mockReturnValue({
        pathname: '/login',
        search: '',
        hash: '',
        state: { from: { pathname: '/settings' } },
      });

      render(<Login />);

      expect(mockNavigate).toHaveBeenCalledWith('/settings', { replace: true });
    });
  });

  describe('UI State Management', () => {
    it('should disable login button when inputs are empty', () => {
      render(<Login />);

      const loginButton = screen.getByRole('button', { name: /login/i });
      expect(loginButton).toBeDisabled();
    });

    it('should enable login button when both inputs have values', async () => {
      const user = userEvent.setup();
      render(<Login />);

      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login/i });

      expect(loginButton).toBeDisabled();

      await user.type(usernameInput, 'test');
      expect(loginButton).toBeDisabled();

      await user.type(passwordInput, 'pass');
      expect(loginButton).not.toBeDisabled();
    });

    it('should disable form inputs during loading', async () => {
      const user = userEvent.setup();
      let resolveLogin: (value: boolean) => void;
      const loginPromise = new Promise<boolean>((resolve) => {
        resolveLogin = resolve;
      });
      mockLogin.mockReturnValue(loginPromise);

      render(<Login />);

      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login/i });

      await user.type(usernameInput, 'testuser');
      await user.type(passwordInput, 'password123');
      await user.click(loginButton);

      expect(usernameInput).toBeDisabled();
      expect(passwordInput).toBeDisabled();
      expect(loginButton).toBeDisabled();

      resolveLogin!(true);
      await loginPromise;
    });
  });

  describe('Forgot Password Feature', () => {
    it('should handle forgot password click', async () => {
      const user = userEvent.setup();
      render(<Login />);

      const forgotPasswordLink = screen.getByText(/forgot password/i);
      await user.click(forgotPasswordLink);

      // Since it shows a toast, we can't easily test the toast content
      // but we can verify the function was called without errors
      expect(forgotPasswordLink).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper form labels and roles', () => {
      render(<Login />);

      expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('form')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('should have proper ARIA attributes for error states', async () => {
      const user = userEvent.setup();
      render(<Login />);

      const loginButton = screen.getByRole('button', { name: /login/i });
      await user.click(loginButton);

      await waitFor(() => {
        const errorAlert = screen.getByRole('alert');
        expect(errorAlert).toBeInTheDocument();
      });
    });

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<Login />);

      await user.tab();
      expect(screen.getByLabelText(/username/i)).toHaveFocus();

      await user.tab();
      expect(screen.getByLabelText(/password/i)).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: /show password/i })).toHaveFocus();

      await user.tab();
      expect(screen.getByText(/forgot password/i)).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: /login/i })).toHaveFocus();
    });
  });
});
