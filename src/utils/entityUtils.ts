import { format } from 'date-fns';
import { BaseEntity } from '@/types/entities';

// Date formatting utilities
export const formatDate = (date: Date | string, formatStr: string = 'MMM dd, yyyy'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, formatStr);
};

export const formatDateTime = (date: Date | string): string => {
  return formatDate(date, 'MMM dd, yyyy HH:mm:ss');
};

// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  return phoneRegex.test(phone);
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateZipCode = (zipCode: string): boolean => {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode);
};

export const validatePanNumber = (pan: string): boolean => {
  const panRegex = /^\d{6}$/;
  return panRegex.test(pan);
};

// Form validation helper
export const createValidator = (rules: Record<string, (value: any) => string | null>) => {
  return (data: Record<string, any>): Record<string, string> => {
    const errors: Record<string, string> = {};
    
    Object.entries(rules).forEach(([field, validator]) => {
      const error = validator(data[field]);
      if (error) {
        errors[field] = error;
      }
    });
    
    return errors;
  };
};

// Common validation rules
export const VALIDATION_RULES = {
  required: (fieldName: string) => (value: any) => 
    !value || (typeof value === 'string' && value.trim() === '') 
      ? `${fieldName} is required` 
      : null,
      
  email: (value: string) => 
    value && !validateEmail(value) 
      ? 'Please enter a valid email address' 
      : null,
      
  phone: (value: string) => 
    value && !validatePhone(value) 
      ? 'Please enter a valid phone number' 
      : null,
      
  url: (value: string) => 
    value && !validateUrl(value) 
      ? 'Please enter a valid URL' 
      : null,
      
  zipCode: (value: string) => 
    value && !validateZipCode(value) 
      ? 'Please enter a valid zip code' 
      : null,
      
  panNumber: (value: string) => 
    value && !validatePanNumber(value) 
      ? 'PAN number must be 6 digits' 
      : null,
      
  minLength: (min: number) => (value: string) => 
    value && value.length < min 
      ? `Must be at least ${min} characters` 
      : null,
      
  maxLength: (max: number) => (value: string) => 
    value && value.length > max 
      ? `Must be no more than ${max} characters` 
      : null,
};

// File utilities
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const isValidFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

export const isValidFileSize = (file: File, maxSizeBytes: number): boolean => {
  return file.size <= maxSizeBytes;
};

// Entity utilities
export const getEntityDisplayName = (entity: BaseEntity, nameField: string = 'name'): string => {
  return (entity as any)[nameField] || 'Unnamed';
};

export const getEntityStatus = (entity: BaseEntity): 'active' | 'inactive' => {
  return entity.isActive !== false ? 'active' : 'inactive';
};

export const sortEntitiesByDate = <T extends BaseEntity>(
  entities: T[], 
  field: keyof BaseEntity = 'createdAt', 
  direction: 'asc' | 'desc' = 'desc'
): T[] => {
  return entities.sort((a, b) => {
    const dateA = new Date(a[field] as string);
    const dateB = new Date(b[field] as string);
    
    if (direction === 'asc') {
      return dateA.getTime() - dateB.getTime();
    } else {
      return dateB.getTime() - dateA.getTime();
    }
  });
};

// Search utilities
export const searchEntities = <T extends Record<string, any>>(
  entities: T[],
  query: string,
  searchFields: (keyof T)[]
): T[] => {
  if (!query.trim()) return entities;
  
  const lowercaseQuery = query.toLowerCase();
  
  return entities.filter(entity => 
    searchFields.some(field => {
      const value = entity[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(lowercaseQuery);
      }
      if (typeof value === 'number') {
        return value.toString().includes(lowercaseQuery);
      }
      return false;
    })
  );
};

// Export utilities
export const generateExportFilename = (
  entityType: string, 
  format: string, 
  prefix: string = 'export'
): string => {
  const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm-ss');
  return `${prefix}_${entityType}_${timestamp}.${format}`;
};

// URL utilities
export const generateEntityUrl = (entityType: string, action: string, id?: string): string => {
  let url = `/admin/${entityType}`;
  
  if (action && action !== 'list') {
    url += `/${action}`;
  }
  
  if (id) {
    url += `/${id}`;
  }
  
  return url;
};

// Form state utilities
export const resetFormErrors = (setErrors: (errors: Record<string, string>) => void, field?: string) => {
  if (field) {
    setErrors((prev: Record<string, string>) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  } else {
    setErrors({});
  }
};

export const clearFormData = <T extends Record<string, any>>(
  initialData: T,
  setFormData: (data: T) => void
) => {
  setFormData({ ...initialData });
};

// Debounce utility for search
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): T => {
  let timeoutId: NodeJS.Timeout;
  
  return ((...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T;
};

// Local storage utilities
export const saveToLocalStorage = (key: string, data: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return defaultValue;
  }
};

export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Failed to remove from localStorage:', error);
  }
};
