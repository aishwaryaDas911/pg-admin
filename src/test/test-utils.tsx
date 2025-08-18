import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';

// Mock toast hook
const MockToastProvider = ({ children }: { children: React.ReactNode }) => (
  <>
    {children}
    {/* Toaster removed from test-utils to avoid conflicts */}
  </>
);

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MockToastProvider>
          {children}
        </MockToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

// Test data helpers
export const mockAuthUser = {
  id: 'test-user-1',
  username: 'testuser',
  loginTime: new Date('2024-01-01T00:00:00Z'),
  isAuthenticated: true,
  avatar: undefined,
};

export const mockProgramManagerData = [
  {
    id: 1,
    programManagerName: 'Test Program Manager',
    companyName: 'Test Company',
    businessName: 'Test Business',
    status: 'Active',
    contactName: 'John Doe',
    contactPhone: '+1234567890',
    contactEmail: 'john@test.com',
    accountCurrency: 'USD',
  },
  {
    id: 2,
    programManagerName: 'Another Program Manager',
    companyName: 'Another Company',
    businessName: 'Another Business',
    status: 'Inactive',
    contactName: 'Jane Smith',
    contactPhone: '+0987654321',
    contactEmail: 'jane@test.com',
    accountCurrency: 'EUR',
  },
];

export const mockApiResponse = {
  success: {
    errorCode: '0',
    errorMessage: 'SUCCESS',
    totalNoOfRows: 2,
    programManagersList: mockProgramManagerData,
  },
  error: {
    errorCode: '500',
    errorMessage: 'Internal Server Error',
    programManagersList: null,
  },
  empty: {
    errorCode: '0',
    errorMessage: 'SUCCESS',
    totalNoOfRows: 0,
    programManagersList: [],
  },
};

// Mock fetch responses
export const mockFetchSuccess = (data: any) => {
  (global.fetch as any).mockResolvedValueOnce({
    ok: true,
    status: 200,
    json: async () => data,
  });
};

export const mockFetchError = (status: number = 500, statusText: string = 'Internal Server Error') => {
  (global.fetch as any).mockRejectedValueOnce(new Error('Failed to fetch'));
};

export const mockFetchResponse = (data: any, status: number = 200, ok: boolean = true) => {
  (global.fetch as any).mockResolvedValueOnce({
    ok,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    json: async () => data,
  });
};

// Wait for async operations
export const waitForAsync = () => new Promise(resolve => setTimeout(resolve, 0));

// Mock console methods for testing
export const mockConsole = {
  log: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
};
