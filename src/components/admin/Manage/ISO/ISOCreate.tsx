import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { DROPDOWN_OPTIONS } from '@/constants/adminConstants';
import { ISO_STRINGS, ISO_FIELD_CONFIG } from '@/constants/isoConstants';
import { isoService } from '@/services/isoService';
import {
  Building,
  Upload,
  RotateCcw,
  X,
  Plus,
  Minus,
  CreditCard,
  MapPin,
  User,
  Trash2,
  Save,
} from 'lucide-react';

// Zod validation schema
const panRangeSchema = z.object({
  panLow: z.string()
    .min(6, 'Pan Low must be 6 digits')
    .max(6, 'Pan Low must be 6 digits')
    .regex(/^\d{6}$/, 'Pan Low must be 6 digits'),
  panHigh: z.string()
    .min(6, 'Pan High must be 6 digits')
    .max(6, 'Pan High must be 6 digits')
    .regex(/^\d{6}$/, 'Pan High must be 6 digits'),
}).refine((data) => parseInt(data.panHigh) > parseInt(data.panLow), {
  message: 'Pan High must be greater than Pan Low',
  path: ['panHigh'],
});

const isoSchema = z.object({
  programManager: z.string().min(1, ISO_STRINGS.VALIDATION.PROGRAM_MANAGER_REQUIRED),
  isoName: z.string().min(1, ISO_STRINGS.VALIDATION.ISO_NAME_REQUIRED),
  businessEntityName: z.string().min(1, ISO_STRINGS.VALIDATION.BUSINESS_ENTITY_NAME_REQUIRED),
  contactPerson: z.string().min(1, ISO_STRINGS.VALIDATION.CONTACT_PERSON_REQUIRED),
  currency: z.string().min(1, ISO_STRINGS.VALIDATION.CURRENCY_REQUIRED),
  processor: z.string().min(1, ISO_STRINGS.VALIDATION.PROCESSOR_REQUIRED),
  address: z.string().min(1, ISO_STRINGS.VALIDATION.ADDRESS_REQUIRED),
  city: z.string().min(1, ISO_STRINGS.VALIDATION.CITY_REQUIRED),
  country: z.string().min(1, ISO_STRINGS.VALIDATION.COUNTRY_REQUIRED),
  state: z.string().min(1, ISO_STRINGS.VALIDATION.STATE_REQUIRED),
  zipCode: z.string()
    .min(1, ISO_STRINGS.VALIDATION.ZIP_CODE_REQUIRED)
    .regex(ISO_FIELD_CONFIG.ZIP_CODE_VALIDATION.PATTERN, ISO_STRINGS.VALIDATION.INVALID_ZIP_CODE),
  phoneNumber: z.string()
    .min(1, ISO_STRINGS.VALIDATION.PHONE_NUMBER_REQUIRED)
    .regex(ISO_FIELD_CONFIG.PHONE_VALIDATION.PATTERN, ISO_STRINGS.VALIDATION.INVALID_PHONE),
  extension: z.string().optional(),
  emailId: z.string()
    .min(1, ISO_STRINGS.VALIDATION.EMAIL_ID_REQUIRED)
    .regex(ISO_FIELD_CONFIG.EMAIL_VALIDATION.PATTERN, ISO_STRINGS.VALIDATION.INVALID_EMAIL),
  bankName: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  bankRoutingNumber: z.string().optional(),
  panRanges: z.array(panRangeSchema).min(1, 'At least one PAN range is required'),
});

type ISOFormData = z.infer<typeof isoSchema>;

