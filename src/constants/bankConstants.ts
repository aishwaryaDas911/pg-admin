/**
 * Bank Management Constants
 * All static strings, labels, placeholders, and error messages for Bank components
 */

export const BANK_STRINGS = {
  // Page Titles
  TITLES: {
    MAIN: 'Bank Management',
    CREATE: 'Create Bank',
    SEARCH: 'Search Bank',
    EDIT: 'Edit Bank',
    VIEW: 'View Bank Details',
  },

  // Tab Labels
  TABS: {
    SEARCH: 'Search',
    CREATE: 'Create',
  },

  // Form Field Labels
  LABELS: {
    BANK_NAME: 'Bank Name',
    BANK_CODE: 'Bank Code',
    SETTLEMENT_ROUTING_NUMBER: 'Settlement Routing Number',
    SETTLEMENT_ACCOUNT_NUMBER: 'Settlement Account Number',
    ADDRESS_1: 'Address 1',
    ADDRESS_2: 'Address 2',
    CITY: 'City',
    COUNTRY: 'Country',
    STATE: 'State',
    ZIP_CODE: 'Zip Code',
    PRIMARY_CONTACT_NAME: 'Primary Contact Name',
    CONTACT_MOBILE_NUMBER: 'Contact Mobile Number',
    CONTACT_PHONE_NUMBER: 'Contact Phone Number',
    EXTENSION: 'Extension',
    FAX: 'Fax',
    EMAIL_ADDRESS: 'Email Address',
    LOCAL_CURRENCY: 'Local Currency',
    STATUS: 'Status',
    RECORDS_PER_PAGE: 'Records Per Page',
  },

  // Placeholders
  PLACEHOLDERS: {
    ENTER_BANK_NAME: 'Enter bank name',
    ENTER_BANK_CODE: 'Enter bank code',
    ENTER_SETTLEMENT_ROUTING_NUMBER: 'Enter settlement routing number',
    ENTER_SETTLEMENT_ACCOUNT_NUMBER: 'Enter settlement account number',
    ENTER_ADDRESS_1: 'Enter address line 1',
    ENTER_ADDRESS_2: 'Enter address line 2',
    ENTER_CITY: 'Enter city',
    SELECT_COUNTRY: 'Select country',
    SELECT_STATE: 'Select state',
    ENTER_ZIP_CODE: 'Enter zip code',
    ENTER_PRIMARY_CONTACT_NAME: 'Enter primary contact name',
    ENTER_CONTACT_MOBILE_NUMBER: 'Enter contact mobile number',
    ENTER_CONTACT_PHONE_NUMBER: 'Enter contact phone number',
    ENTER_EXTENSION: 'Enter extension',
    ENTER_FAX: 'Enter fax number',
    ENTER_EMAIL_ADDRESS: 'Enter email address',
    SELECT_LOCAL_CURRENCY: 'Select local currency',
    SELECT_STATUS: 'Select status',
    SELECT_RECORDS_PER_PAGE: 'Select records per page',
    SEARCH_BANK_NAME: 'Search by bank name...',
    SEARCH_BANK_CODE: 'Search by bank code...',
    SEARCH_EMAIL: 'Search by email address...',
  },

  // Section Titles
  SECTIONS: {
    BASIC_INFORMATION: 'Basic Information',
    CONTACT_DETAILS: 'Contact Details',
    LOCATION_INFORMATION: 'Location Information',
    SEARCH_FILTERS: 'Search Filters',
    SEARCH_RESULTS: 'Search Results',
  },

  // Button Labels
  BUTTONS: {
    CREATE: 'Create',
    UPDATE: 'Update',
    CANCEL: 'Cancel',
    RESET: 'Reset',
    SEARCH: 'Search',
    EXPORT_PDF: 'Export PDF',
    EXPORT_CSV: 'Export CSV',
    SAVE: 'Save',
    EDIT: 'Edit',
    VIEW: 'View',
    DELETE: 'Delete',
    BACK: 'Back',
    SUBMIT: 'Submit',
  },

  // Validation Messages
  VALIDATION: {
    BANK_NAME_REQUIRED: 'Bank Name is required',
    BANK_CODE_REQUIRED: 'Bank Code is required',
    SETTLEMENT_ROUTING_NUMBER_REQUIRED: 'Settlement Routing Number is required',
    SETTLEMENT_ACCOUNT_NUMBER_REQUIRED: 'Settlement Account Number is required',
    ADDRESS_1_REQUIRED: 'Address 1 is required',
    CITY_REQUIRED: 'City is required',
    COUNTRY_REQUIRED: 'Country is required',
    STATE_REQUIRED: 'State is required',
    ZIP_CODE_REQUIRED: 'Zip Code is required',
    PRIMARY_CONTACT_NAME_REQUIRED: 'Primary Contact Name is required',
    CONTACT_PHONE_NUMBER_REQUIRED: 'Contact Phone Number is required',
    EMAIL_ADDRESS_REQUIRED: 'Email Address is required',
    LOCAL_CURRENCY_REQUIRED: 'Local Currency is required',
    
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PHONE: 'Please enter a valid phone number',
    INVALID_MOBILE: 'Please enter a valid mobile number',
    INVALID_NAME: 'Please enter a valid name (only letters and spaces)',
    INVALID_BANK_NAME: 'Please enter a valid bank name',
    INVALID_BANK_CODE: 'Please enter a valid bank code (letters, numbers, and hyphens only)',
    INVALID_ROUTING_NUMBER: 'Please enter a valid routing number (numbers only)',
    INVALID_ACCOUNT_NUMBER: 'Please enter a valid account number (numbers only)',
    INVALID_ZIP_CODE: 'Please enter a valid zip code',
    
    FIX_ERRORS_AND_TRY_AGAIN: 'Please fix the errors and try again',
  },

  // Toast Messages
  TOAST: {
    // Success Messages
    BANK_CREATED_TITLE: 'Bank Created',
    BANK_CREATED_DESCRIPTION: 'Bank has been created successfully',
    BANK_UPDATED_TITLE: 'Bank Updated',
    BANK_UPDATED_DESCRIPTION: 'Bank has been updated successfully',
    BANK_DELETED_TITLE: 'Bank Deleted',
    BANK_DELETED_DESCRIPTION: 'Bank has been deleted successfully',
    SEARCH_COMPLETED_TITLE: 'Search Completed',
    SEARCH_COMPLETED_DESCRIPTION: 'Bank search completed successfully',
    EXPORT_SUCCESS_TITLE: 'Export Successful',
    
    // Error Messages
    VALIDATION_ERROR_TITLE: 'Validation Error',
    SEARCH_ERROR_TITLE: 'Search Error',
    
    // Reset Messages
    FORM_RESET_TITLE: 'Form Reset',
    FORM_RESET_DESCRIPTION: 'All fields have been cleared',
    FILTERS_RESET_TITLE: 'Filters Reset',
    FILTERS_RESET_DESCRIPTION: 'All search filters have been cleared',
    
    // Cancel Messages
    CANCELLED_TITLE: 'Cancelled',
    BANK_CREATION_CANCELLED: 'Bank creation was cancelled',
  },

  // Table Headers
  TABLE_HEADERS: {
    BANK_NAME: 'Bank Name',
    BANK_CODE: 'Bank Code',
    SETTLEMENT_ROUTING_NUMBER: 'Settlement Routing Number',
    SETTLEMENT_ACCOUNT_NUMBER: 'Settlement Account Number',
    CITY: 'City',
    STATE: 'State',
    COUNTRY: 'Country',
    PRIMARY_CONTACT_NAME: 'Primary Contact Name',
    CONTACT_PHONE_NUMBER: 'Contact Phone Number',
    EMAIL_ADDRESS: 'Email Address',
    LOCAL_CURRENCY: 'Local Currency',
    STATUS: 'Status',
    CREATED_DATE: 'Created Date',
    ACTIONS: 'Actions',
  },

  // Descriptions
  DESCRIPTIONS: {
    MAIN: 'Manage Bank entities with comprehensive search and creation capabilities',
    CREATE: 'Configure a new Bank with all required details',
    SEARCH: 'Search and manage existing Bank entities',
    FORM: 'Configure a new bank with all required details including contact and location information',
  },

  // Status Options
  STATUS_OPTIONS: [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' },
    { value: 'suspended', label: 'Suspended' },
  ],

  // Action Labels
  ACTIONS: {
    VIEW_DETAILS: 'View Details',
    EDIT_BANK: 'Edit Bank',
    DELETE_BANK: 'Delete Bank',
    SUSPEND_BANK: 'Suspend Bank',
    ACTIVATE_BANK: 'Activate Bank',
    EXPORT_TO_PDF: 'Export to PDF',
    EXPORT_TO_CSV: 'Export to CSV',
  },

  // Empty States
  EMPTY_STATES: {
    NO_RESULTS: 'No Bank records found',
    NO_RESULTS_DESCRIPTION: 'Try adjusting your search filters or create a new Bank',
  },

  // Loading States
  LOADING: {
    SEARCHING: 'Searching Banks...',
    CREATING: 'Creating Bank...',
    UPDATING: 'Updating Bank...',
    DELETING: 'Deleting Bank...',
    LOADING: 'Loading...',
    SAVING: 'Saving...',
  },

  // Confirmation Messages
  CONFIRMATIONS: {
    DELETE_BANK: 'Are you sure you want to delete this Bank?',
    DELETE_BANK_DESCRIPTION: 'This action cannot be undone.',
    RESET_FORM: 'Are you sure you want to reset the form?',
    RESET_FORM_DESCRIPTION: 'All entered data will be lost.',
    DISCARD_CHANGES: 'You have unsaved changes. Are you sure you want to discard them?',
  },

  // Export Messages
  EXPORT: {
    PDF_SUCCESS: 'Bank data exported to PDF successfully',
    CSV_SUCCESS: 'Bank data exported to CSV successfully',
    EXPORT_FAILED: 'Export failed. Please try again.',
  },

  // Required Field Indicator
  REQUIRED_INDICATOR: '*',

  // Common Labels
  COMMON: {
    YES: 'Yes',
    NO: 'No',
    OK: 'OK',
    CLOSE: 'Close',
    BACK: 'Back',
    NEXT: 'Next',
    FINISH: 'Finish',
    CONTINUE: 'Continue',
    OPTIONAL: 'Optional',
    REQUIRED: 'Required',
  },
};

