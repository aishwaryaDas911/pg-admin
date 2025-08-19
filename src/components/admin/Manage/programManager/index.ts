// Program Manager Module Exports
export { ProgramManagerManagement } from './ProgramManagerManagement';
export { ProgramManagerForm } from './ProgramManagerForm';
export { ProgramManagerSearchTab } from './ProgramManagerSearchTab';
export { 
  programManagerConfig,
  programManagerSearchFields,
  programManagerCreateFields,
  programManagerTableConfig,
  programManagerValidationSchema,
  programManagerMockData
} from './formConfig';

// Re-export constants for convenience
export {
  PROGRAM_MANAGER_STRINGS,
  PROGRAM_MANAGER_DROPDOWN_OPTIONS,
  PROGRAM_MANAGER_FIELD_CONFIG
} from '@/constants/programManagerConstants';

// Default export
export { ProgramManagerManagement as default } from './ProgramManagerManagement';
