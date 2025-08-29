import { API_CONFIG } from '@/config/apiConfig';
import { REQUEST_CONFIG } from '@/constants/ApiConstants';

export interface FeeProgramSearchParams {
  feeProgramName?: string;
  status?: string;
  recordsPerPage?: string;
  pageNumber?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FeeProgramData {
  id?: string;
  feeProgramName: string;
  programManagerName: string;
  isoName: string;
  mcc: string;
  feeType: string;
  configurations: Array<{
    id?: string;
    scheme: string;
    txnType: string;
    txnVolume: string;
    pmShare: string;
    mspShare: string;
    slabRanges: Array<{
      id?: string;
      slabFrom: string;
      slabTo: string;
      totalFee: string;
    }>
  }>;
  status?: string;
  createdDate?: string;
}

export interface FeeProgramSearchResponse {
  success: boolean;
  data?: any[];
  totalRecords?: number;
  currentPage?: number;
  totalPages?: number;
  message?: string;
  error?: string;
}

export class FeeProgramService {
  private static baseUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.FEE_PROGRAMS}`;

  static async search(params: FeeProgramSearchParams): Promise<FeeProgramSearchResponse> {
    try {
      const url = `${this.baseUrl}/search`;
      const headers = API_CONFIG.IS_DEVELOPMENT
        ? { ...REQUEST_CONFIG.HEADERS, ...API_CONFIG.HEADERS.DEVELOPMENT }
        : REQUEST_CONFIG.HEADERS;

      const requestOptions: RequestInit = {
        method: 'POST',
        headers,
        credentials: API_CONFIG.CORS.CREDENTIALS,
        mode: API_CONFIG.CORS.MODE,
        cache: API_CONFIG.CORS.CACHE,
        body: JSON.stringify({
          ...params,
          pageNumber: params.pageNumber || 1,
          recordsPerPage: params.recordsPerPage || '10'
        }),
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT)
      };

      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        return { success: false, error: `API request failed with status ${response.status}: ${response.statusText}`, message: 'Failed to search Fee Programs' };
      }

      const data = await response.json();

      if (data.errorCode === '0' && data.errorMessage === 'SUCCESS') {
        return {
          success: true,
          data: data.feeProgramList || [],
          totalRecords: data.totalNoOfRows || data.feeProgramList?.length || 0,
          currentPage: 1,
          totalPages: Math.ceil((data.totalNoOfRows || 0) / (parseInt(params.recordsPerPage || '10')))
        };
      }

      if (Array.isArray(data)) {
        return { success: true, data, totalRecords: data.length, currentPage: 1, totalPages: 1 };
      }

      if (data.success !== undefined) {
        return {
          success: data.success,
          data: data.data || data.results || data.feeProgramList || [],
          totalRecords: data.totalRecords || data.total || data.totalNoOfRows,
          currentPage: data.currentPage || data.page,
          totalPages: data.totalPages
        };
      }

      return { success: false, error: data.errorMessage || 'Unknown error', message: data.errorMessage || 'Unable to process response', data: [] };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  static async create(payload: Omit<FeeProgramData, 'id' | 'createdDate'>): Promise<FeeProgramSearchResponse> {
    try {
      const headers = API_CONFIG.IS_DEVELOPMENT
        ? { ...REQUEST_CONFIG.HEADERS, ...API_CONFIG.HEADERS.DEVELOPMENT }
        : REQUEST_CONFIG.HEADERS;

      const response = await fetch(`${this.baseUrl}`, {
        method: 'POST',
        headers,
        credentials: API_CONFIG.CORS.CREDENTIALS,
        mode: API_CONFIG.CORS.MODE,
        cache: API_CONFIG.CORS.CACHE,
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT)
      });

      if (!response.ok) {
        return { success: false, error: `API request failed with status ${response.status}: ${response.statusText}`, message: 'Failed to create Fee Program' };
      }

      const data = await response.json();
      if (data.errorCode === '0' || data.success) {
        return { success: true, data: [data.data || data] };
      }
      return { success: false, error: data.errorMessage || data.message || 'Creation failed' };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  static async update(payload: FeeProgramData): Promise<FeeProgramSearchResponse> {
    if (!payload.id) return { success: false, error: 'Missing ID for update' };
    try {
      const headers = API_CONFIG.IS_DEVELOPMENT
        ? { ...REQUEST_CONFIG.HEADERS, ...API_CONFIG.HEADERS.DEVELOPMENT }
        : REQUEST_CONFIG.HEADERS;

      const response = await fetch(`${this.baseUrl}/${payload.id}`, {
        method: 'PUT',
        headers,
        credentials: API_CONFIG.CORS.CREDENTIALS,
        mode: API_CONFIG.CORS.MODE,
        cache: API_CONFIG.CORS.CACHE,
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT)
      });

      if (!response.ok) {
        return { success: false, error: `API request failed with status ${response.status}: ${response.statusText}`, message: 'Failed to update Fee Program' };
      }

      const data = await response.json();
      if (data.errorCode === '0' || data.success) {
        return { success: true, data: [data.data || data] };
      }
      return { success: false, error: data.errorMessage || data.message || 'Update failed' };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  static async delete(id: string): Promise<FeeProgramSearchResponse> {
    try {
      const headers = API_CONFIG.IS_DEVELOPMENT
        ? { ...REQUEST_CONFIG.HEADERS, ...API_CONFIG.HEADERS.DEVELOPMENT }
        : REQUEST_CONFIG.HEADERS;

      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers,
        credentials: API_CONFIG.CORS.CREDENTIALS,
        mode: API_CONFIG.CORS.MODE,
        cache: API_CONFIG.CORS.CACHE,
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT)
      });

      if (!response.ok) {
        return { success: false, error: `API request failed with status ${response.status}: ${response.statusText}`, message: 'Failed to delete Fee Program' };
      }

      const data = await response.json();
      if (data.errorCode === '0' || data.success) {
        return { success: true };
      }
      return { success: false, error: data.errorMessage || data.message || 'Delete failed' };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  static getApiUrl(): string {
    return `${this.baseUrl}/search`;
  }
}

export default FeeProgramService;
export const { search, create, update, delete: deleteFeeProgram, getApiUrl } = FeeProgramService;
