import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Save, RotateCcw, X, Upload, Info } from 'lucide-react';
import { z } from 'zod';

export interface FormSection {
  title: string;
  icon?: React.ReactNode;
  fields: FormFieldConfig[];
}

export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'time' | 'file' | 'select' | 'number' | 'password' | 'url';
  placeholder?: string;
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
  accept?: string; // for file inputs
  grid?: {
    span?: number; // Grid column span (1-4)
  };
}

export interface ReusableFormGeneratorProps {
  title: string;
  description?: string;
  sections: FormSection[];
  validationSchema?: z.ZodSchema<any>;
  defaultValues?: Record<string, any>;
  onSubmit: (data: any) => Promise<void> | void;
  onCancel?: () => void;
  onReset?: () => void;
  actionState?: 'create' | 'edit' | 'view';
  submitLabel?: string;
  loading?: boolean;
  className?: string;
}

export const ReusableFormGenerator: React.FC<ReusableFormGeneratorProps> = ({
  title,
  description,
  sections,
  validationSchema,
  defaultValues = {},
  onSubmit,
  onCancel,
  onReset,
  actionState = 'create',
  submitLabel,
  loading = false,
  className = ''
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Setup form with validation
  const methods = useForm({
    resolver: validationSchema ? zodResolver(validationSchema) : undefined,
    defaultValues
  });

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = methods;

  // Handle form submission
  const handleFormSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while submitting the form.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle reset
  const handleReset = () => {
    const confirmReset = window.confirm(
      'Are you sure you want to reset all fields?'
    );
    if (confirmReset) {
      reset();
      onReset?.();
      toast({
        title: "Form Reset",
        description: "All fields have been cleared.",
      });
    }
  };

  // Handle cancel
  const handleCancel = () => {
    const hasChanges = Object.keys(watch()).some(key => 
      watch(key) !== defaultValues[key]
    );
    
    if (hasChanges) {
      const confirmDiscard = window.confirm(
        'You have unsaved changes. Are you sure you want to discard them?'
      );
      if (!confirmDiscard) return;
    }
    
    onCancel?.();
  };

  // Handle file upload
  const handleFileUpload = (fieldName: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue(fieldName, file);
    }
  };

  // Render form field based on type
  const renderField = (field: FormFieldConfig) => {
    const isViewMode = actionState === 'view';
    const isDisabled = isViewMode || loading || isSubmitting;
    const gridSpan = field.grid?.span || 1;
    const gridClass = `col-span-${gridSpan}`;

    const fieldElement = (() => {
      switch (field.type) {
        case 'select':
          return (
            <Select
              disabled={isDisabled}
              onValueChange={(value) => setValue(field.name, value)}
              value={watch(field.name) || ''}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder={field.placeholder || 'Select an option'} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );

        case 'file':
          return (
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isDisabled}
                onClick={() => document.getElementById(field.name)?.click()}
                className="h-11 px-3"
              >
                <Upload className="h-4 w-4 mr-2" />
                Browse
              </Button>
              <input
                id={field.name}
                type="file"
                accept={field.accept}
                onChange={(e) => handleFileUpload(field.name, e)}
                className="hidden"
              />
              <span className="text-sm text-muted-foreground">
                {watch(field.name) ? 'File selected' : 'No file chosen'}
              </span>
            </div>
          );

        default:
          return (
            <Input
              id={field.name}
              type={field.type}
              placeholder={field.placeholder}
              disabled={isDisabled}
              className="h-11"
              {...register(field.name)}
            />
          );
      }
    })();

    return (
      <div key={field.name} className={`space-y-2 ${gridClass}`}>
        <Label htmlFor={field.name} className="text-sm font-medium">
          {field.label}
          {field.required && <span className="text-destructive ml-1">*</span>}
        </Label>
        {fieldElement}
        {errors[field.name] && (
          <p className="text-sm text-destructive">
            {errors[field.name]?.message}
          </p>
        )}
      </div>
    );
  };

  const getSubmitLabel = () => {
    if (submitLabel) return submitLabel;
    return actionState === 'edit' ? 'Update' : 'Create';
  };

  const isViewMode = actionState === 'view';

  return (
    <div className={`space-y-6 ${className}`}>
      <Card className="shadow-glass border-border/50">
        <CardHeader className="border-b border-border/50 bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Info className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                {description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {description}
                  </p>
                )}
              </div>
            </div>
            <Badge variant="secondary" className="bg-mb-blue/10 text-mb-blue border-mb-blue/20">
              Payment Gateway
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
              
              {/* Render all sections */}
              {sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-1 rounded bg-primary/10">
                      {section.icon || <Info className="h-4 w-4 text-primary" />}
                    </div>
                    <h3 className="text-lg font-medium">{section.title}</h3>
                  </div>
                  <Separator className="border-border/50" />
                  
                  {/* Grid for fields - responsive grid that can handle different spans */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {section.fields.map(renderField)}
                  </div>
                </div>
              ))}

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border/50">
                {onCancel && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={loading || isSubmitting}
                    className="min-w-[100px]"
                  >
                    <X className="mr-2 h-4 w-4" />
                    {isViewMode ? 'Back' : 'Cancel'}
                  </Button>
                )}

                {!isViewMode && onReset && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    disabled={loading || isSubmitting}
                    className="min-w-[100px]"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                )}

                {!isViewMode && (
                  <Button
                    type="submit"
                    disabled={loading || isSubmitting}
                    className="min-w-[120px] bg-primary hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                        <span>Saving...</span>
                      </div>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {getSubmitLabel()}
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

export default ReusableFormGenerator;
