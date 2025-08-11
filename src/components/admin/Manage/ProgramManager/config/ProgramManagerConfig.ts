import { FormField } from '@/components/common/FormGenerator';
import { DROPDOWN_OPTIONS } from '@/constants/adminConstants';
import * as yup from 'yup';

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
      input: {
        name: 'state',
        type: 'text',
        placeholder: 'Enter state',
        mandatory: true
      }
    },
    {
      label: 'Associated Bank Names',
      hide: false,
      dropdown: {
        name: 'associatedBankNames',
        placeholder: 'Select associated banks',
        options: DROPDOWN_OPTIONS.BANKS.map(bank => ({ label: bank.label, value: bank.value })),
        mandatory: true
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
          id: 'programManagerName',
          label: 'Program Manager Name'
        },
        {
          id: 'companyName',
          label: 'Company Name'
        },
        {
          id: 'contactPerson',
          label: 'Contact Person'
        },
        {
          id: 'phoneNumber',
          label: 'Phone Number'
        },
        {
          id: 'emailId',
          label: 'Email ID'
        },
        {
          id: 'associatedBankNames',
          label: 'Associated Bank Names'
        },
        {
          id: 'status',
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
  const userCreateSchema = yup.object().shape({
    programManagerName: yup
      .string()
      .trim()
      .matches(/^[a-zA-Z\s]+$/, 'Please enter a valid name')
      .required('Program Manager Name is required'),
    companyName: yup
      .string()
      .trim()
      .matches(/^[a-zA-Z0-9\s&.-]+$/, 'Please enter a valid company name')
      .required('Company Name is required'),
    businessEntityName: yup
      .string()
      .trim()
      .matches(/^[a-zA-Z0-9\s&.-]+$/, 'Please enter a valid business entity name')
      .required('Business Entity Name is required'),
    contactPerson: yup
      .string()
      .trim()
      .matches(/^[a-zA-Z\s]+$/, 'Please enter a valid contact person name')
      .required('Contact Person is required'),
    phoneNumber: yup
      .string()
      .trim()
      .matches(/^[+]?[\d\s()-]+$/, 'Please enter a valid phone number')
      .required('Phone Number is required'),
    emailId: yup
      .string()
      .trim()
      .email('Please enter a valid email address')
      .required('Email ID is required'),
    currency: yup
      .string()
      .required('Currency is required'),
    country: yup
      .string()
      .required('Country is required'),
    state: yup
      .string()
      .trim()
      .matches(/^[a-zA-Z\s]+$/, 'Please enter a valid state')
      .required('State is required'),
    associatedBankNames: yup
      .string()
      .required('At least one associated bank is required')
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
