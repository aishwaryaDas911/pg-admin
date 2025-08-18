import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, mockApiResponse, mockFetchSuccess, mockFetchError } from '@/test/test-utils';
import { ProgramManagerSearchComponent } from '../ProgramManagerSearchComponent';
import * as programManagerService from '@/services/programManagerService';

// Mock the service
vi.mock('@/services/programManagerService');

// Mock the toast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

describe('ProgramManagerSearchComponent', () => {
  const defaultProps = {
    tabName: 'search',
    handleChangeTab: vi.fn(),
    onSearchClick: vi.fn(),
    tableActionState: '',
    setTableActionState: vi.fn(),
    setHideCreateTab: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render search form with all required fields', () => {
      render(<ProgramManagerSearchComponent {...defaultProps} />);

      expect(screen.getByText(/search filters/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/program manager name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/bank name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/records per page/i)).toBeInTheDocument();
    });

    it('should render search and reset buttons', () => {
      render(<ProgramManagerSearchComponent {...defaultProps} />);

      expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    });

    it('should not show results table initially', () => {
      render(<ProgramManagerSearchComponent {...defaultProps} />);

      expect(screen.queryByText(/search results/i)).not.toBeInTheDocument();
      expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });
  });

  describe('Form Interaction', () => {
    it('should allow typing in text input fields', async () => {
      const user = userEvent.setup();
      render(<ProgramManagerSearchComponent {...defaultProps} />);

      const programManagerInput = screen.getByLabelText(/program manager name/i);
      const companyNameInput = screen.getByLabelText(/company name/i);

      await user.type(programManagerInput, 'Test Manager');
      await user.type(companyNameInput, 'Test Company');

      expect(programManagerInput).toHaveValue('Test Manager');
      expect(companyNameInput).toHaveValue('Test Company');
    });

    it('should allow selecting from dropdown fields', async () => {
      const user = userEvent.setup();
      render(<ProgramManagerSearchComponent {...defaultProps} />);

      const bankSelect = screen.getByLabelText(/bank name/i);
      await user.click(bankSelect);
      
      const hdfcOption = screen.getByText('HDFC');
      await user.click(hdfcOption);

      expect(screen.getByText('HDFC')).toBeInTheDocument();
    });

    it('should reset form fields when reset button is clicked', async () => {
      const user = userEvent.setup();
      render(<ProgramManagerSearchComponent {...defaultProps} />);

      const programManagerInput = screen.getByLabelText(/program manager name/i);
      const resetButton = screen.getByRole('button', { name: /reset/i });

      await user.type(programManagerInput, 'Test Manager');
      expect(programManagerInput).toHaveValue('Test Manager');

      await user.click(resetButton);
      expect(programManagerInput).toHaveValue('');
    });
  });

  describe('Search Functionality', () => {
    it('should call API service when search button is clicked', async () => {
      const user = userEvent.setup();
      const mockSearchFunction = vi.mocked(programManagerService.ProgramManagerService.searchProgramManagers);
      mockSearchFunction.mockResolvedValue(mockApiResponse.success);

      render(<ProgramManagerSearchComponent {...defaultProps} />);

      const searchButton = screen.getByRole('button', { name: /search/i });
      await user.click(searchButton);

      await waitFor(() => {
        expect(mockSearchFunction).toHaveBeenCalledWith({
          programManagerName: undefined,
          companyName: undefined,
          bankName: undefined,
          status: undefined,
          recordsPerPage: '10',
          pageNumber: 1,
          sortBy: 'programManagerName',
          sortOrder: 'asc'
        });
      });
    });

    it('should include form data in search request', async () => {
      const user = userEvent.setup();
      const mockSearchFunction = vi.mocked(programManagerService.ProgramManagerService.searchProgramManagers);
      mockSearchFunction.mockResolvedValue(mockApiResponse.success);

      render(<ProgramManagerSearchComponent {...defaultProps} />);

      const programManagerInput = screen.getByLabelText(/program manager name/i);
      const companyNameInput = screen.getByLabelText(/company name/i);
      const searchButton = screen.getByRole('button', { name: /search/i });

      await user.type(programManagerInput, 'Test Manager');
      await user.type(companyNameInput, 'Test Company');
      await user.click(searchButton);

      await waitFor(() => {
        expect(mockSearchFunction).toHaveBeenCalledWith(
          expect.objectContaining({
            programManagerName: 'Test Manager',
            companyName: 'Test Company'
          })
        );
      });
    });

    it('should show loading state during search', async () => {
      const user = userEvent.setup();
      let resolveSearch: (value: any) => void;
      const searchPromise = new Promise((resolve) => {
        resolveSearch = resolve;
      });

      const mockSearchFunction = vi.mocked(programManagerService.ProgramManagerService.searchProgramManagers);
      mockSearchFunction.mockReturnValue(searchPromise);

      render(<ProgramManagerSearchComponent {...defaultProps} />);

      const searchButton = screen.getByRole('button', { name: /search/i });
      await user.click(searchButton);

      expect(screen.getByText(/searching/i)).toBeInTheDocument();
      expect(searchButton).toBeDisabled();

      resolveSearch!(mockApiResponse.success);
      await searchPromise;
    });

    it('should call onSearchClick prop when search completes', async () => {
      const user = userEvent.setup();
      const mockSearchFunction = vi.mocked(programManagerService.ProgramManagerService.searchProgramManagers);
      mockSearchFunction.mockResolvedValue(mockApiResponse.success);

      render(<ProgramManagerSearchComponent {...defaultProps} />);

      const searchButton = screen.getByRole('button', { name: /search/i });
      await user.click(searchButton);

      await waitFor(() => {
        expect(defaultProps.onSearchClick).toHaveBeenCalled();
      });
    });
  });

  describe('Results Table', () => {
    it('should display results table after successful search', async () => {
      const user = userEvent.setup();
      const mockSearchFunction = vi.mocked(programManagerService.ProgramManagerService.searchProgramManagers);
      mockSearchFunction.mockResolvedValue(mockApiResponse.success);

      render(<ProgramManagerSearchComponent {...defaultProps} />);

      const searchButton = screen.getByRole('button', { name: /search/i });
      await user.click(searchButton);

      await waitFor(() => {
        expect(screen.getByText(/search results/i)).toBeInTheDocument();
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
    });

    it('should display correct table headers', async () => {
      const user = userEvent.setup();
      const mockSearchFunction = vi.mocked(programManagerService.ProgramManagerService.searchProgramManagers);
      mockSearchFunction.mockResolvedValue(mockApiResponse.success);

      render(<ProgramManagerSearchComponent {...defaultProps} />);

      const searchButton = screen.getByRole('button', { name: /search/i });
      await user.click(searchButton);

      await waitFor(() => {
        expect(screen.getByText('Program Manager Name')).toBeInTheDocument();
        expect(screen.getByText('Company Name')).toBeInTheDocument();
        expect(screen.getByText('Business Entity Name')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();
        expect(screen.getByText('Actions')).toBeInTheDocument();
      });
    });

    it('should display data in table rows', async () => {
      const user = userEvent.setup();
      const mockSearchFunction = vi.mocked(programManagerService.ProgramManagerService.searchProgramManagers);
      mockSearchFunction.mockResolvedValue(mockApiResponse.success);

      render(<ProgramManagerSearchComponent {...defaultProps} />);

      const searchButton = screen.getByRole('button', { name: /search/i });
      await user.click(searchButton);

      await waitFor(() => {
        expect(screen.getByText('Test Program Manager')).toBeInTheDocument();
        expect(screen.getByText('Test Company')).toBeInTheDocument();
        expect(screen.getByText('Test Business')).toBeInTheDocument();
      });
    });

    it('should display status badges with correct styling', async () => {
      const user = userEvent.setup();
      const mockSearchFunction = vi.mocked(programManagerService.ProgramManagerService.searchProgramManagers);
      mockSearchFunction.mockResolvedValue(mockApiResponse.success);

      render(<ProgramManagerSearchComponent {...defaultProps} />);

      const searchButton = screen.getByRole('button', { name: /search/i });
      await user.click(searchButton);

      await waitFor(() => {
        const activeBadge = screen.getByText('Active');
        const inactiveBadge = screen.getByText('Inactive');
        
        expect(activeBadge).toBeInTheDocument();
        expect(inactiveBadge).toBeInTheDocument();
        
        // Check for proper styling classes
        expect(activeBadge.closest('.bg-green-100')).toBeInTheDocument();
        expect(inactiveBadge.closest('.bg-red-100')).toBeInTheDocument();
      });
    });

    it('should display action buttons for each row', async () => {
      const user = userEvent.setup();
      const mockSearchFunction = vi.mocked(programManagerService.ProgramManagerService.searchProgramManagers);
      mockSearchFunction.mockResolvedValue(mockApiResponse.success);

      render(<ProgramManagerSearchComponent {...defaultProps} />);

      const searchButton = screen.getByRole('button', { name: /search/i });
      await user.click(searchButton);

      await waitFor(() => {
        const viewButtons = screen.getAllByRole('button', { name: /view/i });
        const editButtons = screen.getAllByRole('button', { name: /edit/i });
        const deleteButtons = screen.getAllByRole('button', { name: /delete/i });

        expect(viewButtons).toHaveLength(2); // One for each row
        expect(editButtons).toHaveLength(2);
        expect(deleteButtons).toHaveLength(2);
      });
    });

    it('should show empty state when no results found', async () => {
      const user = userEvent.setup();
      const mockSearchFunction = vi.mocked(programManagerService.ProgramManagerService.searchProgramManagers);
      mockSearchFunction.mockResolvedValue(mockApiResponse.empty);

      render(<ProgramManagerSearchComponent {...defaultProps} />);

      const searchButton = screen.getByRole('button', { name: /search/i });
      await user.click(searchButton);

      await waitFor(() => {
        expect(screen.getByText(/no records found/i)).toBeInTheDocument();
        expect(screen.getByText(/try adjusting your search criteria/i)).toBeInTheDocument();
      });
    });

    it('should show export buttons when results are available', async () => {
      const user = userEvent.setup();
      const mockSearchFunction = vi.mocked(programManagerService.ProgramManagerService.searchProgramManagers);
      mockSearchFunction.mockResolvedValue(mockApiResponse.success);

      render(<ProgramManagerSearchComponent {...defaultProps} />);

      const searchButton = screen.getByRole('button', { name: /search/i });
      await user.click(searchButton);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /pdf/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /csv/i })).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      const user = userEvent.setup();
      const mockSearchFunction = vi.mocked(programManagerService.ProgramManagerService.searchProgramManagers);
      mockSearchFunction.mockResolvedValue(mockApiResponse.error);

      render(<ProgramManagerSearchComponent {...defaultProps} />);

      const searchButton = screen.getByRole('button', { name: /search/i });
      await user.click(searchButton);

      await waitFor(() => {
        expect(screen.getByText(/demo mode/i)).toBeInTheDocument();
      });
    });

    it('should handle network errors with fallback to mock data', async () => {
      const user = userEvent.setup();
      const mockSearchFunction = vi.mocked(programManagerService.ProgramManagerService.searchProgramManagers);
      mockSearchFunction.mockRejectedValue(new Error('Network error'));

      render(<ProgramManagerSearchComponent {...defaultProps} />);

      const searchButton = screen.getByRole('button', { name: /search/i });
      await user.click(searchButton);

      await waitFor(() => {
        expect(screen.getByText(/demo data/i)).toBeInTheDocument();
      });
    });

    it('should handle malformed API responses', async () => {
      const user = userEvent.setup();
      const mockSearchFunction = vi.mocked(programManagerService.ProgramManagerService.searchProgramManagers);
      mockSearchFunction.mockResolvedValue({
        success: true,
        data: null, // Malformed data
      });

      render(<ProgramManagerSearchComponent {...defaultProps} />);

      const searchButton = screen.getByRole('button', { name: /search/i });
      await user.click(searchButton);

      await waitFor(() => {
        // Should handle gracefully and show empty state or fallback
        expect(screen.getByText(/search results/i)).toBeInTheDocument();
      });
    });
  });

  describe('Action Handlers', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      const mockSearchFunction = vi.mocked(programManagerService.ProgramManagerService.searchProgramManagers);
      mockSearchFunction.mockResolvedValue(mockApiResponse.success);

      render(<ProgramManagerSearchComponent {...defaultProps} />);

      const searchButton = screen.getByRole('button', { name: /search/i });
      await user.click(searchButton);

      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
    });

    it('should handle view action', async () => {
      const user = userEvent.setup();
      
      const viewButton = screen.getAllByRole('button', { name: /view/i })[0];
      await user.click(viewButton);

      expect(defaultProps.setTableActionState).toHaveBeenCalledWith('view');
      expect(defaultProps.setHideCreateTab).toHaveBeenCalledWith(false);
      expect(defaultProps.handleChangeTab).toHaveBeenCalledWith('create');
    });

    it('should handle edit action', async () => {
      const user = userEvent.setup();
      
      const editButton = screen.getAllByRole('button', { name: /edit/i })[0];
      await user.click(editButton);

      expect(defaultProps.setTableActionState).toHaveBeenCalledWith('edit');
      expect(defaultProps.setHideCreateTab).toHaveBeenCalledWith(false);
      expect(defaultProps.handleChangeTab).toHaveBeenCalledWith('create');
    });

    it('should handle delete action', async () => {
      const user = userEvent.setup();
      
      const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
      await user.click(deleteButton);

      // Delete action shows toast but doesn't change tabs
      expect(defaultProps.setTableActionState).not.toHaveBeenCalledWith('delete');
      expect(defaultProps.handleChangeTab).not.toHaveBeenCalledWith('create');
    });
  });

  describe('Export Functionality', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      const mockSearchFunction = vi.mocked(programManagerService.ProgramManagerService.searchProgramManagers);
      mockSearchFunction.mockResolvedValue(mockApiResponse.success);

      render(<ProgramManagerSearchComponent {...defaultProps} />);

      const searchButton = screen.getByRole('button', { name: /search/i });
      await user.click(searchButton);

      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });
    });

    it('should handle PDF export', async () => {
      const user = userEvent.setup();
      
      const pdfButton = screen.getByRole('button', { name: /pdf/i });
      await user.click(pdfButton);

      // Should not throw error (PDF export functionality)
      expect(pdfButton).toBeInTheDocument();
    });

    it('should handle CSV export', async () => {
      const user = userEvent.setup();
      
      const csvButton = screen.getByRole('button', { name: /csv/i });
      await user.click(csvButton);

      // Should not throw error (CSV export functionality)
      expect(csvButton).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper form labels', () => {
      render(<ProgramManagerSearchComponent {...defaultProps} />);

      expect(screen.getByLabelText(/program manager name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/bank name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    });

    it('should have proper button roles and names', () => {
      render(<ProgramManagerSearchComponent {...defaultProps} />);

      expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    });

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<ProgramManagerSearchComponent {...defaultProps} />);

      await user.tab();
      expect(screen.getByLabelText(/program manager name/i)).toHaveFocus();

      await user.tab();
      expect(screen.getByLabelText(/company name/i)).toHaveFocus();
    });

    it('should have proper table structure for screen readers', async () => {
      const user = userEvent.setup();
      const mockSearchFunction = vi.mocked(programManagerService.ProgramManagerService.searchProgramManagers);
      mockSearchFunction.mockResolvedValue(mockApiResponse.success);

      render(<ProgramManagerSearchComponent {...defaultProps} />);

      const searchButton = screen.getByRole('button', { name: /search/i });
      await user.click(searchButton);

      await waitFor(() => {
        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();
        
        const columnHeaders = screen.getAllByRole('columnheader');
        expect(columnHeaders).toHaveLength(5);
        
        const rows = screen.getAllByRole('row');
        expect(rows.length).toBeGreaterThan(1); // Header + data rows
      });
    });
  });

  describe('Form State Management', () => {
    it('should maintain form state during search', async () => {
      const user = userEvent.setup();
      const mockSearchFunction = vi.mocked(programManagerService.ProgramManagerService.searchProgramManagers);
      mockSearchFunction.mockResolvedValue(mockApiResponse.success);

      render(<ProgramManagerSearchComponent {...defaultProps} />);

      const programManagerInput = screen.getByLabelText(/program manager name/i);
      const searchButton = screen.getByRole('button', { name: /search/i });

      await user.type(programManagerInput, 'Test Manager');
      await user.click(searchButton);

      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });

      // Form should maintain its values after search
      expect(programManagerInput).toHaveValue('Test Manager');
    });

    it('should clear results when reset is clicked', async () => {
      const user = userEvent.setup();
      const mockSearchFunction = vi.mocked(programManagerService.ProgramManagerService.searchProgramManagers);
      mockSearchFunction.mockResolvedValue(mockApiResponse.success);

      render(<ProgramManagerSearchComponent {...defaultProps} />);

      const searchButton = screen.getByRole('button', { name: /search/i });
      const resetButton = screen.getByRole('button', { name: /reset/i });

      // Perform search to show results
      await user.click(searchButton);
      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument();
      });

      // Reset should clear results
      await user.click(resetButton);
      expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });
  });
});
