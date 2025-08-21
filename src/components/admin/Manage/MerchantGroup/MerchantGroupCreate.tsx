import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { DROPDOWN_OPTIONS } from '@/constants/adminConstants';
import { MERCHANT_GROUP_STRINGS, MERCHANT_GROUP_FIELD_CONFIG } from '@/constants/merchantGroupConstants';
import { merchantGroupService, MerchantGroupData } from '@/services/merchantGroupService';
import {
  Users,
  RotateCcw,
  X,
  Save,
  MapPin,
  Building2,
  Landmark,
  User,
} from 'lucide-react';

// Zod validation schema
const merchantGroupSchema = z.object({
  merchantGroupName: z.string().min(1, MERCHANT_GROUP_STRINGS.VALIDATION.MERCHANT_GROUP_NAME_REQUIRED),
  corporateLegalName: z.string().min(1, MERCHANT_GROUP_STRINGS.VALIDATION.CORPORATE_LEGAL_NAME_REQUIRED),
  address1: z.string().min(1, MERCHANT_GROUP_STRINGS.VALIDATION.ADDRESS_1_REQUIRED),
  address2: z.string().min(1, MERCHANT_GROUP_STRINGS.VALIDATION.ADDRESS_2_REQUIRED),
  address3: z.string().optional(),
  pinCode: z.string()
    .min(1, MERCHANT_GROUP_STRINGS.VALIDATION.PIN_CODE_REQUIRED)
    .regex(MERCHANT_GROUP_FIELD_CONFIG.PIN_CODE_VALIDATION.PATTERN, MERCHANT_GROUP_STRINGS.VALIDATION.INVALID_PIN_CODE),
  country: z.string().min(1, MERCHANT_GROUP_STRINGS.VALIDATION.COUNTRY_REQUIRED),
  state: z.string().min(1, MERCHANT_GROUP_STRINGS.VALIDATION.STATE_REQUIRED),
  city: z.string().min(1, MERCHANT_GROUP_STRINGS.VALIDATION.CITY_REQUIRED),
  contactName: z.string().min(1, MERCHANT_GROUP_STRINGS.VALIDATION.CONTACT_NAME_REQUIRED),
  contactPhone: z.string()
    .min(1, MERCHANT_GROUP_STRINGS.VALIDATION.CONTACT_PHONE_REQUIRED)
    .regex(MERCHANT_GROUP_FIELD_CONFIG.PHONE_VALIDATION.PATTERN, MERCHANT_GROUP_STRINGS.VALIDATION.INVALID_PHONE),
  contactEmailId: z.string()
    .min(1, MERCHANT_GROUP_STRINGS.VALIDATION.CONTACT_EMAIL_ID_REQUIRED)
    .regex(MERCHANT_GROUP_FIELD_CONFIG.EMAIL_VALIDATION.PATTERN, MERCHANT_GROUP_STRINGS.VALIDATION.INVALID_EMAIL),
  routingProfileName: z.string().min(1, MERCHANT_GROUP_STRINGS.VALIDATION.ROUTING_PROFILE_NAME_REQUIRED),
  paymentType: z.string().min(1, MERCHANT_GROUP_STRINGS.VALIDATION.PAYMENT_TYPE_REQUIRED),
  bankName: z.string().min(1, MERCHANT_GROUP_STRINGS.VALIDATION.BANK_NAME_REQUIRED),
  branchName: z.string().min(1, MERCHANT_GROUP_STRINGS.VALIDATION.BRANCH_NAME_REQUIRED),
  nameOnAccount: z.string().min(1, MERCHANT_GROUP_STRINGS.VALIDATION.NAME_ON_ACCOUNT_REQUIRED),
  accountType: z.string().min(1, MERCHANT_GROUP_STRINGS.VALIDATION.ACCOUNT_TYPE_REQUIRED),
  accountNumber: z.string()
    .min(MERCHANT_GROUP_FIELD_CONFIG.ACCOUNT_NUMBER_VALIDATION.MIN_LENGTH, MERCHANT_GROUP_STRINGS.VALIDATION.INVALID_ACCOUNT_NUMBER),
  bankCode: z.string().min(1, MERCHANT_GROUP_STRINGS.VALIDATION.BANK_CODE_REQUIRED),
  bankState: z.string().min(1, MERCHANT_GROUP_STRINGS.VALIDATION.BANK_STATE_REQUIRED),
  bankCity: z.string().min(1, MERCHANT_GROUP_STRINGS.VALIDATION.BANK_CITY_REQUIRED),
});

