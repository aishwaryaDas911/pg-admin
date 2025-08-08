// Admin UI Constants
export const ADMIN_STRINGS = {
  // Common Actions
  ACTIONS: {
    CREATE: 'Create',
    CANCEL: 'Cancel',
    RESET: 'Reset',
    SEARCH: 'Search',
    CONTINUE: 'Continue',
    PREVIOUS: 'Previous',
    SUBMIT: 'Submit',
    SAVE: 'Save',
    DELETE: 'Delete',
    EDIT: 'Edit',
    VIEW: 'View',
    SUSPEND: 'Suspend',
    EXPORT: 'Export',
    SEARCHING: 'Searching...',
    CREATING: 'Creating...',
    LOADING: 'Loading...',
  },

  // Navigation & Menu
  NAVIGATION: {
    DASHBOARD: 'Dashboard',
    ADMIN_PORTAL: 'Mercedes-Benz Admin',
    PAGE_NOT_FOUND: 'Page Not Found',
    PAGE_NOT_FOUND_DESC: 'The requested page could not be found.',
  },

  // Form Labels & Placeholders
  FORM_LABELS: {
    // Common Fields
    NAME: 'Name',
    EMAIL: 'Email',
    PHONE: 'Phone',
    ADDRESS: 'Address',
    CITY: 'City',
    STATE: 'State',
    COUNTRY: 'Country',
    ZIP_CODE: 'Zip Code',
    CURRENCY: 'Currency',
    DESCRIPTION: 'Description',
    
    // Bank Form
    BANK_NAME: 'Bank Name',
    BANK_CODE: 'Bank Code',
    SETTLEMENT_ROUTING_NUMBER: 'Settlement Routing Number',
    SETTLEMENT_ACCOUNT_NUMBER: 'Settlement Account Number',
    ADDRESS_1: 'Address 1',
    ADDRESS_2: 'Address 2',
    PRIMARY_CONTACT_NAME: 'Primary Contact Name',
    CONTACT_MOBILE_NUMBER: 'Contact Mobile Number',
    CONTACT_PHONE_NUMBER: 'Contact Phone Number',
    EXTENSION: 'Extension',
    FAX: 'Fax',
    EMAIL_ADDRESS: 'Email Address',
    LOCAL_CURRENCY: 'Local Currency',

    // Merchant Form
    MERCHANT_NAME: 'Merchant Name',
    COMPANY_NAME: 'Company Name',
    FIRST_NAME: 'First Name',
    LAST_NAME: 'Last Name',
    MOBILE_PHONE: 'Mobile Phone',
    EMAIL_ID: 'E-Mail ID',
    BUSINESS_URL: 'Business URL',
    USER_NAME: 'User Name',
    BUSINESS_TYPE: 'Business Type',
    APPLICATION_MODE: 'Application Mode',
    LOOKING_FOR: 'Looking For?',

    // Sub-Merchant Form
    SUB_MERCHANT_CODE: 'Sub Merchant Code',
    MERCHANT_CODE: 'Merchant Code',

    // Bank Info
    BANK_ROUTING_NUMBER: 'Bank Routing Number',
    BANK_ACCOUNT_NUMBER: 'Bank Account Number',
    BANK_TYPE: 'Type',
    NAME_ON_ACCOUNT: 'Name on Account',

    // Configuration Fields
    CATEGORY: 'Category',
    AUTO_TRANSFER_LIMIT: 'Auto Transfer Limit',
    AUTO_PAYMENT_METHOD: 'Auto Payment Method',
    AUTO_TRANSFER_PERIOD: 'Auto Transfer Period',
    MERCHANT_TYPE: 'Merchant Type',

    // ISO Form
    ISO_NAME: 'ISO Name',
    ISO_CODE: 'ISO Code',
    CONTACT_PERSON: 'Contact Person',
    PROCESSOR: 'Processor',
    ISO_LOGO: 'ISO Logo',

    // Program Manager Form
    PROGRAM_MANAGER_NAME: 'Program Manager Name',
    PROGRAM_MANAGER_CODE: 'Program Manager Code',
    ASSOCIATED_BANK_NAMES: 'Associated Bank Name(s)',
    SCHEDULER_RUN_TIME: 'Scheduler Run Time',

    // Acquirer Protocol Parameter Form
    ACQUIRER_PROTOCOL_PARAM_NAME: 'Acquirer Protocol Param Name',
    ACQUIRER_ID: 'Acquirer Id',
    APPLICATION_ID: 'Application Id',
    FINANCIAL_AUTHORIZATION: 'Financial Authorization',
    FINANCIAL_REVERSAL_ADVICE: 'Financial Reversal Advice',
    CANCELLATION_REQUEST: 'Cancellation Request',
    CANCELLATION_ADVICE: 'Cancellation Advice',
    COMPLETION_ADVICE: 'Completion Advice',
    DIAGNOSTIC_REQUEST: 'Diagnostic Request',
    FINANCIAL_COMPLETION_ADVICE: 'Financial Completion Advice',
    REVERSAL_ADVICE: 'Reversal Advice',
    RECONCILIATION_REQUEST: 'Reconciliation Request',
    TIMEOUT_COMPLETION_ADVICE: 'Timeout Completion Advice',
    SCHEDULER_STARTUP: 'Scheduler Startup',
    KEEP_ALIVE: 'Keep Alive',
    START_TIME: 'Start Time',
    TIME_INTERVAL: 'Time Interval',
    CURRENCY_CONVERSION_REQUEST: 'Currency Conversion Request',
    FINANCIAL_CAPTURE: 'Financial Capture',
    EXCHANGE_POLICY: 'Exchange Policy',
    MAXIMUM_NUMBER: 'Maximum Number',
    MAXIMUM_AMOUNT: 'Maximum Amount',
    RETRY_DELAY: 'Retry - Delay',
    RETRY_MAXIMUM_NUMBER: 'Retry - Maximum Number',
    PERIOD: 'Period',

    // Additional Common Fields
    PIN_CODE: 'Pin Code',
    ADDRESS_3: 'Address 3',
    CONTACT_NAME: 'Contact Name',
    CONTACT_PHONE: 'Contact Phone',
    CONTACT_EMAIL_ID: 'Contact Email Id',
    ROUTING_PROFILE_NAME: 'Routing Profile Name',
    BUSINESS_ENTITY_NAME: 'Business Entity Name',
    BATCH_PREFIX: 'Batch Prefix',
    PROGRAM_MANAGER_TIME_ZONE: 'Program Manager Time Zone',
    PROGRAM_MANAGER_LOGO: 'Program Manager Logo',
    DCC_ENABLE: 'DCC Enable',
    DCC_SUPPORTED_CURRENCY: 'DCC Supported Currency',
    DEVICE_MANUFACTURER: 'Device Manufacturer',
    DEVICE_MODEL_NAME: 'Device Model Name',
    APPLICATION_TYPE: 'Application Type',
    PACKAGE_NAME: 'Package Name',
    APPLICATION_NAME: 'Application Name',
    APPLICATION_VERSION: 'Application Version',

    // Program Manager Search Labels
    BANK_NAME: 'Bank Name',
    STATUS: 'Status',
    RECORDS_PER_PAGE: 'Records Per Page',

    // Merchant Group Form
    MERCHANT_GROUP_NAME: 'Merchant Group Name',
    CORPORATE_LEGAL_NAME: 'Corporate Legal Name',
    ROUTING_PROFILE: 'Routing Profile',
    PAYMENT_TYPE: 'Payment Type',
    SWIFT_CODE: 'Swift Code',

    // Virtual Terminal Options
    VIRTUAL_TERMINAL_OPTIONS: 'Virtual Terminal Options',
    SALE: 'Sale',
    REFUND: 'Refund',
    PRE_AUTH: 'Pre Auth',
    VOID: 'Void',
    ONLINE: 'Online',

    // Fee Program Form
    FEE_PROGRAM_NAME: 'Fee Program Name',
    MCC: 'MCC',
    FEE_TYPE: 'FeeType',
    SCHEME: 'Scheme',
    TXN_TYPE: 'Txn Type',
    TXN_VOLUME: 'Txn Volume',
    PM_SHARE: 'PM Share',
    MSP_SHARE: 'MSP Share',
    SLAB_FROM: 'Slab From',
    SLAB_TO: 'Slab To',
    TOTAL_FEE: 'Total Fee',
    ADD_RANGE: 'Add Range',
    ADD_CARD_TYPE: 'Add Card Type',
  },

  // Placeholders
  PLACEHOLDERS: {
    // Common
    ENTER_NAME: 'Enter name',
    ENTER_EMAIL: 'Enter email address',
    ENTER_PHONE: 'Enter phone number',
    ENTER_ADDRESS: 'Enter address',
    ENTER_CITY: 'Enter city',
    SELECT_COUNTRY: 'Select country',
    SELECT_STATE: 'Select state',
    ENTER_ZIP_CODE: 'Enter zip code',
    SELECT_CURRENCY: 'Select currency',
    SELECT: 'Select...',

    // Bank Form
    ENTER_BANK_NAME: 'Enter bank name',
    ENTER_BANK_CODE: 'Enter bank code',
    ENTER_SETTLEMENT_ROUTING: 'Enter settlement routing number',
    ENTER_SETTLEMENT_ACCOUNT: 'Enter settlement account number',
    ENTER_ADDRESS_1: 'Enter address line 1',
    ENTER_ADDRESS_2: 'Enter address line 2',
    ENTER_PRIMARY_CONTACT: 'Enter primary contact name',
    ENTER_MOBILE_NUMBER: 'Enter contact mobile number',
    ENTER_PHONE_NUMBER: 'Enter contact phone number',
    ENTER_EXTENSION: 'Enter extension',
    ENTER_FAX: 'Enter fax number',

    // Merchant Forms
    ENTER_MERCHANT_NAME: 'Enter merchant name',
    ENTER_COMPANY_NAME: 'Enter company name',
    ENTER_FIRST_NAME: 'Enter first name',
    ENTER_LAST_NAME: 'Enter last name',
    ENTER_BUSINESS_URL: 'Enter business URL',
    ENTER_USER_NAME: 'Enter user name',
    ENTER_SUB_MERCHANT_CODE: 'Enter sub merchant code',
    WHAT_LOOKING_FOR: 'What are you looking for?',
    CHOOSE_TYPE: 'Choose a Type...',
    SELECT_MODE: 'Select mode',
    SELECT_METHOD: 'Select method',
    SELECT_PERIOD: 'Select period',
    SELECT_CATEGORY: 'Select category',
    SELECT_TYPE: 'Select type',

    // Search & Table
    ENTER_MANUFACTURER: 'Enter manufacturer',
    ENTER_MODEL_NAME: 'Enter model name',
    ENTER_APPLICATION_TYPE: 'Enter application type',
    ENTER_PACKAGE_NAME: 'Enter package name',
    ENTER_APPLICATION_NAME: 'Enter application name',
    ENTER_VERSION: 'Enter version',

    // Fee Program Placeholders
    ENTER_FEE_PROGRAM_NAME: 'Enter fee program name',
    SELECT_PROGRAM_MANAGER: 'Select program manager',
    SELECT_ISO: 'Select ISO',
    SELECT_MCC: 'Select MCC',
    SELECT_FEE_TYPE: 'Select fee type',
    SELECT_SCHEME: 'Select scheme',
    SELECT_TXN_TYPE: 'Select transaction type',
    SELECT_TXN_VOLUME: 'Select transaction volume',
    ENTER_PM_SHARE: '$ 0.0',
    ENTER_MSP_SHARE: '$ 0.0',
    ENTER_SLAB_FROM: '$',
    ENTER_SLAB_TO: '$',
    ENTER_TOTAL_FEE: '$',

    // Program Manager Search Placeholders
    ENTER_PROGRAM_MANAGER_NAME: 'Enter program manager name',
    SELECT_BANK_NAME: 'Select bank name',
    SELECT_STATUS: 'Select status',
    SELECT_RECORDS_PER_PAGE: 'Select records per page',

    // Additional Common Placeholders
    ENTER_CORPORATE_LEGAL_NAME: 'Enter corporate legal name',
    ENTER_MERCHANT_GROUP_NAME: 'Enter merchant group name',
    ENTER_ADDRESS_LINE_3: 'Enter address line 3',
    ENTER_PIN_CODE: 'Enter pin code',
    ENTER_CONTACT_NAME: 'Enter contact name',
    ENTER_CONTACT_PHONE: 'Enter contact phone',
    ENTER_CONTACT_EMAIL: 'Enter contact email',
    SELECT_ROUTING_PROFILE: 'Select routing profile',
    SELECT_PAYMENT_TYPE: 'Select payment type',
    ENTER_BRANCH_NAME: 'Enter branch name',
    ENTER_ACCOUNT_HOLDER_NAME: 'Enter account holder name',
    SELECT_ACCOUNT_TYPE: 'Select account type',
    ENTER_BATCH_PREFIX: 'Enter batch prefix',
    SELECT_TIMEZONE: 'Select timezone',
    ENTER_BANK_NAMES_COMMA_SEPARATED: 'Enter bank names (comma separated)',
    WHAT_ARE_YOU_LOOKING_FOR: 'What are you looking for?',
    CHOOSE_A_TYPE: 'Choose a Type...',
    PICK_A_DATE: 'Pick a date',
    ENTER_6_DIGIT_PAN_LOW: 'Enter 6-digit PAN low',
    ENTER_6_DIGIT_PAN_HIGH: 'Enter 6-digit PAN high',
  },

  // Validation Messages
  VALIDATION: {
    REQUIRED: 'is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PHONE: 'Please enter a valid phone number',
    INVALID_MOBILE: 'Please enter a valid mobile number',
    FILE_TOO_LARGE: 'Please select an image smaller than 5MB',
    INVALID_FILE_TYPE: 'Please select an image file',
    FIX_ERRORS: 'Please fix the errors before proceeding',
    FIX_ERRORS_AND_TRY_AGAIN: 'Please fix the errors and try again',
    CHECK_ALL_STEPS: 'Please check all steps for errors',
  },

  // Toast Messages
  TOAST: {
    // Success Messages
    CREATED_SUCCESS: 'Created Successfully',
    SEARCH_COMPLETED: 'Search Completed',
    PDF_EXPORT_SUCCESS: 'PDF Export Successful',
    CSV_EXPORT_SUCCESS: 'CSV Export Successful',
    
    // Success Descriptions
    BANK_CREATED: 'Bank has been created successfully',
    MERCHANT_CREATED: 'Merchant has been created successfully',
    SUB_MERCHANT_CREATED: 'Sub-Merchant has been created successfully',
    MERCHANT_GROUP_CREATED: 'Merchant Group has been created successfully',
    ISO_CREATED: 'ISO has been created successfully',
    PROGRAM_MANAGER_CREATED: 'Program Manager has been created successfully',
    ACQUIRER_PROTOCOL_CREATED: 'Acquirer Protocol Parameter has been created',
    FEE_PROGRAM_CREATED: 'Fee Program has been created successfully',
    NEW_RECORD_CREATED: 'New record has been created',
    
    // Cancel Messages
    CANCELLED: 'Cancelled',
    BANK_CREATION_CANCELLED: 'Bank creation was cancelled',
    MERCHANT_CREATION_CANCELLED: 'Merchant creation was cancelled',
    SUB_MERCHANT_CREATION_CANCELLED: 'Sub-Merchant creation was cancelled',
    MERCHANT_GROUP_CREATION_CANCELLED: 'Merchant Group creation was cancelled',
    ISO_CREATION_CANCELLED: 'ISO creation was cancelled',
    PROGRAM_MANAGER_CREATION_CANCELLED: 'Program Manager creation was cancelled',
    FEE_PROGRAM_CREATION_CANCELLED: 'Fee Program creation was cancelled',
    FORM_CREATION_CANCELLED: 'Form creation was cancelled',

    // Reset Messages
    FORM_RESET: 'Form Reset',
    ALL_FIELDS_CLEARED: 'All fields have been cleared',
    BANK_FIELDS_CLEARED: 'All Bank fields have been cleared',
    MERCHANT_FIELDS_CLEARED: 'All Merchant fields have been cleared',
    SUB_MERCHANT_FIELDS_CLEARED: 'All Sub-Merchant fields have been cleared',
    MERCHANT_GROUP_FIELDS_CLEARED: 'All Merchant Group fields have been cleared',
    ISO_FIELDS_CLEARED: 'All ISO fields have been cleared',
    PROGRAM_MANAGER_FIELDS_CLEARED: 'All Program Manager fields have been cleared',
    FEE_PROGRAM_FIELDS_CLEARED: 'All Fee Program fields have been cleared',

    // Error Messages
    VALIDATION_ERROR: 'Validation Error',
    INVALID_FILE_TYPE: 'Invalid File Type',
    FILE_TOO_LARGE: 'File Too Large',

    // Additional Toast Messages
    PDF_EXPORT_SUCCESSFUL: 'PDF Export Successful',
    CSV_EXPORT_SUCCESSFUL: 'CSV Export Successful',

    // Export Messages
    EXPORTED_RECORDS_PDF: 'records to PDF',
    EXPORTED_RECORDS_CSV: 'records to CSV',
    FOUND_RESULTS: 'results',
  },

  // Page Titles & Headers
  PAGES: {
    CREATE_BANK: 'Create Bank',
    CREATE_MERCHANT: 'Create Merchant',
    CREATE_SUB_MERCHANT: 'Create Sub-Merchant',
    CREATE_MERCHANT_GROUP: 'Create Merchant Group',
    CREATE_ISO: 'Create ISO',
    CREATE_PROGRAM_MANAGER: 'Create Program Manager',
    CREATE_ACQUIRER_PROTOCOL: 'Create Acquirer Protocol Parameter',
    CREATE_FEE_PROGRAM: 'Create Fee Program',
    CREATE_NEW_RECORD: 'Create New Record',
  },

  // Page Descriptions
  DESCRIPTIONS: {
    BANK_DESC: 'Configure a new bank with contact and account details',
    MERCHANT_DESC: 'Complete the multi-step process to configure a new merchant',
    SUB_MERCHANT_DESC: 'Complete the multi-step process to configure a new sub-merchant',
    MERCHANT_GROUP_DESC: 'Configure a new merchant group with contact and account details',
    ISO_DESC: 'Configure a new ISO with contact and banking details',
    PROGRAM_MANAGER_DESC: 'Configure a new program manager with associated details',
    ACQUIRER_PROTOCOL_DESC: 'Configure new acquirer protocol parameters',
    FEE_PROGRAM_DESC: 'Configure fee structure with dynamic ranges and card type configurations',
  },

  // Section Titles
  SECTIONS: {
    BASIC_INFO: 'Basic Info',
    BANK_INFO: 'Bank Info',
    CONFIGURATIONS: 'Configurations',
    CONFIRMATION: 'Confirmation',
    CONTACT_BANKING: 'Contact & Banking',
    PAYMENT_PROCESSING: 'Payment & Processing',
    ADDRESS_INFORMATION: 'Address Information',
    MERCHANT_GROUP_DETAILS: 'Merchant Group Details',
    ACCOUNT_DETAILS: 'Account Details',
    CONTACT_DETAILS: 'Contact Details',
    PAN_IIN_RANGE: 'Pan IIN Range',
    SUPPORT_TERMINALS: 'Support Terminals',
    SEARCH_FILTERS: 'Search Filters',
    SEARCH_RESULTS: 'Search Results',
    CONFIGURATION: 'Configuration',
    ACQUIRER_PROTOCOL: 'Acquirer Protocol',
    SCHEDULE_SETTINGS: 'Schedule Settings',
    ONLINE_CAPABILITIES: 'Online Capabilities',
    BATCH_TRANSFER: 'Batch Transfer',
    COMPLETION_EXCHANGE: 'Completion Exchange',
    OFFLINE_CAPABILITIES: 'Offline Capabilities',
    RECONCILIATION: 'Reconciliation',
    LOCATION_CONFIGURATION: 'Location & Configuration',
    SCHEDULER_LOGO: 'Scheduler & Logo',
    VIRTUAL_TERMINAL_OPTIONS: 'Virtual Terminal Options',
  },

  // Step Titles
  STEPS: {
    BASIC_INFO: 'Basic Info',
    BANK_INFO: 'Bank Info', 
    CONFIGURATIONS: 'Configurations',
    CONFIRMATION: 'Confirmation',
  },

  // Table Headers
  TABLE_HEADERS: {
    DEVICE_MANUFACTURER: 'Device Manufacturer',
    MODEL_NAME: 'Model Name',
    APPLICATION_TYPE: 'Application Type',
    PACKAGE_NAME: 'Package Name',
    APPLICATION_NAME: 'Application Name',
    VERSION: 'Version',
    ACTIONS: 'Actions',
  },

  // Action Tooltips
  TOOLTIPS: {
    VIEW_DETAILS: 'View Details',
    SUSPEND: 'Suspend',
    EDIT: 'Edit',
    DELETE: 'Delete',
    EXPORT_PDF: 'Export to PDF',
    EXPORT_CSV: 'Export to CSV',
  },

  // File Management
  FILES: {
    CHOOSE_FILE: 'Choose File',
    REMOVE_FILE: 'Remove',
    LOGO_PREVIEW: 'Logo preview',
    KB: 'KB',
    ADD_RANGE: 'Add Range',
    REMOVE_RANGE: 'Remove',
  },

  // Dashboard
  DASHBOARD: {
    TOTAL_USERS: 'Total Users',
    ACTIVE_DEVICES: 'Active Devices',
    APPLICATIONS: 'Applications',
    SYSTEM_STATUS: 'System Status',
    TRANSACTION_VOLUME: 'Transaction Volume',
    SUCCESS_RATE: 'Success Rate',
    RESPONSE_TIME: 'Response Time',
    ERROR_RATE: 'Error Rate',
    RECENT_ACTIVITY: 'Recent Activity',
    SYSTEM_HEALTH: 'System Health',
    DEVICE_DISTRIBUTION: 'Device Distribution',
    TRANSACTION_TRENDS: 'Transaction Trends',
  },

  // Generic Messages
  GENERIC: {
    REQUIRED_FIELD: '*',
    REQUIRED_FIELD_INDICATOR: 'Required field',
    NO_DATA: 'No data available',
    LOADING: 'Loading...',
    EXPORT_REPORT: 'Export Report',
    GENERATED_ON: 'Generated on:',
    FOUND: 'found',
    RECORDS: 'records',
    MERCEDES_BENZ: 'Mercedes-Benz',
    ADMINISTRATOR: 'Administrator',
    PROFILE: 'Profile',
    SETTINGS: 'Settings',
    LOG_OUT: 'Log out',
    BROWSE: 'Browse',
    LOGO_PREVIEW: 'Logo preview',
    ALL_SERVICES_OPERATIONAL: 'All services operational',
    PENDING_SECURITY_REVIEWS: 'Pending security reviews',
    NON_CRITICAL_WARNINGS: 'Non-critical warnings',
    WELCOME_TO_ADMIN_PORTAL: 'Welcome to Mercedes-Benz Admin Portal',
    REAL_TIME_DATA: 'Real-time Data',
    DEVICE_DISTRIBUTION: 'Device Distribution',
    WEEKLY_ACTIVITY: 'Weekly Activity',
    SERVER_STATUS: 'Server Status',
    SECURITY_ALERTS: 'Security Alerts',
    SYSTEM_WARNINGS: 'System Warnings',
    RECENT_ACTIVITY: 'Recent Activity',
    ADD_RANGE: 'Add Range',
    PAN_IIN_RANGE: 'Pan IIN Range',
    KB: 'KB',
  }
};

