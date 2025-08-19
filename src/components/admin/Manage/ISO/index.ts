// New Modular ISO Management Components
export { default as ISOCreate } from './ISOCreate';
export { default as ISOSearchTab } from './ISOSearchTab';
export { default as ISOIndexManagement } from './ISOIndexManagement';

// Configuration and utilities
export { isoConfig, isoSearchFields, isoTableConfig, isoMockData } from './formConfig';
export { ISO_STRINGS, ISO_DROPDOWN_OPTIONS, ISO_FIELD_CONFIG } from '@/constants/isoConstants';

// Re-export the main component as default
export { default } from './ISOIndexManagement';
