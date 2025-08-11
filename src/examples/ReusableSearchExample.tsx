import React from 'react';
import { ReusableSearchComponent, SearchField, TableColumn, ActionConfig } from '@/components/common/ReusableSearchComponent';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2, Pause, Play } from 'lucide-react';

// Example: Program Manager Search Configuration
const programManagerSearchFields: SearchField[] = [
  {
    name: 'programManagerName',
    label: 'Program Manager Name',
    type: 'text',
    placeholder: 'Enter program manager name'
  },
  {
    name: 'companyName',
    label: 'Company Name',
    type: 'text',
    placeholder: 'Enter company name'
  },
  {
    name: 'bankName',
    label: 'Bank Name',
    type: 'select',
    placeholder: 'Select bank name',
    options: [
      { value: 'hdfc', label: 'HDFC' },
      { value: 'axis', label: 'Axis Bank' },
      { value: 'icici', label: 'ICICI Bank' },
      { value: 'sbi', label: 'SBI' }
    ]
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    placeholder: 'Select status',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'pending', label: 'Pending' },
      { value: 'suspended', label: 'Suspended' }
    ]
  }
];

const programManagerTableColumns: TableColumn[] = [
  {
    key: 'programManagerName',
    label: 'Program Manager Name',
    sortable: true,
    className: 'font-medium'
  },
  {
    key: 'companyName',
    label: 'Company Name',
    sortable: true
  },
  {
    key: 'contactPerson',
    label: 'Contact Person',
    sortable: true
  },
  {
    key: 'phoneNumber',
    label: 'Phone',
    sortable: false
  },
  {
    key: 'emailId',
    label: 'Email',
    sortable: false,
    className: 'font-mono text-xs'
  },
  {
    key: 'associatedBankNames',
    label: 'Associated Bank Name(s)',
    sortable: false
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    render: (value) => (
      <Badge 
        variant={value === 'active' ? 'default' : 'secondary'}
        className={`text-xs ${
          value === 'active' 
            ? 'bg-green-100 text-green-800 border-green-200' 
            : value === 'pending'
            ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
            : 'bg-gray-100 text-gray-800 border-gray-200'
        }`}
      >
        {value}
      </Badge>
    )
  },
  {
    key: 'actions',
    label: 'Actions',
    sortable: false
  }
];

const programManagerActions: ActionConfig[] = [
  {
    type: 'view',
    icon: Eye,
    color: 'blue',
    tooltip: 'View Details'
  },
  {
    type: 'edit',
    icon: Edit,
    color: 'green',
    tooltip: 'Edit'
  },
  {
    type: 'delete',
    icon: Trash2,
    color: 'red',
    tooltip: 'Delete'
  }
];

// Mock data matching the image
const programManagerMockData = [
  {
    id: '1',
    programManagerName: 'Payment Gateway Payment Solutions',
    companyName: 'Payment Gateway Financial',
    contactPerson: 'John Smith',
    phoneNumber: '+1-555-0123',
    emailId: 'john.smith@mercedes-financial.com',
    associatedBankNames: 'HDFC, Axis',
    status: 'active'
  },
  {
    id: '2',
    programManagerName: 'Global Automotive Payments',
    companyName: 'Mercedes Global Services',
    contactPerson: 'Sarah Johnson',
    phoneNumber: '+1-555-0456',
    emailId: 'sarah.johnson@mercedes-global.com',
    associatedBankNames: 'ICICI, SBI',
    status: 'active'
  },
  {
    id: '3',
    programManagerName: 'Regional Payment Hub',
    companyName: 'Mercedes Asia Pacific',
    contactPerson: 'David Chen',
    phoneNumber: '+1-555-0789',
    emailId: 'david.chen@mercedes-ap.com',
    associatedBankNames: 'HDFC',
    status: 'pending'
  }
];

export const ProgramManagerSearchExample: React.FC = () => {
  const handleSearch = (filters: any) => {
    console.log('Search filters:', filters);
    // Implement search logic here
  };

  const handleAction = (action: string, row: any) => {
    console.log(`Action: ${action}`, row);
    // Implement action logic here
  };

  return (
    <ReusableSearchComponent
      title="Program Manager"
      searchFields={programManagerSearchFields}
      tableColumns={programManagerTableColumns}
      data={programManagerMockData}
      onSearch={handleSearch}
      onAction={handleAction}
      actions={programManagerActions}
      exportFileName="program_manager"
    />
  );
};

