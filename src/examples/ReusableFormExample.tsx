import React from 'react';
import { z } from 'zod';
import { ReusableFormGenerator, FormSection } from '@/components/common/ReusableFormGenerator';
import { Info, Building, User, MapPin, Settings } from 'lucide-react';

// Example validation schema
const bankValidationSchema = z.object({
  bankName: z.string().min(1, 'Bank name is required'),
  bankCode: z.string().min(1, 'Bank code is required'),
  contactPerson: z.string().min(1, 'Contact person is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  emailAddress: z.string().email('Invalid email address'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  currency: z.string().min(1, 'Currency is required'),
  routingNumber: z.string().min(1, 'Routing number is required'),
  accountNumber: z.string().min(1, 'Account number is required')
});

// Example form configuration for Bank Management
const bankFormSections: FormSection[] = [
  {
    title: 'Basic Information',
    icon: <Info className="h-4 w-4 text-primary" />,
    fields: [
      {
        name: 'bankName',
        label: 'Bank Name',
        type: 'text',
        placeholder: 'Enter bank name',
        required: true,
        grid: { span: 1 }
      },
      {
        name: 'bankCode',
        label: 'Bank Code',
        type: 'text',
        placeholder: 'Enter bank code',
        required: true,
        grid: { span: 1 }
      },
      {
        name: 'swiftCode',
        label: 'SWIFT Code',
        type: 'text',
        placeholder: 'Enter SWIFT code',
        required: false,
        grid: { span: 1 }
      },
      {
        name: 'bankLogo',
        label: 'Bank Logo',
        type: 'file',
        accept: 'image/*',
        required: false,
        grid: { span: 1 }
      }
    ]
  },
  {
    title: 'Contact Details',
    icon: <User className="h-4 w-4 text-primary" />,
    fields: [
      {
        name: 'contactPerson',
        label: 'Contact Person',
        type: 'text',
        placeholder: 'Enter contact person name',
        required: true,
        grid: { span: 1 }
      },
      {
        name: 'phoneNumber',
        label: 'Phone Number',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: true,
        grid: { span: 1 }
      },
      {
        name: 'extension',
        label: 'Extension',
        type: 'text',
        placeholder: 'Enter extension',
        required: false,
        grid: { span: 1 }
      },
      {
        name: 'emailAddress',
        label: 'Email Address',
        type: 'email',
        placeholder: 'Enter email address',
        required: true,
        grid: { span: 1 }
      }
    ]
  },
  {
    title: 'Location Information',
    icon: <MapPin className="h-4 w-4 text-primary" />,
    fields: [
      {
        name: 'country',
        label: 'Country',
        type: 'select',
        placeholder: 'Select country',
        required: true,
        options: [
          { value: 'US', label: 'United States' },
          { value: 'IN', label: 'India' },
          { value: 'DE', label: 'Germany' },
          { value: 'UK', label: 'United Kingdom' }
        ],
        grid: { span: 1 }
      },
      {
        name: 'state',
        label: 'State',
        type: 'select',
        placeholder: 'Select state',
        required: true,
        options: [
          { value: 'CA', label: 'California' },
          { value: 'NY', label: 'New York' },
          { value: 'TX', label: 'Texas' },
          { value: 'FL', label: 'Florida' }
        ],
        grid: { span: 1 }
      },
      {
        name: 'city',
        label: 'City',
        type: 'text',
        placeholder: 'Enter city',
        required: true,
        grid: { span: 1 }
      },
      {
        name: 'zipCode',
        label: 'ZIP Code',
        type: 'text',
        placeholder: 'Enter ZIP code',
        required: false,
        grid: { span: 1 }
      }
    ]
  },
  {
    title: 'Banking Configuration',
    icon: <Settings className="h-4 w-4 text-primary" />,
    fields: [
      {
        name: 'currency',
        label: 'Local Currency',
        type: 'select',
        placeholder: 'Select currency',
        required: true,
        options: [
          { value: 'USD', label: 'USD' },
          { value: 'EUR', label: 'EUR' },
          { value: 'INR', label: 'INR' },
          { value: 'GBP', label: 'GBP' }
        ],
        grid: { span: 1 }
      },
      {
        name: 'routingNumber',
        label: 'Routing Number',
        type: 'text',
        placeholder: 'Enter routing number',
        required: true,
        grid: { span: 1 }
      },
      {
        name: 'accountNumber',
        label: 'Account Number',
        type: 'text',
        placeholder: 'Enter account number',
        required: true,
        grid: { span: 2 }
      }
    ]
  }
];

// Example default values
const bankDefaultValues = {
  bankName: '',
  bankCode: '',
  swiftCode: '',
  contactPerson: '',
  phoneNumber: '',
  extension: '',
  emailAddress: '',
  country: '',
  state: '',
  city: '',
  zipCode: '',
  currency: '',
  routingNumber: '',
  accountNumber: '',
  bankLogo: null
};

export const BankCreateExample: React.FC = () => {
  const handleSubmit = async (data: any) => {
    console.log('Bank form submitted:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Bank created successfully!');
  };

  const handleCancel = () => {
    console.log('Bank form cancelled');
  };

  const handleReset = () => {
    console.log('Bank form reset');
  };

  return (
    <ReusableFormGenerator
      title="Create Bank"
      description="Configure a new bank with contact and account details"
      sections={bankFormSections}
      validationSchema={bankValidationSchema}
      defaultValues={bankDefaultValues}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onReset={handleReset}
      actionState="create"
      submitLabel="Create Bank"
    />
  );
};

// Example for ISO Management
const isoFormSections: FormSection[] = [
  {
    title: 'ISO Information',
    icon: <Building className="h-4 w-4 text-primary" />,
    fields: [
      {
        name: 'isoName',
        label: 'ISO Name',
        type: 'text',
        placeholder: 'Enter ISO name',
        required: true,
        grid: { span: 2 }
      },
      {
        name: 'isoCode',
        label: 'ISO Code',
        type: 'text',
        placeholder: 'Enter ISO code',
        required: true,
        grid: { span: 1 }
      },
      {
        name: 'processor',
        label: 'Processor',
        type: 'select',
        placeholder: 'Select processor',
        required: true,
        options: [
          { value: 'visa', label: 'Visa' },
          { value: 'mastercard', label: 'Mastercard' },
          { value: 'amex', label: 'American Express' },
          { value: 'discover', label: 'Discover' }
        ],
        grid: { span: 1 }
      }
    ]
  },
  {
    title: 'Contact & Details',
    icon: <User className="h-4 w-4 text-primary" />,
    fields: [
      {
        name: 'contactPerson',
        label: 'Contact Person',
        type: 'text',
        placeholder: 'Enter contact person',
        required: true,
        grid: { span: 1 }
      },
      {
        name: 'phoneNumber',
        label: 'Phone Number',
        type: 'tel',
        placeholder: 'Enter phone number',
        required: true,
        grid: { span: 1 }
      },
      {
        name: 'emailAddress',
        label: 'Email Address',
        type: 'email',
        placeholder: 'Enter email address',
        required: true,
        grid: { span: 1 }
      },
      {
        name: 'isoLogo',
        label: 'ISO Logo',
        type: 'file',
        accept: 'image/*',
        required: false,
        grid: { span: 1 }
      }
    ]
  }
];

export const ISOCreateExample: React.FC = () => {
  const handleSubmit = async (data: any) => {
    console.log('ISO form submitted:', data);
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('ISO created successfully!');
  };

  return (
    <ReusableFormGenerator
      title="Create ISO"
      description="Configure a new ISO with contact and banking details"
      sections={isoFormSections}
      defaultValues={{
        isoName: '',
        isoCode: '',
        processor: '',
        contactPerson: '',
        phoneNumber: '',
        emailAddress: '',
        isoLogo: null
      }}
      onSubmit={handleSubmit}
      actionState="create"
      submitLabel="Create ISO"
    />
  );
};

export default BankCreateExample;
