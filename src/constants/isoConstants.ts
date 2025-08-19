/**
 * ISO Management Constants
 * All static strings, labels, placeholders, and error messages for ISO components
 */

export const ISO_STRINGS = {
  // Page Titles
  TITLES: {
    MAIN: 'ISO Management',
    CREATE: 'Create ISO',
    SEARCH: 'Search ISO',
    EDIT: 'Edit ISO',
    VIEW: 'View ISO Details',
  },

  // Tab Labels
  TABS: {
    SEARCH: 'Search',
    CREATE: 'Create',
  },

  // Form Field Labels
  LABELS: {
    PROGRAM_MANAGER: 'Program Manager',
    ISO_NAME: 'ISO Name',
    BUSINESS_ENTITY_NAME: 'Business Entity Name',
    CONTACT_PERSON: 'Contact Person',
    CURRENCY: 'Currency',
    PROCESSOR: 'Processor',
    ADDRESS: 'Address',
    CITY: 'City',
    COUNTRY: 'Country',
    STATE: 'State',
    ZIP_CODE: 'Zip Code',
    PHONE_NUMBER: 'Phone Number',
    EXTENSION: 'Extension',
    EMAIL_ID: 'Email ID',
    BANK_NAME: 'Bank Name',
    BANK_ACCOUNT_NUMBER: 'Bank Account Number',
    BANK_ROUTING_NUMBER: 'Bank Routing Number',
    ISO_LOGO: 'ISO Logo',
    PAN_LOW: 'Pan Low',
    PAN_HIGH: 'Pan High',
    STATUS: 'Status',
    RECORDS_PER_PAGE: 'Records Per Page',
  },

  // Placeholders
  PLACEHOLDERS: {
    SELECT_PROGRAM_MANAGER: 'Select program manager',
    ENTER_ISO_NAME: 'Enter ISO name',
    ENTER_BUSINESS_ENTITY_NAME: 'Enter business entity name',
    ENTER_CONTACT_PERSON: 'Enter contact person',
    SELECT_CURRENCY: 'Select currency',
    SELECT_PROCESSOR: 'Select processor',
    ENTER_ADDRESS: 'Enter address',
    ENTER_CITY: 'Enter city',
    SELECT_COUNTRY: 'Select country',
    SELECT_STATE: 'Select state',
    ENTER_ZIP_CODE: 'Enter zip code',
    ENTER_PHONE_NUMBER: 'Enter phone number',
    ENTER_EXTENSION: 'Enter extension',
    ENTER_EMAIL_ADDRESS: 'Enter email address',
    ENTER_BANK_NAME: 'Enter bank name',
    ENTER_ACCOUNT_NUMBER: 'Enter account number',
    ENTER_ROUTING_NUMBER: 'Enter routing number',
    ENTER_6_DIGIT_PAN_LOW: 'Enter 6-digit PAN low',
    ENTER_6_DIGIT_PAN_HIGH: 'Enter 6-digit PAN high',
    SELECT_STATUS: 'Select status',
    SELECT_RECORDS_PER_PAGE: 'Select records per page',
    SEARCH_ISO_NAME: 'Search by ISO name...',
    SEARCH_BUSINESS_ENTITY: 'Search by business entity...',
  },

  // Section Titles
  SECTIONS: {
    BASIC_INFORMATION: 'Basic Information',
    PAYMENT_PROCESSING: 'Payment & Processing',
    ADDRESS_INFORMATION: 'Address Information',
    CONTACT_BANKING: 'Contact & Banking',
    PAN_IIN_RANGE: 'Pan IIN Range',
    SEARCH_FILTERS: 'Search Filters',
    SEARCH_RESULTS: 'Search Results',
  },

  // Button Labels
  BUTTONS: {
    CREATE: 'Create',
    CANCEL: 'Cancel',
    RESET: 'Reset',
    SEARCH: 'Search',
    EXPORT_PDF: 'Export PDF',
    EXPORT_CSV: 'Export CSV',
    ADD_RANGE: 'Add Range',
    REMOVE_RANGE: 'Remove',
    BROWSE: 'Browse',
    SAVE: 'Save',
    EDIT: 'Edit',
    VIEW: 'View',
    DELETE: 'Delete',
    DUPLICATE: 'Duplicate',
    SUSPEND: 'Suspend',
    ACTIVATE: 'Activate',
  },

  // Validation Messages
  VALIDATION: {
    PROGRAM_MANAGER_REQUIRED: 'Program Manager is required',
    ISO_NAME_REQUIRED: 'ISO Name is required',
    BUSINESS_ENTITY_NAME_REQUIRED: 'Business Entity Name is required',
    CONTACT_PERSON_REQUIRED: 'Contact Person is required',
    CURRENCY_REQUIRED: 'Currency is required',
    PROCESSOR_REQUIRED: 'Processor is required',
    ADDRESS_REQUIRED: 'Address is required',
    CITY_REQUIRED: 'City is required',
    COUNTRY_REQUIRED: 'Country is required',
    STATE_REQUIRED: 'State is required',
    ZIP_CODE_REQUIRED: 'Zip Code is required',
    PHONE_NUMBER_REQUIRED: 'Phone Number is required',
    EMAIL_ID_REQUIRED: 'Email ID is required',
    PAN_LOW_REQUIRED: 'Pan Low is required',
    PAN_HIGH_REQUIRED: 'Pan High is required',
    
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PHONE: 'Please enter a valid phone number',
    INVALID_ZIP_CODE: 'Please enter a valid zip code',
    INVALID_PAN_LOW: 'Pan Low must be 6 digits',
    INVALID_PAN_HIGH: 'Pan High must be 6 digits',
    PAN_HIGH_MUST_BE_GREATER: 'Pan High must be greater than Pan Low',
    
    INVALID_FILE_TYPE: 'Please select an image file',
    FILE_TOO_LARGE: 'Please select an image smaller than 5MB',
    FIX_ERRORS_AND_TRY_AGAIN: 'Please fix the errors and try again',
  },

  // Toast Messages
  TOAST: {
    // Success Messages
    ISO_CREATED_TITLE: 'ISO Created',
    ISO_CREATED_DESCRIPTION: 'ISO has been created successfully',
    ISO_UPDATED_TITLE: 'ISO Updated',
    ISO_UPDATED_DESCRIPTION: 'ISO has been updated successfully',
    ISO_DELETED_TITLE: 'ISO Deleted',
    ISO_DELETED_DESCRIPTION: 'ISO has been deleted successfully',
    SEARCH_COMPLETED_TITLE: 'Search Completed',
    EXPORT_SUCCESS_TITLE: 'Export Successful',
    
    // Error Messages
    VALIDATION_ERROR_TITLE: 'Validation Error',
    INVALID_FILE_TYPE_TITLE: 'Invalid File Type',
    FILE_TOO_LARGE_TITLE: 'File Too Large',
    
    // Reset Messages
    FORM_RESET_TITLE: 'Form Reset',
    FORM_RESET_DESCRIPTION: 'All fields have been cleared',
    
    // Cancel Messages
    CANCELLED_TITLE: 'Cancelled',
    ISO_CREATION_CANCELLED: 'ISO creation was cancelled',
  },

  // Table Headers
  TABLE_HEADERS: {
    ISO_NAME: 'ISO Name',
    BUSINESS_ENTITY_NAME: 'Business Entity Name',
    CONTACT_PERSON: 'Contact Person',
    EMAIL_ID: 'Email ID',
    PHONE_NUMBER: 'Phone Number',
    PROCESSOR: 'Processor',
    STATUS: 'Status',
    CREATED_DATE: 'Created Date',
    ACTIONS: 'Actions',
  },

  // Descriptions
  DESCRIPTIONS: {
    MAIN: 'Manage ISO entities with comprehensive search and creation capabilities',
    CREATE: 'Configure a new ISO with all required details and PAN ranges',
    SEARCH: 'Search and manage existing ISO entities',
    PAN_RANGE: 'Define PAN IIN ranges for card processing',
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
    EDIT_ISO: 'Edit ISO',
    DUPLICATE_ISO: 'Duplicate ISO',
    SUSPEND_ISO: 'Suspend ISO',
    DELETE_ISO: 'Delete ISO',
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
  },

  // Empty States
  EMPTY_STATES: {
    NO_RESULTS: 'No ISO records found',
    NO_RESULTS_DESCRIPTION: 'Try adjusting your search filters or create a new ISO',
    NO_PAN_RANGES: 'No PAN ranges defined',
    NO_PAN_RANGES_DESCRIPTION: 'Add at least one PAN range to continue',
  },

  // Loading States
  LOADING: {
    SEARCHING: 'Searching ISOs...',
    CREATING: 'Creating ISO...',
    UPDATING: 'Updating ISO...',
    DELETING: 'Deleting ISO...',
    LOADING: 'Loading...',
  },

  // Confirmation Messages
  CONFIRMATIONS: {
    DELETE_ISO: 'Are you sure you want to delete this ISO?',
    DELETE_ISO_DESCRIPTION: 'This action cannot be undone.',
    RESET_FORM: 'Are you sure you want to reset the form?',
    RESET_FORM_DESCRIPTION: 'All entered data will be lost.',
  },

  // Export Messages
  EXPORT: {
    PDF_SUCCESS: 'ISO data exported to PDF successfully',
    CSV_SUCCESS: 'ISO data exported to CSV successfully',
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

// ISO-specific dropdown options that extend the main dropdown options
export const ISO_DROPDOWN_OPTIONS = {
  RECORDS_PER_PAGE: [
    { value: '10', label: '10' },
    { value: '25', label: '25' },
    { value: '50', label: '50' },
    { value: '100', label: '100' },
  ],
};

// ISO Form Field Configurations
export const ISO_FIELD_CONFIG = {
  // Required fields for ISO creation
  REQUIRED_FIELDS: [
    'programManager',
    'isoName',
    'businessEntityName',
    'contactPerson',
    'currency',
    'processor',
    'address',
    'city',
    'country',
    'state',
    'zipCode',
    'phoneNumber',
    'emailId',
  ],

  // Optional fields
  OPTIONAL_FIELDS: [
    'extension',
    'bankName',
    'bankAccountNumber',
    'bankRoutingNumber',
    'isoLogo',
  ],

  // PAN range validation
  PAN_VALIDATION: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 6,
    PATTERN: /^\d{6}$/,
  },

  // Phone validation
  PHONE_VALIDATION: {
    PATTERN: /^\+?[\d\s-()]+$/,
  },

  // Email validation
  EMAIL_VALIDATION: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },

  // Zip code validation
  ZIP_CODE_VALIDATION: {
    PATTERN: /^\d{5}(-\d{4})?$/,
  },

  // File validation
  FILE_VALIDATION: {
    MAX_SIZE_MB: 5,
    MAX_SIZE_BYTES: 5 * 1024 * 1024,
    ACCEPTED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  },
};

export default ISO_STRINGS;
