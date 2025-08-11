import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ProgramManagerConfig } from '../config/ProgramManagerConfig';
import { Save, RotateCcw, ArrowLeft } from 'lucide-react';

interface ProgramManagerCreateProps {
  tabName: string;
  handleChangeTab: (tab: string) => void;
  tableActionState: string;
  setTableActionState: (state: string) => void;
  isTableDataChanged: boolean;
  setIsTableDataChanged: (changed: boolean) => void;
}

export const ProgramManagerCreateComponent: React.FC<ProgramManagerCreateProps> = ({
  tabName,
  handleChangeTab,
  tableActionState,
  setTableActionState,
  isTableDataChanged,
  setIsTableDataChanged
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Get configuration
  const config = ProgramManagerConfig({ tableActionState });

  // Form setup with validation
  const methods = useForm({
    resolver: zodResolver(config.userCreateSchema),
    defaultValues: {
      programManagerName: '',
      companyName: '',
      businessEntityName: '',
      contactPerson: '',
      phoneNumber: '',
      emailId: '',
      currency: '',
      country: '',
      state: '',
      associatedBankNames: ''
    }
  });

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = methods;

  // Handle form submission
  const onSubmit = async (data: any) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const action = tableActionState === 'edit' ? 'updated' : 'created';
      
      toast({
        title: `Program Manager ${action.charAt(0).toUpperCase() + action.slice(1)} Successfully`,
        description: `${data.programManagerName} has been ${action} successfully.`,
      });
      
      // Reset form and navigate back to search
      if (tableActionState !== 'edit') {
        reset();
      }
      setTableActionState('');
      setIsTableDataChanged(true);
      handleChangeTab('search');
      
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving the Program Manager.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel/back action
  const handleCancel = () => {
    if (isTableDataChanged) {
      const confirmDiscard = window.confirm(
        'You have unsaved changes. Are you sure you want to discard them?'
      );
      if (!confirmDiscard) return;
    }
    
    setTableActionState('');
    setIsTableDataChanged(false);
    handleChangeTab('search');
  };

  // Handle reset
  const handleReset = () => {
    const confirmReset = window.confirm(
      'Are you sure you want to reset all fields?'
    );
    if (confirmReset) {
      reset();
      setIsTableDataChanged(false);
      toast({
        title: "Form Reset",
        description: "All fields have been cleared.",
      });
    }
  };

  // Get form title based on action
  const getFormTitle = () => {
    if (tableActionState === 'view') return 'View Program Manager';
    if (tableActionState === 'edit') return 'Edit Program Manager';
    return 'Create Program Manager';
  };

  // Mock data for edit/view mode
  useEffect(() => {
    if (tableActionState === 'edit' || tableActionState === 'view') {
      // Simulate loading existing data
      const mockData = config.mockData[0];
      Object.keys(mockData).forEach(key => {
        if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
          setValue(key as any, mockData[key as keyof typeof mockData]);
        }
      });
    }
  }, [tableActionState, setValue]);

  const isViewMode = tableActionState === 'view';

  return (
    <div className="space-y-6">
      <Card className="shadow-glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {tableActionState === 'edit' ? (
              <Save className="h-5 w-5" />
            ) : tableActionState === 'view' ? (
              <ArrowLeft className="h-5 w-5" />
            ) : (
              <Save className="h-5 w-5" />
            )}
            <span>{getFormTitle()}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {config.createInputData.map((field) => {
                  if (field.input) {
                    return (
                      <div key={field.input.name} className="space-y-2">
                        <Label htmlFor={field.input.name} className="text-sm font-medium">
                          {field.label}
                          {field.input.mandatory && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        <Input
                          id={field.input.name}
                          type={field.input.type}
                          placeholder={field.input.placeholder}
                          disabled={isViewMode || loading}
                          className="h-11"
                          {...register(field.input.name as any)}
                        />
                        {errors[field.input.name as keyof typeof errors] && (
                          <p className="text-sm text-destructive">
                            {errors[field.input.name as keyof typeof errors]?.message}
                          </p>
                        )}
                      </div>
                    );
                  } else if (field.dropdown) {
                    return (
                      <div key={field.dropdown.name} className="space-y-2">
                        <Label htmlFor={field.dropdown.name} className="text-sm font-medium">
                          {field.label}
                          {field.dropdown.mandatory && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        <Select
                          disabled={isViewMode || loading}
                          onValueChange={(value) => {
                            setValue(field.dropdown!.name as any, value);
                            setIsTableDataChanged(true);
                          }}
                          value={watch(field.dropdown.name as any) || ''}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder={field.dropdown.placeholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.dropdown.options?.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors[field.dropdown.name as keyof typeof errors] && (
                          <p className="text-sm text-destructive">
                            {errors[field.dropdown.name as keyof typeof errors]?.message}
                          </p>
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={loading}
                  className="min-w-[100px]"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {tableActionState === 'view' ? 'Back' : 'Cancel'}
                </Button>

                {!isViewMode && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    disabled={loading}
                    className="min-w-[100px]"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                )}

                {!isViewMode && (
                  <Button
                    type="submit"
                    disabled={loading}
                    className="min-w-[100px]"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                        <span>Saving...</span>
                      </div>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {tableActionState === 'edit' ? 'Update' : 'Submit'}
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgramManagerCreateComponent;