type MerchantGroupFormData = z.infer<typeof merchantGroupSchema>;

interface MerchantGroupCreateProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  mode?: 'create' | 'edit' | 'view';
  initialData?: MerchantGroupData;
}

export const MerchantGroupCreate: React.FC<MerchantGroupCreateProps> = ({
  onSuccess,
  onCancel,
  mode = 'create',
  initialData
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isReadOnly = mode === 'view';

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MerchantGroupFormData>({
    resolver: zodResolver(merchantGroupSchema),
    defaultValues: initialData || {},
  });

  // Dropdown options from constants
  const { COUNTRIES, STATES, ROUTING_PROFILES, ACCOUNT_TYPES, PAYMENT_TYPES } = DROPDOWN_OPTIONS;

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        setValue(key as keyof MerchantGroupFormData, value);
      });
    }
  }, [initialData, setValue]);

  const onSubmit = async (data: MerchantGroupFormData) => {
    if (isReadOnly) return;

    setIsSubmitting(true);
    try {
      if (mode === 'edit' && initialData?.id) {
        // Update existing merchant group
        await merchantGroupService.update(initialData.id, data);
        toast({
          title: MERCHANT_GROUP_STRINGS.TOAST.MERCHANT_GROUP_UPDATED_TITLE,
          description: MERCHANT_GROUP_STRINGS.TOAST.MERCHANT_GROUP_UPDATED_DESCRIPTION,
        });
      } else {
        // Create new merchant group
        await merchantGroupService.create(data);
        toast({
          title: MERCHANT_GROUP_STRINGS.TOAST.MERCHANT_GROUP_CREATED_TITLE,
          description: MERCHANT_GROUP_STRINGS.TOAST.MERCHANT_GROUP_CREATED_DESCRIPTION,
        });
      }

      // Reset form and call success callback
      if (mode === 'create') {
        reset();
      }
      onSuccess?.();
    } catch (error) {
      toast({
        title: MERCHANT_GROUP_STRINGS.TOAST.VALIDATION_ERROR_TITLE,
        description: `Failed to ${mode} merchant group. Please try again.`,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    reset();
    toast({
      title: MERCHANT_GROUP_STRINGS.TOAST.FORM_RESET_TITLE,
      description: MERCHANT_GROUP_STRINGS.TOAST.FORM_RESET_DESCRIPTION,
    });
  };

  const handleCancel = () => {
    onCancel?.();
    toast({
      title: MERCHANT_GROUP_STRINGS.TOAST.CANCELLED_TITLE,
      description: MERCHANT_GROUP_STRINGS.TOAST.MERCHANT_GROUP_CREATION_CANCELLED,
    });
  };

  return (
    <Card className="shadow-glass">
      <CardHeader className="bg-gradient-to-r from-mb-blue/5 to-mb-silver/5 border-b">
        <CardTitle className="flex items-center space-x-3">
          <div className="p-2 bg-mb-blue/10 rounded-lg">
            <Users className="h-6 w-6 text-mb-blue" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {mode === 'view' ? MERCHANT_GROUP_STRINGS.TITLES.VIEW :
               mode === 'edit' ? MERCHANT_GROUP_STRINGS.TITLES.EDIT :
               MERCHANT_GROUP_STRINGS.TITLES.CREATE}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === 'view' ? 'View merchant group details and information' :
               mode === 'edit' ? 'Edit and update merchant group information' :
               MERCHANT_GROUP_STRINGS.DESCRIPTIONS.CREATE}
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Merchant Group Details Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 pb-2 border-b">
              <Building2 className="h-5 w-5 text-mb-blue" />
              <h3 className="text-lg font-semibold">{MERCHANT_GROUP_STRINGS.SECTIONS.MERCHANT_GROUP_DETAILS}</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="merchantGroupName" className="text-sm font-medium">
                  {MERCHANT_GROUP_STRINGS.LABELS.MERCHANT_GROUP_NAME} <span className="text-red-500">{MERCHANT_GROUP_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Input
                  id="merchantGroupName"
                  placeholder={MERCHANT_GROUP_STRINGS.PLACEHOLDERS.ENTER_MERCHANT_GROUP_NAME}
                  {...register('merchantGroupName')}
                  className={errors.merchantGroupName ? 'border-red-500' : ''}
                  readOnly={isReadOnly}
                />
                {errors.merchantGroupName && (
                  <p className="text-xs text-red-500">{errors.merchantGroupName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="corporateLegalName" className="text-sm font-medium">
                  {MERCHANT_GROUP_STRINGS.LABELS.CORPORATE_LEGAL_NAME} <span className="text-red-500">{MERCHANT_GROUP_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Input
                  id="corporateLegalName"
                  placeholder={MERCHANT_GROUP_STRINGS.PLACEHOLDERS.ENTER_CORPORATE_LEGAL_NAME}
                  {...register('corporateLegalName')}
                  className={errors.corporateLegalName ? 'border-red-500' : ''}
                  readOnly={isReadOnly}
                />
                {errors.corporateLegalName && (
                  <p className="text-xs text-red-500">{errors.corporateLegalName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address1" className="text-sm font-medium">
                  {MERCHANT_GROUP_STRINGS.LABELS.ADDRESS_1} <span className="text-red-500">{MERCHANT_GROUP_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Input
                  id="address1"
                  placeholder={MERCHANT_GROUP_STRINGS.PLACEHOLDERS.ENTER_ADDRESS_LINE_1}
                  {...register('address1')}
                  className={errors.address1 ? 'border-red-500' : ''}
                  readOnly={isReadOnly}
                />
                {errors.address1 && (
                  <p className="text-xs text-red-500">{errors.address1.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address2" className="text-sm font-medium">
                  {MERCHANT_GROUP_STRINGS.LABELS.ADDRESS_2} <span className="text-red-500">{MERCHANT_GROUP_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Input
                  id="address2"
                  placeholder={MERCHANT_GROUP_STRINGS.PLACEHOLDERS.ENTER_ADDRESS_LINE_2}
                  {...register('address2')}
                  className={errors.address2 ? 'border-red-500' : ''}
                  readOnly={isReadOnly}
                />
                {errors.address2 && (
                  <p className="text-xs text-red-500">{errors.address2.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address3" className="text-sm font-medium">
                  {MERCHANT_GROUP_STRINGS.LABELS.ADDRESS_3}
                </Label>
                <Input
                  id="address3"
                  placeholder={MERCHANT_GROUP_STRINGS.PLACEHOLDERS.ENTER_ADDRESS_LINE_3}
                  {...register('address3')}
                  readOnly={isReadOnly}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pinCode" className="text-sm font-medium">
                  {MERCHANT_GROUP_STRINGS.LABELS.PIN_CODE} <span className="text-red-500">{MERCHANT_GROUP_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Input
                  id="pinCode"
                  placeholder={MERCHANT_GROUP_STRINGS.PLACEHOLDERS.ENTER_PIN_CODE}
                  {...register('pinCode')}
                  className={errors.pinCode ? 'border-red-500' : ''}
                  readOnly={isReadOnly}
                />
                {errors.pinCode && (
                  <p className="text-xs text-red-500">{errors.pinCode.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm font-medium">
                  {MERCHANT_GROUP_STRINGS.LABELS.COUNTRY} <span className="text-red-500">{MERCHANT_GROUP_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Select 
                  onValueChange={(value) => setValue('country', value)} 
                  defaultValue={watch('country')}
                  disabled={isReadOnly}
                >
                  <SelectTrigger className={errors.country ? 'border-red-500' : ''}>
                    <SelectValue placeholder={MERCHANT_GROUP_STRINGS.PLACEHOLDERS.SELECT_COUNTRY} />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((country) => (
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
                  {MERCHANT_GROUP_STRINGS.LABELS.STATE} <span className="text-red-500">{MERCHANT_GROUP_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Select 
                  onValueChange={(value) => setValue('state', value)} 
                  defaultValue={watch('state')}
                  disabled={isReadOnly}
                >
                  <SelectTrigger className={errors.state ? 'border-red-500' : ''}>
                    <SelectValue placeholder={MERCHANT_GROUP_STRINGS.PLACEHOLDERS.SELECT_STATE} />
                  </SelectTrigger>
                  <SelectContent>
                    {STATES.map((state) => (
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
            </div>

            {/* Contact Information Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium">
                  {MERCHANT_GROUP_STRINGS.LABELS.CITY} <span className="text-red-500">{MERCHANT_GROUP_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Input
                  id="city"
                  placeholder={MERCHANT_GROUP_STRINGS.PLACEHOLDERS.ENTER_CITY}
                  {...register('city')}
                  className={errors.city ? 'border-red-500' : ''}
                  readOnly={isReadOnly}
                />
                {errors.city && (
                  <p className="text-xs text-red-500">{errors.city.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactName" className="text-sm font-medium">
                  {MERCHANT_GROUP_STRINGS.LABELS.CONTACT_NAME} <span className="text-red-500">{MERCHANT_GROUP_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Input
                  id="contactName"
                  placeholder={MERCHANT_GROUP_STRINGS.PLACEHOLDERS.ENTER_CONTACT_NAME}
                  {...register('contactName')}
                  className={errors.contactName ? 'border-red-500' : ''}
                  readOnly={isReadOnly}
                />
                {errors.contactName && (
                  <p className="text-xs text-red-500">{errors.contactName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone" className="text-sm font-medium">
                  {MERCHANT_GROUP_STRINGS.LABELS.CONTACT_PHONE} <span className="text-red-500">{MERCHANT_GROUP_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Input
                  id="contactPhone"
                  placeholder={MERCHANT_GROUP_STRINGS.PLACEHOLDERS.ENTER_CONTACT_PHONE}
                  {...register('contactPhone')}
                  className={errors.contactPhone ? 'border-red-500' : ''}
                  readOnly={isReadOnly}
                />
                {errors.contactPhone && (
                  <p className="text-xs text-red-500">{errors.contactPhone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmailId" className="text-sm font-medium">
                  {MERCHANT_GROUP_STRINGS.LABELS.CONTACT_EMAIL_ID} <span className="text-red-500">{MERCHANT_GROUP_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Input
                  id="contactEmailId"
                  type="email"
                  placeholder={MERCHANT_GROUP_STRINGS.PLACEHOLDERS.ENTER_CONTACT_EMAIL}
                  {...register('contactEmailId')}
                  className={errors.contactEmailId ? 'border-red-500' : ''}
                  readOnly={isReadOnly}
                />
                {errors.contactEmailId && (
                  <p className="text-xs text-red-500">{errors.contactEmailId.message}</p>
                )}
              </div>
            </div>

            {/* Routing Profile Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="routingProfileName" className="text-sm font-medium">
                  {MERCHANT_GROUP_STRINGS.LABELS.ROUTING_PROFILE_NAME} <span className="text-red-500">{MERCHANT_GROUP_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Select 
                  onValueChange={(value) => setValue('routingProfileName', value)} 
                  defaultValue={watch('routingProfileName')}
                  disabled={isReadOnly}
                >
                  <SelectTrigger className={errors.routingProfileName ? 'border-red-500' : ''}>
                    <SelectValue placeholder={MERCHANT_GROUP_STRINGS.PLACEHOLDERS.SELECT_ROUTING_PROFILE} />
                  </SelectTrigger>
                  <SelectContent>
                    {ROUTING_PROFILES.map((profile) => (
                      <SelectItem key={profile.value} value={profile.value}>
                        {profile.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.routingProfileName && (
                  <p className="text-xs text-red-500">{errors.routingProfileName.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Account Details Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 pb-2 border-b">
              <Landmark className="h-5 w-5 text-mb-blue" />
              <h3 className="text-lg font-semibold">{MERCHANT_GROUP_STRINGS.SECTIONS.ACCOUNT_DETAILS}</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="paymentType" className="text-sm font-medium">
                  {MERCHANT_GROUP_STRINGS.LABELS.PAYMENT_TYPE} <span className="text-red-500">{MERCHANT_GROUP_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Select 
                  onValueChange={(value) => setValue('paymentType', value)} 
                  defaultValue={watch('paymentType')}
                  disabled={isReadOnly}
                >
                  <SelectTrigger className={errors.paymentType ? 'border-red-500' : ''}>
                    <SelectValue placeholder={MERCHANT_GROUP_STRINGS.PLACEHOLDERS.SELECT_PAYMENT_TYPE} />
                  </SelectTrigger>
                  <SelectContent>
                    {PAYMENT_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.paymentType && (
                  <p className="text-xs text-red-500">{errors.paymentType.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankName" className="text-sm font-medium">
                  {MERCHANT_GROUP_STRINGS.LABELS.BANK_NAME} <span className="text-red-500">{MERCHANT_GROUP_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Input
                  id="bankName"
                  placeholder={MERCHANT_GROUP_STRINGS.PLACEHOLDERS.ENTER_BANK_NAME}
                  {...register('bankName')}
                  className={errors.bankName ? 'border-red-500' : ''}
                  readOnly={isReadOnly}
                />
                {errors.bankName && (
                  <p className="text-xs text-red-500">{errors.bankName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="branchName" className="text-sm font-medium">
                  {MERCHANT_GROUP_STRINGS.LABELS.BRANCH_NAME} <span className="text-red-500">{MERCHANT_GROUP_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Input
                  id="branchName"
                  placeholder={MERCHANT_GROUP_STRINGS.PLACEHOLDERS.ENTER_BRANCH_NAME}
                  {...register('branchName')}
                  className={errors.branchName ? 'border-red-500' : ''}
                  readOnly={isReadOnly}
                />
                {errors.branchName && (
                  <p className="text-xs text-red-500">{errors.branchName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="nameOnAccount" className="text-sm font-medium">
                  {MERCHANT_GROUP_STRINGS.LABELS.NAME_ON_ACCOUNT} <span className="text-red-500">{MERCHANT_GROUP_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Input
                  id="nameOnAccount"
                  placeholder={MERCHANT_GROUP_STRINGS.PLACEHOLDERS.ENTER_ACCOUNT_HOLDER_NAME}
                  {...register('nameOnAccount')}
                  className={errors.nameOnAccount ? 'border-red-500' : ''}
                  readOnly={isReadOnly}
                />
                {errors.nameOnAccount && (
                  <p className="text-xs text-red-500">{errors.nameOnAccount.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountType" className="text-sm font-medium">
                  {MERCHANT_GROUP_STRINGS.LABELS.ACCOUNT_TYPE} <span className="text-red-500">{MERCHANT_GROUP_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Select 
                  onValueChange={(value) => setValue('accountType', value)} 
                  defaultValue={watch('accountType')}
                  disabled={isReadOnly}
                >
                  <SelectTrigger className={errors.accountType ? 'border-red-500' : ''}>
                    <SelectValue placeholder={MERCHANT_GROUP_STRINGS.PLACEHOLDERS.SELECT_ACCOUNT_TYPE} />
                  </SelectTrigger>
                  <SelectContent>
                    {ACCOUNT_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.accountType && (
                  <p className="text-xs text-red-500">{errors.accountType.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber" className="text-sm font-medium">
                  {MERCHANT_GROUP_STRINGS.LABELS.ACCOUNT_NUMBER} <span className="text-red-500">{MERCHANT_GROUP_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Input
                  id="accountNumber"
                  placeholder={MERCHANT_GROUP_STRINGS.PLACEHOLDERS.ENTER_ACCOUNT_NUMBER}
                  {...register('accountNumber')}
                  className={errors.accountNumber ? 'border-red-500' : ''}
                  readOnly={isReadOnly}
                />
                {errors.accountNumber && (
                  <p className="text-xs text-red-500">{errors.accountNumber.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankCode" className="text-sm font-medium">
                  {MERCHANT_GROUP_STRINGS.LABELS.BANK_CODE} <span className="text-red-500">{MERCHANT_GROUP_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Input
                  id="bankCode"
                  placeholder={MERCHANT_GROUP_STRINGS.PLACEHOLDERS.ENTER_BANK_CODE}
                  {...register('bankCode')}
                  className={errors.bankCode ? 'border-red-500' : ''}
                  readOnly={isReadOnly}
                />
                {errors.bankCode && (
                  <p className="text-xs text-red-500">{errors.bankCode.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankState" className="text-sm font-medium">
                  {MERCHANT_GROUP_STRINGS.LABELS.BANK_STATE} <span className="text-red-500">{MERCHANT_GROUP_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Select 
                  onValueChange={(value) => setValue('bankState', value)} 
                  defaultValue={watch('bankState')}
                  disabled={isReadOnly}
                >
                  <SelectTrigger className={errors.bankState ? 'border-red-500' : ''}>
                    <SelectValue placeholder={MERCHANT_GROUP_STRINGS.PLACEHOLDERS.SELECT_STATE} />
                  </SelectTrigger>
                  <SelectContent>
                    {STATES.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.bankState && (
                  <p className="text-xs text-red-500">{errors.bankState.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankCity" className="text-sm font-medium">
                  {MERCHANT_GROUP_STRINGS.LABELS.BANK_CITY} <span className="text-red-500">{MERCHANT_GROUP_STRINGS.REQUIRED_INDICATOR}</span>
                </Label>
                <Input
                  id="bankCity"
                  placeholder={MERCHANT_GROUP_STRINGS.PLACEHOLDERS.ENTER_BANK_CITY}
                  {...register('bankCity')}
                  className={errors.bankCity ? 'border-red-500' : ''}
                  readOnly={isReadOnly}
                />
                {errors.bankCity && (
                  <p className="text-xs text-red-500">{errors.bankCity.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {!isReadOnly && (
            <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-6 md:pt-8 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCancel} 
                className="w-full sm:w-auto min-w-[100px]"
                disabled={isSubmitting}
              >
                <X className="mr-2 h-4 w-4" />
                {MERCHANT_GROUP_STRINGS.BUTTONS.CANCEL}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleReset} 
                className="w-full sm:w-auto min-w-[100px]"
                disabled={isSubmitting}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                {MERCHANT_GROUP_STRINGS.BUTTONS.RESET}
              </Button>
              <Button 
                type="submit" 
                className="w-full sm:w-auto min-w-[100px] bg-mb-blue hover:bg-mb-blue/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                    {MERCHANT_GROUP_STRINGS.LOADING.CREATING}
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {mode === 'edit' ? MERCHANT_GROUP_STRINGS.BUTTONS.SAVE : MERCHANT_GROUP_STRINGS.BUTTONS.CREATE}
                  </>
                )}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default MerchantGroupCreate;
