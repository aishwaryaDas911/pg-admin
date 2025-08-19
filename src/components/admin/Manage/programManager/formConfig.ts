import { FormField, TableConfig } from '@/components/common';
import { ModuleConfig } from '@/config/fieldConfigurations';
import { 
  PROGRAM_MANAGER_STRINGS, 
  PROGRAM_MANAGER_DROPDOWN_OPTIONS 
} from '@/constants/programManagerConstants';
import { z } from 'zod';

/**
 * Program Manager Search Form Configuration
 * Defines all search fields for the FormGenerator component
 */
export const programManagerSearchFields: FormField[] = [
  {
    label: PROGRAM_MANAGER_STRINGS.LABELS.PROGRAM_MANAGER_NAME,
    hide: false,
    input: {
      name: 'programManagerName',
      type: 'text',
      placeholder: PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.SEARCH_PROGRAM_MANAGER_NAME,
      mandatory: false,
    },
  },
  {
    label: PROGRAM_MANAGER_STRINGS.LABELS.COMPANY_NAME,
    hide: false,
    input: {
      name: 'companyName',
      type: 'text',
      placeholder: PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.SEARCH_COMPANY_NAME,
      mandatory: false,
    },
  },
  {
    label: PROGRAM_MANAGER_STRINGS.LABELS.BANK_NAME,
    hide: false,
    dropdown: {
      name: 'bankName',
      placeholder: PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.SELECT_BANK_NAME,
      options: PROGRAM_MANAGER_DROPDOWN_OPTIONS.BANKS,
      mandatory: false,
    },
  },
  {
    label: PROGRAM_MANAGER_STRINGS.LABELS.STATUS,
    hide: false,
    dropdown: {
      name: 'status',
      placeholder: PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.SELECT_STATUS,
      options: PROGRAM_MANAGER_STRINGS.STATUS_OPTIONS,
      mandatory: false,
    },
  },
  {
    label: PROGRAM_MANAGER_STRINGS.LABELS.RECORDS_PER_PAGE,
    hide: false,
    dropdown: {
      name: 'recordsPerPage',
      placeholder: PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.SELECT_RECORDS_PER_PAGE,
      options: PROGRAM_MANAGER_DROPDOWN_OPTIONS.RECORDS_PER_PAGE,
      mandatory: false,
    },
  },
  {
    label: PROGRAM_MANAGER_STRINGS.BUTTONS.SEARCH,
    hide: false,
    button: {
      name: 'search',
      label: PROGRAM_MANAGER_STRINGS.BUTTONS.SEARCH,
      variant: 'default',
      size: 'default',
    },
  },
  {
    label: PROGRAM_MANAGER_STRINGS.BUTTONS.RESET,
    hide: false,
    button: {
      name: 'reset',
      label: PROGRAM_MANAGER_STRINGS.BUTTONS.RESET,
      variant: 'outline',
      size: 'default',
    },
  },
  {
    label: PROGRAM_MANAGER_STRINGS.BUTTONS.EXPORT_PDF,
    hide: false,
    button: {
      name: 'exportPDF',
      label: PROGRAM_MANAGER_STRINGS.BUTTONS.EXPORT_PDF,
      variant: 'secondary',
      size: 'default',
    },
  },
  {
    label: PROGRAM_MANAGER_STRINGS.BUTTONS.EXPORT_CSV,
    hide: false,
    button: {
      name: 'exportCSV',
      label: PROGRAM_MANAGER_STRINGS.BUTTONS.EXPORT_CSV,
      variant: 'secondary',
      size: 'default',
    },
  },
];

/**
 * Program Manager Create/Edit Form Configuration
 */
