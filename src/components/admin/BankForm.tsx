import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ADMIN_STRINGS, DROPDOWN_OPTIONS } from '@/constants/adminConstants';
import {
  Landmark,
  RotateCcw,
  X,
  Plus
} from 'lucide-react';

interface BankData {
  bankName: string;
  bankCode: string;
  settlementRoutingNumber: string;
  settlementAccountNumber: string;
  address1: string;
  address2: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
  primaryContactName: string;
  contactMobileNumber: string;
  contactPhoneNumber: string;
  extension: string;
  fax: string;
  emailAddress: string;
  localCurrency: string;
}

interface BankFormProps {
  onSubmit: (data: BankData) => void;
  onCancel: () => void;
  onReset: () => void;
}

export const BankForm: React.FC<BankFormProps> = ({
  onSubmit,
  onCancel,
  onReset
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<BankData>({
    bankName: '',
    bankCode: '',
    settlementRoutingNumber: '',
    settlementAccountNumber: '',
    address1: '',
    address2: '',
    city: '',
    country: '',
    state: '',
    zipCode: '',
    primaryContactName: '',
    contactMobileNumber: '',
    contactPhoneNumber: '',
    extension: '',
    fax: '',
    emailAddress: '',
    localCurrency: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Dropdown options from constants
  const { COUNTRIES, STATES, CURRENCIES } = DROPDOWN_OPTIONS;

  const handleInputChange = (field: keyof BankData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const requiredFields = {
      bankName: ADMIN_STRINGS.FORM_LABELS.BANK_NAME,
      bankCode: ADMIN_STRINGS.FORM_LABELS.BANK_CODE,
      settlementRoutingNumber: ADMIN_STRINGS.FORM_LABELS.SETTLEMENT_ROUTING_NUMBER,
      settlementAccountNumber: ADMIN_STRINGS.FORM_LABELS.SETTLEMENT_ACCOUNT_NUMBER,
      address1: ADMIN_STRINGS.FORM_LABELS.ADDRESS_1,
      city: ADMIN_STRINGS.FORM_LABELS.CITY,
      country: ADMIN_STRINGS.FORM_LABELS.COUNTRY,
      state: ADMIN_STRINGS.FORM_LABELS.STATE,
      zipCode: ADMIN_STRINGS.FORM_LABELS.ZIP_CODE,
      primaryContactName: ADMIN_STRINGS.FORM_LABELS.PRIMARY_CONTACT_NAME,
      contactPhoneNumber: ADMIN_STRINGS.FORM_LABELS.CONTACT_PHONE_NUMBER,
      emailAddress: ADMIN_STRINGS.FORM_LABELS.EMAIL_ADDRESS,
      localCurrency: ADMIN_STRINGS.FORM_LABELS.LOCAL_CURRENCY
    };

    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!formData[field as keyof BankData]) {
        newErrors[field] = `${label} ${ADMIN_STRINGS.VALIDATION.REQUIRED}`;
      }
    });

    // Email validation
    if (formData.emailAddress && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
      newErrors.emailAddress = ADMIN_STRINGS.VALIDATION.INVALID_EMAIL;
    }

    // Phone validation
    if (formData.contactPhoneNumber && !/^\+?[\d\s-()]+$/.test(formData.contactPhoneNumber)) {
      newErrors.contactPhoneNumber = ADMIN_STRINGS.VALIDATION.INVALID_PHONE;
    }

    // Mobile validation
    if (formData.contactMobileNumber && !/^\+?[\d\s-()]+$/.test(formData.contactMobileNumber)) {
      newErrors.contactMobileNumber = ADMIN_STRINGS.VALIDATION.INVALID_MOBILE;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      toast({
        title: ADMIN_STRINGS.TOAST.CREATED_SUCCESS,
        description: ADMIN_STRINGS.TOAST.BANK_CREATED,
      });
    } else {
      toast({
        title: ADMIN_STRINGS.TOAST.VALIDATION_ERROR,
        description: ADMIN_STRINGS.VALIDATION.FIX_ERRORS,
        variant: "destructive"
      });
    }
  };

  const handleReset = () => {
    setFormData({
      bankName: '',
      bankCode: '',
      settlementRoutingNumber: '',
      settlementAccountNumber: '',
      address1: '',
      address2: '',
      city: '',
      country: '',
      state: '',
      zipCode: '',
      primaryContactName: '',
      contactMobileNumber: '',
      contactPhoneNumber: '',
      extension: '',
      fax: '',
      emailAddress: '',
      localCurrency: ''
    });
    setErrors({});
    onReset();
  };

  return (
    <Card className="shadow-glass">
      <CardHeader className="bg-gradient-to-r from-mb-blue/5 to-mb-silver/5 border-b">
        <CardTitle className="flex items-center space-x-3">
          <div className="p-2 bg-mb-blue/10 rounded-lg">
            <Landmark className="h-6 w-6 text-mb-blue" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{ADMIN_STRINGS.PAGES.CREATE_BANK}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {ADMIN_STRINGS.DESCRIPTIONS.BANK_DESC}
            </p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
              <Label htmlFor="settlementRoutingNumber" className="text-sm font-medium">
                Settlement Routing Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="settlementRoutingNumber"
                placeholder="Enter settlement routing number"
                value={formData.settlementRoutingNumber}
                onChange={(e) => handleInputChange('settlementRoutingNumber', e.target.value)}
                className={errors.settlementRoutingNumber ? 'border-red-500' : ''}
              />
              {errors.settlementRoutingNumber && (
                <p className="text-xs text-red-500">{errors.settlementRoutingNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="settlementAccountNumber" className="text-sm font-medium">
                Settlement Account Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="settlementAccountNumber"
                placeholder="Enter settlement account number"
                value={formData.settlementAccountNumber}
                onChange={(e) => handleInputChange('settlementAccountNumber', e.target.value)}
                className={errors.settlementAccountNumber ? 'border-red-500' : ''}
              />
              {errors.settlementAccountNumber && (
                <p className="text-xs text-red-500">{errors.settlementAccountNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address1" className="text-sm font-medium">
                Address 1 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="address1"
                placeholder="Enter address line 1"
                value={formData.address1}
                onChange={(e) => handleInputChange('address1', e.target.value)}
                className={errors.address1 ? 'border-red-500' : ''}
              />
              {errors.address1 && (
                <p className="text-xs text-red-500">{errors.address1}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address2" className="text-sm font-medium">
                Address 2
              </Label>
              <Input
                id="address2"
                placeholder="Enter address line 2"
                value={formData.address2}
                onChange={(e) => handleInputChange('address2', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-medium">
                City <span className="text-red-500">*</span>
              </Label>
              <Input
                id="city"
                placeholder="Enter city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className={errors.city ? 'border-red-500' : ''}
              />
              {errors.city && (
                <p className="text-xs text-red-500">{errors.city}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country" className="text-sm font-medium">
                Country <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                <SelectTrigger className={errors.country ? 'border-red-500' : ''}>
                  <SelectValue placeholder={ADMIN_STRINGS.PLACEHOLDERS.SELECT} />
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
                <p className="text-xs text-red-500">{errors.country}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="state" className="text-sm font-medium">
                State <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                <SelectTrigger className={errors.state ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.state && (
                <p className="text-xs text-red-500">{errors.state}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode" className="text-sm font-medium">
                Zip Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="zipCode"
                placeholder="Enter zip code"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                className={errors.zipCode ? 'border-red-500' : ''}
              />
              {errors.zipCode && (
                <p className="text-xs text-red-500">{errors.zipCode}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="primaryContactName" className="text-sm font-medium">
                Primary Contact Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="primaryContactName"
                placeholder="Enter primary contact name"
                value={formData.primaryContactName}
                onChange={(e) => handleInputChange('primaryContactName', e.target.value)}
                className={errors.primaryContactName ? 'border-red-500' : ''}
              />
              {errors.primaryContactName && (
                <p className="text-xs text-red-500">{errors.primaryContactName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactMobileNumber" className="text-sm font-medium">
                Contact Mobile Number
              </Label>
              <Input
                id="contactMobileNumber"
                placeholder="Enter contact mobile number"
                value={formData.contactMobileNumber}
                onChange={(e) => handleInputChange('contactMobileNumber', e.target.value)}
                className={errors.contactMobileNumber ? 'border-red-500' : ''}
              />
              {errors.contactMobileNumber && (
                <p className="text-xs text-red-500">{errors.contactMobileNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhoneNumber" className="text-sm font-medium">
                Contact Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contactPhoneNumber"
                placeholder="Enter contact phone number"
                value={formData.contactPhoneNumber}
                onChange={(e) => handleInputChange('contactPhoneNumber', e.target.value)}
                className={errors.contactPhoneNumber ? 'border-red-500' : ''}
              />
              {errors.contactPhoneNumber && (
                <p className="text-xs text-red-500">{errors.contactPhoneNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="extension" className="text-sm font-medium">
                Extension
              </Label>
              <Input
                id="extension"
                placeholder="Enter extension"
                value={formData.extension}
                onChange={(e) => handleInputChange('extension', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fax" className="text-sm font-medium">
                Fax
              </Label>
              <Input
                id="fax"
                placeholder="Enter fax number"
                value={formData.fax}
                onChange={(e) => handleInputChange('fax', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailAddress" className="text-sm font-medium">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="emailAddress"
                type="email"
                placeholder="Enter email address"
                value={formData.emailAddress}
                onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                className={errors.emailAddress ? 'border-red-500' : ''}
              />
              {errors.emailAddress && (
                <p className="text-xs text-red-500">{errors.emailAddress}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="localCurrency" className="text-sm font-medium">
                Local Currency <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.localCurrency} onValueChange={(value) => handleInputChange('localCurrency', value)}>
                <SelectTrigger className={errors.localCurrency ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.localCurrency && (
                <p className="text-xs text-red-500">{errors.localCurrency}</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4 pt-6 md:pt-8 border-t">
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onCancel} className="min-w-[100px]">
              Cancel
            </Button>
            <Button variant="outline" onClick={handleReset} className="min-w-[100px]">
              Reset
            </Button>
          </div>

          <div className="flex space-x-2">
            <Button onClick={handleSubmit} className="min-w-[100px] bg-mb-blue hover:bg-mb-blue/90">
              Create
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
