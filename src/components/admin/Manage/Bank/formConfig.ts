import { FormField, TableConfig } from '@/components/common';
import { ModuleConfig } from '@/config/fieldConfigurations';
import {
  BANK_STRINGS,
  BANK_DROPDOWN_OPTIONS,
  BANK_FIELD_CONFIG
} from '@/constants/bankConstants';
import { z } from 'zod';

/**
 * Bank Search Form Configuration
 * Defines all search fields for the FormGenerator component
 */
export const bankSearchFields: FormField[] = [
  {
    label: BANK_STRINGS.LABELS.BANK_NAME,
    hide: false,
    input: {
      name: 'bankName',
      type: 'text',
      placeholder: BANK_STRINGS.PLACEHOLDERS.SEARCH_BANK_NAME,
      mandatory: false,
    },
  },
  {
    label: BANK_STRINGS.LABELS.BANK_CODE,
    hide: false,
    input: {
      name: 'bankCode',
      type: 'text',
      placeholder: BANK_STRINGS.PLACEHOLDERS.SEARCH_BANK_CODE,
      mandatory: false,
    },
  },
  {
    label: BANK_STRINGS.LABELS.EMAIL_ADDRESS,
    hide: false,
    input: {
      name: 'emailAddress',
      type: 'email',
      placeholder: BANK_STRINGS.PLACEHOLDERS.SEARCH_EMAIL,
      mandatory: false,
    },
  },
  {
    label: BANK_STRINGS.LABELS.STATUS,
    hide: false,
    dropdown: {
      name: 'status',
      placeholder: BANK_STRINGS.PLACEHOLDERS.SELECT_STATUS,
      options: BANK_STRINGS.STATUS_OPTIONS,
      mandatory: false,
    },
  },
  {
    label: BANK_STRINGS.LABELS.RECORDS_PER_PAGE,
    hide: false,
    dropdown: {
      name: 'recordsPerPage',
      placeholder: BANK_STRINGS.PLACEHOLDERS.SELECT_RECORDS_PER_PAGE,
      options: BANK_DROPDOWN_OPTIONS.RECORDS_PER_PAGE,
      mandatory: false,
    },
  },
  {
    label: BANK_STRINGS.BUTTONS.SEARCH,
    hide: false,
    button: {
      name: 'search',
      label: BANK_STRINGS.BUTTONS.SEARCH,
      variant: 'default',
      size: 'default',
    },
  },
  {
    label: BANK_STRINGS.BUTTONS.RESET,
    hide: false,
    button: {
      name: 'reset',
      label: BANK_STRINGS.BUTTONS.RESET,
      variant: 'outline',
      size: 'default',
    },
  },
  {
    label: BANK_STRINGS.BUTTONS.EXPORT_PDF,
    hide: false,
    button: {
      name: 'exportPDF',
      label: BANK_STRINGS.BUTTONS.EXPORT_PDF,
      variant: 'secondary',
      size: 'default',
    },
  },
  {
    label: BANK_STRINGS.BUTTONS.EXPORT_CSV,
    hide: false,
    button: {
      name: 'exportCSV',
      label: BANK_STRINGS.BUTTONS.EXPORT_CSV,
      variant: 'secondary',
      size: 'default',
    },
  },
];

/**
 * Bank Create/Edit Form Configuration
 */