interface ISOCreateProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const ISOCreate: React.FC<ISOCreateProps> = ({ onSuccess, onCancel }) => {
  const { toast } = useToast();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ISOFormData>({
    resolver: zodResolver(isoSchema),
    defaultValues: {
      panRanges: [{ panLow: '', panHigh: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'panRanges',
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!ISO_FIELD_CONFIG.FILE_VALIDATION.ACCEPTED_TYPES.includes(file.type)) {
        toast({
          title: ISO_STRINGS.TOAST.INVALID_FILE_TYPE_TITLE,
          description: ISO_STRINGS.VALIDATION.INVALID_FILE_TYPE,
          variant: 'destructive',
        });
        return;
      }

      // Validate file size
      if (file.size > ISO_FIELD_CONFIG.FILE_VALIDATION.MAX_SIZE_BYTES) {
        toast({
          title: ISO_STRINGS.TOAST.FILE_TOO_LARGE_TITLE,
          description: ISO_STRINGS.VALIDATION.FILE_TOO_LARGE,
          variant: 'destructive',
        });
        return;
      }

      setLogoFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setLogoFile(null);
    setLogoPreview('');
    // Reset file input
    const fileInput = document.getElementById('iso-logo-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const addPanRange = () => {
    append({ panLow: '', panHigh: '' });
  };

  const removePanRange = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const onSubmit = async (data: ISOFormData) => {
    setIsSubmitting(true);
    try {
      // Prepare form data for submission
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'panRanges') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value as string);
        }
      });

      if (logoFile) {
        formData.append('isoLogo', logoFile);
      }

      // Submit to service
      await isoService.create(data);

      toast({
        title: ISO_STRINGS.TOAST.ISO_CREATED_TITLE,
        description: ISO_STRINGS.TOAST.ISO_CREATED_DESCRIPTION,
      });

      // Reset form and call success callback
      reset();
      removeFile();
      onSuccess?.();
    } catch (error) {
      toast({
        title: ISO_STRINGS.TOAST.VALIDATION_ERROR_TITLE,
        description: 'Failed to create ISO. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    reset();
    removeFile();
    toast({
      title: ISO_STRINGS.TOAST.FORM_RESET_TITLE,
      description: ISO_STRINGS.TOAST.FORM_RESET_DESCRIPTION,
    });
  };

  const handleCancel = () => {
    onCancel?.();
    toast({
      title: ISO_STRINGS.TOAST.CANCELLED_TITLE,
      description: ISO_STRINGS.TOAST.ISO_CREATION_CANCELLED,
    });
  };

  return (
    <Card className="shadow-glass">
      <CardHeader className="bg-gradient-to-r from-mb-blue/5 to-mb-silver/5 border-b">
        <CardTitle className="flex items-center space-x-3">
          <div className="p-2 bg-mb-blue/10 rounded-lg">
            <Building className="h-6 w-6 text-mb-blue" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{ISO_STRINGS.TITLES.CREATE}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {ISO_STRINGS.DESCRIPTIONS.CREATE}
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 pb-2 border-b">
              <User className="h-5 w-5 text-mb-blue" />
              <h3 className="text-lg font-semibold">{ISO_STRINGS.SECTIONS.BASIC_INFORMATION}</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="programManager" className="text-sm font-medium">
                  {ISO_STRINGS.LABELS.PROGRAM_MANAGER} <span className="text-red-500">{ISO_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Select onValueChange={(value) => setValue('programManager', value)}>
                  <SelectTrigger className={errors.programManager ? 'border-red-500' : ''}>
                    <SelectValue placeholder={ISO_STRINGS.PLACEHOLDERS.SELECT_PROGRAM_MANAGER} />
                  </SelectTrigger>
                  <SelectContent>
                    {DROPDOWN_OPTIONS.PROGRAM_MANAGERS.map((pm) => (
                      <SelectItem key={pm.value} value={pm.value}>
                        {pm.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.programManager && (
                  <p className="text-xs text-red-500">{errors.programManager.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="isoName" className="text-sm font-medium">
                  {ISO_STRINGS.LABELS.ISO_NAME} <span className="text-red-500">{ISO_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Input
                  id="isoName"
                  placeholder={ISO_STRINGS.PLACEHOLDERS.ENTER_ISO_NAME}
                  {...register('isoName')}
                  className={errors.isoName ? 'border-red-500' : ''}
                />
                {errors.isoName && (
                  <p className="text-xs text-red-500">{errors.isoName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessEntityName" className="text-sm font-medium">
                  {ISO_STRINGS.LABELS.BUSINESS_ENTITY_NAME} <span className="text-red-500">{ISO_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Input
                  id="businessEntityName"
                  placeholder={ISO_STRINGS.PLACEHOLDERS.ENTER_BUSINESS_ENTITY_NAME}
                  {...register('businessEntityName')}
                  className={errors.businessEntityName ? 'border-red-500' : ''}
                />
                {errors.businessEntityName && (
                  <p className="text-xs text-red-500">{errors.businessEntityName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPerson" className="text-sm font-medium">
                  {ISO_STRINGS.LABELS.CONTACT_PERSON} <span className="text-red-500">{ISO_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Input
                  id="contactPerson"
                  placeholder={ISO_STRINGS.PLACEHOLDERS.ENTER_CONTACT_PERSON}
                  {...register('contactPerson')}
                  className={errors.contactPerson ? 'border-red-500' : ''}
                />
                {errors.contactPerson && (
                  <p className="text-xs text-red-500">{errors.contactPerson.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Payment & Processing Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 pb-2 border-b">
              <CreditCard className="h-5 w-5 text-mb-blue" />
              <h3 className="text-lg font-semibold">{ISO_STRINGS.SECTIONS.PAYMENT_PROCESSING}</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="currency" className="text-sm font-medium">
                  {ISO_STRINGS.LABELS.CURRENCY} <span className="text-red-500">{ISO_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Select onValueChange={(value) => setValue('currency', value)}>
                  <SelectTrigger className={errors.currency ? 'border-red-500' : ''}>
                    <SelectValue placeholder={ISO_STRINGS.PLACEHOLDERS.SELECT_CURRENCY} />
                  </SelectTrigger>
                  <SelectContent>
                    {DROPDOWN_OPTIONS.CURRENCIES.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.currency && (
                  <p className="text-xs text-red-500">{errors.currency.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="processor" className="text-sm font-medium">
                  {ISO_STRINGS.LABELS.PROCESSOR} <span className="text-red-500">{ISO_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Select onValueChange={(value) => setValue('processor', value)}>
                  <SelectTrigger className={errors.processor ? 'border-red-500' : ''}>
                    <SelectValue placeholder={ISO_STRINGS.PLACEHOLDERS.SELECT_PROCESSOR} />
                  </SelectTrigger>
                  <SelectContent>
                    {DROPDOWN_OPTIONS.PROCESSORS.map((processor) => (
                      <SelectItem key={processor.value} value={processor.value}>
                        {processor.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.processor && (
                  <p className="text-xs text-red-500">{errors.processor.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Address Information Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 pb-2 border-b">
              <MapPin className="h-5 w-5 text-mb-blue" />
              <h3 className="text-lg font-semibold">{ISO_STRINGS.SECTIONS.ADDRESS_INFORMATION}</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="space-y-2 lg:col-span-2">
                <Label htmlFor="address" className="text-sm font-medium">
                  {ISO_STRINGS.LABELS.ADDRESS} <span className="text-red-500">{ISO_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Input
                  id="address"
                  placeholder={ISO_STRINGS.PLACEHOLDERS.ENTER_ADDRESS}
                  {...register('address')}
                  className={errors.address ? 'border-red-500' : ''}
                />
                {errors.address && (
                  <p className="text-xs text-red-500">{errors.address.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium">
                  {ISO_STRINGS.LABELS.CITY} <span className="text-red-500">{ISO_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Input
                  id="city"
                  placeholder={ISO_STRINGS.PLACEHOLDERS.ENTER_CITY}
                  {...register('city')}
                  className={errors.city ? 'border-red-500' : ''}
                />
                {errors.city && (
                  <p className="text-xs text-red-500">{errors.city.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm font-medium">
                  {ISO_STRINGS.LABELS.COUNTRY} <span className="text-red-500">{ISO_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Select onValueChange={(value) => setValue('country', value)}>
                  <SelectTrigger className={errors.country ? 'border-red-500' : ''}>
                    <SelectValue placeholder={ISO_STRINGS.PLACEHOLDERS.SELECT_COUNTRY} />
                  </SelectTrigger>
                  <SelectContent>
                    {DROPDOWN_OPTIONS.COUNTRIES.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country && (
                  <p className="text-xs text-red-500">{errors.country.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm font-medium">
                  {ISO_STRINGS.LABELS.STATE} <span className="text-red-500">{ISO_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Select onValueChange={(value) => setValue('state', value)}>
                  <SelectTrigger className={errors.state ? 'border-red-500' : ''}>
                    <SelectValue placeholder={ISO_STRINGS.PLACEHOLDERS.SELECT_STATE} />
                  </SelectTrigger>
                  <SelectContent>
                    {DROPDOWN_OPTIONS.STATES.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.state && (
                  <p className="text-xs text-red-500">{errors.state.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="zipCode" className="text-sm font-medium">
                  {ISO_STRINGS.LABELS.ZIP_CODE} <span className="text-red-500">{ISO_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Input
                  id="zipCode"
                  placeholder={ISO_STRINGS.PLACEHOLDERS.ENTER_ZIP_CODE}
                  {...register('zipCode')}
                  className={errors.zipCode ? 'border-red-500' : ''}
                />
                {errors.zipCode && (
                  <p className="text-xs text-red-500">{errors.zipCode.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-sm font-medium">
                  {ISO_STRINGS.LABELS.PHONE_NUMBER} <span className="text-red-500">{ISO_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Input
                  id="phoneNumber"
                  placeholder={ISO_STRINGS.PLACEHOLDERS.ENTER_PHONE_NUMBER}
                  {...register('phoneNumber')}
                  className={errors.phoneNumber ? 'border-red-500' : ''}
                />
                {errors.phoneNumber && (
                  <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact & Banking Information Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 pb-2 border-b">
              <Building className="h-5 w-5 text-mb-blue" />
              <h3 className="text-lg font-semibold">{ISO_STRINGS.SECTIONS.CONTACT_BANKING}</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="extension" className="text-sm font-medium">
                  {ISO_STRINGS.LABELS.EXTENSION}
                </Label>
                <Input
                  id="extension"
                  placeholder={ISO_STRINGS.PLACEHOLDERS.ENTER_EXTENSION}
                  {...register('extension')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailId" className="text-sm font-medium">
                  {ISO_STRINGS.LABELS.EMAIL_ID} <span className="text-red-500">{ISO_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Input
                  id="emailId"
                  type="email"
                  placeholder={ISO_STRINGS.PLACEHOLDERS.ENTER_EMAIL_ADDRESS}
                  {...register('emailId')}
                  className={errors.emailId ? 'border-red-500' : ''}
                />
                {errors.emailId && (
                  <p className="text-xs text-red-500">{errors.emailId.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankName" className="text-sm font-medium">
                  {ISO_STRINGS.LABELS.BANK_NAME}
                </Label>
                <Input
                  id="bankName"
                  placeholder={ISO_STRINGS.PLACEHOLDERS.ENTER_BANK_NAME}
                  {...register('bankName')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankAccountNumber" className="text-sm font-medium">
                  {ISO_STRINGS.LABELS.BANK_ACCOUNT_NUMBER}
                </Label>
                <Input
                  id="bankAccountNumber"
                  placeholder={ISO_STRINGS.PLACEHOLDERS.ENTER_ACCOUNT_NUMBER}
                  {...register('bankAccountNumber')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankRoutingNumber" className="text-sm font-medium">
                  {ISO_STRINGS.LABELS.BANK_ROUTING_NUMBER}
                </Label>
                <Input
                  id="bankRoutingNumber"
                  placeholder={ISO_STRINGS.PLACEHOLDERS.ENTER_ROUTING_NUMBER}
                  {...register('bankRoutingNumber')}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">{ISO_STRINGS.LABELS.ISO_LOGO}</Label>
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => document.getElementById('iso-logo-upload')?.click()}
                      className="flex items-center space-x-2"
                    >
                      <Upload className="h-4 w-4" />
                      <span>{ISO_STRINGS.FILES.CHOOSE_FILE}</span>
                    </Button>
                    <input
                      id="iso-logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    {logoFile && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={removeFile}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  {logoPreview && (
                    <div className="relative">
                      <img
                        src={logoPreview}
                        alt={ISO_STRINGS.FILES.LOGO_PREVIEW}
                        className="h-20 w-20 object-contain border rounded-lg p-2 bg-gray-50"
                      />
                    </div>
                  )}
                  
                  {logoFile && (
                    <p className="text-xs text-muted-foreground">
                      {logoFile.name} ({(logoFile.size / 1024).toFixed(1)} {ISO_STRINGS.FILES.KB})
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* PAN IIN Range Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-mb-blue" />
                <h3 className="text-lg font-semibold text-mb-blue">{ISO_STRINGS.SECTIONS.PAN_IIN_RANGE}</h3>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addPanRange}
                className="flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>{ISO_STRINGS.BUTTONS.ADD_RANGE}</span>
              </Button>
            </div>
            
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-end space-x-4 p-4 bg-mb-blue/5 rounded-lg border">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`panRanges.${index}.panLow`} className="text-sm font-medium">
                      {ISO_STRINGS.LABELS.PAN_LOW} <span className="text-red-500">{ISO_STRINGS.REQUIRED_INDICATOR}</span>
                    </Label>
                    <Input
                      {...register(`panRanges.${index}.panLow`)}
                      placeholder={ISO_STRINGS.PLACEHOLDERS.ENTER_6_DIGIT_PAN_LOW}
                      className={errors.panRanges?.[index]?.panLow ? 'border-red-500' : ''}
                      maxLength={6}
                    />
                    {errors.panRanges?.[index]?.panLow && (
                      <p className="text-xs text-red-500">{errors.panRanges[index]?.panLow?.message}</p>
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`panRanges.${index}.panHigh`} className="text-sm font-medium">
                      {ISO_STRINGS.LABELS.PAN_HIGH} <span className="text-red-500">{ISO_STRINGS.REQUIRED_INDICATOR}</span>
                    </Label>
                    <Input
                      {...register(`panRanges.${index}.panHigh`)}
                      placeholder={ISO_STRINGS.PLACEHOLDERS.ENTER_6_DIGIT_PAN_HIGH}
                      className={errors.panRanges?.[index]?.panHigh ? 'border-red-500' : ''}
                      maxLength={6}
                    />
                    {errors.panRanges?.[index]?.panHigh && (
                      <p className="text-xs text-red-500">{errors.panRanges[index]?.panHigh?.message}</p>
                    )}
                  </div>

                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removePanRange(index)}
                      className="text-red-500 hover:text-red-700 hover:border-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-6 md:pt-8 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel} 
              className="w-full sm:w-auto min-w-[100px]"
              disabled={isSubmitting}
            >
              <X className="mr-2 h-4 w-4" />
              {ISO_STRINGS.BUTTONS.CANCEL}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleReset} 
              className="w-full sm:w-auto min-w-[100px]"
              disabled={isSubmitting}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              {ISO_STRINGS.BUTTONS.RESET}
            </Button>
            <Button 
              type="submit" 
              className="w-full sm:w-auto min-w-[100px] bg-mb-blue hover:bg-mb-blue/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  {ISO_STRINGS.LOADING.CREATING}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {ISO_STRINGS.BUTTONS.CREATE}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ISOCreate;
