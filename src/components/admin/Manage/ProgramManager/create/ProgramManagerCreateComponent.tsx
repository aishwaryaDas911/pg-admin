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
import { Save, RotateCcw, X, Upload, Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

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

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue('programManagerLogo', file);
      setIsTableDataChanged(true);
    }
  };

  return (
    <div className="space-y-6">
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
                  Configure a new program manager with all required details
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-mb-blue/10 text-mb-blue border-mb-blue/20">
              Payment Gateway
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Basic Information Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="p-1 rounded bg-primary/10">
                    <Info className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">Basic Information</h3>
                </div>
                <Separator className="border-border/50" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="programManagerName" className="text-sm font-medium">
                      Program Manager Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="programManagerName"
                      type="text"
                      placeholder="Enter program manager name"
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
                      Company Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="companyName"
                      type="text"
                      placeholder="Enter company name"
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
                      Business Entity Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="businessEntityName"
                      type="text"
                      placeholder="Enter business entity name"
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
                      Contact Person <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="contactPerson"
                      type="text"
                      placeholder="Enter contact person"
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
                <h4 className="text-md font-medium text-muted-foreground">Contact Details</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-sm font-medium">
                      Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="Enter phone number"
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
                      Extension
                    </Label>
                    <Input
                      id="extension"
                      type="text"
                      placeholder="Enter extension"
                      disabled={isViewMode || loading}
                      className="h-11"
                      {...register('extension')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emailId" className="text-sm font-medium">
                      Email ID <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="emailId"
                      type="email"
                      placeholder="Enter email address"
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
                      Currency <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      disabled={isViewMode || loading}
                      onValueChange={(value) => {
                        setValue('currency', value);
                        setIsTableDataChanged(true);
                      }}
                      value={watch('currency') || ''}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="INR">INR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
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
                  <h3 className="text-lg font-medium">Location & Configuration</h3>
                </div>
                <Separator className="border-border/50" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-sm font-medium">
                      Country <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      disabled={isViewMode || loading}
                      onValueChange={(value) => {
                        setValue('country', value);
                        setIsTableDataChanged(true);
                      }}
                      value={watch('country') || ''}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="DE">Germany</SelectItem>
                        <SelectItem value="IN">India</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
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
                      State <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      disabled={isViewMode || loading}
                      onValueChange={(value) => {
                        setValue('state', value);
                        setIsTableDataChanged(true);
                      }}
                      value={watch('state') || ''}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
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
                      Program Manager Time Zone <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      disabled={isViewMode || loading}
                      onValueChange={(value) => {
                        setValue('programManagerTimeZone', value);
                        setIsTableDataChanged(true);
                      }}
                      value={watch('programManagerTimeZone') || ''}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC-8">UTC-08:00 (PST)</SelectItem>
                        <SelectItem value="UTC-5">UTC-05:00 (EST)</SelectItem>
                        <SelectItem value="UTC+0">UTC+00:00 (GMT)</SelectItem>
                        <SelectItem value="UTC+5:30">UTC+05:30 (IST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="batchPrefix" className="text-sm font-medium">
                      Batch Prefix <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="batchPrefix"
                      type="text"
                      placeholder="Enter batch prefix"
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
                  <h3 className="text-lg font-medium">Scheduler & Logo</h3>
                </div>
                <Separator className="border-border/50" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="schedulerRunTime" className="text-sm font-medium">
                      Scheduler Run Time <span className="text-destructive">*</span>
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
                      Associated Bank Name(s) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="associatedBankNames"
                      type="text"
                      placeholder="Enter bank names (comma separated)"
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
                      Program Manager Logo
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
                        Browse
                      </Button>
                      <input
                        id="logoUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <span className="text-sm text-muted-foreground">
                        {watch('programManagerLogo') ? 'File selected' : 'No file chosen'}
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
                    className="min-w-[120px] bg-primary hover:bg-primary/90"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                        <span>Saving...</span>
                      </div>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {tableActionState === 'edit' ? 'Update' : 'Create'}
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
