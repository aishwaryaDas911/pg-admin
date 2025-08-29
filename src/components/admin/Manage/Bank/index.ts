// Main management component with tab navigation
export { BankManagement, default } from './BankManagement';

// Individual components for specific functionality
export { BankForm } from './BankForm';
export { BankSearchTab } from './BankSearchTab';

// Configuration and schema exports
export {
  bankConfig,
  bankSearchFields,
  bankCreateFields,
  bankTableConfig,
  bankValidationSchema,
  bankMockData
} from './formConfig';
