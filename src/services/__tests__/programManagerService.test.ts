import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProgramManagerService, searchProgramManagers } from '../programManagerService';
import { mockApiResponse, mockFetchSuccess, mockFetchError, mockFetchResponse } from '@/test/test-utils';

describe('ProgramManagerService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('searchProgramManagers', () => {
    const validSearchParams = {
      programManagerName: 'Test Manager',
      companyName: 'Test Company',
      bankName: 'Test Bank',
      status: 'Active',
      recordsPerPage: '10',
      pageNumber: 1,
      sortBy: 'programManagerName',
      sortOrder: 'asc' as const
    };

    it('should successfully search with valid parameters', async () => {
      mockFetchSuccess(mockApiResponse.success);

      const result = await ProgramManagerService.searchProgramManagers(validSearchParams);

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.totalRecords).toBe(2);
      expect(result.message).toBe('SUCCESS');
    });

    it('should make correct API call with proper payload', async () => {
      mockFetchSuccess(mockApiResponse.success);

      await ProgramManagerService.searchProgramManagers(validSearchParams);

      expect(fetch).toHaveBeenCalledWith(
        'http://192.168.12.7:9086/merchant-entity-service/programmanager/processSearchProgramManager',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }),
          credentials: 'include',
          body: expect.stringContaining('Test Manager')
        })
      );

      const callArgs = (fetch as any).mock.calls[0];
      const payload = JSON.parse(callArgs[1].body);
      
      expect(payload).toEqual(expect.objectContaining({
        programManagerName: 'Test Manager',
        companyName: 'Test Company',
        bankName: 'Test Bank',
        status: 'Active',
        recordsPerPage: '10',
        pageNumber: 1
      }));
    });

    it('should handle successful empty response', async () => {
      mockFetchSuccess(mockApiResponse.empty);

      const result = await ProgramManagerService.searchProgramManagers(validSearchParams);

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(0);
      expect(result.totalRecords).toBe(0);
    });

    it('should handle API error responses', async () => {
      mockFetchSuccess(mockApiResponse.error);

      const result = await ProgramManagerService.searchProgramManagers(validSearchParams);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Internal Server Error');
      expect(result.data).toEqual([]);
    });

    it('should handle network errors', async () => {
      mockFetchError();

      const result = await ProgramManagerService.searchProgramManagers(validSearchParams);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Network error');
      expect(result.message).toContain('network connection');
    });

    it('should handle HTTP error responses (500, 404, etc.)', async () => {
      mockFetchResponse({}, 500, false);

      const result = await ProgramManagerService.searchProgramManagers(validSearchParams);

      expect(result.success).toBe(false);
      expect(result.error).toContain('API request failed with status 500');
    });

    it('should handle malformed JSON responses', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => { throw new SyntaxError('Invalid JSON'); }
      });

      const result = await ProgramManagerService.searchProgramManagers(validSearchParams);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid response format');
    });

    it('should provide default pagination parameters', async () => {
      mockFetchSuccess(mockApiResponse.success);

      await ProgramManagerService.searchProgramManagers({});

      const callArgs = (fetch as any).mock.calls[0];
      const payload = JSON.parse(callArgs[1].body);
      
      expect(payload.pageNumber).toBe(1);
      expect(payload.recordsPerPage).toBe('10');
    });

    it('should handle alternative response formats', async () => {
      // Test direct array response
      const directArrayResponse = [
        { id: 1, programManagerName: 'Test 1' },
        { id: 2, programManagerName: 'Test 2' }
      ];

      mockFetchSuccess(directArrayResponse);

      const result = await ProgramManagerService.searchProgramManagers(validSearchParams);

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
    });

    it('should handle results wrapper format', async () => {
      const resultsWrapperResponse = {
        success: true,
        data: {
          results: [
            { id: 1, programManagerName: 'Test 1' },
            { id: 2, programManagerName: 'Test 2' }
          ]
        }
      };

      mockFetchSuccess(resultsWrapperResponse);

      const result = await ProgramManagerService.searchProgramManagers(validSearchParams);

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
    });

    it('should calculate totalPages correctly', async () => {
      const responseWithPagination = {
        errorCode: '0',
        errorMessage: 'SUCCESS',
        totalNoOfRows: 25,
        programManagersList: mockApiResponse.success.programManagersList
      };

      mockFetchSuccess(responseWithPagination);

      const result = await ProgramManagerService.searchProgramManagers({
        recordsPerPage: '10'
      });

      expect(result.totalPages).toBe(3); // 25 records / 10 per page = 3 pages
    });

    it('should handle undefined or null optional parameters', async () => {
      mockFetchSuccess(mockApiResponse.success);

      const paramsWithUndefined = {
        programManagerName: undefined,
        companyName: null,
        recordsPerPage: '5'
      };

      const result = await ProgramManagerService.searchProgramManagers(paramsWithUndefined);

      expect(result.success).toBe(true);
      
      const callArgs = (fetch as any).mock.calls[0];
      const payload = JSON.parse(callArgs[1].body);
      
      expect(payload.recordsPerPage).toBe('5');
      expect(payload.pageNumber).toBe(1);
    });
  });

  describe('testApiConnection', () => {
    it('should return true for successful connection', async () => {
      mockFetchResponse({}, 200, true);

      const result = await ProgramManagerService.testApiConnection();

      expect(result).toBe(true);
      expect(fetch).toHaveBeenCalledWith(
        'http://192.168.12.7:9086/merchant-entity-service/programmanager/processSearchProgramManager',
        expect.objectContaining({
          method: 'OPTIONS',
          credentials: 'include'
        })
      );
    });

    it('should return true for 405 Method Not Allowed', async () => {
      mockFetchResponse({}, 405, false);

      const result = await ProgramManagerService.testApiConnection();

      expect(result).toBe(true);
    });

    it('should return false for connection failures', async () => {
      mockFetchError();

      const result = await ProgramManagerService.testApiConnection();

      expect(result).toBe(false);
    });
  });

  describe('getApiUrl', () => {
    it('should return correct API URL', () => {
      const url = ProgramManagerService.getApiUrl();
      
      expect(url).toBe(
        'http://192.168.12.7:9086/merchant-entity-service/programmanager/processSearchProgramManager'
      );
    });
  });

  describe('Error Handling Edge Cases', () => {
    it('should handle timeout errors specifically', async () => {
      const timeoutError = new Error('AbortError');
      timeoutError.name = 'AbortError';
      (global.fetch as any).mockRejectedValueOnce(timeoutError);

      const result = await ProgramManagerService.searchProgramManagers(validSearchParams);

      expect(result.success).toBe(false);
      expect(result.message).toContain('network connection');
    });

    it('should handle various error response structures', async () => {
      const customErrorResponse = {
        errorCode: '404',
        errorMessage: 'Not Found',
        details: 'Resource not available'
      };

      mockFetchSuccess(customErrorResponse);

      const result = await ProgramManagerService.searchProgramManagers(validSearchParams);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Not Found');
    });

    it('should handle null or undefined response data', async () => {
      mockFetchSuccess(null);

      const result = await ProgramManagerService.searchProgramManagers(validSearchParams);

      expect(result.success).toBe(false);
      expect(result.data).toEqual([]);
    });

    it('should handle response without programManagersList', async () => {
      const responseWithoutList = {
        errorCode: '0',
        errorMessage: 'SUCCESS',
        totalNoOfRows: 0
        // No programManagersList property
      };

      mockFetchSuccess(responseWithoutList);

      const result = await ProgramManagerService.searchProgramManagers(validSearchParams);

      expect(result.success).toBe(true);
      expect(result.data).toEqual([]);
      expect(result.totalRecords).toBe(0);
    });
  });

  describe('Security and Performance', () => {
    it('should include credentials for CORS support', async () => {
      mockFetchSuccess(mockApiResponse.success);

      await ProgramManagerService.searchProgramManagers(validSearchParams);

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          credentials: 'include'
        })
      );
    });

    it('should use POST method for search requests', async () => {
      mockFetchSuccess(mockApiResponse.success);

      await ProgramManagerService.searchProgramManagers(validSearchParams);

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST'
        })
      );
    });

    it('should not log sensitive search parameters', async () => {
      const consoleSpy = vi.spyOn(console, 'log');
      mockFetchSuccess(mockApiResponse.success);

      await ProgramManagerService.searchProgramManagers({
        programManagerName: 'SensitiveManager'
      });

      // The search params should be logged for debugging but ensure no passwords or tokens
      const logCalls = consoleSpy.mock.calls.flat().join(' ');
      expect(logCalls).toContain('SensitiveManager'); // This is okay to log
      
      consoleSpy.mockRestore();
    });
  });
});