// Bank-specific dropdown options
export const BANK_DROPDOWN_OPTIONS = {
  RECORDS_PER_PAGE: [
    { value: '10', label: '10' },
    { value: '25', label: '25' },
    { value: '50', label: '50' },
    { value: '100', label: '100' },
  ],

  CURRENCIES: [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'INR', label: 'INR - Indian Rupee' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'CAD', label: 'CAD - Canadian Dollar' },
    { value: 'AUD', label: 'AUD - Australian Dollar' },
    { value: 'JPY', label: 'JPY - Japanese Yen' },
    { value: 'CNY', label: 'CNY - Chinese Yuan' },
  ],

  COUNTRIES: [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'IN', label: 'India' },
    { value: 'AU', label: 'Australia' },
    { value: 'JP', label: 'Japan' },
    { value: 'CN', label: 'China' },
  ],

  STATES: [
    // US States
    { value: 'AL', label: 'Alabama', country: 'US' },
    { value: 'AK', label: 'Alaska', country: 'US' },
    { value: 'AZ', label: 'Arizona', country: 'US' },
    { value: 'CA', label: 'California', country: 'US' },
    { value: 'FL', label: 'Florida', country: 'US' },
    { value: 'NY', label: 'New York', country: 'US' },
    { value: 'TX', label: 'Texas', country: 'US' },
    // Indian States
    { value: 'KA', label: 'Karnataka', country: 'IN' },
    { value: 'MH', label: 'Maharashtra', country: 'IN' },
    { value: 'TN', label: 'Tamil Nadu', country: 'IN' },
    { value: 'DL', label: 'Delhi', country: 'IN' },
    // Canadian Provinces
    { value: 'ON', label: 'Ontario', country: 'CA' },
    { value: 'QC', label: 'Quebec', country: 'CA' },
    { value: 'BC', label: 'British Columbia', country: 'CA' },
  ],
};

