import { FormField, TableConfig } from '@/components/common/FormGenerator';
import { DROPDOWN_OPTIONS } from '@/constants/adminConstants';

// Define the structure for module configurations
export interface ModuleConfig {
  searchFields: FormField[];
  tableConfig: TableConfig;
  createFields?: FormField[];
  mockData?: any[];
}

// Program Manager Configuration
const programManagerConfig: ModuleConfig = {
  searchFields: [
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
    },
    {
      label: 'Search',
      hide: false,
      button: {
        name: 'search',
        label: 'Search',
        variant: 'default',
        size: 'default'
      }
    },
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
      label: 'Export PDF',
      hide: false,
      button: {
        name: 'exportPDF',
        label: 'Export PDF',
        variant: 'secondary',
        size: 'default'
      }
    },
    {
      label: 'Export CSV',
      hide: false,
      button: {
        name: 'exportCSV',
        label: 'Export CSV',
        variant: 'secondary',
        size: 'default'
      }
    }
  ],
  tableConfig: {
    columns: [
      { key: 'programManagerName', label: 'Program Manager Name', sortable: true },
      { key: 'companyName', label: 'Company Name', sortable: true },
      { key: 'contactPerson', label: 'Contact Person', sortable: true },
      { key: 'phoneNumber', label: 'Phone Number', sortable: false },
      { key: 'emailId', label: 'Email ID', sortable: false },
      { key: 'associatedBankNames', label: 'Associated Bank Names', sortable: false },
      { key: 'status', label: 'Status', sortable: true },
      { key: 'actions', label: 'Actions', sortable: false }
    ],
    rows: []
  },
  mockData: [
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
      status: 'active',
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
      status: 'active',
      associatedBankNames: ['ICICI', 'SBI'],
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-18')
    },
    {
      id: '3',
      programManagerName: 'Regional Payment Hub',
      companyName: 'Mercedes Asia Pacific',
      businessEntityName: 'MAP Holdings',
      contactPerson: 'David Chen',
      phoneNumber: '+1-555-0789',
      emailId: 'david.chen@mercedes-ap.com',
      currency: 'INR',
      country: 'IN',
      state: 'KA',
      status: 'pending',
      associatedBankNames: ['HDFC'],
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-15')
    }
  ]
};

// Bank Configuration
const bankConfig: ModuleConfig = {
  searchFields: [
    {
      label: 'Bank Name',
      hide: false,
      input: {
        name: 'bankName',
        type: 'text',
        placeholder: 'Enter bank name',
        mandatory: false
      }
    },
    {
      label: 'Bank Code',
      hide: false,
      input: {
        name: 'bankCode',
        type: 'text',
        placeholder: 'Enter bank code',
        mandatory: false
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
          { label: 'India', value: 'IN' },
          { label: 'Germany', value: 'DE' },
          { label: 'Canada', value: 'CA' },
          { label: 'United Kingdom', value: 'UK' }
        ],
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
      label: 'Search',
      hide: false,
      button: {
        name: 'search',
        label: 'Search',
        variant: 'default',
        size: 'default'
      }
    },
    {
      label: 'Reset',
      hide: false,
      button: {
        name: 'reset',
        label: 'Reset',
        variant: 'outline',
        size: 'default'
      }
    }
  ],
  tableConfig: {
    columns: [
      { key: 'bankName', label: 'Bank Name', sortable: true },
      { key: 'bankCode', label: 'Bank Code', sortable: true },
      { key: 'country', label: 'Country', sortable: true },
      { key: 'city', label: 'City', sortable: false },
      { key: 'contactPerson', label: 'Contact Person', sortable: false },
      { key: 'status', label: 'Status', sortable: true },
      { key: 'actions', label: 'Actions', sortable: false }
    ],
    rows: []
  },
  mockData: [
    {
      id: '1',
      bankName: 'HDFC Bank',
      bankCode: 'HDFC001',
      country: 'IN',
      city: 'Mumbai',
      contactPerson: 'Raj Patel',
      status: 'active',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '2',
      bankName: 'Axis Bank',
      bankCode: 'AXIS002',
      country: 'IN',
      city: 'Bangalore',
      contactPerson: 'Priya Sharma',
      status: 'active',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-18')
    }
  ]
};

