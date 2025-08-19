import { EntityService } from './entityService';
import { ISO, CreateISO, UpdateISO } from '@/types/entities';
import { API_CONFIG } from '@/config/apiConfig';

/**
 * Dedicated ISO service extending the generic EntityService
 * Provides specific ISO-related operations
 */
class ISOServiceClass extends EntityService<ISO, CreateISO, UpdateISO> {
  constructor() {
    super(API_CONFIG.ENDPOINTS.ISOS);
  }

  /**
   * Search ISOs by name
   */
  async searchByName(name: string, page: number = 1, limit: number = 10) {
    const filters = { name };
    return this.getAll(page, limit, filters);
  }

  /**
   * Search ISOs by business entity name
   */
  async searchByBusinessEntity(businessEntityName: string, page: number = 1, limit: number = 10) {
    const filters = { businessEntityName };
    return this.getAll(page, limit, filters);
  }

  /**
   * Get ISOs by program manager
   */
  async getByProgramManager(programManagerId: string, page: number = 1, limit: number = 10) {
    const filters = { programManagerId };
    return this.getAll(page, limit, filters);
  }

  /**
   * Get ISOs by processor
   */
  async getByProcessor(processor: string, page: number = 1, limit: number = 10) {
    const filters = { processor };
    return this.getAll(page, limit, filters);
  }

  /**
   * Get ISOs by status
   */
  async getByStatus(status: string, page: number = 1, limit: number = 10) {
    const filters = { status };
    return this.getAll(page, limit, filters);
  }

  /**
   * Validate PAN range uniqueness
   */
  async validatePanRange(panLow: string, panHigh: string) {
    const params = { panLow, panHigh };
    return this.search('validate-pan-range', 1, 1);
  }

  /**
   * Get ISO statistics
   */
  async getStatistics() {
    return this.search('statistics', 1, 1);
  }

  /**
   * Export ISOs to CSV
   */
  async exportToCsv(filters?: Record<string, any>) {
    const params = { format: 'csv', ...filters };
    return this.search('export', 1, 1000);
  }

  /**
   * Export ISOs to PDF
   */
  async exportToPdf(filters?: Record<string, any>) {
    const params = { format: 'pdf', ...filters };
    return this.search('export', 1, 1000);
  }

  /**
   * Bulk operations
   */
  async bulkCreate(isos: CreateISO[]) {
    const response = await fetch(`${this.endpoint}/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isos }),
    });
    return response.json();
  }

  async bulkUpdate(updates: { id: string; data: UpdateISO }[]) {
    const response = await fetch(`${this.endpoint}/bulk`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updates }),
    });
    return response.json();
  }

  async bulkDelete(ids: string[]) {
    const response = await fetch(`${this.endpoint}/bulk`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids }),
    });
    return response.json();
  }
}

// Export singleton instance
export const isoService = new ISOServiceClass();
export default isoService;