export const bankCreateFields: FormField[] = [
  {
    label: BANK_STRINGS.LABELS.BANK_NAME,
    hide: false,
    input: {
      name: 'bankName',
      type: 'text',
      placeholder: BANK_STRINGS.PLACEHOLDERS.ENTER_BANK_NAME,
      mandatory: true,
    },
  },
  {
    label: BANK_STRINGS.LABELS.BANK_CODE,
    hide: false,
    input: {
      name: 'bankCode',
      type: 'text',
      placeholder: BANK_STRINGS.PLACEHOLDERS.ENTER_BANK_CODE,
      mandatory: true,
    },
  },
  {
    label: BANK_STRINGS.LABELS.SETTLEMENT_ROUTING_NUMBER,
    hide: false,
    input: {
      name: 'settlementRoutingNumber',
      type: 'text',
      placeholder: BANK_STRINGS.PLACEHOLDERS.ENTER_SETTLEMENT_ROUTING_NUMBER,
      mandatory: true,
    },
  },
  {
    label: BANK_STRINGS.LABELS.SETTLEMENT_ACCOUNT_NUMBER,
    hide: false,
    input: {
      name: 'settlementAccountNumber',
      type: 'text',
      placeholder: BANK_STRINGS.PLACEHOLDERS.ENTER_SETTLEMENT_ACCOUNT_NUMBER,
      mandatory: true,
    },
  },
  {
    label: BANK_STRINGS.LABELS.ADDRESS_1,
    hide: false,
    input: {
      name: 'address1',
      type: 'text',
      placeholder: BANK_STRINGS.PLACEHOLDERS.ENTER_ADDRESS_1,
      mandatory: true,
    },
  },
  {
    label: BANK_STRINGS.LABELS.ADDRESS_2,
    hide: false,
    input: {
      name: 'address2',
      type: 'text',
      placeholder: BANK_STRINGS.PLACEHOLDERS.ENTER_ADDRESS_2,
      mandatory: false,
    },
  },
  {
    label: BANK_STRINGS.LABELS.CITY,
    hide: false,
    input: {
      name: 'city',
      type: 'text',
      placeholder: BANK_STRINGS.PLACEHOLDERS.ENTER_CITY,
      mandatory: true,
    },
  },
  {
    label: BANK_STRINGS.LABELS.COUNTRY,
    hide: false,
    dropdown: {
      name: 'country',
      placeholder: BANK_STRINGS.PLACEHOLDERS.SELECT_COUNTRY,
      options: BANK_DROPDOWN_OPTIONS.COUNTRIES,
      mandatory: true,
    },
  },
  {
    label: BANK_STRINGS.LABELS.STATE,
    hide: false,
    dropdown: {
      name: 'state',
      placeholder: BANK_STRINGS.PLACEHOLDERS.SELECT_STATE,
      options: BANK_DROPDOWN_OPTIONS.STATES,
      mandatory: true,
    },
  },
  {
    label: BANK_STRINGS.LABELS.ZIP_CODE,
    hide: false,
    input: {
      name: 'zipCode',
      type: 'text',
      placeholder: BANK_STRINGS.PLACEHOLDERS.ENTER_ZIP_CODE,
      mandatory: true,
    },
  },
  {
    label: BANK_STRINGS.LABELS.PRIMARY_CONTACT_NAME,
    hide: false,
    input: {
      name: 'primaryContactName',
      type: 'text',
      placeholder: BANK_STRINGS.PLACEHOLDERS.ENTER_PRIMARY_CONTACT_NAME,
      mandatory: true,
    },
  },
  {
    label: BANK_STRINGS.LABELS.CONTACT_MOBILE_NUMBER,
    hide: false,
    input: {
      name: 'contactMobileNumber',
      type: 'tel',
      placeholder: BANK_STRINGS.PLACEHOLDERS.ENTER_CONTACT_MOBILE_NUMBER,
      mandatory: false,
    },
  },
  {
    label: BANK_STRINGS.LABELS.CONTACT_PHONE_NUMBER,
    hide: false,
    input: {
      name: 'contactPhoneNumber',
      type: 'tel',
      placeholder: BANK_STRINGS.PLACEHOLDERS.ENTER_CONTACT_PHONE_NUMBER,
      mandatory: true,
    },
  },
  {
    label: BANK_STRINGS.LABELS.EXTENSION,
    hide: false,
    input: {
      name: 'extension',
      type: 'text',
      placeholder: BANK_STRINGS.PLACEHOLDERS.ENTER_EXTENSION,
      mandatory: false,
    },
  },
  {
    label: BANK_STRINGS.LABELS.FAX,
    hide: false,
    input: {
      name: 'fax',
      type: 'text',
      placeholder: BANK_STRINGS.PLACEHOLDERS.ENTER_FAX,
      mandatory: false,
    },
  },
  {
    label: BANK_STRINGS.LABELS.EMAIL_ADDRESS,
    hide: false,
    input: {
      name: 'emailAddress',
      type: 'email',
      placeholder: BANK_STRINGS.PLACEHOLDERS.ENTER_EMAIL_ADDRESS,
      mandatory: true,
    },
  },
  {
    label: BANK_STRINGS.LABELS.LOCAL_CURRENCY,
    hide: false,
    dropdown: {
      name: 'localCurrency',
      placeholder: BANK_STRINGS.PLACEHOLDERS.SELECT_LOCAL_CURRENCY,
      options: BANK_DROPDOWN_OPTIONS.CURRENCIES,
      mandatory: true,
    },
  },
];

