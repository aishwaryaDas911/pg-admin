# Admin Components Constants Refactoring Status

## Overview
This document tracks the progress of moving all static text (labels, placeholders, etc.) from admin components to centralized constants in `adminConstants.ts`.

## Refactoring Status

### ✅ Completed Components
- **AcquirerProtocolParameterForm.tsx** - All section titles, form labels, and dropdown options moved to constants
- **FeeProgramForm.tsx** - Already using constants from initial implementation

### 🔄 In Progress Components
- All other admin components need systematic refactoring

### ⏳ Pending Components
- **BankForm.tsx** - Form labels and placeholders need constants
- **Dashboard.tsx** - Chart titles and UI text need constants
- **Header.tsx** - UI labels need constants
- **ISOForm.tsx** - Form labels, placeholders, and section headers need constants
- **MerchantForm.tsx** - Extensive form labels and placeholders need constants
- **MerchantGroupForm.tsx** - Form labels and placeholders need constants
- **ProgramManagerForm.tsx** - Form labels and placeholders need constants
- **SubMerchantForm.tsx** - Form labels and placeholders need constants
- **TabContent.tsx** - Search filters, table headers, and export messages need constants

## Constants Structure
All constants are organized in `src/constants/adminConstants.ts` with the following sections:
- `ADMIN_STRINGS.ACTIONS` - Action buttons and verbs
- `ADMIN_STRINGS.NAVIGATION` - Navigation and menu items
- `ADMIN_STRINGS.FORM_LABELS` - All form field labels
- `ADMIN_STRINGS.PLACEHOLDERS` - Input placeholders and select options
- `ADMIN_STRINGS.VALIDATION` - Validation error messages
- `ADMIN_STRINGS.TOAST` - Toast notification messages
- `ADMIN_STRINGS.PAGES` - Page titles
- `ADMIN_STRINGS.DESCRIPTIONS` - Page descriptions
- `ADMIN_STRINGS.SECTIONS` - Section headers
- `ADMIN_STRINGS.TABLE_HEADERS` - Table column headers
- `ADMIN_STRINGS.TOOLTIPS` - Tooltip text
- `ADMIN_STRINGS.FILES` - File management text
- `ADMIN_STRINGS.DASHBOARD` - Dashboard specific text
- `ADMIN_STRINGS.GENERIC` - Generic UI text
- `DROPDOWN_OPTIONS` - All dropdown option arrays

## Usage Pattern
Each component should:
1. Import constants: `import { ADMIN_STRINGS, DROPDOWN_OPTIONS } from '@/constants/adminConstants';`
2. Destructure needed options: `const { COUNTRIES, STATES } = DROPDOWN_OPTIONS;`
3. Use constants for all static text: `{ADMIN_STRINGS.FORM_LABELS.BANK_NAME}`
4. Follow the established pattern from FeeProgramForm.tsx

## Next Steps
1. Update remaining admin components systematically
2. Ensure all hardcoded strings are moved to constants
3. Maintain consistent naming conventions
4. Test all forms to ensure functionality is preserved
