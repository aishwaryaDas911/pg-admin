/**
 * Program Manager Management Constants
 * All static strings, labels, placeholders, and error messages for Program Manager components
 */

export const PROGRAM_MANAGER_STRINGS = {
  // Page Titles
  TITLES: {
    MAIN: 'Program Manager Management',
    CREATE: 'Create Program Manager',
    SEARCH: 'Search Program Manager',
    EDIT: 'Edit Program Manager',
    VIEW: 'View Program Manager Details',
  },

  // Tab Labels
  TABS: {
    SEARCH: 'Search',
    CREATE: 'Create',
  },

  // Form Field Labels
  LABELS: {
    PROGRAM_MANAGER_NAME: 'Program Manager Name',
    COMPANY_NAME: 'Company Name',
    BUSINESS_ENTITY_NAME: 'Business Entity Name',
    CONTACT_PERSON: 'Contact Person',
    PHONE_NUMBER: 'Phone Number',
    EXTENSION: 'Extension',
    EMAIL_ID: 'Email ID',
    CURRENCY: 'Currency',
    COUNTRY: 'Country',
    STATE: 'State',
    PROGRAM_MANAGER_TIME_ZONE: 'Program Manager Time Zone',
    BATCH_PREFIX: 'Batch Prefix',
    SCHEDULER_RUN_TIME: 'Scheduler Run Time',
    ASSOCIATED_BANK_NAMES: 'Associated Bank Names',
    PROGRAM_MANAGER_LOGO: 'Program Manager Logo',
    STATUS: 'Status',
    RECORDS_PER_PAGE: 'Records Per Page',
    BANK_NAME: 'Bank Name',
  },

  // Placeholders
  PLACEHOLDERS: {
    ENTER_PROGRAM_MANAGER_NAME: 'Enter program manager name',
    ENTER_COMPANY_NAME: 'Enter company name',
    ENTER_BUSINESS_ENTITY_NAME: 'Enter business entity name',
    ENTER_CONTACT_PERSON: 'Enter contact person name',
    ENTER_PHONE_NUMBER: 'Enter phone number',
    ENTER_EXTENSION: 'Enter extension',
    ENTER_EMAIL_ADDRESS: 'Enter email address',
    SELECT_CURRENCY: 'Select currency',
    SELECT_COUNTRY: 'Select country',
    SELECT_STATE: 'Select state',
    SELECT_TIMEZONE: 'Select timezone',
    ENTER_BATCH_PREFIX: 'Enter batch prefix',
    ENTER_BANK_NAMES: 'Enter bank names (comma separated)',
    SELECT_STATUS: 'Select status',
    SELECT_RECORDS_PER_PAGE: 'Select records per page',
    SELECT_BANK_NAME: 'Select bank name',
    SEARCH_PROGRAM_MANAGER_NAME: 'Search by program manager name...',
    SEARCH_COMPANY_NAME: 'Search by company name...',
    UPLOAD_LOGO: 'Upload logo',
  },

  // Section Titles
  SECTIONS: {
    BASIC_INFORMATION: 'Basic Information',
    CONTACT_DETAILS: 'Contact Details',
    LOCATION_CONFIGURATION: 'Location & Configuration',
    SCHEDULER_LOGO: 'Scheduler & Logo',
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
    BROWSE: 'Browse',
    SAVE: 'Save',
    EDIT: 'Edit',
    VIEW: 'View',
    DELETE: 'Delete',
    BACK: 'Back',
    SUBMIT: 'Submit',
  },

  // Validation Messages
  VALIDATION: {
    PROGRAM_MANAGER_NAME_REQUIRED: 'Program Manager Name is required',
    COMPANY_NAME_REQUIRED: 'Company Name is required',
    BUSINESS_ENTITY_NAME_REQUIRED: 'Business Entity Name is required',
    CONTACT_PERSON_REQUIRED: 'Contact Person is required',
    PHONE_NUMBER_REQUIRED: 'Phone Number is required',
    EMAIL_ID_REQUIRED: 'Email ID is required',
    CURRENCY_REQUIRED: 'Currency is required',
    COUNTRY_REQUIRED: 'Country is required',
    STATE_REQUIRED: 'State is required',
    TIMEZONE_REQUIRED: 'Time Zone is required',
    BATCH_PREFIX_REQUIRED: 'Batch Prefix is required',
    SCHEDULER_RUN_TIME_REQUIRED: 'Scheduler Run Time is required',
    ASSOCIATED_BANK_NAMES_REQUIRED: 'At least one associated bank is required',
    
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PHONE: 'Please enter a valid phone number',
    INVALID_NAME: 'Please enter a valid name',
    INVALID_COMPANY_NAME: 'Please enter a valid company name',
    INVALID_BATCH_PREFIX: 'Please enter a valid batch prefix',
    
    INVALID_FILE_TYPE: 'Please select an image file',
    FILE_TOO_LARGE: 'Please select an image smaller than 5MB',
    FIX_ERRORS_AND_TRY_AGAIN: 'Please fix the errors and try again',
  },

  // Toast Messages
  TOAST: {
    // Success Messages
    PROGRAM_MANAGER_CREATED_TITLE: 'Program Manager Created',
    PROGRAM_MANAGER_CREATED_DESCRIPTION: 'Program Manager has been created successfully',
    PROGRAM_MANAGER_UPDATED_TITLE: 'Program Manager Updated',
    PROGRAM_MANAGER_UPDATED_DESCRIPTION: 'Program Manager has been updated successfully',
    PROGRAM_MANAGER_DELETED_TITLE: 'Program Manager Deleted',
    PROGRAM_MANAGER_DELETED_DESCRIPTION: 'Program Manager has been deleted successfully',
    SEARCH_COMPLETED_TITLE: 'Search Completed',
    SEARCH_COMPLETED_DESCRIPTION: 'Program Manager search completed successfully',
    EXPORT_SUCCESS_TITLE: 'Export Successful',
    
    // Error Messages
    VALIDATION_ERROR_TITLE: 'Validation Error',
    INVALID_FILE_TYPE_TITLE: 'Invalid File Type',
    FILE_TOO_LARGE_TITLE: 'File Too Large',
    SEARCH_ERROR_TITLE: 'Search Error',
    
    // Reset Messages
    FORM_RESET_TITLE: 'Form Reset',
    FORM_RESET_DESCRIPTION: 'All fields have been cleared',
    FILTERS_RESET_TITLE: 'Filters Reset',
    FILTERS_RESET_DESCRIPTION: 'All search filters have been cleared',
    
    // Cancel Messages
    CANCELLED_TITLE: 'Cancelled',
    PROGRAM_MANAGER_CREATION_CANCELLED: 'Program Manager creation was cancelled',
  },

  // Table Headers
  TABLE_HEADERS: {
    PROGRAM_MANAGER_NAME: 'Program Manager Name',
    COMPANY_NAME: 'Company Name',
    BUSINESS_ENTITY_NAME: 'Business Entity Name',
    CONTACT_PERSON: 'Contact Person',
    PHONE_NUMBER: 'Phone Number',
    EMAIL_ID: 'Email ID',
    ASSOCIATED_BANK_NAMES: 'Associated Bank Names',
    STATUS: 'Status',
    CREATED_DATE: 'Created Date',
    ACTIONS: 'Actions',
  },

  // Descriptions
  DESCRIPTIONS: {
    MAIN: 'Manage Program Manager entities with comprehensive search and creation capabilities',
    CREATE: 'Configure a new Program Manager with all required details',
    SEARCH: 'Search and manage existing Program Manager entities',
    FORM: 'Configure a new program manager with all required details',
  },

  // Status Options
  STATUS_OPTIONS: [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'terminated', label: 'Terminated' },
  ],

  // Action Labels
  ACTIONS: {
    VIEW_DETAILS: 'View Details',
    EDIT_PROGRAM_MANAGER: 'Edit Program Manager',
    DELETE_PROGRAM_MANAGER: 'Delete Program Manager',
    SUSPEND_PROGRAM_MANAGER: 'Suspend Program Manager',
    ACTIVATE_PROGRAM_MANAGER: 'Activate Program Manager',
    EXPORT_TO_PDF: 'Export to PDF',
    EXPORT_TO_CSV: 'Export to CSV',
  },

  // File Management
  FILES: {
    CHOOSE_FILE: 'Choose File',
    REMOVE_FILE: 'Remove',
    LOGO_PREVIEW: 'Logo preview',
    KB: 'KB',
    FILE_SIZE_LIMIT: '5MB max file size',
    SUPPORTED_FORMATS: 'Supported formats: JPG, PNG, GIF, WebP',
    FILE_SELECTED: 'File selected',
    NO_FILE_CHOSEN: 'No file chosen',
  },

  // Empty States
  EMPTY_STATES: {
    NO_RESULTS: 'No Program Manager records found',
    NO_RESULTS_DESCRIPTION: 'Try adjusting your search filters or create a new Program Manager',
  },

  // Loading States
  LOADING: {
    SEARCHING: 'Searching Program Managers...',
    CREATING: 'Creating Program Manager...',
    UPDATING: 'Updating Program Manager...',
    DELETING: 'Deleting Program Manager...',
    LOADING: 'Loading...',
    SAVING: 'Saving...',
  },

  // Confirmation Messages
  CONFIRMATIONS: {
    DELETE_PROGRAM_MANAGER: 'Are you sure you want to delete this Program Manager?',
    DELETE_PROGRAM_MANAGER_DESCRIPTION: 'This action cannot be undone.',
    RESET_FORM: 'Are you sure you want to reset the form?',
    RESET_FORM_DESCRIPTION: 'All entered data will be lost.',
    DISCARD_CHANGES: 'You have unsaved changes. Are you sure you want to discard them?',
  },

  // Export Messages
  EXPORT: {
    PDF_SUCCESS: 'Program Manager data exported to PDF successfully',
    CSV_SUCCESS: 'Program Manager data exported to CSV successfully',
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

// Program Manager-specific dropdown options
export const PROGRAM_MANAGER_DROPDOWN_OPTIONS = {
  RECORDS_PER_PAGE: [
    { value: '10', label: '10' },
    { value: '25', label: '25' },
    { value: '50', label: '50' },
    { value: '100', label: '100' },
  ],

  CURRENCIES: [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'INR', label: 'INR' },
    { value: 'GBP', label: 'GBP' },
  ],

  COUNTRIES: [
    { value: 'US', label: 'United States' },
    { value: 'DE', label: 'Germany' },
    { value: 'IN', label: 'India' },
    { value: 'UK', label: 'United Kingdom' },
  ],

  STATES: [
    { value: 'CA', label: 'California' },
    { value: 'NY', label: 'New York' },
    { value: 'TX', label: 'Texas' },
    { value: 'FL', label: 'Florida' },
    { value: 'KA', label: 'Karnataka' },
  ],

  TIME_ZONES: [
    { value: 'UTC-8', label: 'UTC-08:00 (PST)' },
    { value: 'UTC-5', label: 'UTC-05:00 (EST)' },
    { value: 'UTC+0', label: 'UTC+00:00 (GMT)' },
    { value: 'UTC+5:30', label: 'UTC+05:30 (IST)' },
  ],

  BANKS: [
    { value: 'hdfc', label: 'HDFC' },
    { value: 'axis', label: 'Axis Bank' },
    { value: 'icici', label: 'ICICI Bank' },
    { value: 'sbi', label: 'SBI' },
  ],
};