export const programManagerCreateFields: FormField[] = [
  {
    label: PROGRAM_MANAGER_STRINGS.LABELS.PROGRAM_MANAGER_NAME,
    hide: false,
    input: {
      name: 'programManagerName',
      type: 'text',
      placeholder: PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.ENTER_PROGRAM_MANAGER_NAME,
      mandatory: true,
    },
  },
  {
    label: PROGRAM_MANAGER_STRINGS.LABELS.COMPANY_NAME,
    hide: false,
    input: {
      name: 'companyName',
      type: 'text',
      placeholder: PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.ENTER_COMPANY_NAME,
      mandatory: true,
    },
  },
  {
    label: PROGRAM_MANAGER_STRINGS.LABELS.BUSINESS_ENTITY_NAME,
    hide: false,
    input: {
      name: 'businessEntityName',
      type: 'text',
      placeholder: PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.ENTER_BUSINESS_ENTITY_NAME,
      mandatory: true,
    },
  },
  {
    label: PROGRAM_MANAGER_STRINGS.LABELS.CONTACT_PERSON,
    hide: false,
    input: {
      name: 'contactPerson',
      type: 'text',
      placeholder: PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.ENTER_CONTACT_PERSON,
      mandatory: true,
    },
  },
  {
    label: PROGRAM_MANAGER_STRINGS.LABELS.PHONE_NUMBER,
    hide: false,
    input: {
      name: 'phoneNumber',
      type: 'tel',
      placeholder: PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.ENTER_PHONE_NUMBER,
      mandatory: true,
    },
  },
  {
    label: PROGRAM_MANAGER_STRINGS.LABELS.EXTENSION,
    hide: false,
    input: {
      name: 'extension',
      type: 'text',
      placeholder: PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.ENTER_EXTENSION,
      mandatory: false,
    },
  },
  {
    label: PROGRAM_MANAGER_STRINGS.LABELS.EMAIL_ID,
    hide: false,
    input: {
      name: 'emailId',
      type: 'email',
      placeholder: PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.ENTER_EMAIL_ADDRESS,
      mandatory: true,
    },
  },
  {
    label: PROGRAM_MANAGER_STRINGS.LABELS.CURRENCY,
    hide: false,
    dropdown: {
      name: 'currency',
      placeholder: PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.SELECT_CURRENCY,
      options: PROGRAM_MANAGER_DROPDOWN_OPTIONS.CURRENCIES,
      mandatory: true,
    },
  },
  {
    label: PROGRAM_MANAGER_STRINGS.LABELS.COUNTRY,
    hide: false,
    dropdown: {
      name: 'country',
      placeholder: PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.SELECT_COUNTRY,
      options: PROGRAM_MANAGER_DROPDOWN_OPTIONS.COUNTRIES,
      mandatory: true,
    },
  },
  {
    label: PROGRAM_MANAGER_STRINGS.LABELS.STATE,
    hide: false,
    dropdown: {
      name: 'state',
      placeholder: PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.SELECT_STATE,
      options: PROGRAM_MANAGER_DROPDOWN_OPTIONS.STATES,
      mandatory: true,
    },
  },
  {
    label: PROGRAM_MANAGER_STRINGS.LABELS.PROGRAM_MANAGER_TIME_ZONE,
    hide: false,
    dropdown: {
      name: 'programManagerTimeZone',
      placeholder: PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.SELECT_TIMEZONE,
      options: PROGRAM_MANAGER_DROPDOWN_OPTIONS.TIME_ZONES,
      mandatory: true,
    },
  },
  {
    label: PROGRAM_MANAGER_STRINGS.LABELS.BATCH_PREFIX,
    hide: false,
    input: {
      name: 'batchPrefix',
      type: 'text',
      placeholder: PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.ENTER_BATCH_PREFIX,
      mandatory: true,
    },
  },
  {
    label: PROGRAM_MANAGER_STRINGS.LABELS.SCHEDULER_RUN_TIME,
    hide: false,
    input: {
      name: 'schedulerRunTime',
      type: 'time',
      placeholder: '00:00:00',
      mandatory: true,
    },
  },
  {
    label: PROGRAM_MANAGER_STRINGS.LABELS.ASSOCIATED_BANK_NAMES,
    hide: false,
    input: {
      name: 'associatedBankNames',
      type: 'text',
      placeholder: PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.ENTER_BANK_NAMES,
      mandatory: true,
    },
  },
  {
    label: PROGRAM_MANAGER_STRINGS.LABELS.PROGRAM_MANAGER_LOGO,
    hide: false,
    input: {
      name: 'programManagerLogo',
      type: 'file',
      placeholder: PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.UPLOAD_LOGO,
      mandatory: false,
    },
  },
];

/**
 * Program Manager Table Configuration
 * Defines table structure, columns, and mock data
 */
