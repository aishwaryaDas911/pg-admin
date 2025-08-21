/**
 * Merchant Group Management Constants
 * All static strings, labels, placeholders, and error messages for Merchant Group components
 */

export const MERCHANT_GROUP_STRINGS = {
  // Page Titles
  TITLES: {
    MAIN: 'Merchant Group Management',
    CREATE: 'Create Merchant Group',
    SEARCH: 'Search Merchant Group',
    EDIT: 'Edit Merchant Group',
    VIEW: 'View Merchant Group Details',
  },

  // Tab Labels
  TABS: {
    SEARCH: 'Search',
    CREATE: 'Create',
  },

  // Form Field Labels
  LABELS: {
    MERCHANT_GROUP_NAME: 'Merchant Group Name',
    CORPORATE_LEGAL_NAME: 'Corporate Legal Name',
    ADDRESS_1: 'Address 1',
    ADDRESS_2: 'Address 2',
    ADDRESS_3: 'Address 3',
    PIN_CODE: 'Pin Code',
    COUNTRY: 'Country',
    STATE: 'State',
    CITY: 'City',
    CONTACT_NAME: 'Contact Name',
    CONTACT_PHONE: 'Contact Phone',
    CONTACT_EMAIL_ID: 'Contact Email Id',
    ROUTING_PROFILE_NAME: 'Routing Profile Name',
    PAYMENT_TYPE: 'Payment Type',
    BANK_NAME: 'Bank Name',
    BRANCH_NAME: 'Branch Name',
    NAME_ON_ACCOUNT: 'Name on the Account',
    ACCOUNT_TYPE: 'Account Type',
    ACCOUNT_NUMBER: 'Account Number',
    BANK_CODE: 'Bank Code',
    BANK_STATE: 'Bank State',
    BANK_CITY: 'Bank City',
    STATUS: 'Status',
    RECORDS_PER_PAGE: 'Records Per Page',
  },

  // Placeholders
  PLACEHOLDERS: {
    ENTER_MERCHANT_GROUP_NAME: 'Enter merchant group name',
    ENTER_CORPORATE_LEGAL_NAME: 'Enter corporate legal name',
    ENTER_ADDRESS_LINE_1: 'Enter address line 1',
    ENTER_ADDRESS_LINE_2: 'Enter address line 2',
    ENTER_ADDRESS_LINE_3: 'Enter address line 3',
    ENTER_PIN_CODE: 'Enter pin code',
    SELECT_COUNTRY: 'Select country',
    SELECT_STATE: 'Select state',
    ENTER_CITY: 'Enter city',
    ENTER_CONTACT_NAME: 'Enter contact name',
    ENTER_CONTACT_PHONE: 'Enter contact phone',
    ENTER_CONTACT_EMAIL: 'Enter contact email',
    SELECT_ROUTING_PROFILE: 'Select routing profile',
    SELECT_PAYMENT_TYPE: 'Select payment type',
    ENTER_BANK_NAME: 'Enter bank name',
    ENTER_BRANCH_NAME: 'Enter branch name',
    ENTER_ACCOUNT_HOLDER_NAME: 'Enter account holder name',
    SELECT_ACCOUNT_TYPE: 'Select account type',
    ENTER_ACCOUNT_NUMBER: 'Enter account number',
    ENTER_BANK_CODE: 'Enter bank code',
    ENTER_BANK_CITY: 'Enter bank city',
    SELECT_STATUS: 'Select status',
    SELECT_RECORDS_PER_PAGE: 'Select records per page',
    SEARCH_MERCHANT_GROUP_NAME: 'Search by merchant group name...',
    SEARCH_CONTACT_NAME: 'Search by contact name...',
    SEARCH_CONTACT_PHONE: 'Search by contact phone...',
    SEARCH_CONTACT_EMAIL: 'Search by contact email...',
  },

  // Section Titles
  SECTIONS: {
    MERCHANT_GROUP_DETAILS: 'Merchant Group Details',
    ACCOUNT_DETAILS: 'Account Details',
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
    MERCHANT_GROUP_NAME_REQUIRED: 'Merchant Group Name is required',
    CORPORATE_LEGAL_NAME_REQUIRED: 'Corporate Legal Name is required',
    ADDRESS_1_REQUIRED: 'Address 1 is required',
    ADDRESS_2_REQUIRED: 'Address 2 is required',
    PIN_CODE_REQUIRED: 'Pin Code is required',
    COUNTRY_REQUIRED: 'Country is required',
    STATE_REQUIRED: 'State is required',
    CITY_REQUIRED: 'City is required',
    CONTACT_NAME_REQUIRED: 'Contact Name is required',
    CONTACT_PHONE_REQUIRED: 'Contact Phone is required',
    CONTACT_EMAIL_ID_REQUIRED: 'Contact Email Id is required',
    ROUTING_PROFILE_NAME_REQUIRED: 'Routing Profile Name is required',
    PAYMENT_TYPE_REQUIRED: 'Payment Type is required',
    BANK_NAME_REQUIRED: 'Bank Name is required',
    BRANCH_NAME_REQUIRED: 'Branch Name is required',
    NAME_ON_ACCOUNT_REQUIRED: 'Name on the Account is required',
    ACCOUNT_TYPE_REQUIRED: 'Account Type is required',
    ACCOUNT_NUMBER_REQUIRED: 'Account Number is required',
    BANK_CODE_REQUIRED: 'Bank Code is required',
    BANK_STATE_REQUIRED: 'Bank State is required',
    BANK_CITY_REQUIRED: 'Bank City is required',
    
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PHONE: 'Please enter a valid phone number',
    INVALID_PIN_CODE: 'Please enter a valid pin code (5-6 digits)',
    INVALID_ACCOUNT_NUMBER: 'Account number must be at least 8 characters',
    
    FIX_ERRORS_AND_TRY_AGAIN: 'Please fix the errors and try again',
  },

  // Toast Messages
  TOAST: {
    // Success Messages
    MERCHANT_GROUP_CREATED_TITLE: 'Merchant Group Created',
    MERCHANT_GROUP_CREATED_DESCRIPTION: 'Merchant Group has been created successfully',
    MERCHANT_GROUP_UPDATED_TITLE: 'Merchant Group Updated',
    MERCHANT_GROUP_UPDATED_DESCRIPTION: 'Merchant Group has been updated successfully',
    MERCHANT_GROUP_DELETED_TITLE: 'Merchant Group Deleted',
    MERCHANT_GROUP_DELETED_DESCRIPTION: 'Merchant Group has been deleted successfully',
    SEARCH_COMPLETED_TITLE: 'Search Completed',
    EXPORT_SUCCESS_TITLE: 'Export Successful',
    
    // Error Messages
    VALIDATION_ERROR_TITLE: 'Validation Error',
    
    // Reset Messages
    FORM_RESET_TITLE: 'Form Reset',
    FORM_RESET_DESCRIPTION: 'All fields have been cleared',
    
    // Cancel Messages
    CANCELLED_TITLE: 'Cancelled',
    MERCHANT_GROUP_CREATION_CANCELLED: 'Merchant Group creation was cancelled',
  },

  // Table Headers
  TABLE_HEADERS: {
    MERCHANT_GROUP_NAME: 'Merchant Group Name',
    CONTACT_NAME: 'Contact Name',
    CONTACT_PHONE: 'Contact Phone',
    CONTACT_EMAIL: 'Contact Email',
    CORPORATE_LEGAL_NAME: 'Corporate Legal Name',
    CITY: 'City',
    STATE: 'State',
    COUNTRY: 'Country',
    STATUS: 'Status',
    CREATED_DATE: 'Created Date',
    ACTIONS: 'Actions',
  },

  // Descriptions
  DESCRIPTIONS: {
    MAIN: 'Manage Merchant Groups with comprehensive search and creation capabilities',
    CREATE: 'Configure a new merchant group with contact and account details',
    SEARCH: 'Search and manage existing merchant groups',
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
    EDIT_MERCHANT_GROUP: 'Edit Merchant Group',
    DUPLICATE_MERCHANT_GROUP: 'Duplicate Merchant Group',
    SUSPEND_MERCHANT_GROUP: 'Suspend Merchant Group',
    DELETE_MERCHANT_GROUP: 'Delete Merchant Group',
    EXPORT_TO_PDF: 'Export to PDF',
    EXPORT_TO_CSV: 'Export to CSV',
  },

  // Empty States
  EMPTY_STATES: {
    NO_RESULTS: 'No Merchant Group records found',
    NO_RESULTS_DESCRIPTION: 'Try adjusting your search filters or create a new Merchant Group',
  },

  // Loading States
  LOADING: {
    SEARCHING: 'Searching Merchant Groups...',
    CREATING: 'Creating Merchant Group...',
    UPDATING: 'Updating Merchant Group...',
    DELETING: 'Deleting Merchant Group...',
    LOADING: 'Loading...',
  },

  // Confirmation Messages
  CONFIRMATIONS: {
    DELETE_MERCHANT_GROUP: 'Are you sure you want to delete this Merchant Group?',
    DELETE_MERCHANT_GROUP_DESCRIPTION: 'This action cannot be undone.',
    RESET_FORM: 'Are you sure you want to reset the form?',
    RESET_FORM_DESCRIPTION: 'All entered data will be lost.',
  },

  // Export Messages
  EXPORT: {
    PDF_SUCCESS: 'Merchant Group data exported to PDF successfully',
    CSV_SUCCESS: 'Merchant Group data exported to CSV successfully',
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

// Merchant Group-specific dropdown options
export const MERCHANT_GROUP_DROPDOWN_OPTIONS = {
  RECORDS_PER_PAGE: [
    { value: '10', label: '10' },
    { value: '25', label: '25' },
    { value: '50', label: '50' },
    { value: '100', label: '100' },
  ],
};

// Merchant Group Form Field Configurations
export const MERCHANT_GROUP_FIELD_CONFIG = {
  // Required fields for Merchant Group creation
  REQUIRED_FIELDS: [
    'merchantGroupName',
    'corporateLegalName',
    'address1',
    'address2',
    'pinCode',
    'country',
    'state',
    'city',
    'contactName',
    'contactPhone',
    'contactEmailId',
    'routingProfileName',
    'paymentType',
    'bankName',
    'branchName',
    'nameOnAccount',
    'accountType',
    'accountNumber',
    'bankCode',
    'bankState',
    'bankCity',
  ],

  // Optional fields
  OPTIONAL_FIELDS: [
    'address3',
  ],

  // Phone validation
  PHONE_VALIDATION: {
    PATTERN: /^\+?[\d\s-()]+$/,
  },

  // Email validation
  EMAIL_VALIDATION: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },

  // Pin code validation
  PIN_CODE_VALIDATION: {
    PATTERN: /^\d{5,6}$/,
  },

  // Account number validation
  ACCOUNT_NUMBER_VALIDATION: {
    MIN_LENGTH: 8,
  },
};

export default MERCHANT_GROUP_STRINGS;
