// Main management component with tab navigation
export { BankManagement } from './BankManagement';
export { default as BankManagement } from './BankManagement';

// Individual components for specific functionality
export { BankForm } from './BankForm';
export { default as BankForm } from './BankForm';

export { BankSearchTab } from './BankSearchTab';
export { default as BankSearchTab } from './BankSearchTab';

// Configuration and schema exports
export {
  bankConfig,
  bankSearchFields,
  bankCreateFields,
  bankTableConfig,
  bankValidationSchema,
  bankMockData
} from './formConfig';

// Default export is the main management component
export { default } from './BankManagement';
