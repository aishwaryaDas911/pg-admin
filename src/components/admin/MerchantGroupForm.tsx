import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ADMIN_STRINGS, DROPDOWN_OPTIONS } from '@/constants/adminConstants';
import {
  Users,
  RotateCcw,
  X,
  Plus,
  MapPin,
  Building2,
  Landmark,
  CreditCard
} from 'lucide-react';

interface MerchantGroupData {
  merchantGroupName: string;
  corporateLegalName: string;
  address1: string;
  address2: string;
  address3: string;
  pinCode: string;
  country: string;
  state: string;
  city: string;
  contactName: string;
  contactPhone: string;
  contactEmailId: string;
  routingProfileName: string;
  paymentType: string;
  bankName: string;
  branchName: string;
  nameOnAccount: string;
  accountType: string;
  accountNumber: string;
  bankCode: string;
  bankState: string;
  bankCity: string;
}

interface MerchantGroupFormProps {
  onSubmit: (data: MerchantGroupData) => void;
  onCancel: () => void;
  onReset: () => void;
}

export const MerchantGroupForm: React.FC<MerchantGroupFormProps> = ({
  onSubmit,
  onCancel,
  onReset
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<MerchantGroupData>({
    merchantGroupName: '',
    corporateLegalName: '',
    address1: '',
    address2: '',
    address3: '',
    pinCode: '',
    country: '',
    state: '',
    city: '',
    contactName: '',
    contactPhone: '',
    contactEmailId: '',
    routingProfileName: '',
    paymentType: '',
    bankName: '',
    branchName: '',
    nameOnAccount: '',
    accountType: '',
    accountNumber: '',
    bankCode: '',
    bankState: '',
    bankCity: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock data for dropdowns
  const countries = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'IT', label: 'Italy' },
    { value: 'ES', label: 'Spain' },
    { value: 'AU', label: 'Australia' },
    { value: 'JP', label: 'Japan' },
    { value: 'IN', label: 'India' }
  ];

  const states = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' }
  ];

  const routingProfiles = [
    { value: 'profile1', label: 'Routing Profile 1' },
    { value: 'profile2', label: 'Routing Profile 2' },
    { value: 'profile3', label: 'Routing Profile 3' },
    { value: 'profile4', label: 'Routing Profile 4' }
  ];

  const paymentTypes = [
    { value: 'credit', label: 'Credit' },
    { value: 'debit', label: 'Debit' },
    { value: 'ach', label: 'ACH' },
    { value: 'wire', label: 'Wire Transfer' },
    { value: 'check', label: 'Check' }
  ];

  const accountTypes = [
    { value: 'checking', label: 'Checking' },
    { value: 'savings', label: 'Savings' },
    { value: 'business', label: 'Business' },
    { value: 'corporate', label: 'Corporate' }
  ];

  const handleInputChange = (field: keyof MerchantGroupData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required field validation for Merchant Group Details
    const requiredMerchantFields = {
      merchantGroupName: 'Merchant Group Name',
      corporateLegalName: 'Corporate Legal Name',
      address1: 'Address 1',
      address2: 'Address 2',
      pinCode: 'Pin Code',
      country: 'Country',
      state: 'State',
      city: 'City',
      contactName: 'Contact Name',
      contactPhone: 'Contact Phone',
      contactEmailId: 'Contact Email Id',
      routingProfileName: 'Routing Profile Name'
    };

    // Required field validation for Account Details
    const requiredAccountFields = {
      paymentType: 'Payment Type',
      bankName: 'Bank Name',
      branchName: 'Branch Name',
      nameOnAccount: 'Name on the Account',
      accountType: 'Account Type',
      accountNumber: 'Account Number',
      bankCode: 'Bank Code',
      bankState: 'State',
      bankCity: 'City'
    };

    const allRequiredFields = { ...requiredMerchantFields, ...requiredAccountFields };

    Object.entries(allRequiredFields).forEach(([field, label]) => {
      if (!formData[field as keyof MerchantGroupData]) {
        newErrors[field] = `${label} is required`;
      }
    });

    // Email validation
    if (formData.contactEmailId && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmailId)) {
      newErrors.contactEmailId = 'Please enter a valid email address';
    }

    // Phone number validation
    if (formData.contactPhone && !/^\+?[\d\s-()]+$/.test(formData.contactPhone)) {
      newErrors.contactPhone = 'Please enter a valid phone number';
    }

    // Pin code validation
    if (formData.pinCode && !/^\d{5,6}$/.test(formData.pinCode)) {
      newErrors.pinCode = 'Please enter a valid pin code (5-6 digits)';
    }

    // Account number validation
    if (formData.accountNumber && formData.accountNumber.length < 8) {
      newErrors.accountNumber = 'Account number must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      toast({
        title: "Merchant Group Created",
        description: "Merchant Group has been created successfully",
      });
    } else {
      toast({
        title: "Validation Error",
        description: "Please fix the errors and try again",
        variant: "destructive"
      });
    }
  };

  const handleReset = () => {
    setFormData({
      merchantGroupName: '',
      corporateLegalName: '',
      address1: '',
      address2: '',
      address3: '',
      pinCode: '',
      country: '',
      state: '',
      city: '',
      contactName: '',
      contactPhone: '',
      contactEmailId: '',
      routingProfileName: '',
      paymentType: '',
      bankName: '',
      branchName: '',
      nameOnAccount: '',
      accountType: '',
      accountNumber: '',
      bankCode: '',
      bankState: '',
      bankCity: ''
    });
    setErrors({});
    onReset();
  };

  return (
    <Card className="shadow-glass">
      <CardHeader className="bg-gradient-to-r from-mb-blue/5 to-mb-silver/5 border-b">
        <CardTitle className="flex items-center space-x-3">
          <div className="p-2 bg-mb-blue/10 rounded-lg">
            <Users className="h-6 w-6 text-mb-blue" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Create Merchant Group</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Configure a new merchant group with contact and account details
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
        {/* Merchant Group Details Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 pb-2 border-b">
            <Building2 className="h-5 w-5 text-mb-blue" />
            <h3 className="text-lg font-semibold">Merchant Group Details</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="space-y-2">
              <Label htmlFor="merchantGroupName" className="text-sm font-medium">
                Merchant Group Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="merchantGroupName"
                placeholder="Enter merchant group name"
                value={formData.merchantGroupName}
                onChange={(e) => handleInputChange('merchantGroupName', e.target.value)}
                className={errors.merchantGroupName ? 'border-red-500' : ''}
              />
              {errors.merchantGroupName && (
                <p className="text-xs text-red-500">{errors.merchantGroupName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="corporateLegalName" className="text-sm font-medium">
                Corporate Legal Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="corporateLegalName"
                placeholder="Enter corporate legal name"
                value={formData.corporateLegalName}
                onChange={(e) => handleInputChange('corporateLegalName', e.target.value)}
                className={errors.corporateLegalName ? 'border-red-500' : ''}
              />
              {errors.corporateLegalName && (
                <p className="text-xs text-red-500">{errors.corporateLegalName}</p>
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
                Address 2 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="address2"
                placeholder="Enter address line 2"
                value={formData.address2}
                onChange={(e) => handleInputChange('address2', e.target.value)}
                className={errors.address2 ? 'border-red-500' : ''}
              />
              {errors.address2 && (
                <p className="text-xs text-red-500">{errors.address2}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address3" className="text-sm font-medium">
                Address 3
              </Label>
              <Input
                id="address3"
                placeholder="Enter address line 3"
                value={formData.address3}
                onChange={(e) => handleInputChange('address3', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pinCode" className="text-sm font-medium">
                Pin Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="pinCode"
                placeholder="Enter pin code"
                value={formData.pinCode}
                onChange={(e) => handleInputChange('pinCode', e.target.value)}
                className={errors.pinCode ? 'border-red-500' : ''}
              />
              {errors.pinCode && (
                <p className="text-xs text-red-500">{errors.pinCode}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country" className="text-sm font-medium">
                Country <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                <SelectTrigger className={errors.country ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
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
                  <SelectValue placeholder="Select state" />
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
          </div>

          {/* Contact Information Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
              <Label htmlFor="contactName" className="text-sm font-medium">
                Contact Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contactName"
                placeholder="Enter contact name"
                value={formData.contactName}
                onChange={(e) => handleInputChange('contactName', e.target.value)}
                className={errors.contactName ? 'border-red-500' : ''}
              />
              {errors.contactName && (
                <p className="text-xs text-red-500">{errors.contactName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone" className="text-sm font-medium">
                Contact Phone <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contactPhone"
                placeholder="Enter contact phone"
                value={formData.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                className={errors.contactPhone ? 'border-red-500' : ''}
              />
              {errors.contactPhone && (
                <p className="text-xs text-red-500">{errors.contactPhone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmailId" className="text-sm font-medium">
                Contact Email Id <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contactEmailId"
                type="email"
                placeholder="Enter contact email"
                value={formData.contactEmailId}
                onChange={(e) => handleInputChange('contactEmailId', e.target.value)}
                className={errors.contactEmailId ? 'border-red-500' : ''}
              />
              {errors.contactEmailId && (
                <p className="text-xs text-red-500">{errors.contactEmailId}</p>
              )}
            </div>
          </div>

          {/* Routing Profile Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="space-y-2">
              <Label htmlFor="routingProfileName" className="text-sm font-medium">
                Routing Profile Name <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.routingProfileName} onValueChange={(value) => handleInputChange('routingProfileName', value)}>
                <SelectTrigger className={errors.routingProfileName ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select routing profile" />
                </SelectTrigger>
                <SelectContent>
                  {routingProfiles.map((profile) => (
                    <SelectItem key={profile.value} value={profile.value}>
                      {profile.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.routingProfileName && (
                <p className="text-xs text-red-500">{errors.routingProfileName}</p>
              )}
            </div>
          </div>
        </div>

        {/* Account Details Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 pb-2 border-b">
            <Landmark className="h-5 w-5 text-mb-blue" />
            <h3 className="text-lg font-semibold">Account Details</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="space-y-2">
              <Label htmlFor="paymentType" className="text-sm font-medium">
                Payment Type <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.paymentType} onValueChange={(value) => handleInputChange('paymentType', value)}>
                <SelectTrigger className={errors.paymentType ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent>
                  {paymentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.paymentType && (
                <p className="text-xs text-red-500">{errors.paymentType}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankName" className="text-sm font-medium">
                Bank Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="bankName"
                placeholder="Enter bank name"
                value={formData.bankName}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
                className={errors.bankName ? 'border-red-500' : ''}
              />
              {errors.bankName && (
                <p className="text-xs text-red-500">{errors.bankName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="branchName" className="text-sm font-medium">
                Branch Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="branchName"
                placeholder="Enter branch name"
                value={formData.branchName}
                onChange={(e) => handleInputChange('branchName', e.target.value)}
                className={errors.branchName ? 'border-red-500' : ''}
              />
              {errors.branchName && (
                <p className="text-xs text-red-500">{errors.branchName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nameOnAccount" className="text-sm font-medium">
                Name on the Account <span className="text-red-500">*</span>
              </Label>
              <Input
                id="nameOnAccount"
                placeholder="Enter account holder name"
                value={formData.nameOnAccount}
                onChange={(e) => handleInputChange('nameOnAccount', e.target.value)}
                className={errors.nameOnAccount ? 'border-red-500' : ''}
              />
              {errors.nameOnAccount && (
                <p className="text-xs text-red-500">{errors.nameOnAccount}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountType" className="text-sm font-medium">
                Account Type <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.accountType} onValueChange={(value) => handleInputChange('accountType', value)}>
                <SelectTrigger className={errors.accountType ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  {accountTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.accountType && (
                <p className="text-xs text-red-500">{errors.accountType}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountNumber" className="text-sm font-medium">
                Account Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="accountNumber"
                placeholder="Enter account number"
                value={formData.accountNumber}
                onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                className={errors.accountNumber ? 'border-red-500' : ''}
              />
              {errors.accountNumber && (
                <p className="text-xs text-red-500">{errors.accountNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankCode" className="text-sm font-medium">
                Bank Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="bankCode"
                placeholder="Enter bank code"
                value={formData.bankCode}
                onChange={(e) => handleInputChange('bankCode', e.target.value)}
                className={errors.bankCode ? 'border-red-500' : ''}
              />
              {errors.bankCode && (
                <p className="text-xs text-red-500">{errors.bankCode}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankState" className="text-sm font-medium">
                State <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.bankState} onValueChange={(value) => handleInputChange('bankState', value)}>
                <SelectTrigger className={errors.bankState ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.bankState && (
                <p className="text-xs text-red-500">{errors.bankState}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankCity" className="text-sm font-medium">
                City <span className="text-red-500">*</span>
              </Label>
              <Input
                id="bankCity"
                placeholder="Enter city"
                value={formData.bankCity}
                onChange={(e) => handleInputChange('bankCity', e.target.value)}
                className={errors.bankCity ? 'border-red-500' : ''}
              />
              {errors.bankCity && (
                <p className="text-xs text-red-500">{errors.bankCity}</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-6 md:pt-8 border-t">
          <Button variant="outline" onClick={onCancel} className="w-full sm:w-auto min-w-[100px]">
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button variant="outline" onClick={handleReset} className="w-full sm:w-auto min-w-[100px]">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button onClick={handleSubmit} className="w-full sm:w-auto min-w-[100px] bg-mb-blue hover:bg-mb-blue/90">
            <Plus className="mr-2 h-4 w-4" />
            Create
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
