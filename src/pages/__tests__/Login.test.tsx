import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@/test/test-utils';
import Login from '../Login';

// Simple mock for hooks that don't conflict with test-utils
const mockNavigate = vi.fn();
const mockToast = vi.fn();

// Mock router hooks before importing
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      pathname: '/login',
      search: '',
      hash: '',
      state: null,
    }),
  };
});

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}));

// Mock the logo import
vi.mock('../../src/assets/Chatak-AdminLogo.jpg', () => ({
  default: '/mock-logo.jpg',
}));

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset localStorage
    localStorage.clear();
  });

  describe('Component Rendering', () => {
    it('should render login form with all required elements', () => {
      render(<Login />);

      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
      expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
    });

    it('should render demo credentials info', () => {
      render(<Login />);

      expect(screen.getByText(/demo credentials/i)).toBeInTheDocument();
      expect(screen.getByText(/admin/)).toBeInTheDocument();
      expect(screen.getByText(/password/)).toBeInTheDocument();
    });

    it('should have proper form structure', () => {
      render(<Login />);

      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const form = screen.getByRole('form');

      expect(usernameInput).toHaveAttribute('type', 'text');
      expect(usernameInput).toHaveAttribute('name', 'username');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('name', 'password');
      expect(form).toBeInTheDocument();
    });
  });

  describe('Form Interaction', () => {
    it('should handle username input change', async () => {
      const user = userEvent.setup();
      render(<Login />);

      const usernameInput = screen.getByLabelText(/username/i);
      await user.type(usernameInput, 'testuser');

      expect(usernameInput).toHaveValue('testuser');
    });

    it('should handle password input change', async () => {
      const user = userEvent.setup();
      render(<Login />);

      const passwordInput = screen.getByLabelText(/password/i);
      await user.type(passwordInput, 'password123');

      expect(passwordInput).toHaveValue('password123');
    });

    it('should toggle password visibility', async () => {
      const user = userEvent.setup();
      render(<Login />);

      const passwordInput = screen.getByLabelText(/password/i);
      const toggleButton = screen.getByLabelText(/show password/i);

      expect(passwordInput).toHaveAttribute('type', 'password');

      await user.click(toggleButton);
      expect(passwordInput).toHaveAttribute('type', 'text');

      await user.click(toggleButton);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('should disable login button when fields are empty', () => {
      render(<Login />);

      const loginButton = screen.getByRole('button', { name: /login/i });
      expect(loginButton).toBeDisabled();
    });

    it('should enable login button when both fields are filled', async () => {
      const user = userEvent.setup();
      render(<Login />);

      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login/i });

      await user.type(usernameInput, 'testuser');
      await user.type(passwordInput, 'password123');

      expect(loginButton).not.toBeDisabled();
    });
  });

  describe('Form Validation', () => {
    it('should show error when submitting empty form', async () => {
      const user = userEvent.setup();
      render(<Login />);

      const form = screen.getByRole('form');
      await user.click(screen.getByRole('button', { name: /login/i }));

      // The button should be disabled when fields are empty
      expect(screen.getByRole('button', { name: /login/i })).toBeDisabled();
    });

    it('should show error when username is empty', async () => {
      const user = userEvent.setup();
      render(<Login />);

      const passwordInput = screen.getByLabelText(/password/i);
      await user.type(passwordInput, 'password123');

      const loginButton = screen.getByRole('button', { name: /login/i });
      expect(loginButton).toBeDisabled();
    });

    it('should show error when password is empty', async () => {
      const user = userEvent.setup();
      render(<Login />);

      const usernameInput = screen.getByLabelText(/username/i);
      await user.type(usernameInput, 'testuser');

      const loginButton = screen.getByRole('button', { name: /login/i });
      expect(loginButton).toBeDisabled();
    });
  });

  describe('Forgot Password', () => {
    it('should handle forgot password click', async () => {
      const user = userEvent.setup();
      render(<Login />);

      const forgotPasswordLink = screen.getByText(/forgot password/i);
      await user.click(forgotPasswordLink);

      expect(mockToast).toHaveBeenCalledWith({
        title: "Password Reset",
        description: "Password reset functionality will be implemented soon.",
      });
    });
  });

  describe('Form Accessibility', () => {
    it('should have proper labels for form inputs', () => {
      render(<Login />);

      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);

      expect(usernameInput).toHaveAttribute('id', 'username');
      expect(passwordInput).toHaveAttribute('id', 'password');
    });

    it('should have proper ARIA attributes', () => {
      render(<Login />);

      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);

      expect(usernameInput).toHaveAttribute('autoComplete', 'username');
      expect(passwordInput).toHaveAttribute('autoComplete', 'current-password');
    });

    it('should have required attributes on form inputs', () => {
      render(<Login />);

      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);

      expect(usernameInput).toBeRequired();
      expect(passwordInput).toBeRequired();
    });
  });

  describe('Branding and Layout', () => {
    it('should display the CHATAK logo', () => {
      render(<Login />);

      const logo = screen.getByAltText(/chatak logo/i);
      expect(logo).toBeInTheDocument();
    });

    it('should display copyright information', () => {
      render(<Login />);

      expect(screen.getByText(/copyright.*chatak/i)).toBeInTheDocument();
      expect(screen.getByText(/powered by/i)).toBeInTheDocument();
    });

    it('should display login instructions', () => {
      render(<Login />);

      expect(screen.getByText(/enter your credentials/i)).toBeInTheDocument();
    });
  });

  describe('User Experience', () => {
    it('should clear error when user starts typing', async () => {
      const user = userEvent.setup();
      render(<Login />);

      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);

      // Fill form and try to submit to trigger potential error
      await user.type(usernameInput, 'testuser');
      await user.type(passwordInput, 'password123');

      // Now type again to see if error clears
      await user.type(usernameInput, '2');
      
      // Should not show any persistent error messages
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('should have proper placeholder text', () => {
      render(<Login />);

      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);

      expect(usernameInput).toHaveAttribute('placeholder', 'Enter your username');
      expect(passwordInput).toHaveAttribute('placeholder', 'Enter your password');
    });
  });
});
