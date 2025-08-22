import { API_CONFIG } from '@/config/apiConfig';
import { REQUEST_CONFIG } from '@/constants/ApiConstants';

// Interface for Bank search request parameters
export interface BankSearchParams {
  bankName?: string;
  bankCode?: string;
  emailAddress?: string;
  status?: string;
  recordsPerPage?: string;
  // Add other search parameters as needed
  pageNumber?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Interface for Bank search response
export interface BankSearchResponse {
  success: boolean;
  data?: any[];
  totalRecords?: number;
  currentPage?: number;
  totalPages?: number;
  message?: string;
  error?: string;
}

// Interface for individual Bank data
export interface BankData {
  id: string;
  bankName: string;
  bankCode: string;
  settlementRoutingNumber: string;
  settlementAccountNumber: string;
  address1: string;
  address2?: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
  primaryContactName: string;
  contactMobileNumber?: string;
  contactPhoneNumber: string;
  extension?: string;
  fax?: string;
  emailAddress: string;
  localCurrency: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Service class for Bank related API operations
 */
export class BankService {
  private static baseUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.BANKS}`;
  
  /**
   * Search Banks based on provided criteria
   * @param searchParams - Search parameters for filtering Banks
   * @returns Promise<BankSearchResponse>
   */
  static async searchBanks(searchParams: BankSearchParams): Promise<BankSearchResponse> {
    try {
      const searchUrl = `${this.baseUrl}/search`;
      
      console.log('🔍 Searching Banks at:', searchUrl);
      console.log('📝 Search parameters:', searchParams);
      
      // Prepare the request payload
      const requestPayload = {
        ...searchParams,
        // Ensure we have default pagination if not provided
        pageNumber: searchParams.pageNumber || 1,
        recordsPerPage: searchParams.recordsPerPage || '10'
      };
      
      // Determine headers based on environment
      const headers = API_CONFIG.IS_DEVELOPMENT
        ? { ...REQUEST_CONFIG.HEADERS, ...API_CONFIG.HEADERS.DEVELOPMENT }
        : REQUEST_CONFIG.HEADERS;

      const requestOptions: RequestInit = {
        method: 'POST',
        headers,
        credentials: API_CONFIG.CORS.CREDENTIALS,
        mode: API_CONFIG.CORS.MODE,
        cache: API_CONFIG.CORS.CACHE,
        body: JSON.stringify(requestPayload),
        // Add timeout to prevent hanging requests
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT)
      };

      const response = await fetch(searchUrl, requestOptions);
      
      console.log('📡 API Response Status:', response.status);
      
      if (!response.ok) {
        console.error('❌ Search request failed:', response.status, response.statusText);
        return {
          success: false,
          error: `API request failed with status ${response.status}: ${response.statusText}`,
          message: 'Failed to search Banks. Please try again.'
        };
      }
      
      const responseData = await response.json();
      console.log('📦 API Response Data:', responseData);
      
      // Handle the specific API response format
      if (responseData.errorCode === "0" && responseData.errorMessage === "SUCCESS") {
        // API success response format: {errorCode: "0", errorMessage: "SUCCESS", banksList: [...]}
        return {
          success: true,
          data: responseData.banksList || [],
          totalRecords: responseData.totalNoOfRows || responseData.banksList?.length || 0,
          currentPage: 1,
          totalPages: Math.ceil((responseData.totalNoOfRows || 0) / (parseInt(searchParams.recordsPerPage) || 10)),
          message: responseData.errorMessage
        };
      } else if (responseData.success !== undefined) {
        // If API returns a structured response with success field (fallback)
        return {
          success: responseData.success,
          data: responseData.data || responseData.results || responseData.banksList || [],
          totalRecords: responseData.totalRecords || responseData.total || responseData.totalNoOfRows,
          currentPage: responseData.currentPage || responseData.page,
          totalPages: responseData.totalPages,
          message: responseData.message
        };
      } else if (Array.isArray(responseData)) {
        // If API returns array directly
        return {
          success: true,
          data: responseData,
          totalRecords: responseData.length,
          currentPage: 1,
          totalPages: 1
        };
      } else {
        // Error response or unexpected format
        return {
          success: false,
          error: responseData.errorMessage || 'Unknown error occurred',
          message: responseData.errorMessage || 'Unable to process response',
          data: []
        };
      }
      
    } catch (error) {
      console.error('🚨 Bank search error:', error);
      
      // Handle different types of errors
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.error('🌐 Network/CORS error detected for Bank search');
        return {
          success: false,
          error: 'Network error: Unable to connect to Bank service',
          message: 'Unable to connect to the server. Please check your network connection and try again.'
        };
      } else if (error instanceof SyntaxError) {
        console.error('📝 Response parsing error for Bank search');
        return {
          success: false,
          error: 'Invalid response format from server',
          message: 'Received invalid response from server. Please try again.'
        };
      } else {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error occurred',
          message: 'An unexpected error occurred while searching Banks. Please try again.'
        };
      }
    }
  }

  /**
   * Create a new Bank
   * @param bankData - Bank data to create
   * @returns Promise<BankSearchResponse>
   */
  static async createBank(bankData: Omit<BankData, 'id' | 'createdAt' | 'updatedAt'>): Promise<BankSearchResponse> {
    try {
      const createUrl = `${this.baseUrl}`;
      
      console.log('🏦 Creating Bank at:', createUrl);
      console.log('📝 Bank data:', bankData);
      
      // Determine headers based on environment
      const headers = API_CONFIG.IS_DEVELOPMENT
        ? { ...REQUEST_CONFIG.HEADERS, ...API_CONFIG.HEADERS.DEVELOPMENT }
        : REQUEST_CONFIG.HEADERS;

      const requestOptions: RequestInit = {
        method: 'POST',
        headers,
        credentials: API_CONFIG.CORS.CREDENTIALS,
        mode: API_CONFIG.CORS.MODE,
        cache: API_CONFIG.CORS.CACHE,
        body: JSON.stringify(bankData),
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT)
      };

      const response = await fetch(createUrl, requestOptions);
      
      console.log('📡 Create API Response Status:', response.status);
      
      if (!response.ok) {
        console.error('❌ Create request failed:', response.status, response.statusText);
        return {
          success: false,
          error: `API request failed with status ${response.status}: ${response.statusText}`,
          message: 'Failed to create Bank. Please try again.'
        };
      }
      
      const responseData = await response.json();
      console.log('📦 Create API Response Data:', responseData);
      
      // Handle successful creation
      if (responseData.errorCode === "0" || responseData.success) {
        return {
          success: true,
          data: [responseData.data || responseData],
          message: 'Bank created successfully'
        };
      } else {
        return {
          success: false,
          error: responseData.errorMessage || responseData.message || 'Creation failed',
          message: responseData.errorMessage || responseData.message || 'Failed to create Bank'
        };
      }
      
    } catch (error) {
      console.error('🚨 Bank creation error:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        message: 'An unexpected error occurred while creating Bank. Please try again.'
      };
    }
  }

  /**
   * Update an existing Bank
   * @param bankData - Bank data to update
   * @returns Promise<BankSearchResponse>
   */
  static async updateBank(bankData: BankData): Promise<BankSearchResponse> {
    try {
      const updateUrl = `${this.baseUrl}/${bankData.id}`;
      
      console.log('🔄 Updating Bank at:', updateUrl);
      console.log('📝 Bank data:', bankData);
      
      // Determine headers based on environment
      const headers = API_CONFIG.IS_DEVELOPMENT
        ? { ...REQUEST_CONFIG.HEADERS, ...API_CONFIG.HEADERS.DEVELOPMENT }
        : REQUEST_CONFIG.HEADERS;

      const requestOptions: RequestInit = {
        method: 'PUT',
        headers,
        credentials: API_CONFIG.CORS.CREDENTIALS,
        mode: API_CONFIG.CORS.MODE,
        cache: API_CONFIG.CORS.CACHE,
        body: JSON.stringify(bankData),
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT)
      };

      const response = await fetch(updateUrl, requestOptions);
      
      if (!response.ok) {
        return {
          success: false,
          error: `API request failed with status ${response.status}: ${response.statusText}`,
          message: 'Failed to update Bank. Please try again.'
        };
      }
      
      const responseData = await response.json();
      
      if (responseData.errorCode === "0" || responseData.success) {
        return {
          success: true,
          data: [responseData.data || responseData],
          message: 'Bank updated successfully'
        };
      } else {
        return {
          success: false,
          error: responseData.errorMessage || responseData.message || 'Update failed',
          message: responseData.errorMessage || responseData.message || 'Failed to update Bank'
        };
      }
      
    } catch (error) {
      console.error('🚨 Bank update error:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        message: 'An unexpected error occurred while updating Bank. Please try again.'
      };
    }
  }

  /**
   * Delete a Bank
   * @param bankId - ID of the Bank to delete
   * @returns Promise<BankSearchResponse>
   */
  static async deleteBank(bankId: string): Promise<BankSearchResponse> {
    try {
      const deleteUrl = `${this.baseUrl}/${bankId}`;
      
      console.log('🗑️ Deleting Bank at:', deleteUrl);
      
      // Determine headers based on environment
      const headers = API_CONFIG.IS_DEVELOPMENT
        ? { ...REQUEST_CONFIG.HEADERS, ...API_CONFIG.HEADERS.DEVELOPMENT }
        : REQUEST_CONFIG.HEADERS;

      const requestOptions: RequestInit = {
        method: 'DELETE',
        headers,
        credentials: API_CONFIG.CORS.CREDENTIALS,
        mode: API_CONFIG.CORS.MODE,
        cache: API_CONFIG.CORS.CACHE,
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT)
      };

      const response = await fetch(deleteUrl, requestOptions);
      
      if (!response.ok) {
        return {
          success: false,
          error: `API request failed with status ${response.status}: ${response.statusText}`,
          message: 'Failed to delete Bank. Please try again.'
        };
      }
      
      const responseData = await response.json();
      
      if (responseData.errorCode === "0" || responseData.success) {
        return {
          success: true,
          message: 'Bank deleted successfully'
        };
      } else {
        return {
          success: false,
          error: responseData.errorMessage || responseData.message || 'Delete failed',
          message: responseData.errorMessage || responseData.message || 'Failed to delete Bank'
        };
      }
      
    } catch (error) {
      console.error('🚨 Bank deletion error:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        message: 'An unexpected error occurred while deleting Bank. Please try again.'
      };
    }
  }
  
  /**
   * Test the Bank API connectivity
   * @returns Promise<boolean>
   */
  static async testApiConnection(): Promise<boolean> {
    try {
      const testUrl = `${this.baseUrl}/search`;
      console.log('🧪 Testing Bank API connection:', testUrl);
      
      // Make a simple request to test connectivity
      const response = await fetch(testUrl, {
        method: 'OPTIONS', // Use OPTIONS to test CORS
        headers: REQUEST_CONFIG.HEADERS,
        credentials: REQUEST_CONFIG.CREDENTIALS,
      });
      
      console.log('🔗 API connectivity test result:', response.status);
      return response.ok || response.status === 405; // 405 Method Not Allowed is also acceptable for OPTIONS
    } catch (error) {
      console.error('❌ Bank API connectivity test failed:', error);
      return false;
    }
  }
  
  /**
   * Get the full API URL for debugging purposes
   * @returns string
   */
  static getApiUrl(): string {
    return `${this.baseUrl}/search`;
  }
}

// Export individual functions for convenience
export const {
  searchBanks,
  createBank,
  updateBank,
  deleteBank,
  testApiConnection,
  getApiUrl
} = BankService;

// Default export
export default BankService;
