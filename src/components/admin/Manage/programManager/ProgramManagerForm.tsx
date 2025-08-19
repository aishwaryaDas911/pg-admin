import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Save, RotateCcw, X, Upload, Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  PROGRAM_MANAGER_STRINGS, 
  PROGRAM_MANAGER_DROPDOWN_OPTIONS 
} from '@/constants/programManagerConstants';
import { 
  programManagerValidationSchema, 
  programManagerMockData 
} from './formConfig';

interface ProgramManagerFormProps {
  mode?: 'create' | 'edit' | 'view';
  initialData?: any;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  onSuccess?: () => void;
  className?: string;
}

interface ProgramManagerFormData {
  programManagerName: string;
  companyName: string;
  businessEntityName: string;
  contactPerson: string;
  phoneNumber: string;
  extension?: string;
  emailId: string;
  currency: string;
  country: string;
  state: string;
  programManagerTimeZone: string;
  batchPrefix: string;
  schedulerRunTime: string;
  associatedBankNames: string;
  programManagerLogo?: File | null;
}

export const ProgramManagerForm: React.FC<ProgramManagerFormProps> = ({
  mode = 'create',
  initialData,
  onSubmit,
  onCancel,
  onSuccess,
  className = ''
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);

  // Form setup with validation
  const methods = useForm<ProgramManagerFormData>({
    resolver: zodResolver(programManagerValidationSchema),
    defaultValues: {
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
    }
  });

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = methods;

  // Load initial data for edit/view mode
  useEffect(() => {
    if ((mode === 'edit' || mode === 'view') && initialData) {
      Object.keys(initialData).forEach(key => {
        if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
          setValue(key as keyof ProgramManagerFormData, initialData[key]);
        }
      });
    } else if (mode === 'edit' || mode === 'view') {
      // Mock data for demo
      const mockData = programManagerMockData[0];
      Object.keys(mockData).forEach(key => {
        if (key !== 'id' && key !== 'createdDate' && key !== 'updatedAt') {
          setValue(key as keyof ProgramManagerFormData, mockData[key as keyof typeof mockData]);
        }
      });
    }
  }, [mode, initialData, setValue]);

  // Handle form submission
  const handleFormSubmit = async (data: ProgramManagerFormData) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const action = mode === 'edit' ? 'updated' : 'created';
      
      toast({
        title: PROGRAM_MANAGER_STRINGS.TOAST.PROGRAM_MANAGER_CREATED_TITLE.replace('Created', action === 'updated' ? 'Updated' : 'Created'),
        description: `${data.programManagerName} has been ${action} successfully.`,
      });
      
      // Call parent onSubmit if provided
      onSubmit?.(data);
      
      // Reset form for create mode
      if (mode === 'create') {
        reset();
        setIsDataChanged(false);
      }
      
      // Call success callback
      onSuccess?.();
      
    } catch (error) {
      toast({
        title: "Error",
        description: `An error occurred while ${mode === 'edit' ? 'updating' : 'creating'} the Program Manager.`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    if (isDataChanged && mode !== 'view') {
      const confirmDiscard = window.confirm(
        PROGRAM_MANAGER_STRINGS.CONFIRMATIONS.DISCARD_CHANGES
      );
      if (!confirmDiscard) return;
    }
    
    setIsDataChanged(false);
    onCancel?.();
  };

  // Handle reset
  const handleReset = () => {
    if (mode === 'view') return;
    
    const confirmReset = window.confirm(
      PROGRAM_MANAGER_STRINGS.CONFIRMATIONS.RESET_FORM
    );
    if (confirmReset) {
      reset();
      setIsDataChanged(false);
      toast({
        title: PROGRAM_MANAGER_STRINGS.TOAST.FORM_RESET_TITLE,
        description: PROGRAM_MANAGER_STRINGS.TOAST.FORM_RESET_DESCRIPTION,
      });
    }
  };

  // Get form title based on mode
  const getFormTitle = () => {
    switch (mode) {
      case 'view': return PROGRAM_MANAGER_STRINGS.TITLES.VIEW;
      case 'edit': return PROGRAM_MANAGER_STRINGS.TITLES.EDIT;
      default: return PROGRAM_MANAGER_STRINGS.TITLES.CREATE;
    }
  };

  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file
      if (!PROGRAM_MANAGER_FIELD_CONFIG.FILE_VALIDATION.ACCEPTED_TYPES.includes(file.type)) {
        toast({
          title: PROGRAM_MANAGER_STRINGS.TOAST.INVALID_FILE_TYPE_TITLE,
          description: PROGRAM_MANAGER_STRINGS.VALIDATION.INVALID_FILE_TYPE,
          variant: "destructive"
        });
        return;
      }
      
      if (file.size > PROGRAM_MANAGER_FIELD_CONFIG.FILE_VALIDATION.MAX_SIZE_BYTES) {
        toast({
          title: PROGRAM_MANAGER_STRINGS.TOAST.FILE_TOO_LARGE_TITLE,
          description: PROGRAM_MANAGER_STRINGS.VALIDATION.FILE_TOO_LARGE,
          variant: "destructive"
        });
        return;
      }

      setValue('programManagerLogo', file);
      setIsDataChanged(true);
    }
  };

  // Watch for form changes
  React.useEffect(() => {
    const subscription = watch(() => {
      if (!isViewMode) {
        setIsDataChanged(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, isViewMode]);

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
                <CardTitle className="text-xl font-semibold">{getFormTitle()}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {PROGRAM_MANAGER_STRINGS.DESCRIPTIONS.FORM}
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
              Payment Gateway
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
              
              {/* Basic Information Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="p-1 rounded bg-primary/10">
                    <Info className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">{PROGRAM_MANAGER_STRINGS.SECTIONS.BASIC_INFORMATION}</h3>
                </div>
                <Separator className="border-border/50" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="programManagerName" className="text-sm font-medium">
                      {PROGRAM_MANAGER_STRINGS.LABELS.PROGRAM_MANAGER_NAME} <span className="text-destructive">{PROGRAM_MANAGER_STRINGS.REQUIRED_INDICATOR}</span>
                    </Label>
                    <Input
                      id="programManagerName"
                      type="text"
                      placeholder={PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.ENTER_PROGRAM_MANAGER_NAME}
                      disabled={isViewMode || loading}
                      className="h-11"
                      {...register('programManagerName')}
                    />
                    {errors.programManagerName && (
                      <p className="text-sm text-destructive">
                        {errors.programManagerName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-sm font-medium">
                      {PROGRAM_MANAGER_STRINGS.LABELS.COMPANY_NAME} <span className="text-destructive">{PROGRAM_MANAGER_STRINGS.REQUIRED_INDICATOR}</span>
                    </Label>
                    <Input
                      id="companyName"
                      type="text"
                      placeholder={PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.ENTER_COMPANY_NAME}
                      disabled={isViewMode || loading}
                      className="h-11"
                      {...register('companyName')}
                    />
                    {errors.companyName && (
                      <p className="text-sm text-destructive">
                        {errors.companyName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessEntityName" className="text-sm font-medium">
                      {PROGRAM_MANAGER_STRINGS.LABELS.BUSINESS_ENTITY_NAME} <span className="text-destructive">{PROGRAM_MANAGER_STRINGS.REQUIRED_INDICATOR}</span>
                    </Label>
                    <Input
                      id="businessEntityName"
                      type="text"
                      placeholder={PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.ENTER_BUSINESS_ENTITY_NAME}
                      disabled={isViewMode || loading}
                      className="h-11"
                      {...register('businessEntityName')}
                    />
                    {errors.businessEntityName && (
                      <p className="text-sm text-destructive">
                        {errors.businessEntityName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPerson" className="text-sm font-medium">
                      {PROGRAM_MANAGER_STRINGS.LABELS.CONTACT_PERSON} <span className="text-destructive">{PROGRAM_MANAGER_STRINGS.REQUIRED_INDICATOR}</span>
                    </Label>
                    <Input
                      id="contactPerson"
                      type="text"
                      placeholder={PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.ENTER_CONTACT_PERSON}
                      disabled={isViewMode || loading}
                      className="h-11"
                      {...register('contactPerson')}
                    />
                    {errors.contactPerson && (
                      <p className="text-sm text-destructive">
                        {errors.contactPerson.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Details Section */}
              <div className="space-y-4">
                <h4 className="text-md font-medium text-muted-foreground">{PROGRAM_MANAGER_STRINGS.SECTIONS.CONTACT_DETAILS}</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-sm font-medium">
                      {PROGRAM_MANAGER_STRINGS.LABELS.PHONE_NUMBER} <span className="text-destructive">{PROGRAM_MANAGER_STRINGS.REQUIRED_INDICATOR}</span>
                    </Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder={PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.ENTER_PHONE_NUMBER}
                      disabled={isViewMode || loading}
                      className="h-11"
                      {...register('phoneNumber')}
                    />
                    {errors.phoneNumber && (
                      <p className="text-sm text-destructive">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="extension" className="text-sm font-medium">
                      {PROGRAM_MANAGER_STRINGS.LABELS.EXTENSION}
                    </Label>
                    <Input
                      id="extension"
                      type="text"
                      placeholder={PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.ENTER_EXTENSION}
                      disabled={isViewMode || loading}
                      className="h-11"
                      {...register('extension')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emailId" className="text-sm font-medium">
                      {PROGRAM_MANAGER_STRINGS.LABELS.EMAIL_ID} <span className="text-destructive">{PROGRAM_MANAGER_STRINGS.REQUIRED_INDICATOR}</span>
                    </Label>
                    <Input
                      id="emailId"
                      type="email"
                      placeholder={PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.ENTER_EMAIL_ADDRESS}
                      disabled={isViewMode || loading}
                      className="h-11"
                      {...register('emailId')}
                    />
                    {errors.emailId && (
                      <p className="text-sm text-destructive">
                        {errors.emailId.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency" className="text-sm font-medium">
                      {PROGRAM_MANAGER_STRINGS.LABELS.CURRENCY} <span className="text-destructive">{PROGRAM_MANAGER_STRINGS.REQUIRED_INDICATOR}</span>
                    </Label>
                    <Select
                      disabled={isViewMode || loading}
                      onValueChange={(value) => {
                        setValue('currency', value);
                        setIsDataChanged(true);
                      }}
                      value={watch('currency') || ''}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder={PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.SELECT_CURRENCY} />
                      </SelectTrigger>
                      <SelectContent>
                        {PROGRAM_MANAGER_DROPDOWN_OPTIONS.CURRENCIES.map((currency) => (
                          <SelectItem key={currency.value} value={currency.value}>
                            {currency.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.currency && (
                      <p className="text-sm text-destructive">
                        {errors.currency.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Location & Configuration Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="p-1 rounded bg-primary/10">
                    <Info className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">{PROGRAM_MANAGER_STRINGS.SECTIONS.LOCATION_CONFIGURATION}</h3>
                </div>
                <Separator className="border-border/50" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-sm font-medium">
                      {PROGRAM_MANAGER_STRINGS.LABELS.COUNTRY} <span className="text-destructive">{PROGRAM_MANAGER_STRINGS.REQUIRED_INDICATOR}</span>
                    </Label>
                    <Select
                      disabled={isViewMode || loading}
                      onValueChange={(value) => {
                        setValue('country', value);
                        setIsDataChanged(true);
                      }}
                      value={watch('country') || ''}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder={PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.SELECT_COUNTRY} />
                      </SelectTrigger>
                      <SelectContent>
                        {PROGRAM_MANAGER_DROPDOWN_OPTIONS.COUNTRIES.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.country && (
                      <p className="text-sm text-destructive">
                        {errors.country.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-sm font-medium">
                      {PROGRAM_MANAGER_STRINGS.LABELS.STATE} <span className="text-destructive">{PROGRAM_MANAGER_STRINGS.REQUIRED_INDICATOR}</span>
                    </Label>
                    <Select
                      disabled={isViewMode || loading}
                      onValueChange={(value) => {
                        setValue('state', value);
                        setIsDataChanged(true);
                      }}
                      value={watch('state') || ''}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder={PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.SELECT_STATE} />
                      </SelectTrigger>
                      <SelectContent>
                        {PROGRAM_MANAGER_DROPDOWN_OPTIONS.STATES.map((state) => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.state && (
                      <p className="text-sm text-destructive">
                        {errors.state.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="programManagerTimeZone" className="text-sm font-medium">
                      {PROGRAM_MANAGER_STRINGS.LABELS.PROGRAM_MANAGER_TIME_ZONE} <span className="text-destructive">{PROGRAM_MANAGER_STRINGS.REQUIRED_INDICATOR}</span>
                    </Label>
                    <Select
                      disabled={isViewMode || loading}
                      onValueChange={(value) => {
                        setValue('programManagerTimeZone', value);
                        setIsDataChanged(true);
                      }}
                      value={watch('programManagerTimeZone') || ''}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder={PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.SELECT_TIMEZONE} />
                      </SelectTrigger>
                      <SelectContent>
                        {PROGRAM_MANAGER_DROPDOWN_OPTIONS.TIME_ZONES.map((timezone) => (
                          <SelectItem key={timezone.value} value={timezone.value}>
                            {timezone.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="batchPrefix" className="text-sm font-medium">
                      {PROGRAM_MANAGER_STRINGS.LABELS.BATCH_PREFIX} <span className="text-destructive">{PROGRAM_MANAGER_STRINGS.REQUIRED_INDICATOR}</span>
                    </Label>
                    <Input
                      id="batchPrefix"
                      type="text"
                      placeholder={PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.ENTER_BATCH_PREFIX}
                      disabled={isViewMode || loading}
                      className="h-11"
                      {...register('batchPrefix')}
                    />
                  </div>
                </div>
              </div>

              {/* Scheduler & Logo Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="p-1 rounded bg-primary/10">
                    <Info className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">{PROGRAM_MANAGER_STRINGS.SECTIONS.SCHEDULER_LOGO}</h3>
                </div>
                <Separator className="border-border/50" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="schedulerRunTime" className="text-sm font-medium">
                      {PROGRAM_MANAGER_STRINGS.LABELS.SCHEDULER_RUN_TIME} <span className="text-destructive">{PROGRAM_MANAGER_STRINGS.REQUIRED_INDICATOR}</span>
                    </Label>
                    <Input
                      id="schedulerRunTime"
                      type="time"
                      disabled={isViewMode || loading}
                      className="h-11"
                      {...register('schedulerRunTime')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="associatedBankNames" className="text-sm font-medium">
                      {PROGRAM_MANAGER_STRINGS.LABELS.ASSOCIATED_BANK_NAMES} <span className="text-destructive">{PROGRAM_MANAGER_STRINGS.REQUIRED_INDICATOR}</span>
                    </Label>
                    <Input
                      id="associatedBankNames"
                      type="text"
                      placeholder={PROGRAM_MANAGER_STRINGS.PLACEHOLDERS.ENTER_BANK_NAMES}
                      disabled={isViewMode || loading}
                      className="h-11"
                      {...register('associatedBankNames')}
                    />
                    {errors.associatedBankNames && (
                      <p className="text-sm text-destructive">
                        {errors.associatedBankNames.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      {PROGRAM_MANAGER_STRINGS.LABELS.PROGRAM_MANAGER_LOGO}
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isViewMode || loading}
                        onClick={() => document.getElementById('logoUpload')?.click()}
                        className="h-11 px-3"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {PROGRAM_MANAGER_STRINGS.BUTTONS.BROWSE}
                      </Button>
                      <input
                        id="logoUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <span className="text-sm text-muted-foreground">
                        {watch('programManagerLogo') 
                          ? PROGRAM_MANAGER_STRINGS.FILES.FILE_SELECTED 
                          : PROGRAM_MANAGER_STRINGS.FILES.NO_FILE_CHOSEN}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border/50">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={loading}
                  className="min-w-[100px]"
                >
                  <X className="mr-2 h-4 w-4" />
                  {isViewMode ? PROGRAM_MANAGER_STRINGS.BUTTONS.BACK : PROGRAM_MANAGER_STRINGS.BUTTONS.CANCEL}
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
                    {PROGRAM_MANAGER_STRINGS.BUTTONS.RESET}
                  </Button>
                )}

                {!isViewMode && (
                  <Button
                    type="submit"
                    disabled={loading}
                    className="min-w-[120px] bg-primary hover:bg-primary/90"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                        <span>{PROGRAM_MANAGER_STRINGS.LOADING.SAVING}</span>
                      </div>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {isEditMode ? PROGRAM_MANAGER_STRINGS.BUTTONS.UPDATE : PROGRAM_MANAGER_STRINGS.BUTTONS.CREATE}
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

export default ProgramManagerForm;
