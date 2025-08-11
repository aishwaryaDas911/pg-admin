import { FormField } from '@/components/common/FormGenerator';
import { DROPDOWN_OPTIONS } from '@/constants/adminConstants';
import { z } from 'zod';

export interface ProgramManagerConfigProps {
  onClickEvent?: () => void;
  tableActionState?: string;
}

export const ProgramManagerConfig = ({ onClickEvent, tableActionState }: ProgramManagerConfigProps) => {
  
  // Other configuration settings
  const otherChanges = {
    requiredActionsColumn: true,
    requiredOnlySearchTab: false,
    isRequiredPagination: true
  };

  // Create form input data
  const createInputData: FormField[] = [
    {
      label: 'Program Manager Name',
      hide: false,
      input: {
        name: 'programManagerName',
        type: 'text',
        placeholder: 'Enter program manager name',
        mandatory: true
      }
    },
    {
      label: 'Company Name',
      hide: false,
      input: {
        name: 'companyName',
        type: 'text',
        placeholder: 'Enter company name',
        mandatory: true
      }
    },
    {
      label: 'Business Entity Name',
      hide: false,
      input: {
        name: 'businessEntityName',
        type: 'text',
        placeholder: 'Enter business entity name',
        mandatory: true
      }
    },
    {
      label: 'Contact Person',
      hide: false,
      input: {
        name: 'contactPerson',
        type: 'text',
        placeholder: 'Enter contact person name',
        mandatory: true
      }
    },
    {
      label: 'Phone Number',
      hide: false,
      input: {
        name: 'phoneNumber',
        type: 'tel',
        placeholder: 'Enter phone number',
        mandatory: true
      }
    },
    {
      label: 'Extension',
      hide: false,
      input: {
        name: 'extension',
        type: 'text',
        placeholder: 'Enter extension',
        mandatory: false
      }
    },
    {
      label: 'Email ID',
      hide: false,
      input: {
        name: 'emailId',
        type: 'email',
        placeholder: 'Enter email address',
        mandatory: true
      }
    },
    {
      label: 'Currency',
      hide: false,
      dropdown: {
        name: 'currency',
        placeholder: 'Select currency',
        options: [
          { label: 'USD', value: 'USD' },
          { label: 'EUR', value: 'EUR' },
          { label: 'INR', value: 'INR' },
          { label: 'GBP', value: 'GBP' }
        ],
        mandatory: true
      }
    },
    {
      label: 'Country',
      hide: false,
      dropdown: {
        name: 'country',
        placeholder: 'Select country',
        options: [
          { label: 'United States', value: 'US' },
          { label: 'Germany', value: 'DE' },
          { label: 'India', value: 'IN' },
          { label: 'United Kingdom', value: 'UK' }
        ],
        mandatory: true
      }
    },
    {
      label: 'State',
      hide: false,
      dropdown: {
        name: 'state',
        placeholder: 'Select state',
        options: [
          { label: 'California', value: 'CA' },
          { label: 'New York', value: 'NY' },
          { label: 'Texas', value: 'TX' },
          { label: 'Florida', value: 'FL' },
          { label: 'Karnataka', value: 'KA' }
        ],
        mandatory: true
      }
    },
    {
      label: 'Program Manager Time Zone',
      hide: false,
      dropdown: {
        name: 'programManagerTimeZone',
        placeholder: 'Select timezone',
        options: DROPDOWN_OPTIONS.TIME_ZONES.slice(0, 10).map(tz => ({ label: tz.label, value: tz.value })),
        mandatory: true
      }
    },
    {
      label: 'Batch Prefix',
      hide: false,
      input: {
        name: 'batchPrefix',
        type: 'text',
        placeholder: 'Enter batch prefix',
        mandatory: true
      }
    },
    {
      label: 'Scheduler Run Time',
      hide: false,
      input: {
        name: 'schedulerRunTime',
        type: 'time',
        placeholder: '00:00:00',
        mandatory: true
      }
    },
    {
      label: 'Associated Bank Names',
      hide: false,
      input: {
        name: 'associatedBankNames',
        type: 'text',
        placeholder: 'Enter bank names (comma separated)',
        mandatory: true
      }
    },
    {
      label: 'Program Manager Logo',
      hide: false,
      input: {
        name: 'programManagerLogo',
        type: 'file',
        placeholder: 'Upload logo',
        mandatory: false
      }
    }
  ];

  // Create form button data
  const createButtonData: FormField[] = [
    {
      label: tableActionState === 'view' ? 'Back' : 'Cancel',
      hide: false,
      button: {
        name: 'cancel',
        label: tableActionState === 'view' ? 'Back' : 'Cancel',
        variant: 'outline',
        size: 'default'
      }
    },
    {
      label: 'Reset',
      hide: tableActionState ? true : false,
      button: {
        name: 'reset',
        label: 'Reset',
        variant: 'outline',
        size: 'default'
      }
    },
    {
      label: tableActionState === 'edit' ? 'Update' : 'Submit',
      hide: tableActionState === 'view' ? true : false,
      button: {
        name: 'submit',
        label: tableActionState === 'edit' ? 'Update' : 'Submit',
        variant: 'default',
        size: 'default'
      }
    }
  ];

  // Search form input data
  const searchInputData: FormField[] = [
    {
      label: 'Program Manager Name',
      hide: false,
      input: {
        name: 'programManagerName',
        type: 'text',
        placeholder: 'Enter program manager name',
        mandatory: false
      }
    },
    {
      label: 'Company Name',
      hide: false,
      input: {
        name: 'companyName',
        type: 'text',
        placeholder: 'Enter company name',
        mandatory: false
      }
    },
    {
      label: 'Bank Name',
      hide: false,
      dropdown: {
        name: 'bankName',
        placeholder: 'Select bank name',
        options: DROPDOWN_OPTIONS.BANKS.map(bank => ({ label: bank.label, value: bank.value })),
        mandatory: false
      }
    },
    {
      label: 'Status',
      hide: false,
      dropdown: {
        name: 'status',
        placeholder: 'Select status',
        options: DROPDOWN_OPTIONS.STATUS_OPTIONS.map(status => ({ label: status.label, value: status.value })),
        mandatory: false
      }
    },
    {
      label: 'Records Per Page',
      hide: false,
      dropdown: {
        name: 'recordsPerPage',
        placeholder: 'Select records per page',
        options: DROPDOWN_OPTIONS.RECORDS_PER_PAGE.map(option => ({ label: option.label, value: option.value })),
        mandatory: false
      }
    }
  ];

  // Search form button data
  const searchButtonData: FormField[] = [
    {
      label: 'Reset',
      hide: false,
      button: {
        name: 'reset',
        label: 'Reset',
        variant: 'outline',
        size: 'default'
      }
    },
    {
      label: 'Search',
      hide: false,
      button: {
        name: 'search',
        label: 'Search',
        variant: 'default',
        size: 'default',
        onClick: onClickEvent
      }
    }
  ];

  // Table header configuration
  const tableHeaderData = [
    {
      headerJson: [
        {
          key: 'programManagerName',
          label: 'Program Manager Name'
        },
        {
          key: 'companyName',
          label: 'Company Name'
        },
        {
          key: 'contactPerson',
          label: 'Contact Person'
        },
        {
          key: 'phoneNumber',
          label: 'Phone Number'
        },
        {
          key: 'emailId',
          label: 'Email ID'
        },
        {
          key: 'associatedBankNames',
          label: 'Associated Bank Names'
        },
        {
          key: 'status',
          label: 'Status'
        }
      ]
    }
  ];

  // API endpoints configuration
  const apiRequest = {
    create: '/api/program-manager/create',
    search: '/api/program-manager/search',
    update: '/api/program-manager/update',
    delete: '/api/program-manager/delete'
  };

  // Model endpoints for different actions
  const modelEndpoints = [
    {
      suspend: '/api/program-manager/change-status',
      delete: '/api/program-manager/change-status'
    }
  ];

  // Validation schema for create form
  const userCreateSchema = z.object({
    programManagerName: z
      .string()
      .trim()
      .regex(/^[a-zA-Z\s]+$/, 'Please enter a valid name')
      .min(1, 'Program Manager Name is required'),
    companyName: z
      .string()
      .trim()
      .regex(/^[a-zA-Z0-9\s&.-]+$/, 'Please enter a valid company name')
      .min(1, 'Company Name is required'),
    businessEntityName: z
      .string()
      .trim()
      .regex(/^[a-zA-Z0-9\s&.-]+$/, 'Please enter a valid business entity name')
      .min(1, 'Business Entity Name is required'),
    contactPerson: z
      .string()
      .trim()
      .regex(/^[a-zA-Z\s]+$/, 'Please enter a valid contact person name')
      .min(1, 'Contact Person is required'),
    phoneNumber: z
      .string()
      .trim()
      .regex(/^[+]?[\d\s()-]+$/, 'Please enter a valid phone number')
      .min(1, 'Phone Number is required'),
    emailId: z
      .string()
      .trim()
      .email('Please enter a valid email address')
      .min(1, 'Email ID is required'),
    currency: z
      .string()
      .min(1, 'Currency is required'),
    country: z
      .string()
      .min(1, 'Country is required'),
    state: z
      .string()
      .trim()
      .regex(/^[a-zA-Z\s]+$/, 'Please enter a valid state')
      .min(1, 'State is required'),
    associatedBankNames: z
      .string()
      .min(1, 'At least one associated bank is required')
  });

  // Status configuration for different states
  const status = [
    {
      ACTIVE: {
        view: true,
        activeIcon: true,
        edit: true,
        suspend: true
      }
    },
    {
      SUSPENDED: {
        view: true,
        suspended: true,
        edit: false,
        activate: true
      }
    },
    {
      INACTIVE: {
        view: true,
        suspended: false,
        edit: true,
        activate: true
      }
    },
    {
      TERMINATED: {
        view: true,
        suspended: false,
        edit: false,
        activate: false
      }
    }
  ];

  // Mock data for testing
  const mockData = [
    {
      id: '1',
      programManagerName: 'Mercedes Payment Solutions',
      companyName: 'Mercedes-Benz Financial',
      businessEntityName: 'MB Payment Corp',
      contactPerson: 'John Smith',
      phoneNumber: '+1-555-0123',
      emailId: 'john.smith@mercedes-financial.com',
      currency: 'USD',
      country: 'US',
      state: 'CA',
      status: 'ACTIVE',
      associatedBankNames: ['HDFC', 'Axis'],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '2',
      programManagerName: 'Global Automotive Payments',
      companyName: 'Mercedes Global Services',
      businessEntityName: 'MG Services LLC',
      contactPerson: 'Sarah Johnson',
      phoneNumber: '+1-555-0456',
      emailId: 'sarah.johnson@mercedes-global.com',
      currency: 'EUR',
      country: 'DE',
      state: 'CA',
      status: 'ACTIVE',
      associatedBankNames: ['ICICI', 'SBI'],
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-18')
    }
  ];

  return {
    createInputData,
    searchInputData,
    createButtonData,
    searchButtonData,
    tableHeaderData,
    modelEndpoints,
    userCreateSchema,
    otherChanges,
    apiRequest,
    status,
    mockData
  };
};

export { ProgramManagerConfig as default };
