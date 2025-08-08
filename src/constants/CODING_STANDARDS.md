# Coding Standards and Architecture

This document outlines the standardized coding practices and architecture implemented across all modules in the application.

## 📁 Folder Structure

### Module Organization
All modules follow a consistent folder structure pattern:

```
src/
├── components/
│   └── admin/
│       ├── Manage/           # Entity management modules
│       │   ├── Bank/
│       │   │   ├── BankForm.tsx
│       │   │   └── index.ts
│       │   ├── Merchant/
│       │   ├── SubMerchant/
│       │   ├── MerchantGroup/
│       │   ├── ISO/
│       │   ├── ProgramManager/
│       │   └── AcquirerProtocol/
│       └── Programs/         # Program-related modules
│           └── FeeProgram/
├── services/                 # API services
├── hooks/                    # Custom React hooks
├── types/                    # TypeScript type definitions
├── constants/                # Application constants
├── config/                   # Configuration files
└── utils/                    # Utility functions
```

### Module Structure Rules

1. **Each module must have its own folder** under the appropriate category (`Manage/`, `Programs/`, etc.)
2. **Each module folder must contain:**
   - Main component file (e.g., `BankForm.tsx`)
   - `index.ts` file for clean exports
3. **Consistent naming convention:**
   - Folder names use PascalCase (e.g., `MerchantGroup`)
   - Component files use PascalCase with descriptive suffix (e.g., `BankForm.tsx`)

## 🔧 Services Architecture

### Base Service
All API communication goes through the centralized `baseService`:

```typescript
// src/services/baseService.ts
import { baseService } from '@/services/baseService';

// Usage
const response = await baseService.get('/endpoint');
const data = await baseService.post('/endpoint', payload);
```

### Entity Services
Each entity has its own service that extends the base service:

```typescript
// src/services/entityService.ts
import { bankService } from '@/services/entityService';

// CRUD operations
const banks = await bankService.getAll(page, limit);
const bank = await bankService.getById(id);
const newBank = await bankService.create(bankData);
const updatedBank = await bankService.update(id, bankData);
await bankService.delete(id);
```

### Service Features
- **Automatic error handling** with toast notifications
- **Request/response interceptors** for auth and logging
- **File upload support** with progress tracking
- **Pagination support** with consistent API
- **Export functionality** (CSV, PDF, Excel)
- **Search capabilities** with filtering
- **Bulk operations** for efficiency

## 🎯 Hooks Usage

### Entity Service Hook
Use the `useEntityService` hook for consistent data management:

```typescript
import { useEntityService } from '@/hooks/useEntityService';
import { bankService } from '@/services/entityService';

const BankComponent = () => {
  const {
    data,
    loading,
    error,
    pagination,
    actions
  } = useEntityService(bankService, {
    autoLoad: true,
    page: 1,
    limit: 10
  });

  // Available actions
  const handleCreate = async (bankData) => {
    await actions.createItem(bankData);
  };

  const handleUpdate = async (id, bankData) => {
    await actions.updateItem(id, bankData);
  };

  const handleDelete = async (id) => {
    await actions.deleteItem(id);
  };

  const handleSearch = async (query) => {
    await actions.searchItems(query);
  };

  const handleExport = async (format) => {
    await actions.exportData(format);
  };
};
```

## 📝 Constants Management

### Centralized Constants
All static text, labels, and configuration values are stored in the constants file:

```typescript
// src/constants/adminConstants.ts
export const ADMIN_STRINGS = {
  FORM_LABELS: {
    BANK_NAME: 'Bank Name',
    EMAIL_ADDRESS: 'Email Address',
    // ... more labels
  },
  VALIDATION: {
    REQUIRED: 'is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    // ... more validation messages
  },
  TOAST: {
    CREATED_SUCCESS: 'Created Successfully',
    // ... more toast messages
  }
};
```

### Usage in Components
Always use constants instead of hardcoded strings:

```typescript
// ✅ Good
<Label>{ADMIN_STRINGS.FORM_LABELS.BANK_NAME}</Label>

// ❌ Bad
<Label>Bank Name</Label>
```

## 🔒 Type Safety

### Entity Types
All entities have strongly typed interfaces:

```typescript
// src/types/entities.ts
export interface Bank extends BaseEntity {
  bankName: string;
  bankCode: string;
  emailAddress: string;
  // ... other properties
}

export type CreateBank = Omit<Bank, keyof BaseEntity>;
export type UpdateBank = Partial<CreateBank>;
```

### Service Types
Services are type-safe with generic constraints:

```typescript
const bankService = new EntityService<Bank, CreateBank, UpdateBank>('/banks');
```

