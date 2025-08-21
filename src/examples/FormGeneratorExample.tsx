import React from 'react';
import { FormGenerator, FormField, TableConfig } from '@/components/common';

const FormGeneratorExample: React.FC = () => {
  // Example field configuration
  const searchFields: FormField[] = [
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
      label: 'Status',
      hide: false,
      dropdown: {
        name: 'status',
        placeholder: 'Select status',
        options: [
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
          { label: 'Pending', value: 'pending' },
          { label: 'Suspended', value: 'suspended' }
        ],
        mandatory: false
      }
    },
    {
      label: 'Registration Date',
      hide: false,
      datePicker: {
        name: 'registrationDate',
        mandatory: false
      }
    },
    {
      label: 'Date Range',
      hide: false,
      dateRangePicker: {
        name: 'dateRange',
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
          { label: 'United States', value: 'us' },
          { label: 'Canada', value: 'ca' },
          { label: 'United Kingdom', value: 'uk' },
          { label: 'Germany', value: 'de' },
          { label: 'France', value: 'fr' }
        ],
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
      label: 'Export',
      hide: false,
      button: {
        name: 'export',
        label: 'Export',
        variant: 'secondary',
        size: 'default',
        onClick: () => {
          alert('Export functionality would be implemented here');
        }
      }
    }
  ];

  // Example table configuration
  const tableConfig: TableConfig = {
    columns: [
      { key: 'id', label: 'Merchant ID', sortable: true },
      { key: 'name', label: 'Merchant Name', sortable: true },
      { key: 'status', label: 'Status', sortable: true },
      { key: 'country', label: 'Country', sortable: false },
      { key: 'registrationDate', label: 'Registration Date', sortable: true },
      { key: 'lastActivity', label: 'Last Activity', sortable: true }
    ],
    rows: [
      {
        id: 'MER001',
        name: 'Tech Solutions Inc.',
        status: 'Active',
        country: 'United States',
        registrationDate: '2024-01-15',
        lastActivity: '2024-01-20'
      },
      {
        id: 'MER002',
        name: 'Digital Commerce Ltd.',
        status: 'Active',
        country: 'Canada',
        registrationDate: '2024-01-10',
        lastActivity: '2024-01-19'
      },
      {
        id: 'MER003',
        name: 'Global Payments Co.',
        status: 'Pending',
        country: 'United Kingdom',
        registrationDate: '2024-01-18',
        lastActivity: '2024-01-18'
      },
      {
        id: 'MER004',
        name: 'European Retail Group',
        status: 'Active',
        country: 'Germany',
        registrationDate: '2024-01-12',
        lastActivity: '2024-01-20'
      },
      {
        id: 'MER005',
        name: 'French Market Solutions',
        status: 'Inactive',
        country: 'France',
        registrationDate: '2024-01-08',
        lastActivity: '2024-01-16'
      }
    ]
  };

  const handleFormSubmit = (data: any) => {
    console.log('Form submitted with data:', data);
    // Here you would typically send the data to your API
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Merchant Search</h1>
        <p className="text-muted-foreground">
          Use the form below to search for merchants. Click "Search" to display results.
        </p>
      </div>

      <FormGenerator
        fields={searchFields}
        tableDataConfig={tableConfig}
        onSubmit={handleFormSubmit}
        className="bg-card p-6 rounded-lg border border-border shadow-sm"
      />

      <div className="mt-8 p-4 bg-muted/50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">How to Use FormGenerator</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Define your fields array with input, dropdown, datePicker, dateRangePicker, or button types</li>
          <li>• Configure table columns and sample data</li>
          <li>• The search button toggles table visibility</li>
          <li>• The reset button clears all form fields and hides the table</li>
          <li>• Custom buttons can have their own onClick handlers</li>
          <li>• The component is fully responsive and accessible</li>
        </ul>
      </div>
    </div>
  );
};

export default FormGeneratorExample;
