import { FormField, TableConfig } from '@/components/common';
import { ModuleConfig } from '@/config/fieldConfigurations';
import { DROPDOWN_OPTIONS } from '@/constants/adminConstants';
import { MERCHANT_GROUP_STRINGS, MERCHANT_GROUP_DROPDOWN_OPTIONS } from '@/constants/merchantGroupConstants';

/**
 * Merchant Group Search Form Configuration
 * Defines all search fields for the FormGenerator component
 */
export const merchantGroupSearchFields: FormField[] = [
  {
    label: MERCHANT_GROUP_STRINGS.LABELS.MERCHANT_GROUP_NAME,
    hide: false,
    input: {
      name: 'merchantGroupName',
      type: 'text',
      placeholder: MERCHANT_GROUP_STRINGS.PLACEHOLDERS.SEARCH_MERCHANT_GROUP_NAME,
      mandatory: false,
    },
  },
  {
    label: MERCHANT_GROUP_STRINGS.LABELS.CONTACT_NAME,
    hide: false,
    input: {
      name: 'contactName',
      type: 'text',
      placeholder: MERCHANT_GROUP_STRINGS.PLACEHOLDERS.SEARCH_CONTACT_NAME,
      mandatory: false,
    },
  },
  {
    label: MERCHANT_GROUP_STRINGS.LABELS.CONTACT_PHONE,
    hide: false,
    input: {
      name: 'contactPhone',
      type: 'text',
      placeholder: MERCHANT_GROUP_STRINGS.PLACEHOLDERS.SEARCH_CONTACT_PHONE,
      mandatory: false,
    },
  },
  {
    label: MERCHANT_GROUP_STRINGS.LABELS.CONTACT_EMAIL_ID,
    hide: false,
    input: {
      name: 'contactEmail',
      type: 'email',
      placeholder: MERCHANT_GROUP_STRINGS.PLACEHOLDERS.SEARCH_CONTACT_EMAIL,
      mandatory: false,
    },
  },
  {
    label: MERCHANT_GROUP_STRINGS.LABELS.STATUS,
    hide: false,
    dropdown: {
      name: 'status',
      placeholder: MERCHANT_GROUP_STRINGS.PLACEHOLDERS.SELECT_STATUS,
      options: MERCHANT_GROUP_STRINGS.STATUS_OPTIONS,
      mandatory: false,
    },
  },
  {
    label: MERCHANT_GROUP_STRINGS.LABELS.RECORDS_PER_PAGE,
    hide: false,
    dropdown: {
      name: 'recordsPerPage',
      placeholder: MERCHANT_GROUP_STRINGS.PLACEHOLDERS.SELECT_RECORDS_PER_PAGE,
      options: MERCHANT_GROUP_DROPDOWN_OPTIONS.RECORDS_PER_PAGE,
      mandatory: false,
    },
  },
  {
    label: MERCHANT_GROUP_STRINGS.BUTTONS.SEARCH,
    hide: false,
    button: {
      name: 'search',
      label: MERCHANT_GROUP_STRINGS.BUTTONS.SEARCH,
      variant: 'default',
      size: 'default',
    },
  },
  {
    label: MERCHANT_GROUP_STRINGS.BUTTONS.RESET,
    hide: false,
    button: {
      name: 'reset',
      label: MERCHANT_GROUP_STRINGS.BUTTONS.RESET,
      variant: 'outline',
      size: 'default',
    },
  },
  {
    label: MERCHANT_GROUP_STRINGS.BUTTONS.EXPORT_PDF,
    hide: false,
    button: {
      name: 'exportPDF',
      label: MERCHANT_GROUP_STRINGS.BUTTONS.EXPORT_PDF,
      variant: 'secondary',
      size: 'default',
    },
  },
  {
    label: MERCHANT_GROUP_STRINGS.BUTTONS.EXPORT_CSV,
    hide: false,
    button: {
      name: 'exportCSV',
      label: MERCHANT_GROUP_STRINGS.BUTTONS.EXPORT_CSV,
      variant: 'secondary',
      size: 'default',
    },
  },
];

/**
 * Merchant Group Table Configuration
 * Defines table structure, columns, and mock data
 */
export const merchantGroupTableConfig: TableConfig = {
  columns: [
    {
      key: 'merchantGroupName',
      label: MERCHANT_GROUP_STRINGS.TABLE_HEADERS.MERCHANT_GROUP_NAME,
      sortable: true,
    },
    {
      key: 'contactName',
      label: MERCHANT_GROUP_STRINGS.TABLE_HEADERS.CONTACT_NAME,
      sortable: true,
    },
    {
      key: 'contactPhone',
      label: MERCHANT_GROUP_STRINGS.TABLE_HEADERS.CONTACT_PHONE,
      sortable: false,
    },
    {
      key: 'contactEmailId',
      label: MERCHANT_GROUP_STRINGS.TABLE_HEADERS.CONTACT_EMAIL,
      sortable: true,
    },
    {
      key: 'corporateLegalName',
      label: MERCHANT_GROUP_STRINGS.TABLE_HEADERS.CORPORATE_LEGAL_NAME,
      sortable: true,
    },
    {
      key: 'city',
      label: MERCHANT_GROUP_STRINGS.TABLE_HEADERS.CITY,
      sortable: true,
    },
    {
      key: 'state',
      label: MERCHANT_GROUP_STRINGS.TABLE_HEADERS.STATE,
      sortable: true,
    },
    {
      key: 'status',
      label: MERCHANT_GROUP_STRINGS.TABLE_HEADERS.STATUS,
      sortable: true,
    },
    {
      key: 'createdDate',
      label: MERCHANT_GROUP_STRINGS.TABLE_HEADERS.CREATED_DATE,
      sortable: true,
    },
    {
      key: 'actions',
      label: MERCHANT_GROUP_STRINGS.TABLE_HEADERS.ACTIONS,
      sortable: false,
    },
  ],
  rows: [], // This will be populated dynamically
};

