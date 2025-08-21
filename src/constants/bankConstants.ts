export const BANK_STRINGS = {
  TABS: {
    SEARCH: 'Search',
    CREATE: 'Create',
  },
  FORM: {
    SEARCH_TITLE: 'Search Banks',
    BANK_NAME: 'Bank Name',
    BANK_CODE: 'Bank Code',
    EMAIL_ADDRESS: 'Email Address',
    STATUS: 'Status',
    RECORDS_PER_PAGE: 'Records Per Page',
    SEARCH_BUTTON: 'Search',
    RESET_BUTTON: 'Reset',
    CREATE_NEW_BUTTON: 'Create New Bank',
  },
  TOAST: {
    SEARCH_COMPLETED_TITLE: 'Search Completed',
    FORM_RESET_TITLE: 'Form Reset',
    BANK_CREATED_TITLE: 'Bank Created',
  },
  TABLE: {
    BANK_NAME: 'Bank Name',
    BANK_CODE: 'Bank Code',
    EMAIL_ADDRESS: 'Email Address',
    STATUS: 'Status',
    ACTIONS: 'Actions',
    NO_RESULTS: 'No banks found matching your search criteria.',
    LOADING: 'Loading banks...',
  },
  ACTIONS: {
    VIEW: 'View',
    EDIT: 'Edit',
    DELETE: 'Delete',
  },
};

export const BANK_DROPDOWN_OPTIONS = {
  STATUS: [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' },
    { value: 'suspended', label: 'Suspended' },
  ],
  RECORDS_PER_PAGE: [
    { value: '10', label: '10' },
    { value: '25', label: '25' },
    { value: '50', label: '50' },
    { value: '100', label: '100' },
  ],
};