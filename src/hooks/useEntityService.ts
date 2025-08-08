import { useState, useEffect, useCallback } from 'react';
import { useToast } from './use-toast';
import { EntityService, ApiResponse, PaginatedResponse } from '@/services/entityService';

export interface UseEntityServiceOptions {
  autoLoad?: boolean;
  page?: number;
  limit?: number;
  filters?: Record<string, any>;
}

export interface EntityState<T> {
  data: T[];
  currentItem: T | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function useEntityService<T = any, CreateT = Partial<T>, UpdateT = Partial<T>>(
  service: EntityService<T, CreateT, UpdateT>,
  options: UseEntityServiceOptions = {}
) {
  const { toast } = useToast();
  const { autoLoad = true, page = 1, limit = 10, filters = {} } = options;

  const [state, setState] = useState<EntityState<T>>({
    data: [],
    currentItem: null,
    loading: false,
    error: null,
    pagination: {
      page,
      limit,
      total: 0,
      totalPages: 0,
    },
  });

  // Helper function to handle API responses
  const handleResponse = useCallback(<R,>(
    response: ApiResponse<R> | PaginatedResponse<R>,
    successMessage?: string
  ): R | null => {
    if (response.success) {
      if (successMessage) {
        toast({
          title: 'Success',
          description: successMessage,
        });
      }
      return response.data;
    } else {
      const errorMessage = response.message || 'An error occurred';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      setState(prev => ({ ...prev, error: errorMessage }));
      return null;
    }
  }, [toast]);

  // Load data with pagination
  const loadData = useCallback(async (
    pageNum: number = state.pagination.page,
    limitNum: number = state.pagination.limit,
    filterData: Record<string, any> = filters
  ) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await service.getAll(pageNum, limitNum, filterData);
      const data = handleResponse(response);
      
      if (data !== null && 'pagination' in response) {
        setState(prev => ({
          ...prev,
          data: response.data,
          pagination: response.pagination,
          loading: false,
        }));
      }
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message || 'Failed to load data',
        loading: false,
      }));
    }
  }, [service, handleResponse, filters, state.pagination.page, state.pagination.limit]);

  // Load single item by ID
  const loadItem = useCallback(async (id: string | number) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await service.getById(id);
      const data = handleResponse(response);
      
      if (data !== null) {
        setState(prev => ({
          ...prev,
          currentItem: data,
          loading: false,
        }));
      }
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message || 'Failed to load item',
        loading: false,
      }));
    }
  }, [service, handleResponse]);

  // Create new item
  const createItem = useCallback(async (data: CreateT): Promise<T | null> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await service.create(data);
      const newItem = handleResponse(response, 'Item created successfully');
      
      if (newItem !== null) {
        setState(prev => ({
          ...prev,
          data: [newItem, ...prev.data],
          loading: false,
        }));
        return newItem;
      }
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message || 'Failed to create item',
        loading: false,
      }));
    }
    
    return null;
  }, [service, handleResponse]);

  // Update item
  const updateItem = useCallback(async (id: string | number, data: UpdateT): Promise<T | null> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await service.update(id, data);
      const updatedItem = handleResponse(response, 'Item updated successfully');
      
      if (updatedItem !== null) {
        setState(prev => ({
          ...prev,
          data: prev.data.map(item => 
            (item as any).id === id ? updatedItem : item
          ),
          currentItem: prev.currentItem && (prev.currentItem as any).id === id 
            ? updatedItem 
            : prev.currentItem,
          loading: false,
        }));
        return updatedItem;
      }
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message || 'Failed to update item',
        loading: false,
      }));
    }
    
    return null;
  }, [service, handleResponse]);

  // Delete item
  const deleteItem = useCallback(async (id: string | number): Promise<boolean> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await service.delete(id);
      const success = handleResponse(response, 'Item deleted successfully');
      
      if (success !== null) {
        setState(prev => ({
          ...prev,
          data: prev.data.filter(item => (item as any).id !== id),
          currentItem: prev.currentItem && (prev.currentItem as any).id === id 
            ? null 
            : prev.currentItem,
          loading: false,
        }));
        return true;
      }
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message || 'Failed to delete item',
        loading: false,
      }));
    }
    
    return false;
  }, [service, handleResponse]);

  // Search functionality
  const searchItems = useCallback(async (
    query: string,
    pageNum: number = 1,
    limitNum: number = state.pagination.limit
  ) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await service.search(query, pageNum, limitNum);
      const data = handleResponse(response);
      
      if (data !== null && 'pagination' in response) {
        setState(prev => ({
          ...prev,
          data: response.data,
          pagination: response.pagination,
          loading: false,
        }));
      }
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message || 'Search failed',
        loading: false,
      }));
    }
  }, [service, handleResponse, state.pagination.limit]);

  // Export data
  const exportData = useCallback(async (
    format: 'csv' | 'pdf' | 'excel' = 'csv',
    filterData: Record<string, any> = filters
  ) => {
    try {
      const blob = await service.export(format, filterData);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `export_${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: 'Export Successful',
        description: `Data exported as ${format.toUpperCase()}`,
      });
    } catch (error: any) {
      toast({
        title: 'Export Failed',
        description: error.message || 'Failed to export data',
        variant: 'destructive',
      });
    }
  }, [service, filters, toast]);

  // Reset state
  const resetState = useCallback(() => {
    setState({
      data: [],
      currentItem: null,
      loading: false,
      error: null,
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
      },
    });
  }, []);

  // Auto-load data on mount
  useEffect(() => {
    if (autoLoad) {
      loadData();
    }
  }, [autoLoad, loadData]);

  return {
    ...state,
    actions: {
      loadData,
      loadItem,
      createItem,
      updateItem,
      deleteItem,
      searchItems,
      exportData,
      resetState,
    },
  };
}
