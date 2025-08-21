import { baseService } from './baseService';

/**
 * Merchant Group Service
 * Handles all API operations for Merchant Group management
 */

export interface MerchantGroupData {
  id?: string;
  merchantGroupName: string;
  corporateLegalName: string;
  address1: string;
  address2: string;
  address3?: string;
  pinCode: string;
  country: string;
  state: string;
  city: string;
  contactName: string;
  contactPhone: string;
  contactEmailId: string;
  routingProfileName: string;
  paymentType: string;
  bankName: string;
  branchName: string;
  nameOnAccount: string;
  accountType: string;
  accountNumber: string;
  bankCode: string;
  bankState: string;
  bankCity: string;
  status?: string;
  createdDate?: string;
  updatedDate?: string;
}

export interface MerchantGroupSearchParams {
  merchantGroupName?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  status?: string;
  recordsPerPage?: number;
  page?: number;
}

export interface MerchantGroupSearchResponse {
  data: MerchantGroupData[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

class MerchantGroupService {
  private readonly endpoint = '/merchant-groups';

  /**
   * Create a new merchant group
   */
  async create(data: MerchantGroupData): Promise<MerchantGroupData> {
    try {
      const response = await baseService.post<MerchantGroupData>(this.endpoint, data);
      return response.data;
    } catch (error) {
      console.error('Error creating merchant group:', error);
      throw new Error('Failed to create merchant group');
    }
  }

  /**
   * Get merchant group by ID
   */
  async getById(id: string): Promise<MerchantGroupData> {
    try {
      const response = await baseService.get<MerchantGroupData>(`${this.endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching merchant group:', error);
      throw new Error('Failed to fetch merchant group');
    }
  }

  /**
   * Update merchant group
   */
  async update(id: string, data: Partial<MerchantGroupData>): Promise<MerchantGroupData> {
    try {
      const response = await baseService.put<MerchantGroupData>(`${this.endpoint}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating merchant group:', error);
      throw new Error('Failed to update merchant group');
    }
  }

  /**
   * Delete merchant group
   */
  async delete(id: string): Promise<void> {
    try {
      await baseService.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      console.error('Error deleting merchant group:', error);
      throw new Error('Failed to delete merchant group');
    }
  }

  /**
   * Search merchant groups with filters
   */
  async search(params: MerchantGroupSearchParams): Promise<MerchantGroupSearchResponse> {
    try {
      const searchParams = new URLSearchParams();
      
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, value.toString());
        }
      });

      const response = await baseService.get<MerchantGroupSearchResponse>(
        `${this.endpoint}/search?${searchParams.toString()}`
      );
      return response.data;
    } catch (error) {
      console.error('Error searching merchant groups:', error);
      throw new Error('Failed to search merchant groups');
    }
  }

  /**
   * Get all merchant groups (with pagination)
   */
  async getAll(page = 1, limit = 25): Promise<MerchantGroupSearchResponse> {
    try {
      const response = await baseService.get<MerchantGroupSearchResponse>(
        `${this.endpoint}?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching merchant groups:', error);
      throw new Error('Failed to fetch merchant groups');
    }
  }

  /**
   * Export merchant groups to CSV
   */
  async exportToCsv(filters?: MerchantGroupSearchParams): Promise<Blob> {
    try {
      const searchParams = new URLSearchParams();
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            searchParams.append(key, value.toString());
          }
        });
      }

      const response = await baseService.get(
        `${this.endpoint}/export/csv?${searchParams.toString()}`,
        { responseType: 'blob' }
      );
      return response.data;
    } catch (error) {
      console.error('Error exporting merchant groups to CSV:', error);
      throw new Error('Failed to export merchant groups to CSV');
    }
  }

  /**
   * Export merchant groups to PDF
   */
  async exportToPdf(filters?: MerchantGroupSearchParams): Promise<Blob> {
    try {
      const searchParams = new URLSearchParams();
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            searchParams.append(key, value.toString());
          }
        });
      }

      const response = await baseService.get(
        `${this.endpoint}/export/pdf?${searchParams.toString()}`,
        { responseType: 'blob' }
      );
      return response.data;
    } catch (error) {
      console.error('Error exporting merchant groups to PDF:', error);
      throw new Error('Failed to export merchant groups to PDF');
    }
  }

  /**
   * Activate merchant group
   */
  async activate(id: string): Promise<MerchantGroupData> {
    try {
      const response = await baseService.patch<MerchantGroupData>(`${this.endpoint}/${id}/activate`);
      return response.data;
    } catch (error) {
      console.error('Error activating merchant group:', error);
      throw new Error('Failed to activate merchant group');
    }
  }

  /**
   * Suspend merchant group
   */
  async suspend(id: string): Promise<MerchantGroupData> {
    try {
      const response = await baseService.patch<MerchantGroupData>(`${this.endpoint}/${id}/suspend`);
      return response.data;
    } catch (error) {
      console.error('Error suspending merchant group:', error);
      throw new Error('Failed to suspend merchant group');
    }
  }

  /**
   * Duplicate merchant group
   */
  async duplicate(id: string): Promise<MerchantGroupData> {
    try {
      const response = await baseService.post<MerchantGroupData>(`${this.endpoint}/${id}/duplicate`);
      return response.data;
    } catch (error) {
      console.error('Error duplicating merchant group:', error);
      throw new Error('Failed to duplicate merchant group');
    }
  }
}

export const merchantGroupService = new MerchantGroupService();
export default merchantGroupService;
