# Reusable Components Guide

This guide explains how to use the reusable components to maintain consistent UI/UX across all admin modules, following the exact design patterns shown in the Program Manager interface.

## Components Overview

1. **ReusableSearchComponent** - For search interfaces with filters and results tables
2. **ReusableFormGenerator** - For create/edit/view forms
3. **Tab Interface** - Consistent tab structure across modules

## 🔍 ReusableSearchComponent

### Purpose
Creates consistent search interfaces with filters and results tables that match the Program Manager design.

### Key Features
- **Search Filters Section**: Organized filter fields with consistent styling
- **Results Table**: Clean table with action buttons and export functionality
- **Export Options**: PDF and CSV export with proper formatting
- **Action Buttons**: View, Edit, Delete with consistent colors and tooltips
- **Responsive Design**: Works on all screen sizes

### Basic Usage

```tsx
import { ReusableSearchComponent, SearchField, TableColumn } from '@/components/common/ReusableSearchComponent';

const searchFields: SearchField[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Enter name'
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    placeholder: 'Select status',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' }
    ]
  }
];

const tableColumns: TableColumn[] = [
  {
    key: 'name',
    label: 'Name',
    sortable: true,
    className: 'font-medium'
  },
  {
    key: 'status',
    label: 'Status',
    render: (value) => <Badge>{value}</Badge>
  },
  {
    key: 'actions',
    label: 'Actions'
  }
];

<ReusableSearchComponent
  title="Module Name"
  searchFields={searchFields}
  tableColumns={tableColumns}
  data={data}
  onSearch={handleSearch}
  onAction={handleAction}
  exportFileName="module_name"
/>
```

### Search Field Types

#### Text Input
```tsx
{
  name: 'fieldName',
  label: 'Field Label',
  type: 'text',
  placeholder: 'Enter value',
  required: false
}
```

#### Select Dropdown
```tsx
{
  name: 'status',
  label: 'Status',
  type: 'select',
  placeholder: 'Select status',
  options: [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ]
}
```

### Table Column Configuration

#### Basic Column
```tsx
{
  key: 'fieldName',
  label: 'Display Label',
  sortable: true,
  className: 'font-medium' // Optional styling
}
```

#### Custom Rendered Column
```tsx
{
  key: 'status',
  label: 'Status',
  render: (value, row) => (
    <Badge variant={value === 'active' ? 'default' : 'secondary'}>
      {value}
    </Badge>
  )
}
```

### Action Configuration

```tsx
const actions: ActionConfig[] = [
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
    tooltip: 'Edit',
    condition: (row) => row.status === 'active' // Optional condition
  },
  {
    type: 'delete',
    icon: Trash2,
    color: 'red',
    tooltip: 'Delete'
  }
];
```

## 📝 ReusableFormGenerator

### Purpose
Creates consistent create/edit/view forms that match the Program Manager design.

### Key Features
- **Section-based Layout**: Organize fields into logical sections with icons
- **Responsive Grid**: Automatic responsive layout with customizable spans
- **Field Types**: Text, email, phone, select, file upload, etc.
- **Validation**: Built-in Zod schema validation
- **Action States**: Create, Edit, View modes
- **File Upload**: Integrated file upload handling

### Basic Usage

```tsx
import { ReusableFormGenerator, FormSection } from '@/components/common/ReusableFormGenerator';

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
        grid: { span: 2 }
      }
    ]
  }
];

<ReusableFormGenerator
  title="Create Module"
  description="Create a new module with required details"
  sections={sections}
  validationSchema={validationSchema}
  defaultValues={defaultValues}
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  actionState="create"
/>
```

## 🗂️ Tab Interface Structure

### Consistent Tab Layout
Every module should follow this tab structure:

```tsx
<Tabs value={activeTab} onValueChange={handleTabChange}>
  <TabsList className="grid w-full grid-cols-2 bg-transparent">
    <TabsTrigger value="search">
      <Search className="h-4 w-4" />
      <span>Search</span>
    </TabsTrigger>
    <TabsTrigger value="create">
      {getSecondTabIcon()}
      <span>{getSecondTabLabel()}</span>
    </TabsTrigger>
  </TabsList>

  <TabsContent value="search">
    <ReusableSearchComponent {...searchProps} />
  </TabsContent>

  <TabsContent value="create">
    <ReusableFormGenerator {...formProps} />
  </TabsContent>
</Tabs>
```

## 🎨 Design Consistency

### Colors and Styling
- **Primary Actions**: Black buttons for search (`bg-black hover:bg-gray-800`)
- **Secondary Actions**: Outline buttons for reset
- **Status Badges**: 
  - Active: `bg-green-100 text-green-800`
  - Pending: `bg-yellow-100 text-yellow-800`
  - Inactive: `bg-gray-100 text-gray-800`
- **Action Button Colors**:
  - View: Blue (`text-blue-600 hover:bg-blue-50`)
  - Edit: Green (`text-green-600 hover:bg-green-50`)
  - Delete: Red (`text-red-600 hover:bg-red-50`)

### Layout Standards
- **Card Shadows**: `shadow-sm border-border/50`
- **Section Headers**: Icon + title with `text-sm font-medium text-muted-foreground`
- **Grid Layout**: Responsive 4-column grid for forms, filters
- **Spacing**: Consistent `space-y-6` between major sections

## 📋 Module Implementation Checklist

When creating a new module, follow this checklist:

### 1. Search Component Setup
- [ ] Define search fields with proper types and placeholders
- [ ] Configure table columns with appropriate rendering
- [ ] Set up action handlers for view/edit/delete
- [ ] Configure export functionality
- [ ] Add proper loading states

### 2. Form Component Setup
- [ ] Organize fields into logical sections with icons
- [ ] Define Zod validation schema
- [ ] Set up default values
- [ ] Configure grid spans for responsive layout
- [ ] Add file upload fields if needed

### 3. Tab Interface Setup
- [ ] Implement consistent tab structure
- [ ] Add proper tab state management
- [ ] Set up tab change handlers
- [ ] Configure dynamic tab labels (Create/Edit/View)

### 4. Integration
- [ ] Connect search to form for edit/view actions
- [ ] Implement proper state management
- [ ] Add toast notifications
- [ ] Test all user flows

## 📁 Example Module Structure

```
src/components/admin/Manage/ModuleName/
├── ModuleNameModule.tsx        # Main component with tabs
├── search/
│   └── ModuleNameSearchComponent.tsx
├── create/
│   └── ModuleNameCreateComponent.tsx
└── config/
    └── ModuleNameConfig.ts     # Configuration and validation
```

## 🔧 Advanced Customization

### Custom Field Rendering in Forms
```tsx
{
  name: 'customField',
  label: 'Custom Field',
  type: 'text', // Base type
  render: (field, methods) => (
    // Custom JSX for complex fields
    <CustomComponent {...field} />
  )
}
```

### Custom Action Conditions
```tsx
{
  type: 'edit',
  icon: Edit,
  color: 'green',
  tooltip: 'Edit',
  condition: (row) => row.status === 'active' && row.canEdit
}
```

### Dynamic Search Fields
```tsx
const getSearchFields = (userRole: string): SearchField[] => {
  const baseFields = [...commonFields];
  
  if (userRole === 'admin') {
    baseFields.push(...adminOnlyFields);
  }
  
  return baseFields;
};
```

This reusable component system ensures consistent UI/UX across all admin modules while maintaining the exact design patterns from the Program Manager interface.
