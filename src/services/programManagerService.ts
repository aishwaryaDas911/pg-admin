import { MERCHANT_ENTITY_SERVICE, REQUEST_CONFIG } from '@/constants/ApiConstants';

// Interface for Program Manager search request parameters
export interface ProgramManagerSearchParams {
  programManagerName?: string;
  companyName?: string;
  bankName?: string;
  status?: string;
  recordsPerPage?: string;
  // Add other search parameters as needed
  pageNumber?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Interface for Program Manager search response
export interface ProgramManagerSearchResponse {
  success: boolean;
  data?: any[];
  totalRecords?: number;
  currentPage?: number;
  totalPages?: number;
  message?: string;
  error?: string;
}

// Interface for individual Program Manager data
export interface ProgramManagerData {
  id: string;
  programManagerName: string;
  companyName: string;
  businessEntityName: string;
  contactPerson: string;
  phoneNumber: string;
  extension?: string;
  emailId: string;
  currency: string;
  country: string;
  state: string;
  programManagerTimeZone: string;
  batchPrefix: string;
  schedulerRunTime: string;
  status: string;
  associatedBankNames: string;
  programManagerLogo?: any;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Service class for Program Manager related API operations
 */
export class ProgramManagerService {
  private static baseUrl = `${MERCHANT_ENTITY_SERVICE.BASE_URL}${MERCHANT_ENTITY_SERVICE.PATHS.PROGRAM_MANAGER}`;
  
  /**
   * Search Program Managers based on provided criteria
   * @param searchParams - Search parameters for filtering Program Managers
   * @returns Promise<ProgramManagerSearchResponse>
   */
  static async searchProgramManagers(searchParams: ProgramManagerSearchParams): Promise<ProgramManagerSearchResponse> {
    try {
      const searchUrl = `${this.baseUrl}${MERCHANT_ENTITY_SERVICE.PATHS.SEARCH_PROGRAM_MANAGER}`;
      
      console.log('🔍 Searching Program Managers at:', searchUrl);
      console.log('📝 Search parameters:', searchParams);
      
      // Prepare the request payload
      const requestPayload = {
        ...searchParams,
        // Ensure we have default pagination if not provided
        pageNumber: searchParams.pageNumber || 1,
        recordsPerPage: searchParams.recordsPerPage || '10'
      };
      
      // Import API_CONFIG for better configuration
      const API_CONFIG = await import('@/config/apiConfig').then(m => m.API_CONFIG);

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
        body: JSON.stringify(requestPayload)
      };

      const response = await fetch(searchUrl, requestOptions);
      
      console.log('📡 API Response Status:', response.status);
      
      if (!response.ok) {
        console.error('❌ Search request failed:', response.status, response.statusText);
        return {
          success: false,
          error: `API request failed with status ${response.status}: ${response.statusText}`,
          message: 'Failed to search Program Managers. Please try again.'
        };
      }
      
      const responseData = await response.json();
      console.log('📦 API Response Data:', responseData);
      
      // Handle the specific API response format
      if (responseData.errorCode === "0" && responseData.errorMessage === "SUCCESS") {
        // API success response format: {errorCode: "0", errorMessage: "SUCCESS", programManagersList: [...]}
        return {
          success: true,
          data: responseData.programManagersList || [],
          totalRecords: responseData.totalNoOfRows || responseData.programManagersList?.length || 0,
          currentPage: 1,
          totalPages: Math.ceil((responseData.totalNoOfRows || 0) / (parseInt(searchParams.recordsPerPage) || 10)),
          message: responseData.errorMessage
        };
      } else if (responseData.success !== undefined) {
        // If API returns a structured response with success field (fallback)
        return {
          success: responseData.success,
          data: responseData.data || responseData.results || responseData.programManagersList || [],
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
      console.error('🚨 Program Manager search error:', error);
      
      // Handle different types of errors
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.error('🌐 Network/CORS error detected for Program Manager search');
        return {
          success: false,
          error: 'Network error: Unable to connect to Program Manager service',
          message: 'Unable to connect to the server. Please check your network connection and try again.'
        };
      } else if (error instanceof SyntaxError) {
        console.error('📝 Response parsing error for Program Manager search');
        return {
          success: false,
          error: 'Invalid response format from server',
          message: 'Received invalid response from server. Please try again.'
        };
      } else {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error occurred',
          message: 'An unexpected error occurred while searching Program Managers. Please try again.'
        };
      }
    }
  }
  
  /**
   * Test the Program Manager API connectivity
   * @returns Promise<boolean>
   */
  static async testApiConnection(): Promise<boolean> {
    try {
      const testUrl = `${this.baseUrl}${MERCHANT_ENTITY_SERVICE.PATHS.SEARCH_PROGRAM_MANAGER}`;
      console.log('🧪 Testing Program Manager API connection:', testUrl);
      
      // Make a simple request to test connectivity
      const response = await fetch(testUrl, {
        method: 'OPTIONS', // Use OPTIONS to test CORS
        headers: REQUEST_CONFIG.HEADERS,
        credentials: REQUEST_CONFIG.CREDENTIALS,
      });
      
      console.log('🔗 API connectivity test result:', response.status);
      return response.ok || response.status === 405; // 405 Method Not Allowed is also acceptable for OPTIONS
    } catch (error) {
      console.error('❌ Program Manager API connectivity test failed:', error);
      return false;
    }
  }
  
  /**
   * Get the full API URL for debugging purposes
   * @returns string
   */
  static getApiUrl(): string {
    return `${this.baseUrl}${MERCHANT_ENTITY_SERVICE.PATHS.SEARCH_PROGRAM_MANAGER}`;
  }
}

// Export individual functions for convenience
export const {
  searchProgramManagers,
  testApiConnection,
  getApiUrl
} = ProgramManagerService;

// Default export
export default ProgramManagerService;