## 🛠 Utility Functions

### Validation Utilities
Use standardized validation functions:

```typescript
import { VALIDATION_RULES, createValidator } from '@/utils/entityUtils';

const validateBankForm = createValidator({
  bankName: VALIDATION_RULES.required('Bank Name'),
  emailAddress: VALIDATION_RULES.email,
  phoneNumber: VALIDATION_RULES.phone,
});

const errors = validateBankForm(formData);
```

### Common Utilities
Leverage utility functions for consistency:

```typescript
import { 
  formatDate, 
  formatFileSize, 
  searchEntities,
  generateExportFilename 
} from '@/utils/entityUtils';

// Date formatting
const formattedDate = formatDate(bank.createdAt);

// File operations
const fileSize = formatFileSize(file.size);

// Search functionality
const filteredBanks = searchEntities(banks, query, ['bankName', 'bankCode']);

// Export filename generation
const filename = generateExportFilename('banks', 'csv');
```

## ⚙️ Configuration

### API Configuration
Centralized API configuration:

```typescript
// src/config/apiConfig.ts
export const API_CONFIG = {
  BASE_URL: process.env.VITE_API_BASE_URL,
  ENDPOINTS: {
    BANKS: '/banks',
    MERCHANTS: '/merchants',
    // ... other endpoints
  },
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
  }
};
```

### Environment-Specific Config
Different configurations for different environments:

```typescript
import { getEnvironmentConfig } from '@/config/apiConfig';

const envConfig = getEnvironmentConfig();
// Returns development, staging, or production config
```

## 🧪 Error Handling

### Consistent Error Handling
All API calls are wrapped with consistent error handling:

```typescript
try {
  const response = await bankService.create(bankData);
  // Success is automatically handled with toast
} catch (error) {
  // Error is automatically handled with toast
  // Component state is updated with error info
}
```

### Form Validation
Standardized form validation with error display:

```typescript
const [errors, setErrors] = useState<Record<string, string>>({});

const validateForm = (): boolean => {
  const newErrors = validateBankForm(formData);
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

## 📤 Export Functionality

### Standardized Export
All entities support export functionality:

```typescript
// Export data in various formats
await bankService.export('csv', filters);
await bankService.export('pdf', filters);
await bankService.export('excel', filters);
```

## 🔄 State Management

### Local State Pattern
Consistent state management pattern for forms:

```typescript
const [formData, setFormData] = useState<CreateBank>(initialData);
const [errors, setErrors] = useState<Record<string, string>>({});
const [loading, setLoading] = useState(false);

const handleInputChange = (field: keyof CreateBank, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }));
  // Clear error when user starts typing
  if (errors[field]) {
    setErrors(prev => ({ ...prev, [field]: '' }));
  }
};
```

## 📋 Best Practices

### Component Structure
1. **Import order:** External libraries → Internal modules → Types
2. **State declarations:** Group related state together
3. **Event handlers:** Define before render methods
4. **Validation:** Centralized validation functions
5. **Error handling:** Consistent error display patterns

### File Organization
1. **One component per file**
2. **Export through index files**
3. **Logical folder grouping**
4. **Consistent naming conventions**

### Performance
1. **Lazy loading** for large modules
2. **Memoization** for expensive operations
3. **Debounced search** for real-time filtering
4. **Optimistic updates** for better UX

## 🚀 Getting Started

### Creating a New Module

1. **Create folder structure:**
   ```
   src/components/admin/Manage/NewEntity/
   ├── NewEntityForm.tsx
   └── index.ts
   ```

2. **Define types:**
   ```typescript
   // Add to src/types/entities.ts
   export interface NewEntity extends BaseEntity {
     // ... properties
   }
   ```

3. **Create service:**
   ```typescript
   // Add to src/services/entityService.ts
   export const newEntityService = new EntityService(API_CONFIG.ENDPOINTS.NEW_ENTITIES);
   ```

4. **Add constants:**
   ```typescript
   // Add to src/constants/adminConstants.ts
   NEW_ENTITY_NAME: 'New Entity Name',
   ```

5. **Implement component** following the established patterns

### Adding New Endpoints

1. **Update API config:**
   ```typescript
   // src/config/apiConfig.ts
   ENDPOINTS: {
     NEW_ENTITIES: '/new-entities',
   }
   ```

2. **Create service instance:**
   ```typescript
   export const newEntityService = new EntityService(API_CONFIG.ENDPOINTS.NEW_ENTITIES);
   ```

This standardized approach ensures consistency, maintainability, and scalability across all modules in the application.