export const programManagerTableConfig: TableConfig = {
  columns: [
    {
      key: 'programManagerName',
      label: PROGRAM_MANAGER_STRINGS.TABLE_HEADERS.PROGRAM_MANAGER_NAME,
      sortable: true,
    },
    {
      key: 'companyName',
      label: PROGRAM_MANAGER_STRINGS.TABLE_HEADERS.COMPANY_NAME,
      sortable: true,
    },
    {
      key: 'businessEntityName',
      label: PROGRAM_MANAGER_STRINGS.TABLE_HEADERS.BUSINESS_ENTITY_NAME,
      sortable: true,
    },
    {
      key: 'contactPerson',
      label: PROGRAM_MANAGER_STRINGS.TABLE_HEADERS.CONTACT_PERSON,
      sortable: true,
    },
    {
      key: 'phoneNumber',
      label: PROGRAM_MANAGER_STRINGS.TABLE_HEADERS.PHONE_NUMBER,
      sortable: false,
    },
    {
      key: 'emailId',
      label: PROGRAM_MANAGER_STRINGS.TABLE_HEADERS.EMAIL_ID,
      sortable: true,
    },
    {
      key: 'associatedBankNames',
      label: PROGRAM_MANAGER_STRINGS.TABLE_HEADERS.ASSOCIATED_BANK_NAMES,
      sortable: true,
    },
    {
      key: 'status',
      label: PROGRAM_MANAGER_STRINGS.TABLE_HEADERS.STATUS,
      sortable: true,
    },
    {
      key: 'createdDate',
      label: PROGRAM_MANAGER_STRINGS.TABLE_HEADERS.CREATED_DATE,
      sortable: true,
    },
    {
      key: 'actions',
      label: PROGRAM_MANAGER_STRINGS.TABLE_HEADERS.ACTIONS,
      sortable: false,
    },
  ],
  rows: [], // This will be populated dynamically
};

/**
 * Program Manager Validation Schema
 */
export const programManagerValidationSchema = z.object({
  programManagerName: z
    .string()
    .trim()
    .regex(
      PROGRAM_MANAGER_FIELD_CONFIG.NAME_VALIDATION.PATTERN, 
      PROGRAM_MANAGER_STRINGS.VALIDATION.INVALID_NAME
    )
    .min(1, PROGRAM_MANAGER_STRINGS.VALIDATION.PROGRAM_MANAGER_NAME_REQUIRED),
  companyName: z
    .string()
    .trim()
    .regex(
      PROGRAM_MANAGER_FIELD_CONFIG.COMPANY_NAME_VALIDATION.PATTERN, 
      PROGRAM_MANAGER_STRINGS.VALIDATION.INVALID_COMPANY_NAME
    )
    .min(1, PROGRAM_MANAGER_STRINGS.VALIDATION.COMPANY_NAME_REQUIRED),
  businessEntityName: z
    .string()
    .trim()
    .regex(
      PROGRAM_MANAGER_FIELD_CONFIG.COMPANY_NAME_VALIDATION.PATTERN, 
      PROGRAM_MANAGER_STRINGS.VALIDATION.INVALID_COMPANY_NAME
    )
    .min(1, PROGRAM_MANAGER_STRINGS.VALIDATION.BUSINESS_ENTITY_NAME_REQUIRED),
  contactPerson: z
    .string()
    .trim()
    .regex(
      PROGRAM_MANAGER_FIELD_CONFIG.NAME_VALIDATION.PATTERN, 
      PROGRAM_MANAGER_STRINGS.VALIDATION.INVALID_NAME
    )
    .min(1, PROGRAM_MANAGER_STRINGS.VALIDATION.CONTACT_PERSON_REQUIRED),
  phoneNumber: z
    .string()
    .trim()
    .regex(
      PROGRAM_MANAGER_FIELD_CONFIG.PHONE_VALIDATION.PATTERN, 
      PROGRAM_MANAGER_STRINGS.VALIDATION.INVALID_PHONE
    )
    .min(1, PROGRAM_MANAGER_STRINGS.VALIDATION.PHONE_NUMBER_REQUIRED),
  extension: z
    .string()
    .trim()
    .optional()
    .or(z.literal('')),
  emailId: z
    .string()
    .trim()
    .email(PROGRAM_MANAGER_STRINGS.VALIDATION.INVALID_EMAIL)
    .min(1, PROGRAM_MANAGER_STRINGS.VALIDATION.EMAIL_ID_REQUIRED),
  currency: z
    .string()
    .min(1, PROGRAM_MANAGER_STRINGS.VALIDATION.CURRENCY_REQUIRED),
  country: z
    .string()
    .min(1, PROGRAM_MANAGER_STRINGS.VALIDATION.COUNTRY_REQUIRED),
  state: z
    .string()
    .min(1, PROGRAM_MANAGER_STRINGS.VALIDATION.STATE_REQUIRED),
  programManagerTimeZone: z
    .string()
    .min(1, PROGRAM_MANAGER_STRINGS.VALIDATION.TIMEZONE_REQUIRED),
  batchPrefix: z
    .string()
    .trim()
    .regex(
      PROGRAM_MANAGER_FIELD_CONFIG.BATCH_PREFIX_VALIDATION.PATTERN, 
      PROGRAM_MANAGER_STRINGS.VALIDATION.INVALID_BATCH_PREFIX
    )
    .min(1, PROGRAM_MANAGER_STRINGS.VALIDATION.BATCH_PREFIX_REQUIRED),
  schedulerRunTime: z
    .string()
    .min(1, PROGRAM_MANAGER_STRINGS.VALIDATION.SCHEDULER_RUN_TIME_REQUIRED),
  associatedBankNames: z
    .string()
    .min(1, PROGRAM_MANAGER_STRINGS.VALIDATION.ASSOCIATED_BANK_NAMES_REQUIRED),
  programManagerLogo: z
    .any()
    .optional()
});