// Example: Bank Search Configuration
const bankSearchFields: SearchField[] = [
  {
    name: 'bankName',
    label: 'Bank Name',
    type: 'text',
    placeholder: 'Enter bank name'
  },
  {
    name: 'bankCode',
    label: 'Bank Code',
    type: 'text',
    placeholder: 'Enter bank code'
  },
  {
    name: 'country',
    label: 'Country',
    type: 'select',
    placeholder: 'Select country',
    options: [
      { value: 'US', label: 'United States' },
      { value: 'IN', label: 'India' },
      { value: 'DE', label: 'Germany' },
      { value: 'UK', label: 'United Kingdom' }
    ]
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    placeholder: 'Select status',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'pending', label: 'Pending' }
    ]
  }
];

const bankTableColumns: TableColumn[] = [
  {
    key: 'bankName',
    label: 'Bank Name',
    sortable: true,
    className: 'font-medium'
  },
  {
    key: 'bankCode',
    label: 'Bank Code',
    sortable: true
  },
  {
    key: 'country',
    label: 'Country',
    sortable: true
  },
  {
    key: 'city',
    label: 'City',
    sortable: false
  },
  {
    key: 'contactPerson',
    label: 'Contact Person',
    sortable: false
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    render: (value) => (
      <Badge 
        variant={value === 'active' ? 'default' : 'secondary'}
        className={`text-xs ${
          value === 'active' 
            ? 'bg-green-100 text-green-800 border-green-200' 
            : 'bg-gray-100 text-gray-800 border-gray-200'
        }`}
      >
        {value}
      </Badge>
    )
  },
  {
    key: 'actions',
    label: 'Actions',
    sortable: false
  }
];

const bankMockData = [
  {
    id: '1',
    bankName: 'HDFC Bank',
    bankCode: 'HDFC001',
    country: 'India',
    city: 'Mumbai',
    contactPerson: 'Raj Patel',
    status: 'active'
  },
  {
    id: '2',
    bankName: 'Axis Bank',
    bankCode: 'AXIS002',
    country: 'India',
    city: 'Bangalore',
    contactPerson: 'Priya Sharma',
    status: 'active'
  }
];

export const BankSearchExample: React.FC = () => {
  const handleSearch = (filters: any) => {
    console.log('Bank search filters:', filters);
  };

  const handleAction = (action: string, row: any) => {
    console.log(`Bank action: ${action}`, row);
  };

  return (
    <ReusableSearchComponent
      title="Bank"
      searchFields={bankSearchFields}
      tableColumns={bankTableColumns}
      data={bankMockData}
      onSearch={handleSearch}
      onAction={handleAction}
      actions={programManagerActions}
      exportFileName="bank"
    />
  );
};

// Example: ISO Search Configuration
const isoSearchFields: SearchField[] = [
  {
    name: 'isoName',
    label: 'ISO Name',
    type: 'text',
    placeholder: 'Enter ISO name'
  },
  {
    name: 'isoCode',
    label: 'ISO Code',
    type: 'text',
    placeholder: 'Enter ISO code'
  },
  {
    name: 'processor',
    label: 'Processor',
    type: 'select',
    placeholder: 'Select processor',
    options: [
      { value: 'visa', label: 'Visa' },
      { value: 'mastercard', label: 'Mastercard' },
      { value: 'amex', label: 'American Express' },
      { value: 'discover', label: 'Discover' }
    ]
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    placeholder: 'Select status',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'pending', label: 'Pending' }
    ]
  }
];

const isoTableColumns: TableColumn[] = [
  {
    key: 'isoName',
    label: 'ISO Name',
    sortable: true,
    className: 'font-medium'
  },
  {
    key: 'isoCode',
    label: 'ISO Code',
    sortable: true
  },
  {
    key: 'processor',
    label: 'Processor',
    sortable: true
  },
  {
    key: 'contactPerson',
    label: 'Contact Person',
    sortable: false
  },
  {
    key: 'phoneNumber',
    label: 'Phone Number',
    sortable: false
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    render: (value) => (
      <Badge 
        variant={value === 'active' ? 'default' : 'secondary'}
        className={`text-xs ${
          value === 'active' 
            ? 'bg-green-100 text-green-800 border-green-200' 
            : 'bg-gray-100 text-gray-800 border-gray-200'
        }`}
      >
        {value}
      </Badge>
    )
  },
  {
    key: 'actions',
    label: 'Actions',
    sortable: false
  }
];

export const ISOSearchExample: React.FC = () => {
  return (
    <ReusableSearchComponent
      title="ISO"
      searchFields={isoSearchFields}
      tableColumns={isoTableColumns}
      data={[]}
      onSearch={() => {}}
      onAction={() => {}}
      actions={programManagerActions}
      exportFileName="iso"
    />
  );
};

export default ProgramManagerSearchExample;
