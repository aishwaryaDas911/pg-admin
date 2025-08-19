import { FormField, TableConfig, ModuleConfig } from '@/config/fieldConfigurations';
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
      header: ISO_STRINGS.TABLE_HEADERS.ISO_NAME,
      sortable: true,
      searchable: true,
    },
    {
      key: 'businessEntityName',
      header: ISO_STRINGS.TABLE_HEADERS.BUSINESS_ENTITY_NAME,
      sortable: true,
      searchable: true,
    },
    {
      key: 'contactPerson',
      header: ISO_STRINGS.TABLE_HEADERS.CONTACT_PERSON,
      sortable: true,
      searchable: true,
    },
    {
      key: 'emailId',
      header: ISO_STRINGS.TABLE_HEADERS.EMAIL_ID,
      sortable: true,
      searchable: true,
    },
    {
      key: 'phoneNumber',
      header: ISO_STRINGS.TABLE_HEADERS.PHONE_NUMBER,
      sortable: false,
      searchable: false,
    },
    {
      key: 'processor',
      header: ISO_STRINGS.TABLE_HEADERS.PROCESSOR,
      sortable: true,
      searchable: true,
    },
    {
      key: 'status',
      header: ISO_STRINGS.TABLE_HEADERS.STATUS,
      sortable: true,
      searchable: false,
      render: (value: string) => {
        const statusColors = {
          active: 'bg-green-100 text-green-800',
          inactive: 'bg-gray-100 text-gray-800',
          pending: 'bg-yellow-100 text-yellow-800',
          suspended: 'bg-red-100 text-red-800',
        };
        return `<span class="px-2 py-1 rounded-full text-xs font-medium ${statusColors[value as keyof typeof statusColors] || statusColors.inactive}">${value}</span>`;
      },
    },
    {
      key: 'createdDate',
      header: ISO_STRINGS.TABLE_HEADERS.CREATED_DATE,
      sortable: true,
      searchable: false,
      render: (value: string) => {
        return new Date(value).toLocaleDateString();
      },
    },
    {
      key: 'actions',
      header: ISO_STRINGS.TABLE_HEADERS.ACTIONS,
      sortable: false,
      searchable: false,
      render: (value: any, row: any) => 'actions', // This will be handled by the component
    },
  ],
  pagination: {
    enabled: true,
    pageSize: 10,
    pageSizeOptions: [10, 25, 50, 100],
  },
  selection: {
    enabled: true,
    multiple: true,
  },
  sorting: {
    enabled: true,
    defaultSort: { key: 'createdDate', direction: 'desc' },
  },
  filtering: {
    enabled: true,
    globalSearch: true,
  },
  actions: [
    {
      name: 'view',
      label: ISO_STRINGS.ACTIONS.VIEW_DETAILS,
      icon: 'Eye',
      variant: 'ghost',
      onClick: (row: any) => console.log('View:', row),
    },
    {
      name: 'edit',
      label: ISO_STRINGS.ACTIONS.EDIT_ISO,
      icon: 'Edit',
      variant: 'ghost',
      onClick: (row: any) => console.log('Edit:', row),
    },
    {
      name: 'duplicate',
      label: ISO_STRINGS.ACTIONS.DUPLICATE_ISO,
      icon: 'Copy',
      variant: 'ghost',
      onClick: (row: any) => console.log('Duplicate:', row),
    },
    {
      name: 'suspend',
      label: ISO_STRINGS.ACTIONS.SUSPEND_ISO,
      icon: 'Ban',
      variant: 'ghost',
      condition: (row: any) => row.status === 'active',
      onClick: (row: any) => console.log('Suspend:', row),
    },
    {
      name: 'delete',
      label: ISO_STRINGS.ACTIONS.DELETE_ISO,
      icon: 'Trash2',
      variant: 'ghost',
      destructive: true,
      onClick: (row: any) => console.log('Delete:', row),
    },
  ],
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
