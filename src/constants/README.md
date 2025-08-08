# Admin Constants Refactoring

## Overview
This directory contains centralized constants for all admin components to improve maintainability and enable easier internationalization.

## Files
- `adminConstants.ts` - Main constants file containing all UI strings, labels, messages, and dropdown options

## Refactoring Summary

### ✅ Completed Refactoring:
1. **BankForm.tsx** - Fully refactored
   - Form labels and placeholders
   - Validation messages  
   - Toast notifications
   - Dropdown options
   - Button text

2. **SubMerchantForm.tsx** - Partially refactored
   - Step titles
   - Dropdown options
   - Toast messages

3. **MerchantForm.tsx** - Partially refactored
   - Step titles
   - Toast messages

4. **TabContent.tsx** - Partially refactored
   - Toast messages
   - Tab labels
   - Badge text

### 🔄 Remaining Components to Refactor:
- MerchantGroupForm.tsx
- ISOForm.tsx
- ProgramManagerForm.tsx
- AcquirerProtocolParameterForm.tsx
- Dashboard.tsx
- Header.tsx
- Sidebar.tsx

## Usage Pattern

### Before:
```tsx
<Label>Bank Name <span className="text-red-500">*</span></Label>
<Input placeholder="Enter bank name" />
toast({ title: "Bank Created", description: "Bank has been created successfully" });
```

### After:
```tsx
import { ADMIN_STRINGS } from '@/constants/adminConstants';

<Label>{ADMIN_STRINGS.FORM_LABELS.BANK_NAME} <span className="text-red-500">*</span></Label>
<Input placeholder={ADMIN_STRINGS.PLACEHOLDERS.ENTER_BANK_NAME} />
toast({ 
  title: ADMIN_STRINGS.TOAST.CREATED_SUCCESS, 
  description: ADMIN_STRINGS.TOAST.BANK_CREATED 
});
```

## Benefits
1. **Centralized Management** - All text content in one place
2. **Consistency** - Standardized messaging across components
3. **Maintainability** - Easy to update text without touching components
4. **Internationalization Ready** - Foundation for i18n implementation
5. **Type Safety** - TypeScript ensures string references are valid
6. **Reusability** - Common strings shared across components

## Next Steps
1. Complete refactoring of remaining components
2. Add more granular categorization if needed
3. Consider implementing i18n framework
4. Add validation for unused constants
5. Create tooling to detect hardcoded strings
