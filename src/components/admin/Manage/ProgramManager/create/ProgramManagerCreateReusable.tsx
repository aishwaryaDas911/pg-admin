import React from 'react';
import { z } from 'zod';
import { ReusableFormGenerator, FormSection } from '@/components/common/ReusableFormGenerator';
import { useToast } from '@/hooks/use-toast';
import { Info, User, MapPin, Settings, Clock } from 'lucide-react';

interface ProgramManagerCreateReusableProps {
  tabName: string;
  handleChangeTab: (tab: string) => void;
  tableActionState: string;
  setTableActionState: (state: string) => void;
  isTableDataChanged: boolean;
  setIsTableDataChanged: (changed: boolean) => void;
}

// Validation schema for Program Manager
const programManagerValidationSchema = z.object({
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
  extension: z
    .string()
    .trim()
    .optional()
    .or(z.literal('')),
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
    .min(1, 'State is required'),
  programManagerTimeZone: z
    .string()
    .min(1, 'Time Zone is required'),
  batchPrefix: z
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9]+$/, 'Please enter a valid batch prefix')
    .min(1, 'Batch Prefix is required'),
  schedulerRunTime: z
    .string()
    .min(1, 'Scheduler Run Time is required'),
  associatedBankNames: z
    .string()
    .min(1, 'At least one associated bank is required'),
  programManagerLogo: z
    .any()
    .optional()
});

// Form sections configuration
const programManagerSections: FormSection[] = [
  {
    title: 'Basic Information',
    icon: <Info className="h-4 w-4 text-primary" />,
    fields: [
      {
        name: 'programManagerName',
        label: 'Program Manager Name',
        type: 'text',
        placeholder: 'Enter program manager name',
        required: true,
        grid: { span: 1 }
      },
      {
        name: 'companyName',
        label: 'Company Name',
        type: 'text',
        placeholder: 'Enter company name',
        required: true,
        grid: { span: 1 }
      },
      {
        name: 'businessEntityName',
        label: 'Business Entity Name',
        type: 'text',
        placeholder: 'Enter business entity name',
        required: true,
        grid: { span: 1 }
      },
      {
        name: 'contactPerson',
        label: 'Contact Person',
        type: 'text',
        placeholder: 'Enter contact person',
        required: true,
        grid: { span: 1 }
      }
    ]
  },
  {
    title: 'Contact Details',
    icon: <User className="h-4 w-4 text-primary" />,
    fields: [
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
        name: 'emailId',
        label: 'Email ID',
        type: 'email',
        placeholder: 'Enter email address',
        required: true,
        grid: { span: 1 }
      },
      {
        name: 'currency',
        label: 'Currency',
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
      }
    ]
  },
  {
    title: 'Location & Configuration',
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
          { value: 'DE', label: 'Germany' },
          { value: 'IN', label: 'India' },
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
        name: 'programManagerTimeZone',
        label: 'Program Manager Time Zone',
        type: 'select',
        placeholder: 'Select timezone',
        required: true,
        options: [
          { value: 'UTC-8', label: 'UTC-08:00 (PST)' },
          { value: 'UTC-5', label: 'UTC-05:00 (EST)' },
          { value: 'UTC+0', label: 'UTC+00:00 (GMT)' },
          { value: 'UTC+5:30', label: 'UTC+05:30 (IST)' }
        ],
        grid: { span: 1 }
      },
      {
        name: 'batchPrefix',
        label: 'Batch Prefix',
        type: 'text',
        placeholder: 'Enter batch prefix',
        required: true,
        grid: { span: 1 }
      }
    ]
  },
  {
    title: 'Scheduler & Logo',
    icon: <Clock className="h-4 w-4 text-primary" />,
    fields: [
      {
        name: 'schedulerRunTime',
        label: 'Scheduler Run Time',
        type: 'time',
        placeholder: '00:00:00',
        required: true,
        grid: { span: 1 }
      },
      {
        name: 'associatedBankNames',
        label: 'Associated Bank Name(s)',
        type: 'text',
        placeholder: 'Enter bank names (comma separated)',
        required: true,
        grid: { span: 2 }
      },
      {
        name: 'programManagerLogo',
        label: 'Program Manager Logo',
        type: 'file',
        accept: 'image/*',
        required: false,
        grid: { span: 1 }
      }
    ]
  }
];

// Default values
const defaultValues = {
  programManagerName: '',
  companyName: '',
  businessEntityName: '',
  contactPerson: '',
  phoneNumber: '',
  extension: '',
  emailId: '',
  currency: '',
  country: '',
  state: '',
  programManagerTimeZone: '',
  batchPrefix: '',
  schedulerRunTime: '00:00:00',
  associatedBankNames: '',
  programManagerLogo: null
};

export const ProgramManagerCreateReusable: React.FC<ProgramManagerCreateReusableProps> = ({
  tabName,
  handleChangeTab,
  tableActionState,
  setTableActionState,
  isTableDataChanged,
  setIsTableDataChanged
}) => {
  const { toast } = useToast();

  // Handle form submission
  const handleSubmit = async (data: any) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const action = tableActionState === 'edit' ? 'updated' : 'created';
      
      toast({
        title: `Program Manager ${action.charAt(0).toUpperCase() + action.slice(1)} Successfully`,
        description: `${data.programManagerName} has been ${action} successfully.`,
      });
      
      setTableActionState('');
      setIsTableDataChanged(true);
      handleChangeTab('search');
      
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving the Program Manager.",
        variant: "destructive"
      });
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setTableActionState('');
    setIsTableDataChanged(false);
    handleChangeTab('search');
  };

  // Handle reset
  const handleReset = () => {
    setIsTableDataChanged(false);
  };

  // Get form title and action state
  const getFormTitle = () => {
    if (tableActionState === 'view') return 'View Program Manager';
    if (tableActionState === 'edit') return 'Edit Program Manager';
    return 'Create Program Manager';
  };

  const getActionState = (): 'create' | 'edit' | 'view' => {
    if (tableActionState === 'view') return 'view';
    if (tableActionState === 'edit') return 'edit';
    return 'create';
  };

  return (
    <ReusableFormGenerator
      title={getFormTitle()}
      description="Configure a new program manager with all required details"
      sections={programManagerSections}
      validationSchema={programManagerValidationSchema}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onReset={handleReset}
      actionState={getActionState()}
      submitLabel={tableActionState === 'edit' ? 'Update' : 'Create'}
    />
  );
};

export default ProgramManagerCreateReusable;