// ISO Configuration
const isoConfig: ModuleConfig = {
  searchFields: [
    {
      label: 'ISO Name',
      hide: false,
      input: {
        name: 'isoName',
        type: 'text',
        placeholder: 'Enter ISO name',
        mandatory: false
      }
    },
    {
      label: 'ISO Code',
      hide: false,
      input: {
        name: 'isoCode',
        type: 'text',
        placeholder: 'Enter ISO code',
        mandatory: false
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
          { label: 'India', value: 'IN' },
          { label: 'Germany', value: 'DE' },
          { label: 'Canada', value: 'CA' }
        ],
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
      label: 'Search',
      hide: false,
      button: {
        name: 'search',
        label: 'Search',
        variant: 'default',
        size: 'default'
      }
    },
    {
      label: 'Reset',
      hide: false,
      button: {
        name: 'reset',
        label: 'Reset',
        variant: 'outline',
        size: 'default'
      }
    }
  ],
  tableConfig: {
    columns: [
      { key: 'isoName', label: 'ISO Name', sortable: true },
      { key: 'isoCode', label: 'ISO Code', sortable: true },
      { key: 'country', label: 'Country', sortable: true },
      { key: 'contactPerson', label: 'Contact Person', sortable: false },
      { key: 'phoneNumber', label: 'Phone Number', sortable: false },
      { key: 'status', label: 'Status', sortable: true },
      { key: 'actions', label: 'Actions', sortable: false }
    ],
    rows: []
  },
  mockData: [
    {
      id: '1',
      isoName: 'Global ISO Services',
      isoCode: 'ISO001',
      country: 'US',
      contactPerson: 'Michael Johnson',
      phoneNumber: '+1-555-1234',
      status: 'active',
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-19')
    }
  ]
};

// Merchant Configuration
const merchantConfig: ModuleConfig = {
  searchFields: [
    {
      label: 'Merchant Name',
      hide: false,
      input: {
        name: 'merchantName',
        type: 'text',
        placeholder: 'Enter merchant name',
        mandatory: false
      }
    },
    {
      label: 'Merchant ID',
      hide: false,
      input: {
        name: 'merchantId',
        type: 'text',
        placeholder: 'Enter merchant ID',
        mandatory: false
      }
    },
    {
      label: 'Business Type',
      hide: false,
      dropdown: {
        name: 'businessType',
        placeholder: 'Select business type',
        options: [
          { label: 'Retail', value: 'retail' },
          { label: 'E-commerce', value: 'ecommerce' },
          { label: 'Restaurant', value: 'restaurant' },
          { label: 'Services', value: 'services' }
        ],
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
      label: 'Search',
      hide: false,
      button: {
        name: 'search',
        label: 'Search',
        variant: 'default',
        size: 'default'
      }
    },
    {
      label: 'Reset',
      hide: false,
      button: {
        name: 'reset',
        label: 'Reset',
        variant: 'outline',
        size: 'default'
      }
    }
  ],
  tableConfig: {
    columns: [
      { key: 'merchantName', label: 'Merchant Name', sortable: true },
      { key: 'merchantId', label: 'Merchant ID', sortable: true },
      { key: 'businessType', label: 'Business Type', sortable: true },
      { key: 'contactPerson', label: 'Contact Person', sortable: false },
      { key: 'phoneNumber', label: 'Phone Number', sortable: false },
      { key: 'status', label: 'Status', sortable: true },
      { key: 'actions', label: 'Actions', sortable: false }
    ],
    rows: []
  },
  mockData: [
    {
      id: '1',
      merchantName: 'Tech Store Inc',
      merchantId: 'MER001',
      businessType: 'retail',
      contactPerson: 'Alice Brown',
      phoneNumber: '+1-555-9876',
      status: 'active',
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-01-17')
    }
  ]
};

// Default configuration for modules without specific config
const defaultConfig: ModuleConfig = {
  searchFields: [
    {
      label: 'Name',
      hide: false,
      input: {
        name: 'name',
        type: 'text',
        placeholder: 'Enter name',
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
      label: 'Search',
      hide: false,
      button: {
        name: 'search',
        label: 'Search',
        variant: 'default',
        size: 'default'
      }
    },
    {
      label: 'Reset',
      hide: false,
      button: {
        name: 'reset',
        label: 'Reset',
        variant: 'outline',
        size: 'default'
      }
    }
  ],
  tableConfig: {
    columns: [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'status', label: 'Status', sortable: true },
      { key: 'createdAt', label: 'Created At', sortable: true },
      { key: 'actions', label: 'Actions', sortable: false }
    ],
    rows: []
  },
  mockData: [
    {
      id: '1',
      name: 'Sample Item',
      status: 'active',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20')
    }
  ]
};

// Main configuration mapping
export const moduleConfigurations: Record<string, ModuleConfig> = {
  'Program Manager': programManagerConfig,
  'Bank': bankConfig,
  'ISO': isoConfig,
  'Merchant': merchantConfig,
  'Merchant Group': merchantConfig, // Can be customized later
  'Sub Merchant': merchantConfig, // Can be customized later
  'Acquirer Protocol Parameter': defaultConfig,
  'Fee Program': defaultConfig,
};

// Helper function to get configuration for a module
export const getModuleConfig = (moduleName: string): ModuleConfig => {
  return moduleConfigurations[moduleName] || defaultConfig;
};

// Helper function to get mock data for a module
export const getMockDataForModule = (moduleName: string): any[] => {
  const config = getModuleConfig(moduleName);
  return config.mockData || [];
};