// Dropdown Options
export const DROPDOWN_OPTIONS = {
  COUNTRIES: [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'IN', label: 'India' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'IT', label: 'Italy' },
    { value: 'ES', label: 'Spain' },
    { value: 'AU', label: 'Australia' },
    { value: 'JP', label: 'Japan' }
  ],

  STATES: [
    { value: 'AL', label: 'Alabama' },
    { value: 'CA', label: 'California' },
    { value: 'FL', label: 'Florida' },
    { value: 'NY', label: 'New York' },
    { value: 'TX', label: 'Texas' },
    { value: 'KA', label: 'Karnataka' }
  ],

  CURRENCIES: [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'GBP', label: 'GBP' },
    { value: 'INR', label: 'INR' },
    { value: 'AUD', label: 'AUD' },
    { value: 'CAD', label: 'CAD' }
  ],

  BANK_TYPES: [
    { value: 'savings', label: 'Savings' },
    { value: 'checking', label: 'Checking' },
    { value: 'business', label: 'Business' },
    { value: 'corporate', label: 'Corporate' }
  ],

  BUSINESS_TYPES: [
    { value: 'retail', label: 'Retail' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'drugStores', label: 'Drug Stores' },
    { value: 'gasStation', label: 'Gas Station' }
  ],

  APPLICATION_MODES: [
    { value: 'demo', label: 'DEMO' },
    { value: 'live', label: 'LIVE' },
    { value: 'test', label: 'TEST' }
  ],

  MERCHANT_TYPES: [
    { value: 'individual', label: 'Individual' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'partnership', label: 'Partnership' }
  ],

  CATEGORIES: [
    { value: 'primary', label: 'Primary' },
    { value: 'secondary', label: 'Secondary' },
    { value: 'tertiary', label: 'Tertiary' }
  ],

  PAYMENT_METHODS: [
    { value: 'cheque', label: 'Cheque' },
    { value: 'eft', label: 'EFT' },
    { value: 'ach', label: 'ACH' },
    { value: 'wire', label: 'Wire Transfer' }
  ],

  TRANSFER_PERIODS: [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ],

  ROUTING_PROFILES: [
    { value: 'profile1', label: 'Routing Profile 1' },
    { value: 'profile2', label: 'Routing Profile 2' },
    { value: 'profile3', label: 'Routing Profile 3' },
    { value: 'profile4', label: 'Routing Profile 4' }
  ],

  ACCOUNT_TYPES: [
    { value: 'checking', label: 'Checking' },
    { value: 'savings', label: 'Savings' },
    { value: 'business', label: 'Business' },
    { value: 'corporate', label: 'Corporate' }
  ],

  PAYMENT_TYPES: [
    { value: 'credit', label: 'Credit' },
    { value: 'debit', label: 'Debit' },
    { value: 'ach', label: 'ACH' },
    { value: 'wire', label: 'Wire Transfer' },
    { value: 'check', label: 'Check' }
  ],

  BANKS: [
    { value: 'axis', label: 'Axis' },
    { value: 'hdfc', label: 'HDFC' },
    { value: 'icici', label: 'ICICI' },
    { value: 'sbi', label: 'SBI' }
  ],

  MCC_NAMES: [
    { value: '1604-school', label: '1604-school' },
    { value: '5411-grocery', label: '5411-grocery' },
    { value: '5812-restaurant', label: '5812-restaurant' }
  ],

  FEE_PROGRAMS: [
    { value: 'education', label: 'Education' },
    { value: 'retail', label: 'Retail' },
    { value: 'healthcare', label: 'Healthcare' }
  ],

  ISO_OPTIONS: [
    { value: 'robinson', label: 'Robinson ISO' },
    { value: 'first', label: 'First ISO' },
    { value: 'global', label: 'Global ISO' }
  ],

  PROGRAM_MANAGERS: [
    { value: 'pm1', label: 'Program Manager 1' },
    { value: 'pm2', label: 'Program Manager 2' },
    { value: 'pm3', label: 'Program Manager 3' }
  ],

  PROCESSORS: [
    { value: 'visa', label: 'Visa' },
    { value: 'mastercard', label: 'Mastercard' },
    { value: 'amex', label: 'American Express' },
    { value: 'discover', label: 'Discover' },
    { value: 'jcb', label: 'JCB' }
  ],

  TIME_ZONES: [
    { value: 'UTC-12', label: 'UTC-12:00' },
    { value: 'UTC-11', label: 'UTC-11:00' },
    { value: 'UTC-10', label: 'UTC-10:00' },
    { value: 'UTC-9', label: 'UTC-09:00' },
    { value: 'UTC-8', label: 'UTC-08:00' },
    { value: 'UTC-7', label: 'UTC-07:00' },
    { value: 'UTC-6', label: 'UTC-06:00' },
    { value: 'UTC-5', label: 'UTC-05:00' },
    { value: 'UTC-4', label: 'UTC-04:00' },
    { value: 'UTC-3', label: 'UTC-03:00' },
    { value: 'UTC-2', label: 'UTC-02:00' },
    { value: 'UTC-1', label: 'UTC-01:00' },
    { value: 'UTC+0', label: 'UTC+00:00' },
    { value: 'UTC+1', label: 'UTC+01:00' },
    { value: 'UTC+2', label: 'UTC+02:00' },
    { value: 'UTC+3', label: 'UTC+03:00' },
    { value: 'UTC+4', label: 'UTC+04:00' },
    { value: 'UTC+5', label: 'UTC+05:00' },
    { value: 'UTC+6', label: 'UTC+06:00' },
    { value: 'UTC+7', label: 'UTC+07:00' },
    { value: 'UTC+8', label: 'UTC+08:00' },
    { value: 'UTC+9', label: 'UTC+09:00' },
    { value: 'UTC+10', label: 'UTC+10:00' },
    { value: 'UTC+11', label: 'UTC+11:00' },
    { value: 'UTC+12', label: 'UTC+12:00' }
  ],

  FEE_TYPES: [
    { value: 'percentage', label: 'Percentage' },
    { value: 'fixed', label: 'Fixed' },
    { value: 'tiered', label: 'Tiered' },
    { value: 'interchange_plus', label: 'Interchange Plus' }
  ],

  SCHEMES: [
    { value: 'visa', label: 'Visa' },
    { value: 'mastercard', label: 'Mastercard' },
    { value: 'amex', label: 'American Express' },
    { value: 'discover', label: 'Discover' },
    { value: 'jcb', label: 'JCB' },
    { value: 'diners', label: 'Diners Club' }
  ],

  TXN_TYPES: [
    { value: 'sale', label: 'Sale' },
    { value: 'refund', label: 'Refund' },
    { value: 'auth', label: 'Authorization' },
    { value: 'capture', label: 'Capture' },
    { value: 'void', label: 'Void' },
    { value: 'chargeback', label: 'Chargeback' }
  ],

  TXN_VOLUMES: [
    { value: 'low', label: 'Low Volume (< $10,000)' },
    { value: 'medium', label: 'Medium Volume ($10,000 - $100,000)' },
    { value: 'high', label: 'High Volume ($100,000 - $1,000,000)' },
    { value: 'enterprise', label: 'Enterprise Volume (> $1,000,000)' }
  ],

  GENERIC_OPTIONS: [
    { value: 'select', label: 'Select...' },
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ],

  TIME_INTERVALS: [
    { value: '15min', label: '15 minutes' },
    { value: '30min', label: '30 minutes' },
    { value: '1hour', label: '1 hour' },
    { value: '2hours', label: '2 hours' },
    { value: '4hours', label: '4 hours' },
    { value: '6hours', label: '6 hours' },
    { value: '12hours', label: '12 hours' },
    { value: '24hours', label: '24 hours' }
  ]
};

// File size and type constraints
export const FILE_CONSTRAINTS = {
  MAX_SIZE_MB: 5,
  MAX_SIZE_BYTES: 5 * 1024 * 1024,
  ACCEPTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
};

// Export file naming
export const EXPORT_CONFIG = {
  PDF_FILENAME_SUFFIX: '_export_',
  CSV_FILENAME_SUFFIX: '_export_',
  DATE_FORMAT: 'YYYY-MM-DD'
};