// Bank Form Field Configurations
export const BANK_FIELD_CONFIG = {
  // Required fields for Bank creation
  REQUIRED_FIELDS: [
    'bankName',
    'bankCode',
    'settlementRoutingNumber',
    'settlementAccountNumber',
    'address1',
    'city',
    'country',
    'state',
    'zipCode',
    'primaryContactName',
    'contactPhoneNumber',
    'emailAddress',
    'localCurrency',
  ],

  // Optional fields
  OPTIONAL_FIELDS: [
    'address2',
    'contactMobileNumber',
    'extension',
    'fax',
  ],

  // Phone validation
  PHONE_VALIDATION: {
    PATTERN: /^[+]?[\d\s()-]+$/,
  },

  // Email validation
  EMAIL_VALIDATION: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },

  // Name validation (letters, spaces, and common punctuation)
  NAME_VALIDATION: {
    PATTERN: /^[a-zA-Z\s.-]+$/,
  },

  // Bank name validation (letters, numbers, spaces, and common punctuation)
  BANK_NAME_VALIDATION: {
    PATTERN: /^[a-zA-Z0-9\s&.-]+$/,
  },

  // Bank code validation (letters, numbers, and hyphens)
  BANK_CODE_VALIDATION: {
    PATTERN: /^[a-zA-Z0-9-]+$/,
  },

  // Routing number validation (numbers only)
  ROUTING_NUMBER_VALIDATION: {
    PATTERN: /^\d+$/,
  },

  // Account number validation (numbers only)
  ACCOUNT_NUMBER_VALIDATION: {
    PATTERN: /^\d+$/,
  },

  // Zip code validation (alphanumeric with optional hyphen)
  ZIP_CODE_VALIDATION: {
    PATTERN: /^[a-zA-Z0-9-]+$/,
  },
};

export default BANK_STRINGS;
