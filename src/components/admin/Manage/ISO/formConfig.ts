import { FormField, TableConfig } from '@/components/common';
import { ModuleConfig } from '@/config/fieldConfigurations';
import { DROPDOWN_OPTIONS } from '@/constants/adminConstants';
import { ISO_STRINGS, ISO_DROPDOWN_OPTIONS } from '@/constants/isoConstants';

/**
 * ISO Search Form Configuration
 * Defines all search fields for the FormGenerator component
 */
export const isoSearchFields: FormField[] = [
  {
    label: ISO_STRINGS.LABELS.ISO_NAME,
    hide: false,
    input: {
      name: 'isoName',
      type: 'text',
      placeholder: ISO_STRINGS.PLACEHOLDERS.SEARCH_ISO_NAME,
      mandatory: false,
    },
  },
  {
    label: ISO_STRINGS.LABELS.BUSINESS_ENTITY_NAME,
    hide: false,
    input: {
      name: 'businessEntityName',
      type: 'text',
      placeholder: ISO_STRINGS.PLACEHOLDERS.SEARCH_BUSINESS_ENTITY,
      mandatory: false,
    },
  },
  {
    label: ISO_STRINGS.LABELS.PHONE_NUMBER,
    hide: false,
    input: {
      name: 'phoneNumber',
      type: 'text',
      placeholder: ISO_STRINGS.PLACEHOLDERS.ENTER_PHONE_NUMBER,
      mandatory: false,
    },
  },
  {
    label: ISO_STRINGS.LABELS.EMAIL_ID,
    hide: false,
    input: {
      name: 'emailId',
      type: 'email',
      placeholder: ISO_STRINGS.PLACEHOLDERS.ENTER_EMAIL_ADDRESS,
      mandatory: false,
    },
  },
  {
    label: ISO_STRINGS.LABELS.STATUS,
    hide: false,
    dropdown: {
      name: 'status',
      placeholder: ISO_STRINGS.PLACEHOLDERS.SELECT_STATUS,
      options: ISO_STRINGS.STATUS_OPTIONS,
      mandatory: false,
    },
  },
  {
    label: ISO_STRINGS.LABELS.RECORDS_PER_PAGE,
    hide: false,
    dropdown: {
      name: 'recordsPerPage',
      placeholder: ISO_STRINGS.PLACEHOLDERS.SELECT_RECORDS_PER_PAGE,
      options: ISO_DROPDOWN_OPTIONS.RECORDS_PER_PAGE,
      mandatory: false,
    },
  },
  {
    label: ISO_STRINGS.BUTTONS.SEARCH,
    hide: false,
    button: {
      name: 'search',
      label: ISO_STRINGS.BUTTONS.SEARCH,
      variant: 'default',
      size: 'default',
    },
  },
  {
    label: ISO_STRINGS.BUTTONS.RESET,
    hide: false,
    button: {
      name: 'reset',
      label: ISO_STRINGS.BUTTONS.RESET,
      variant: 'outline',
      size: 'default',
    },
  },
  {
    label: ISO_STRINGS.BUTTONS.EXPORT_PDF,
    hide: false,
    button: {
      name: 'exportPDF',
      label: ISO_STRINGS.BUTTONS.EXPORT_PDF,
      variant: 'secondary',
      size: 'default',
    },
  },
  {
    label: ISO_STRINGS.BUTTONS.EXPORT_CSV,
    hide: false,
    button: {
      name: 'exportCSV',
      label: ISO_STRINGS.BUTTONS.EXPORT_CSV,
      variant: 'secondary',
      size: 'default',
    },
  },
];

/**
 * ISO Table Configuration
 * Defines table structure, columns, and mock data
 */
export const isoTableConfig: TableConfig = {
  columns: [
    {
      key: 'isoName',
      label: ISO_STRINGS.TABLE_HEADERS.ISO_NAME,
      sortable: true,
    },
    {
      key: 'businessEntityName',
      label: ISO_STRINGS.TABLE_HEADERS.BUSINESS_ENTITY_NAME,
      sortable: true,
    },
    {
      key: 'contactPerson',
      label: ISO_STRINGS.TABLE_HEADERS.CONTACT_PERSON,
      sortable: true,
    },
    {
      key: 'emailId',
      label: ISO_STRINGS.TABLE_HEADERS.EMAIL_ID,
      sortable: true,
    },
    {
      key: 'phoneNumber',
      label: ISO_STRINGS.TABLE_HEADERS.PHONE_NUMBER,
      sortable: false,
    },
    {
      key: 'processor',
      label: ISO_STRINGS.TABLE_HEADERS.PROCESSOR,
      sortable: true,
    },
    {
      key: 'status',
      label: ISO_STRINGS.TABLE_HEADERS.STATUS,
      sortable: true,
    },
    {
      key: 'createdDate',
      label: ISO_STRINGS.TABLE_HEADERS.CREATED_DATE,
      sortable: true,
    },
    {
      key: 'actions',
      label: ISO_STRINGS.TABLE_HEADERS.ACTIONS,
      sortable: false,
    },
  ],
  rows: [], // This will be populated dynamically
};