/**
 * Bank Table Configuration
 * Defines table structure, columns, and mock data
 */
export const bankTableConfig: TableConfig = {
  columns: [
    {
      key: 'bankName',
      label: BANK_STRINGS.TABLE_HEADERS.BANK_NAME,
      sortable: true,
    },
    {
      key: 'bankCode',
      label: BANK_STRINGS.TABLE_HEADERS.BANK_CODE,
      sortable: true,
    },
    {
      key: 'settlementRoutingNumber',
      label: BANK_STRINGS.TABLE_HEADERS.SETTLEMENT_ROUTING_NUMBER,
      sortable: true,
    },
    {
      key: 'city',
      label: BANK_STRINGS.TABLE_HEADERS.CITY,
      sortable: true,
    },
    {
      key: 'state',
      label: BANK_STRINGS.TABLE_HEADERS.STATE,
      sortable: true,
    },
    {
      key: 'country',
      label: BANK_STRINGS.TABLE_HEADERS.COUNTRY,
      sortable: true,
    },
    {
      key: 'primaryContactName',
      label: BANK_STRINGS.TABLE_HEADERS.PRIMARY_CONTACT_NAME,
      sortable: true,
    },
    {
      key: 'contactPhoneNumber',
      label: BANK_STRINGS.TABLE_HEADERS.CONTACT_PHONE_NUMBER,
      sortable: false,
    },
    {
      key: 'emailAddress',
      label: BANK_STRINGS.TABLE_HEADERS.EMAIL_ADDRESS,
      sortable: true,
    },
    {
      key: 'localCurrency',
      label: BANK_STRINGS.TABLE_HEADERS.LOCAL_CURRENCY,
      sortable: true,
    },
    {
      key: 'status',
      label: BANK_STRINGS.TABLE_HEADERS.STATUS,
      sortable: true,
    },
    {
      key: 'createdDate',
      label: BANK_STRINGS.TABLE_HEADERS.CREATED_DATE,
      sortable: true,
    },
    {
      key: 'actions',
      label: BANK_STRINGS.TABLE_HEADERS.ACTIONS,
      sortable: false,
    },
  ],
  rows: [], // This will be populated dynamically
};

/**
 * Bank Validation Schema
 */
