import { FormField, TableConfig } from '@/components/common';
import { FEE_PROGRAM_STRINGS, FEE_PROGRAM_DROPDOWN_OPTIONS } from '@/constants/feeProgramConstants';

export const feeProgramSearchFields: FormField[] = [
  {
    label: FEE_PROGRAM_STRINGS.LABELS.FEE_PROGRAM_NAME,
    hide: false,
    input: {
      name: 'feeProgramName',
      type: 'text',
      placeholder: FEE_PROGRAM_STRINGS.PLACEHOLDERS.ENTER_FEE_PROGRAM_NAME,
      mandatory: false,
    },
  },
  {
    label: FEE_PROGRAM_STRINGS.LABELS.STATUS,
    hide: false,
    dropdown: {
      name: 'status',
      placeholder: FEE_PROGRAM_STRINGS.PLACEHOLDERS.SELECT_STATUS,
      options: FEE_PROGRAM_DROPDOWN_OPTIONS.STATUS_OPTIONS,
      mandatory: false,
    },
  },
  {
    label: FEE_PROGRAM_STRINGS.LABELS.RECORDS_PER_PAGE,
    hide: false,
    dropdown: {
      name: 'recordsPerPage',
      placeholder: FEE_PROGRAM_STRINGS.PLACEHOLDERS.SELECT_RECORDS_PER_PAGE,
      options: FEE_PROGRAM_DROPDOWN_OPTIONS.RECORDS_PER_PAGE,
      mandatory: false,
    },
  },
  {
    label: FEE_PROGRAM_STRINGS.BUTTONS.SEARCH,
    hide: false,
    button: {
      name: 'search',
      label: FEE_PROGRAM_STRINGS.BUTTONS.SEARCH,
      variant: 'default',
    },
  },
  {
    label: FEE_PROGRAM_STRINGS.BUTTONS.RESET,
    hide: false,
    button: {
      name: 'reset',
      label: FEE_PROGRAM_STRINGS.BUTTONS.RESET,
      variant: 'outline',
    },
  }
];

export const feeProgramTableConfig: TableConfig = {
  columns: [
    { key: 'feeProgramName', label: FEE_PROGRAM_STRINGS.TABLE_HEADERS.FEE_PROGRAM_NAME, sortable: true },
    { key: 'programManagerName', label: FEE_PROGRAM_STRINGS.TABLE_HEADERS.PROGRAM_MANAGER_NAME, sortable: true },
    { key: 'isoName', label: FEE_PROGRAM_STRINGS.TABLE_HEADERS.ISO_NAME, sortable: true },
    { key: 'mcc', label: FEE_PROGRAM_STRINGS.TABLE_HEADERS.MCC, sortable: true },
    { key: 'feeType', label: FEE_PROGRAM_STRINGS.TABLE_HEADERS.FEE_TYPE, sortable: true },
    { key: 'status', label: FEE_PROGRAM_STRINGS.TABLE_HEADERS.STATUS, sortable: true },
    { key: 'createdDate', label: FEE_PROGRAM_STRINGS.TABLE_HEADERS.CREATED_DATE, sortable: true },
    { key: 'actions', label: FEE_PROGRAM_STRINGS.TABLE_HEADERS.ACTIONS, sortable: false }
  ],
  rows: []
};

export const feeProgramMockData = [
  {
    id: 'fp-1',
    feeProgramName: 'Standard Retail Fees',
    programManagerName: 'Program Manager 1',
    isoName: 'Robinson ISO',
    mcc: '5411-grocery',
    feeType: 'percentage',
    status: 'active',
    createdDate: '2024-02-01T10:00:00Z'
  },
  {
    id: 'fp-2',
    feeProgramName: 'Education Program',
    programManagerName: 'Program Manager 2',
    isoName: 'Global ISO',
    mcc: '1604-school',
    feeType: 'fixed',
    status: 'inactive',
    createdDate: '2024-02-05T12:30:00Z'
  }
];

export const feeProgramConfig = {
  searchFields: feeProgramSearchFields,
  tableConfig: feeProgramTableConfig,
  mockData: feeProgramMockData
};

export default feeProgramConfig;