/**
 * Mock Data for Development and Testing
 */
export const programManagerMockData = [
  {
    id: '1',
    programManagerName: 'Mercedes Payment Solutions',
    companyName: 'Mercedes-Benz Financial',
    businessEntityName: 'MB Payment Corp',
    contactPerson: 'John Smith',
    phoneNumber: '+1-555-0123',
    extension: '1234',
    emailId: 'john.smith@mercedes-financial.com',
    currency: 'USD',
    country: 'US',
    state: 'CA',
    programManagerTimeZone: 'UTC-8',
    batchPrefix: 'MB001',
    schedulerRunTime: '02:00:00',
    status: 'active',
    associatedBankNames: 'HDFC, Axis Bank',
    programManagerLogo: null,
    createdDate: '2024-01-15T10:30:00Z',
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    programManagerName: 'Global Automotive Payments',
    companyName: 'Mercedes Global Services',
    businessEntityName: 'MG Services LLC',
    contactPerson: 'Sarah Johnson',
    phoneNumber: '+1-555-0456',
    extension: '5678',
    emailId: 'sarah.johnson@mercedes-global.com',
    currency: 'EUR',
    country: 'DE',
    state: 'CA',
    programManagerTimeZone: 'UTC+0',
    batchPrefix: 'MG002',
    schedulerRunTime: '01:30:00',
    status: 'active',
    associatedBankNames: 'ICICI, SBI',
    programManagerLogo: null,
    createdDate: '2024-01-10T14:15:00Z',
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '3',
    programManagerName: 'Regional Payment Network',
    companyName: 'RPN Holdings Inc',
    businessEntityName: 'RPN Holdings Inc',
    contactPerson: 'Michael Brown',
    phoneNumber: '+1-555-0789',
    extension: '9012',
    emailId: 'michael.brown@rpn.com',
    currency: 'USD',
    country: 'US',
    state: 'NY',
    programManagerTimeZone: 'UTC-5',
    batchPrefix: 'RPN003',
    schedulerRunTime: '03:00:00',
    status: 'pending',
    associatedBankNames: 'Wells Fargo, Chase',
    programManagerLogo: null,
    createdDate: '2024-01-25T09:45:00Z',
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '4',
    programManagerName: 'Express Payment Solutions',
    companyName: 'EPS Limited',
    businessEntityName: 'EPS Limited',
    contactPerson: 'Emily Davis',
    phoneNumber: '+1-555-0321',
    extension: '3210',
    emailId: 'emily.davis@eps.com',
    currency: 'USD',
    country: 'US',
    state: 'TX',
    programManagerTimeZone: 'UTC-6',
    batchPrefix: 'EPS004',
    schedulerRunTime: '04:00:00',
    status: 'inactive',
    associatedBankNames: 'Bank of America',
    programManagerLogo: null,
    createdDate: '2024-02-01T16:20:00Z',
    updatedAt: new Date('2024-02-01')
  },
  {
    id: '5',
    programManagerName: 'International Processing Hub',
    companyName: 'IPH Global Services',
    businessEntityName: 'IPH Global Services',
    contactPerson: 'David Wilson',
    phoneNumber: '+1-555-0654',
    extension: '6540',
    emailId: 'david.wilson@iph.com',
    currency: 'USD',
    country: 'US',
    state: 'FL',
    programManagerTimeZone: 'UTC-5',
    batchPrefix: 'IPH005',
    schedulerRunTime: '05:00:00',
    status: 'suspended',
    associatedBankNames: 'TD Bank, Capital One',
    programManagerLogo: null,
    createdDate: '2024-02-05T11:30:00Z',
    updatedAt: new Date('2024-02-05')
  },
];

/**
 * Complete Program Manager Module Configuration
 * Combines search fields, create fields, table config, validation, and mock data
 */
export const programManagerConfig: ModuleConfig = {
  searchFields: programManagerSearchFields,
  tableConfig: programManagerTableConfig,
  mockData: programManagerMockData,
};

export default programManagerConfig;
