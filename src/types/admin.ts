// MicroFrontend Admin Portal Types
export interface User {
  id: string;
  username: string;
  loginTime: Date;
  avatar?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path?: string;
  children?: MenuItem[];
}

export interface FilterFields {
  deviceManufacturer?: string;
  deviceModelName?: string;
  applicationType?: string;
  packageName?: string;
  applicationName?: string;
  applicationVersion?: string;
}

export interface CreateFields extends FilterFields {
  // Can be extended with additional create-specific fields
}

export interface TableRow {
  id: string;
  deviceManufacturer: string;
  deviceModelName: string;
  applicationType: string;
  packageName: string;
  applicationName: string;
  applicationVersion: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface ApiResponse<T> {
  data: T;
  pagination?: PaginationInfo;
  message?: string;
  success: boolean;
}

export type ActionType = 'view' | 'suspend' | 'edit' | 'delete';

export interface ActionConfig {
  type: ActionType;
  icon: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
  tooltip: string;
}