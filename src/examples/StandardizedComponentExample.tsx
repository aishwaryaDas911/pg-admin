import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useEntityService } from '@/hooks/useEntityService';
import { bankService } from '@/services/entityService';
import { ADMIN_STRINGS } from '@/constants/adminConstants';
import { VALIDATION_RULES, createValidator } from '@/utils/entityUtils';
import { CreateBank } from '@/types/entities';
import { Plus, RotateCcw, X } from 'lucide-react';

/**
 * Example component demonstrating the standardized coding practices
 * 
 * This component shows how to:
 * 1. Use the standardized folder structure
 * 2. Implement consistent service patterns
 * 3. Use centralized constants
 * 4. Apply standardized validation
 * 5. Handle errors consistently
 * 6. Follow component structure best practices
 */

interface ExampleFormData {
  bankName: string;
  bankCode: string;
  emailAddress: string;
  phoneNumber: string;
}

const ExampleComponent: React.FC = () => {
  const { toast } = useToast();
  
  // Use the standardized entity service hook
  const {
    data: banks,
    loading,
    error,
    pagination,
    actions
  } = useEntityService(bankService, {
    autoLoad: true,
    page: 1,
    limit: 10
  });

  // Form state following the standard pattern
  const [formData, setFormData] = useState<ExampleFormData>({
    bankName: '',
    bankCode: '',
    emailAddress: '',
    phoneNumber: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Standardized validation using utility functions
  const validateForm = createValidator({
    bankName: VALIDATION_RULES.required('Bank Name'),
    bankCode: VALIDATION_RULES.required('Bank Code'),
    emailAddress: VALIDATION_RULES.email,
    phoneNumber: VALIDATION_RULES.phone,
  });

  // Standard input change handler
  const handleInputChange = (field: keyof ExampleFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Standard form submission
  const handleSubmit = async () => {
    const formErrors = validateForm(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        // Use the service action from the hook
        const newBank = await actions.createItem(formData as CreateBank);
        
        if (newBank) {
          // Reset form on success
          setFormData({
            bankName: '',
            bankCode: '',
            emailAddress: '',
            phoneNumber: ''
          });
          
          // Success toast is automatically handled by the service
        }
      } catch (error) {
        // Error handling is automatic via the service
        console.error('Failed to create bank:', error);
      }
    } else {
      // Show validation error toast using constants
      toast({
        title: ADMIN_STRINGS.TOAST.VALIDATION_ERROR,
        description: ADMIN_STRINGS.VALIDATION.FIX_ERRORS_AND_TRY_AGAIN,
        variant: "destructive"
      });
    }
  };

  // Standard reset handler
  const handleReset = () => {
    setFormData({
      bankName: '',
      bankCode: '',
      emailAddress: '',
      phoneNumber: ''
    });
    setErrors({});
  };

  // Standard search handler
  const handleSearch = async (query: string) => {
    if (query.trim()) {
      await actions.searchItems(query);
    } else {
      await actions.loadData();
    }
  };

  // Standard export handler
  const handleExport = async (format: 'csv' | 'pdf' | 'excel') => {
    await actions.exportData(format);
  };

  return (
    <div className="space-y-6">
      {/* Form Section - Following standard structure */}
      <Card className="shadow-glass">
        <CardHeader className="bg-gradient-to-r from-mb-blue/5 to-mb-silver/5 border-b">
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-mb-blue/10 rounded-lg">
              <Plus className="h-6 w-6 text-mb-blue" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {/* Using constants for all text */}
                {ADMIN_STRINGS.PAGES.CREATE_BANK}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {ADMIN_STRINGS.DESCRIPTIONS.BANK_DESC}
              </p>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Standard form field pattern */}
            <div className="space-y-2">
              <Label htmlFor="bankName" className="text-sm font-medium">
                {ADMIN_STRINGS.FORM_LABELS.BANK_NAME} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="bankName"
                placeholder={ADMIN_STRINGS.PLACEHOLDERS.ENTER_BANK_NAME}
                value={formData.bankName}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
                className={errors.bankName ? 'border-red-500' : ''}
              />
              {errors.bankName && (
                <p className="text-xs text-red-500">{errors.bankName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankCode" className="text-sm font-medium">
                {ADMIN_STRINGS.FORM_LABELS.BANK_CODE} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="bankCode"
                placeholder={ADMIN_STRINGS.PLACEHOLDERS.ENTER_BANK_CODE}
                value={formData.bankCode}
                onChange={(e) => handleInputChange('bankCode', e.target.value)}
                className={errors.bankCode ? 'border-red-500' : ''}
              />
              {errors.bankCode && (
                <p className="text-xs text-red-500">{errors.bankCode}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailAddress" className="text-sm font-medium">
                {ADMIN_STRINGS.FORM_LABELS.EMAIL_ADDRESS} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="emailAddress"
                type="email"
                placeholder={ADMIN_STRINGS.PLACEHOLDERS.ENTER_EMAIL}
                value={formData.emailAddress}
                onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                className={errors.emailAddress ? 'border-red-500' : ''}
              />
              {errors.emailAddress && (
                <p className="text-xs text-red-500">{errors.emailAddress}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-sm font-medium">
                {ADMIN_STRINGS.FORM_LABELS.PHONE} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phoneNumber"
                placeholder={ADMIN_STRINGS.PLACEHOLDERS.ENTER_PHONE}
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className={errors.phoneNumber ? 'border-red-500' : ''}
              />
              {errors.phoneNumber && (
                <p className="text-xs text-red-500">{errors.phoneNumber}</p>
              )}
            </div>
          </div>

          {/* Standard action buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button variant="outline" onClick={handleReset} className="min-w-[100px]">
              <RotateCcw className="mr-2 h-4 w-4" />
              {ADMIN_STRINGS.ACTIONS.RESET}
            </Button>
            <Button onClick={handleSubmit} disabled={loading} className="min-w-[100px] bg-mb-blue hover:bg-mb-blue/90">
              <Plus className="mr-2 h-4 w-4" />
              {loading ? ADMIN_STRINGS.ACTIONS.CREATING : ADMIN_STRINGS.ACTIONS.CREATE}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data List Section - Demonstrating service hook usage */}
      <Card className="shadow-glass">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Banks ({pagination.total} total)</CardTitle>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('csv')}
                disabled={loading}
              >
                Export CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('pdf')}
                disabled={loading}
              >
                Export PDF
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Search functionality */}
          <div className="mb-4">
            <Input
              placeholder="Search banks..."
              onChange={(e) => handleSearch(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {/* Loading state */}
          {loading && (
            <div className="text-center py-4">
              <p>{ADMIN_STRINGS.GENERIC.LOADING}</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="text-center py-4 text-red-500">
              <p>Error: {error}</p>
            </div>
          )}

          {/* Data display */}
          {!loading && !error && banks.length === 0 && (
            <div className="text-center py-4">
              <p>{ADMIN_STRINGS.GENERIC.NO_DATA}</p>
            </div>
          )}

          {/* Banks list */}
          {!loading && banks.length > 0 && (
            <div className="space-y-2">
              {banks.map((bank: any) => (
                <div key={bank.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{bank.bankName}</h3>
                      <p className="text-sm text-muted-foreground">{bank.bankCode}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => actions.deleteItem(bank.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination info */}
          {pagination.totalPages > 1 && (
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Page {pagination.page} of {pagination.totalPages}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExampleComponent;

/**
 * Key Standards Demonstrated:
 * 
 * 1. IMPORTS: Organized by external → internal → types
 * 2. CONSTANTS: All text from centralized constants file
 * 3. SERVICES: Using standardized entity service hook
 * 4. VALIDATION: Centralized validation rules and patterns
 * 5. STATE: Consistent state management patterns
 * 6. ERROR HANDLING: Automatic error handling via services
 * 7. FORM PATTERNS: Standard input change and submission handlers
 * 8. UI CONSISTENCY: Following design system patterns
 * 9. ACCESSIBILITY: Proper labels and error associations
 * 10. PERFORMANCE: Efficient updates and loading states
 */
