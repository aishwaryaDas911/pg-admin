import { baseService, ApiResponse, PaginatedResponse } from './baseService';
import { API_CONFIG } from '@/config/apiConfig';

// Generic CRUD service for entities
export class EntityService<T = any, CreateT = Partial<T>, UpdateT = Partial<T>> {
  constructor(private endpoint: string) {}

  // Get all entities with pagination
  async getAll(
    page: number = 1,
    limit: number = 10,
    filters?: Record<string, any>
  ): Promise<PaginatedResponse<T>> {
    const params = { page, limit, ...filters };
    return baseService.getPaginated<T>(this.endpoint, page, limit, { params });
  }

  // Get entity by ID
  async getById(id: string | number): Promise<ApiResponse<T>> {
    return baseService.get<T>(`${this.endpoint}/${id}`);
  }

  // Create new entity
  async create(data: CreateT): Promise<ApiResponse<T>> {
    return baseService.post<T>(this.endpoint, data);
  }

  // Update entity
  async update(id: string | number, data: UpdateT): Promise<ApiResponse<T>> {
    return baseService.put<T>(`${this.endpoint}/${id}`, data);
  }

  // Partially update entity
  async patch(id: string | number, data: Partial<UpdateT>): Promise<ApiResponse<T>> {
    return baseService.patch<T>(`${this.endpoint}/${id}`, data);
  }

  // Delete entity
  async delete(id: string | number): Promise<ApiResponse<void>> {
    return baseService.delete<void>(`${this.endpoint}/${id}`);
  }

  // Search entities
  async search(
    query: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<T>> {
    const params = { q: query, page, limit };
    return baseService.getPaginated<T>(`${this.endpoint}/search`, page, limit, { params });
  }

  // Bulk operations
  async bulkCreate(data: CreateT[]): Promise<ApiResponse<T[]>> {
    return baseService.post<T[]>(`${this.endpoint}/bulk`, data);
  }

  async bulkUpdate(updates: Array<{ id: string | number; data: UpdateT }>): Promise<ApiResponse<T[]>> {
    return baseService.put<T[]>(`${this.endpoint}/bulk`, updates);
  }

  async bulkDelete(ids: Array<string | number>): Promise<ApiResponse<void>> {
    return baseService.delete<void>(`${this.endpoint}/bulk`, { data: { ids } });
  }

  // Export data
  async export(format: 'csv' | 'pdf' | 'excel' = 'csv', filters?: Record<string, any>): Promise<Blob> {
    const params = { format, ...filters };
    const response = await baseService.getAxiosInstance().get(`${this.endpoint}/export`, {
      params,
      responseType: 'blob',
    });
    return response.data;
  }

  // Upload file for entity
  async uploadFile(id: string | number, file: File, field: string = 'file'): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append(field, file);
    return baseService.post<T>(`${this.endpoint}/${id}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
}

// Specific service instances for each entity
export const bankService = new EntityService(API_CONFIG.ENDPOINTS.BANKS);
export const merchantService = new EntityService(API_CONFIG.ENDPOINTS.MERCHANTS);
export const subMerchantService = new EntityService(API_CONFIG.ENDPOINTS.SUB_MERCHANTS);
export const merchantGroupService = new EntityService(API_CONFIG.ENDPOINTS.MERCHANT_GROUPS);
export const isoService = new EntityService(API_CONFIG.ENDPOINTS.ISOS);
export const programManagerService = new EntityService(API_CONFIG.ENDPOINTS.PROGRAM_MANAGERS);
export const feeProgramService = new EntityService(API_CONFIG.ENDPOINTS.FEE_PROGRAMS);
export const acquirerProtocolService = new EntityService(API_CONFIG.ENDPOINTS.ACQUIRER_PROTOCOLS);

// Export all services
export default {
  bank: bankService,
  merchant: merchantService,
  subMerchant: subMerchantService,
  merchantGroup: merchantGroupService,
  iso: isoService,
  programManager: programManagerService,
  feeProgram: feeProgramService,
  acquirerProtocol: acquirerProtocolService,
};