/**
 * Mock Data for Development and Testing
 */
export const merchantGroupMockData = [
  {
    id: '1',
    merchantGroupName: 'Global Retail Solutions',
    corporateLegalName: 'GRS Holdings LLC',
    contactName: 'John Smith',
    contactPhone: '+1-555-0123',
    contactEmailId: 'john.smith@grs.com',
    address1: '123 Commerce Street',
    address2: 'Suite 400',
    address3: 'Building A',
    pinCode: '10001',
    country: 'United States',
    state: 'New York',
    city: 'New York',
    routingProfileName: 'Standard Routing',
    paymentType: 'Bank Transfer',
    bankName: 'Chase Bank',
    branchName: 'Manhattan Branch',
    nameOnAccount: 'GRS Holdings LLC',
    accountType: 'Business Checking',
    accountNumber: '****1234',
    bankCode: 'CHASUS33',
    bankState: 'NY',
    bankCity: 'New York',
    status: 'active',
    createdDate: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    merchantGroupName: 'Tech Innovation Group',
    corporateLegalName: 'TIG Corporation',
    contactName: 'Sarah Johnson',
    contactPhone: '+1-555-0456',
    contactEmailId: 'sarah.johnson@tig.com',
    address1: '456 Silicon Valley Blvd',
    address2: 'Floor 12',
    address3: '',
    pinCode: '94088',
    country: 'United States',
    state: 'California',
    city: 'Sunnyvale',
    routingProfileName: 'Express Routing',
    paymentType: 'Wire Transfer',
    bankName: 'Bank of America',
    branchName: 'Silicon Valley Branch',
    nameOnAccount: 'TIG Corporation',
    accountType: 'Business Savings',
    accountNumber: '****5678',
    bankCode: 'BOFAUS3N',
    bankState: 'CA',
    bankCity: 'Sunnyvale',
    status: 'active',
    createdDate: '2024-01-20T14:15:00Z',
  },
  {
    id: '3',
    merchantGroupName: 'Healthcare Partners',
    corporateLegalName: 'HP Medical Services Inc',
    contactName: 'Michael Brown',
    contactPhone: '+1-555-0789',
    contactEmailId: 'michael.brown@hp.com',
    address1: '789 Medical Center Drive',
    address2: 'Building C',
    address3: 'East Wing',
    pinCode: '60601',
    country: 'United States',
    state: 'Illinois',
    city: 'Chicago',
    routingProfileName: 'Standard Routing',
    paymentType: 'ACH Transfer',
    bankName: 'Wells Fargo',
    branchName: 'Downtown Chicago',
    nameOnAccount: 'HP Medical Services Inc',
    accountType: 'Business Checking',
    accountNumber: '****9012',
    bankCode: 'WFBIUS6S',
    bankState: 'IL',
    bankCity: 'Chicago',
    status: 'pending',
    createdDate: '2024-01-25T09:45:00Z',
  },
  {
    id: '4',
    merchantGroupName: 'Food & Beverage Corp',
    corporateLegalName: 'FBC Industries Ltd',
    contactName: 'Emily Davis',
    contactPhone: '+1-555-0321',
    contactEmailId: 'emily.davis@fbc.com',
    address1: '321 Food Park Lane',
    address2: 'Unit 15',
    address3: '',
    pinCode: '73301',
    country: 'United States',
    state: 'Texas',
    city: 'Austin',
    routingProfileName: 'Priority Routing',
    paymentType: 'Bank Transfer',
    bankName: 'Capital One',
    branchName: 'Austin Central',
    nameOnAccount: 'FBC Industries Ltd',
    accountType: 'Business Checking',
    accountNumber: '****3456',
    bankCode: 'COBUS33',
    bankState: 'TX',
    bankCity: 'Austin',
    status: 'inactive',
    createdDate: '2024-02-01T16:20:00Z',
  },
  {
    id: '5',
    merchantGroupName: 'International Trade Co',
    corporateLegalName: 'ITC Global Services',
    contactName: 'David Wilson',
    contactPhone: '+1-555-0654',
    contactEmailId: 'david.wilson@itc.com',
    address1: '654 International Plaza',
    address2: 'Tower B',
    address3: '35th Floor',
    pinCode: '33101',
    country: 'United States',
    state: 'Florida',
    city: 'Miami',
    routingProfileName: 'International Routing',
    paymentType: 'Wire Transfer',
    bankName: 'TD Bank',
    branchName: 'Miami International',
    nameOnAccount: 'ITC Global Services',
    accountType: 'Business Savings',
    accountNumber: '****7890',
    bankCode: 'TDOMUS33',
    bankState: 'FL',
    bankCity: 'Miami',
    status: 'suspended',
    createdDate: '2024-02-05T11:30:00Z',
  },
];

/**
 * Complete Merchant Group Module Configuration
 * Combines search fields, table config, and mock data
 */
export const merchantGroupConfig: ModuleConfig = {
  searchFields: merchantGroupSearchFields,
  tableConfig: merchantGroupTableConfig,
  mockData: merchantGroupMockData,
};

export default merchantGroupConfig;