/**
 * Mock Data for Development and Testing
 */
export const isoMockData = [
  {
    id: '1',
    isoName: 'Global Payment Solutions',
    businessEntityName: 'GPS Financial Services LLC',
    contactPerson: 'John Smith',
    emailId: 'john.smith@gps.com',
    phoneNumber: '+1-555-0123',
    processor: 'Visa',
    status: 'active',
    programManager: 'Program Manager 1',
    currency: 'USD',
    address: '123 Financial District',
    city: 'New York',
    state: 'NY',
    country: 'US',
    zipCode: '10001',
    extension: '123',
    bankName: 'Chase Bank',
    bankAccountNumber: '****1234',
    bankRoutingNumber: '021000021',
    createdDate: '2024-01-15T10:30:00Z',
    panRanges: [
      { id: '1', panLow: '400000', panHigh: '400999' },
      { id: '2', panLow: '401000', panHigh: '401999' },
    ],
  },
  {
    id: '2',
    isoName: 'Merchant Services Pro',
    businessEntityName: 'MSP Corporation',
    contactPerson: 'Sarah Johnson',
    emailId: 'sarah.johnson@msp.com',
    phoneNumber: '+1-555-0456',
    processor: 'Mastercard',
    status: 'active',
    programManager: 'Program Manager 2',
    currency: 'USD',
    address: '456 Commerce Street',
    city: 'Los Angeles',
    state: 'CA',
    country: 'US',
    zipCode: '90001',
    extension: '456',
    bankName: 'Bank of America',
    bankAccountNumber: '****5678',
    bankRoutingNumber: '121000358',
    createdDate: '2024-01-20T14:15:00Z',
    panRanges: [
      { id: '3', panLow: '510000', panHigh: '510999' },
    ],
  },
  {
    id: '3',
    isoName: 'Regional Payment Network',
    businessEntityName: 'RPN Holdings Inc',
    contactPerson: 'Michael Brown',
    emailId: 'michael.brown@rpn.com',
    phoneNumber: '+1-555-0789',
    processor: 'American Express',
    status: 'pending',
    programManager: 'Program Manager 1',
    currency: 'USD',
    address: '789 Business Park Drive',
    city: 'Chicago',
    state: 'IL',
    country: 'US',
    zipCode: '60601',
    extension: '789',
    bankName: 'Wells Fargo',
    bankAccountNumber: '****9012',
    bankRoutingNumber: '121042882',
    createdDate: '2024-01-25T09:45:00Z',
    panRanges: [
      { id: '4', panLow: '340000', panHigh: '340999' },
      { id: '5', panLow: '341000', panHigh: '341999' },
    ],
  },
  {
    id: '4',
    isoName: 'Express Card Solutions',
    businessEntityName: 'ECS Limited',
    contactPerson: 'Emily Davis',
    emailId: 'emily.davis@ecs.com',
    phoneNumber: '+1-555-0321',
    processor: 'Discover',
    status: 'inactive',
    programManager: 'Program Manager 3',
    currency: 'USD',
    address: '321 Innovation Boulevard',
    city: 'Austin',
    state: 'TX',
    country: 'US',
    zipCode: '73301',
    extension: '321',
    bankName: 'Capital One',
    bankAccountNumber: '****3456',
    bankRoutingNumber: '051405515',
    createdDate: '2024-02-01T16:20:00Z',
    panRanges: [
      { id: '6', panLow: '601100', panHigh: '601199' },
    ],
  },
  {
    id: '5',
    isoName: 'International Processing Hub',
    businessEntityName: 'IPH Global Services',
    contactPerson: 'David Wilson',
    emailId: 'david.wilson@iph.com',
    phoneNumber: '+1-555-0654',
    processor: 'JCB',
    status: 'suspended',
    programManager: 'Program Manager 2',
    currency: 'USD',
    address: '654 Global Plaza',
    city: 'Miami',
    state: 'FL',
    country: 'US',
    zipCode: '33101',
    extension: '654',
    bankName: 'TD Bank',
    bankAccountNumber: '****7890',
    bankRoutingNumber: '031101279',
    createdDate: '2024-02-05T11:30:00Z',
    panRanges: [
      { id: '7', panLow: '352800', panHigh: '352899' },
      { id: '8', panLow: '352900', panHigh: '352999' },
    ],
  },
];

/**
 * Complete ISO Module Configuration
 * Combines search fields, table config, and mock data
 */
export const isoConfig: ModuleConfig = {
  searchFields: isoSearchFields,
  tableConfig: isoTableConfig,
  mockData: isoMockData,
};

export default isoConfig;
