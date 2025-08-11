# Reusable Form Generator

The `ReusableFormGenerator` component provides a standardized way to create forms that match the UI design shown in the Program Manager Create form. It's designed to be used across all modules for consistent form design and behavior.

## Features

- **Consistent Design**: Matches the exact UI design from the Program Manager form
- **Section-based Layout**: Organize fields into logical sections with icons and separators
- **Responsive Grid**: Automatic responsive layout with customizable column spans
- **Field Types**: Supports text, email, phone, select, file upload, and more
- **Validation**: Built-in Zod schema validation support
- **Action States**: Create, Edit, and View modes
- **Loading States**: Built-in loading and submission states
- **File Upload**: Integrated file upload handling
- **Form Actions**: Cancel, Reset, and Submit with confirmation dialogs

## Basic Usage

```tsx
import { ReusableFormGenerator, FormSection } from '@/components/common/ReusableFormGenerator';
import { z } from 'zod';

// Define validation schema
const validationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  // ... other fields
});

// Define form sections
const sections: FormSection[] = [
  {
    title: 'Basic Information',
    icon: <Info className="h-4 w-4 text-primary" />,
    fields: [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Enter name',
        required: true,
        grid: { span: 2 } // Takes 2 columns in the grid
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter email',
        required: true,
        grid: { span: 1 } // Takes 1 column
      }
    ]
  }
];

// Use the component
<ReusableFormGenerator
  title="Create User"
  description="Create a new user with all required details"
  sections={sections}
  validationSchema={validationSchema}
  defaultValues={{ name: '', email: '' }}
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  actionState="create"
/>
```

## Field Types

### Text Input
```tsx
{
  name: 'fieldName',
  label: 'Field Label',
  type: 'text',
  placeholder: 'Enter value',
  required: true,
  grid: { span: 1 }
}
```

### Select Dropdown
```tsx
{
  name: 'country',
  label: 'Country',
  type: 'select',
  placeholder: 'Select country',
  required: true,
  options: [
    { value: 'US', label: 'United States' },
    { value: 'IN', label: 'India' }
  ],
  grid: { span: 1 }
}
```

### File Upload
```tsx
{
  name: 'logo',
  label: 'Logo',
  type: 'file',
  accept: 'image/*',
  required: false,
  grid: { span: 1 }
}
```

### Other Types
- `email`: Email input with validation
- `tel`: Phone number input
- `time`: Time picker
- `number`: Number input
- `password`: Password input
- `url`: URL input

## Grid System

The form uses a responsive 4-column grid:
- Mobile: 1 column
- Tablet: 2 columns  
- Desktop: 4 columns

You can control how many columns a field spans using the `grid.span` property:
- `span: 1` - Takes 1 column (default)
- `span: 2` - Takes 2 columns
- `span: 3` - Takes 3 columns
- `span: 4` - Takes full width

## Sections

Organize related fields into sections with titles and icons:

```tsx
const sections: FormSection[] = [
  {
    title: 'Basic Information',
    icon: <Info className="h-4 w-4 text-primary" />,
    fields: [/* fields */]
  },
  {
    title: 'Contact Details', 
    icon: <User className="h-4 w-4 text-primary" />,
    fields: [/* fields */]
  }
];
```

## Action States

The form supports three states:
- `create`: New record creation (default)
- `edit`: Editing existing record
- `view`: Read-only view mode

## Props Interface

```tsx
interface ReusableFormGeneratorProps {
  title: string;                    // Form title
  description?: string;             // Optional description
  sections: FormSection[];          // Form sections
  validationSchema?: z.ZodSchema;   // Zod validation schema
  defaultValues?: Record<string, any>; // Default form values
  onSubmit: (data: any) => Promise<void> | void; // Submit handler
  onCancel?: () => void;           // Cancel handler
  onReset?: () => void;            // Reset handler
  actionState?: 'create' | 'edit' | 'view'; // Form state
  submitLabel?: string;            // Custom submit button label
  loading?: boolean;               // External loading state
  className?: string;              // Additional CSS classes
}
```

## Examples

See `src/examples/ReusableFormExample.tsx` for complete examples of:
- Bank creation form
- ISO creation form
- Different field types and layouts

## Migration from Old Forms

To migrate existing forms to use the reusable generator:

1. Extract field definitions into the `FormSection` format
2. Move validation schema to Zod
3. Replace the form JSX with `ReusableFormGenerator`
4. Update handlers to match the new interface

This ensures consistent UI/UX across all forms in the application while maintaining the exact design from the Program Manager form.