export const bankValidationSchema = z.object({
  bankName: z
    .string()
    .trim()
    .regex(
      BANK_FIELD_CONFIG.BANK_NAME_VALIDATION.PATTERN, 
      BANK_STRINGS.VALIDATION.INVALID_BANK_NAME
    )
    .min(1, BANK_STRINGS.VALIDATION.BANK_NAME_REQUIRED),
  bankCode: z
    .string()
    .trim()
    .regex(
      BANK_FIELD_CONFIG.BANK_CODE_VALIDATION.PATTERN, 
      BANK_STRINGS.VALIDATION.INVALID_BANK_CODE
    )
    .min(1, BANK_STRINGS.VALIDATION.BANK_CODE_REQUIRED),
  settlementRoutingNumber: z
    .string()
    .trim()
    .regex(
      BANK_FIELD_CONFIG.ROUTING_NUMBER_VALIDATION.PATTERN, 
      BANK_STRINGS.VALIDATION.INVALID_ROUTING_NUMBER
    )
    .min(1, BANK_STRINGS.VALIDATION.SETTLEMENT_ROUTING_NUMBER_REQUIRED),
  settlementAccountNumber: z
    .string()
    .trim()
    .regex(
      BANK_FIELD_CONFIG.ACCOUNT_NUMBER_VALIDATION.PATTERN, 
      BANK_STRINGS.VALIDATION.INVALID_ACCOUNT_NUMBER
    )
    .min(1, BANK_STRINGS.VALIDATION.SETTLEMENT_ACCOUNT_NUMBER_REQUIRED),
  address1: z
    .string()
    .trim()
    .min(1, BANK_STRINGS.VALIDATION.ADDRESS_1_REQUIRED),
  address2: z
    .string()
    .trim()
    .optional()
    .or(z.literal('')),
  city: z
    .string()
    .trim()
    .regex(
      BANK_FIELD_CONFIG.NAME_VALIDATION.PATTERN, 
      BANK_STRINGS.VALIDATION.INVALID_NAME
    )
    .min(1, BANK_STRINGS.VALIDATION.CITY_REQUIRED),
  country: z
    .string()
    .min(1, BANK_STRINGS.VALIDATION.COUNTRY_REQUIRED),
  state: z
    .string()
    .min(1, BANK_STRINGS.VALIDATION.STATE_REQUIRED),
  zipCode: z
    .string()
    .trim()
    .regex(
      BANK_FIELD_CONFIG.ZIP_CODE_VALIDATION.PATTERN, 
      BANK_STRINGS.VALIDATION.INVALID_ZIP_CODE
    )
    .min(1, BANK_STRINGS.VALIDATION.ZIP_CODE_REQUIRED),
  primaryContactName: z
    .string()
    .trim()
    .regex(
      BANK_FIELD_CONFIG.NAME_VALIDATION.PATTERN, 
      BANK_STRINGS.VALIDATION.INVALID_NAME
    )
    .min(1, BANK_STRINGS.VALIDATION.PRIMARY_CONTACT_NAME_REQUIRED),
  contactMobileNumber: z
    .string()
    .trim()
    .regex(
      BANK_FIELD_CONFIG.PHONE_VALIDATION.PATTERN, 
      BANK_STRINGS.VALIDATION.INVALID_MOBILE
    )
    .optional()
    .or(z.literal('')),
  contactPhoneNumber: z
    .string()
    .trim()
    .regex(
      BANK_FIELD_CONFIG.PHONE_VALIDATION.PATTERN, 
      BANK_STRINGS.VALIDATION.INVALID_PHONE
    )
    .min(1, BANK_STRINGS.VALIDATION.CONTACT_PHONE_NUMBER_REQUIRED),
  extension: z
    .string()
    .trim()
    .optional()
    .or(z.literal('')),
  fax: z
    .string()
    .trim()
    .optional()
    .or(z.literal('')),
  emailAddress: z
    .string()
    .trim()
    .email(BANK_STRINGS.VALIDATION.INVALID_EMAIL)
    .min(1, BANK_STRINGS.VALIDATION.EMAIL_ADDRESS_REQUIRED),
  localCurrency: z
    .string()
    .min(1, BANK_STRINGS.VALIDATION.LOCAL_CURRENCY_REQUIRED),
});

/**
 * Mock Data for Development and Testing
 */