// Program Manager Form Field Configurations
export const PROGRAM_MANAGER_FIELD_CONFIG = {
  // Required fields for Program Manager creation
  REQUIRED_FIELDS: [
    'programManagerName',
    'companyName',
    'businessEntityName',
    'contactPerson',
    'phoneNumber',
    'emailId',
    'currency',
    'country',
    'state',
    'programManagerTimeZone',
    'batchPrefix',
    'schedulerRunTime',
    'associatedBankNames',
  ],

  // Optional fields
  OPTIONAL_FIELDS: [
    'extension',
    'programManagerLogo',
  ],

  // Phone validation
  PHONE_VALIDATION: {
    PATTERN: /^[+]?[\d\s()-]+$/,
  },

  // Email validation
  EMAIL_VALIDATION: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },

  // Name validation
  NAME_VALIDATION: {
    PATTERN: /^[a-zA-Z\s]+$/,
  },

  // Company name validation
  COMPANY_NAME_VALIDATION: {
    PATTERN: /^[a-zA-Z0-9\s&.-]+$/,
  },

  // Batch prefix validation
  BATCH_PREFIX_VALIDATION: {
    PATTERN: /^[a-zA-Z0-9]+$/,
  },

  // File validation
  FILE_VALIDATION: {
    MAX_SIZE_MB: 5,
    MAX_SIZE_BYTES: 5 * 1024 * 1024,
    ACCEPTED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  },
};

export default PROGRAM_MANAGER_STRINGS;
