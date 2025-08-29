import React, { useState, useEffect } from 'react';
import { FormGenerator } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { BANK_STRINGS } from '@/constants/bankConstants';
import { bankCreateFields, bankValidationSchema } from './formConfig';
import { BankService, BankData } from '@/services/bankService';
import { Landmark, ArrowLeft, Save, RotateCcw, X } from 'lucide-react';

interface BankFormProps {
  mode?: 'create' | 'edit' | 'view';
  initialData?: Partial<BankData>;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  onSuccess?: () => void;
  className?: string;
}

export const BankForm: React.FC<BankFormProps> = ({
  mode = 'create',
  initialData,
  onSubmit,
  onCancel,
  onSuccess,
  className = '',
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Handle form submission
  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    setFormErrors({});

    try {
      // Validate form data using Zod schema
      const validatedData = bankValidationSchema.parse(formData);
      
      console.log('🏦 Bank form submitted with data:', validatedData);

      if (mode === 'create') {
        // Create new bank
        const response = await BankService.createBank(validatedData);
        
        if (response.success) {
          toast({
            title: BANK_STRINGS.TOAST.BANK_CREATED_TITLE,
            description: BANK_STRINGS.TOAST.BANK_CREATED_DESCRIPTION,
          });
          
          onSuccess?.();
        } else {
          toast({
            title: BANK_STRINGS.TOAST.VALIDATION_ERROR_TITLE,
            description: response.message || 'Failed to create bank',
            variant: 'destructive',
          });
        }
      } else if (mode === 'edit' && initialData?.id) {
        // Update existing bank
        const bankData: BankData = {
          ...validatedData,
          id: initialData.id,
          status: initialData.status || 'active',
        };

        const response = await BankService.updateBank(bankData);
        
        if (response.success) {
          toast({
            title: BANK_STRINGS.TOAST.BANK_UPDATED_TITLE,
            description: BANK_STRINGS.TOAST.BANK_UPDATED_DESCRIPTION,
          });
          
          onSuccess?.();
        } else {
          toast({
            title: BANK_STRINGS.TOAST.VALIDATION_ERROR_TITLE,
            description: response.message || 'Failed to update bank',
            variant: 'destructive',
          });
        }
      }

      // Call the optional onSubmit callback
      onSubmit?.(validatedData);

    } catch (error) {
      console.error('🚨 Bank form validation/submission error:', error);

      if (error instanceof Error) {
        // Handle Zod validation errors
        if (error.name === 'ZodError') {
          const zodError = error as any;
          const newErrors: Record<string, string> = {};
          
          zodError.errors.forEach((err: any) => {
            if (err.path && err.path.length > 0) {
              newErrors[err.path[0]] = err.message;
            }
          });
          
          setFormErrors(newErrors);
          
          toast({
            title: BANK_STRINGS.TOAST.VALIDATION_ERROR_TITLE,
            description: BANK_STRINGS.VALIDATION.FIX_ERRORS_AND_TRY_AGAIN,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Error',
            description: error.message,
            variant: 'destructive',
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form reset
  const handleReset = () => {
    setFormErrors({});
    toast({
      title: BANK_STRINGS.TOAST.FORM_RESET_TITLE,
      description: BANK_STRINGS.TOAST.FORM_RESET_DESCRIPTION,
    });
  };

  // Handle cancel
  const handleCancel = () => {
    onCancel?.();
    toast({
      title: BANK_STRINGS.TOAST.CANCELLED_TITLE,
      description: BANK_STRINGS.TOAST.BANK_CREATION_CANCELLED,
    });
  };

  // Get form title based on mode
  const getFormTitle = () => {
    switch (mode) {
      case 'edit':
        return BANK_STRINGS.TITLES.EDIT;
      case 'view':
        return BANK_STRINGS.TITLES.VIEW;
      default:
        return BANK_STRINGS.TITLES.CREATE;
    }
  };

  // Get form description based on mode
  const getFormDescription = () => {
    switch (mode) {
      case 'edit':
        return 'Update bank information with the required details';
      case 'view':
        return 'View bank details and information';
      default:
        return BANK_STRINGS.DESCRIPTIONS.FORM;
    }
  };

  // Get primary button text based on mode
  const getPrimaryButtonText = () => {
    if (isLoading) {
      switch (mode) {
        case 'edit':
          return BANK_STRINGS.LOADING.UPDATING;
        default:
          return BANK_STRINGS.LOADING.CREATING;
      }
    }
    
    switch (mode) {
      case 'edit':
        return BANK_STRINGS.BUTTONS.UPDATE;
      case 'view':
        return BANK_STRINGS.BUTTONS.EDIT;
      default:
        return BANK_STRINGS.BUTTONS.CREATE;
    }
  };

  return (
    <div className={className}>
      <Card className="shadow-glass">
        <CardHeader className="bg-gradient-to-r from-mb-blue/5 to-mb-silver/5 border-b">
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-mb-blue/10 rounded-lg">
              <Landmark className="h-6 w-6 text-mb-blue" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{getFormTitle()}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {getFormDescription()}
              </p>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <FormGenerator
            fields={bankCreateFields.map(field => ({
              ...field,
              // Disable fields in view mode
              input: field.input ? {
                ...field.input,
                disabled: mode === 'view'
              } : field.input,
              dropdown: field.dropdown ? {
                ...field.dropdown,
                disabled: mode === 'view'
              } : field.dropdown,
            }))}
            initialData={initialData}
            onSubmit={handleSubmit}
            onReset={handleReset}
            errors={formErrors}
            loading={isLoading}
            className="w-full"
            showDefaultButtons={false} // We'll use custom buttons
          />

          {/* Custom Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4 pt-6 border-t mt-6">
            <div className="flex space-x-2">
              {onCancel && (
                <Button 
                  variant="outline" 
                  onClick={handleCancel} 
                  className="min-w-[100px] flex items-center space-x-2"
                  disabled={isLoading}
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>{BANK_STRINGS.BUTTONS.CANCEL}</span>
                </Button>
              )}
              
              {mode !== 'view' && (
                <Button 
                  variant="outline" 
                  onClick={handleReset} 
                  className="min-w-[100px] flex items-center space-x-2"
                  disabled={isLoading}
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>{BANK_STRINGS.BUTTONS.RESET}</span>
                </Button>
              )}
            </div>

            <div className="flex space-x-2">
              {mode !== 'view' && (
                <Button 
                  onClick={() => {
                    // Trigger form submission by dispatching a submit event
                    const form = document.querySelector('form');
                    if (form) {
                      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                    }
                  }}
                  className="min-w-[100px] bg-mb-blue hover:bg-mb-blue/90 flex items-center space-x-2"
                  disabled={isLoading}
                >
                  <Save className="h-4 w-4" />
                  <span>{getPrimaryButtonText()}</span>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BankForm;