export const bankMockData = [
  {
    id: '1',
    bankName: 'First National Bank',
    bankCode: 'FNB001',
    settlementRoutingNumber: '123456789',
    settlementAccountNumber: '987654321',
    address1: '123 Banking Street',
    address2: 'Suite 100',
    city: 'New York',
    country: 'US',
    state: 'NY',
    zipCode: '10001',
    primaryContactName: 'John Anderson',
    contactMobileNumber: '+1-555-0123',
    contactPhoneNumber: '+1-555-0100',
    extension: '1001',
    fax: '+1-555-0199',
    emailAddress: 'john.anderson@fnb.com',
    localCurrency: 'USD',
    status: 'active',
    createdDate: '2024-01-15T10:30:00Z',
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    bankName: 'Global Trust Bank',
    bankCode: 'GTB002',
    settlementRoutingNumber: '234567890',
    settlementAccountNumber: '876543210',
    address1: '456 Finance Avenue',
    address2: '',
    city: 'Los Angeles',
    country: 'US',
    state: 'CA',
    zipCode: '90210',
    primaryContactName: 'Sarah Wilson',
    contactMobileNumber: '+1-555-0456',
    contactPhoneNumber: '+1-555-0400',
    extension: '2002',
    fax: '+1-555-0499',
    emailAddress: 'sarah.wilson@gtb.com',
    localCurrency: 'USD',
    status: 'active',
    createdDate: '2024-01-10T14:15:00Z',
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '3',
    bankName: 'International Commerce Bank',
    bankCode: 'ICB003',
    settlementRoutingNumber: '345678901',
    settlementAccountNumber: '765432109',
    address1: '789 Commerce Plaza',
    address2: 'Floor 25',
    city: 'Chicago',
    country: 'US',
    state: 'IL',
    zipCode: '60601',
    primaryContactName: 'Michael Brown',
    contactMobileNumber: '+1-555-0789',
    contactPhoneNumber: '+1-555-0700',
    extension: '3003',
    fax: '+1-555-0799',
    emailAddress: 'michael.brown@icb.com',
    localCurrency: 'USD',
    status: 'pending',
    createdDate: '2024-01-25T09:45:00Z',
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '4',
    bankName: 'Metropolitan Financial Bank',
    bankCode: 'MFB004',
    settlementRoutingNumber: '456789012',
    settlementAccountNumber: '654321098',
    address1: '321 Metro Center',
    address2: 'Tower B',
    city: 'Miami',
    country: 'US',
    state: 'FL',
    zipCode: '33101',
    primaryContactName: 'Emily Davis',
    contactMobileNumber: '+1-555-0321',
    contactPhoneNumber: '+1-555-0300',
    extension: '4004',
    fax: '+1-555-0399',
    emailAddress: 'emily.davis@mfb.com',
    localCurrency: 'USD',
    status: 'inactive',
    createdDate: '2024-02-01T16:20:00Z',
    updatedAt: new Date('2024-02-01')
  },
  {
    id: '5',
    bankName: 'Regional Development Bank',
    bankCode: 'RDB005',
    settlementRoutingNumber: '567890123',
    settlementAccountNumber: '543210987',
    address1: '654 Development Drive',
    address2: '',
    city: 'Austin',
    country: 'US',
    state: 'TX',
    zipCode: '73301',
    primaryContactName: 'David Wilson',
    contactMobileNumber: '+1-555-0654',
    contactPhoneNumber: '+1-555-0600',
    extension: '5005',
    fax: '+1-555-0699',
    emailAddress: 'david.wilson@rdb.com',
    localCurrency: 'USD',
    status: 'suspended',
    createdDate: '2024-02-05T11:30:00Z',
    updatedAt: new Date('2024-02-05')
  },
];

/**
 * Complete Bank Module Configuration
 * Combines search fields, create fields, table config, validation, and mock data
 */
export const bankConfig: ModuleConfig = {
  searchFields: bankSearchFields,
  tableConfig: bankTableConfig,
  mockData: bankMockData,
};

export default bankConfig;
