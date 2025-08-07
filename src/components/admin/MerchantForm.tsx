import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { 
  Store,
  RotateCcw, 
  X,
  Plus,
  ChevronRight,
  ChevronLeft,
  Check,
  User,
  Landmark,
  Settings,
  FileCheck,
  MapPin,
  CreditCard
} from 'lucide-react';

interface MerchantData {
  // Basic Info
  merchantName: string;
  firstName: string;
  lastName: string;
  mobilePhone: string;
  fax: string;
  emailId: string;
  address1: string;
  address2: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
  applicationMode: string;
  businessUrl: string;
  lookingFor: string;
  businessType: string;
  userName: string;
  dccEnable: boolean;
  dccSupportedCurrency: string[];
  
  // Bank Info
  bankName: string;
  bankRoutingNumber: string;
  bankAccountNumber: string;
  bankType: string;
  bankAddress1: string;
  bankAddress2: string;
  bankCity: string;
  bankCountry: string;
  bankState: string;
  bankZipCode: string;
  nameOnAccount: string;
  currency: string;
  iso: string;
  
  // Configurations
  merchantType: string;
  category: string;
  autoTransferLimit: string;
  autoPaymentMethod: string;
  autoTransferPeriod: string;
  bank: string;
  mccName: string;
  feeProgram: string;
  routingProfileName: string;
  localCurrency: string;
  virtualTerminalOptions: {
    sale: boolean;
    refund: boolean;
    preAuth: boolean;
    void: boolean;
  };
  online: boolean;
}

interface MerchantFormProps {
  onSubmit: (data: MerchantData) => void;
  onCancel: () => void;
  onReset: () => void;
}

const steps = [
  { id: 1, title: 'Basic Info', icon: User },
  { id: 2, title: 'Bank Info', icon: Landmark },
  { id: 3, title: 'Configurations', icon: Settings },
  { id: 4, title: 'Confirmation', icon: FileCheck }
];

export const MerchantForm: React.FC<MerchantFormProps> = ({
  onSubmit,
  onCancel,
  onReset
}) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<MerchantData>({
    // Basic Info
    merchantName: '',
    firstName: '',
    lastName: '',
    mobilePhone: '',
    fax: '',
    emailId: '',
    address1: '',
    address2: '',
    city: '',
    country: '',
    state: '',
    zipCode: '',
    applicationMode: '',
    businessUrl: '',
    lookingFor: '',
    businessType: '',
    userName: '',
    dccEnable: false,
    dccSupportedCurrency: [],
    
    // Bank Info
    bankName: '',
    bankRoutingNumber: '',
    bankAccountNumber: '',
    bankType: '',
    bankAddress1: '',
    bankAddress2: '',
    bankCity: '',
    bankCountry: '',
    bankState: '',
    bankZipCode: '',
    nameOnAccount: '',
    currency: '',
    iso: '',
    
    // Configurations
    merchantType: '',
    category: '',
    autoTransferLimit: '',
    autoPaymentMethod: '',
    autoTransferPeriod: '',
    bank: '',
    mccName: '',
    feeProgram: '',
    routingProfileName: '',
    localCurrency: '',
    virtualTerminalOptions: {
      sale: false,
      refund: false,
      preAuth: false,
      void: false
    },
    online: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock data for dropdowns
  const countries = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'IN', label: 'India' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' }
  ];

  const states = [
    { value: 'AL', label: 'Alabama' },
    { value: 'CA', label: 'California' },
    { value: 'FL', label: 'Florida' },
    { value: 'NY', label: 'New York' },
    { value: 'TX', label: 'Texas' },
    { value: 'KA', label: 'Karnataka' }
  ];

  const applicationModes = [
    { value: 'demo', label: 'DEMO' },
    { value: 'live', label: 'LIVE' },
    { value: 'test', label: 'TEST' }
  ];

  const businessTypes = [
    { value: 'retail', label: 'Retail' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'drugStores', label: 'Drug Stores' },
    { value: 'gasStation', label: 'Gas Station' }
  ];

  const currencies = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'GBP', label: 'GBP' },
    { value: 'INR', label: 'INR' },
    { value: 'AUD', label: 'AUD' },
    { value: 'CAD', label: 'CAD' },
    { value: 'COP', label: 'COP' }
  ];

  const bankTypes = [
    { value: 'savings', label: 'Savings' },
    { value: 'checking', label: 'Checking' },
    { value: 'business', label: 'Business' }
  ];

  const merchantTypes = [
    { value: 'individual', label: 'Individual' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'partnership', label: 'Partnership' }
  ];

  const categories = [
    { value: 'primary', label: 'Primary' },
    { value: 'secondary', label: 'Secondary' },
    { value: 'tertiary', label: 'Tertiary' }
  ];

  const paymentMethods = [
    { value: 'eft', label: 'EFT' },
    { value: 'ach', label: 'ACH' },
    { value: 'wire', label: 'Wire Transfer' }
  ];

  const transferPeriods = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const banks = [
    { value: 'axis', label: 'Axis' },
    { value: 'hdfc', label: 'HDFC' },
    { value: 'icici', label: 'ICICI' },
    { value: 'sbi', label: 'SBI' }
  ];

  const mccNames = [
    { value: '1604-school', label: '1604-school' },
    { value: '5411-grocery', label: '5411-grocery' },
    { value: '5812-restaurant', label: '5812-restaurant' }
  ];

  const feePrograms = [
    { value: 'education', label: 'Education' },
    { value: 'retail', label: 'Retail' },
    { value: 'healthcare', label: 'Healthcare' }
  ];

  const routingProfiles = [
    { value: 'jioRoutingProfile', label: 'JioRoutingProfile' },
    { value: 'defaultProfile', label: 'DefaultProfile' }
  ];

  const isoOptions = [
    { value: 'robinson', label: 'Robinson ISO' },
    { value: 'first', label: 'First ISO' },
    { value: 'global', label: 'Global ISO' }
  ];

  const handleInputChange = (field: keyof MerchantData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCurrencyChange = (currency: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      dccSupportedCurrency: checked 
        ? [...prev.dccSupportedCurrency, currency]
        : prev.dccSupportedCurrency.filter(c => c !== currency)
    }));
  };

  const handleTerminalOptionChange = (option: keyof MerchantData['virtualTerminalOptions'], checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      virtualTerminalOptions: {
        ...prev.virtualTerminalOptions,
        [option]: checked
      }
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      const requiredFields = {
        merchantName: 'Merchant Name',
        firstName: 'First Name',
        lastName: 'Last Name',
        mobilePhone: 'Mobile Phone',
        emailId: 'Email ID',
        address1: 'Address 1',
        city: 'City',
        country: 'Country',
        state: 'State',
        zipCode: 'Zip Code',
        applicationMode: 'Application Mode',
        businessUrl: 'Business URL',
        userName: 'User Name'
      };

      Object.entries(requiredFields).forEach(([field, label]) => {
        if (!formData[field as keyof MerchantData]) {
          newErrors[field] = `${label} is required`;
        }
      });

      // Email validation
      if (formData.emailId && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) {
        newErrors.emailId = 'Please enter a valid email address';
      }

      // Phone validation
      if (formData.mobilePhone && !/^\+?[\d\s-()]+$/.test(formData.mobilePhone)) {
        newErrors.mobilePhone = 'Please enter a valid phone number';
      }
    }

    if (step === 2) {
      const requiredFields = {
        bankName: 'Name',
        bankRoutingNumber: 'Bank Routing Number',
        bankAccountNumber: 'Bank Account Number',
        bankType: 'Type',
        bankAddress1: 'Address 1',
        bankCity: 'City',
        bankCountry: 'Country',
        bankState: 'State',
        nameOnAccount: 'Name on Account',
        currency: 'Currency'
      };

      Object.entries(requiredFields).forEach(([field, label]) => {
        if (!formData[field as keyof MerchantData]) {
          newErrors[field] = `${label} is required`;
        }
      });
    }

    if (step === 3) {
      const requiredFields = {
        merchantType: 'Merchant Type',
        category: 'Category',
        autoPaymentMethod: 'Auto Payment Method',
        bank: 'Bank',
        mccName: 'MCC Name',
        feeProgram: 'Fee Program',
        routingProfileName: 'Routing Profile Name',
        localCurrency: 'Local Currency'
      };

      Object.entries(requiredFields).forEach(([field, label]) => {
        if (!formData[field as keyof MerchantData]) {
          newErrors[field] = `${label} is required`;
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    } else {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before proceeding",
        variant: "destructive"
      });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(1) && validateStep(2) && validateStep(3)) {
      onSubmit(formData);
      toast({
        title: "Merchant Created",
        description: "Merchant has been created successfully",
      });
    } else {
      toast({
        title: "Validation Error",
        description: "Please check all steps for errors",
        variant: "destructive"
      });
    }
  };

  const handleReset = () => {
    setFormData({
      merchantName: '',
      firstName: '',
      lastName: '',
      mobilePhone: '',
      fax: '',
      emailId: '',
      address1: '',
      address2: '',
      city: '',
      country: '',
      state: '',
      zipCode: '',
      applicationMode: '',
      businessUrl: '',
      lookingFor: '',
      businessType: '',
      userName: '',
      dccEnable: false,
      dccSupportedCurrency: [],
      bankName: '',
      bankRoutingNumber: '',
      bankAccountNumber: '',
      bankType: '',
      bankAddress1: '',
      bankAddress2: '',
      bankCity: '',
      bankCountry: '',
      bankState: '',
      bankZipCode: '',
      nameOnAccount: '',
      currency: '',
      iso: '',
      merchantType: '',
      category: '',
      autoTransferLimit: '',
      autoPaymentMethod: '',
      autoTransferPeriod: '',
      bank: '',
      mccName: '',
      feeProgram: '',
      routingProfileName: '',
      localCurrency: '',
      virtualTerminalOptions: {
        sale: false,
        refund: false,
        preAuth: false,
        void: false
      },
      online: false
    });
    setCurrentStep(1);
    setErrors({});
    onReset();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="merchantName" className="text-sm font-medium">
                  Merchant Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="merchantName"
                  placeholder="Enter merchant name"
                  value={formData.merchantName}
                  onChange={(e) => handleInputChange('merchantName', e.target.value)}
                  className={errors.merchantName ? 'border-red-500' : ''}
                />
                {errors.merchantName && (
                  <p className="text-xs text-red-500">{errors.merchantName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={errors.firstName ? 'border-red-500' : ''}
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={errors.lastName ? 'border-red-500' : ''}
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500">{errors.lastName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobilePhone" className="text-sm font-medium">
                  Mobile Phone <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="mobilePhone"
                  placeholder="Enter mobile phone"
                  value={formData.mobilePhone}
                  onChange={(e) => handleInputChange('mobilePhone', e.target.value)}
                  className={errors.mobilePhone ? 'border-red-500' : ''}
                />
                {errors.mobilePhone && (
                  <p className="text-xs text-red-500">{errors.mobilePhone}</p>
                )}
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
                <Label htmlFor="emailId" className="text-sm font-medium">
                  Email ID <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="emailId"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.emailId}
                  onChange={(e) => handleInputChange('emailId', e.target.value)}
                  className={errors.emailId ? 'border-red-500' : ''}
                />
                {errors.emailId && (
                  <p className="text-xs text-red-500">{errors.emailId}</p>
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
                <Label htmlFor="applicationMode" className="text-sm font-medium">
                  Application Mode <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.applicationMode} onValueChange={(value) => handleInputChange('applicationMode', value)}>
                  <SelectTrigger className={errors.applicationMode ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    {applicationModes.map((mode) => (
                      <SelectItem key={mode.value} value={mode.value}>
                        {mode.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.applicationMode && (
                  <p className="text-xs text-red-500">{errors.applicationMode}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessUrl" className="text-sm font-medium">
                  Business URL <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="businessUrl"
                  placeholder="Enter business URL"
                  value={formData.businessUrl}
                  onChange={(e) => handleInputChange('businessUrl', e.target.value)}
                  className={errors.businessUrl ? 'border-red-500' : ''}
                />
                {errors.businessUrl && (
                  <p className="text-xs text-red-500">{errors.businessUrl}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lookingFor" className="text-sm font-medium">
                  Looking For?
                </Label>
                <Input
                  id="lookingFor"
                  placeholder="What are you looking for?"
                  value={formData.lookingFor}
                  onChange={(e) => handleInputChange('lookingFor', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType" className="text-sm font-medium">
                  Business Type
                </Label>
                <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="userName" className="text-sm font-medium">
                  User Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="userName"
                  placeholder="Enter user name"
                  value={formData.userName}
                  onChange={(e) => handleInputChange('userName', e.target.value)}
                  className={errors.userName ? 'border-red-500' : ''}
                />
                {errors.userName && (
                  <p className="text-xs text-red-500">{errors.userName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dccEnable"
                    checked={formData.dccEnable}
                    onCheckedChange={(checked) => handleInputChange('dccEnable', checked)}
                  />
                  <Label htmlFor="dccEnable" className="text-sm font-medium">
                    DCC Enable <span className="text-red-500">*</span>
                  </Label>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium">
                  DCC Supported Currency <span className="text-red-500">*</span>
                </Label>
                <div className="border rounded-lg p-3 max-h-32 overflow-y-auto">
                  {currencies.map((currency) => (
                    <div key={currency.value} className="flex items-center space-x-2 py-1">
                      <Checkbox
                        id={`currency-${currency.value}`}
                        checked={formData.dccSupportedCurrency.includes(currency.value)}
                        onCheckedChange={(checked) => handleCurrencyChange(currency.value, checked as boolean)}
                      />
                      <Label htmlFor={`currency-${currency.value}`} className="text-sm">
                        {currency.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="bankName" className="text-sm font-medium">
                  Name <span className="text-red-500">*</span>
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
                <Label htmlFor="bankRoutingNumber" className="text-sm font-medium">
                  Bank Routing Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="bankRoutingNumber"
                  placeholder="Enter routing number"
                  value={formData.bankRoutingNumber}
                  onChange={(e) => handleInputChange('bankRoutingNumber', e.target.value)}
                  className={errors.bankRoutingNumber ? 'border-red-500' : ''}
                />
                {errors.bankRoutingNumber && (
                  <p className="text-xs text-red-500">{errors.bankRoutingNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankAccountNumber" className="text-sm font-medium">
                  Bank Account Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="bankAccountNumber"
                  placeholder="Enter account number"
                  value={formData.bankAccountNumber}
                  onChange={(e) => handleInputChange('bankAccountNumber', e.target.value)}
                  className={errors.bankAccountNumber ? 'border-red-500' : ''}
                />
                {errors.bankAccountNumber && (
                  <p className="text-xs text-red-500">{errors.bankAccountNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankType" className="text-sm font-medium">
                  Type <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.bankType} onValueChange={(value) => handleInputChange('bankType', value)}>
                  <SelectTrigger className={errors.bankType ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {bankTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.bankType && (
                  <p className="text-xs text-red-500">{errors.bankType}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankAddress1" className="text-sm font-medium">
                  Address 1 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="bankAddress1"
                  placeholder="Enter address line 1"
                  value={formData.bankAddress1}
                  onChange={(e) => handleInputChange('bankAddress1', e.target.value)}
                  className={errors.bankAddress1 ? 'border-red-500' : ''}
                />
                {errors.bankAddress1 && (
                  <p className="text-xs text-red-500">{errors.bankAddress1}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankAddress2" className="text-sm font-medium">
                  Address 2
                </Label>
                <Input
                  id="bankAddress2"
                  placeholder="Enter address line 2"
                  value={formData.bankAddress2}
                  onChange={(e) => handleInputChange('bankAddress2', e.target.value)}
                />
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

              <div className="space-y-2">
                <Label htmlFor="bankCountry" className="text-sm font-medium">
                  Country <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.bankCountry} onValueChange={(value) => handleInputChange('bankCountry', value)}>
                  <SelectTrigger className={errors.bankCountry ? 'border-red-500' : ''}>
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
                {errors.bankCountry && (
                  <p className="text-xs text-red-500">{errors.bankCountry}</p>
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
                <Label htmlFor="bankZipCode" className="text-sm font-medium">
                  Zip Code
                </Label>
                <Input
                  id="bankZipCode"
                  placeholder="Enter zip code"
                  value={formData.bankZipCode}
                  onChange={(e) => handleInputChange('bankZipCode', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nameOnAccount" className="text-sm font-medium">
                  Name on Account <span className="text-red-500">*</span>
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
                <Label htmlFor="currency" className="text-sm font-medium">
                  Currency <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                  <SelectTrigger className={errors.currency ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.currency && (
                  <p className="text-xs text-red-500">{errors.currency}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="iso" className="text-sm font-medium">
                  ISO
                </Label>
                <Select value={formData.iso} onValueChange={(value) => handleInputChange('iso', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ISO" />
                  </SelectTrigger>
                  <SelectContent>
                    {isoOptions.map((iso) => (
                      <SelectItem key={iso.value} value={iso.value}>
                        {iso.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="merchantType" className="text-sm font-medium">
                  Merchant Type <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.merchantType} onValueChange={(value) => handleInputChange('merchantType', value)}>
                  <SelectTrigger className={errors.merchantType ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {merchantTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.merchantType && (
                  <p className="text-xs text-red-500">{errors.merchantType}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-xs text-red-500">{errors.category}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="autoTransferLimit" className="text-sm font-medium">
                  Auto Transfer Limit
                </Label>
                <Input
                  id="autoTransferLimit"
                  placeholder="100000"
                  value={formData.autoTransferLimit}
                  onChange={(e) => handleInputChange('autoTransferLimit', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="autoPaymentMethod" className="text-sm font-medium">
                  Auto Payment Method <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.autoPaymentMethod} onValueChange={(value) => handleInputChange('autoPaymentMethod', value)}>
                  <SelectTrigger className={errors.autoPaymentMethod ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method.value} value={method.value}>
                        {method.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.autoPaymentMethod && (
                  <p className="text-xs text-red-500">{errors.autoPaymentMethod}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="autoTransferPeriod" className="text-sm font-medium">
                  Auto Transfer Period
                </Label>
                <Select value={formData.autoTransferPeriod} onValueChange={(value) => handleInputChange('autoTransferPeriod', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    {transferPeriods.map((period) => (
                      <SelectItem key={period.value} value={period.value}>
                        {period.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bank" className="text-sm font-medium">
                  Bank <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.bank} onValueChange={(value) => handleInputChange('bank', value)}>
                  <SelectTrigger className={errors.bank ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {banks.map((bank) => (
                      <SelectItem key={bank.value} value={bank.value}>
                        {bank.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.bank && (
                  <p className="text-xs text-red-500">{errors.bank}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mccName" className="text-sm font-medium">
                  MCC Name <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.mccName} onValueChange={(value) => handleInputChange('mccName', value)}>
                  <SelectTrigger className={errors.mccName ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select MCC" />
                  </SelectTrigger>
                  <SelectContent>
                    {mccNames.map((mcc) => (
                      <SelectItem key={mcc.value} value={mcc.value}>
                        {mcc.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.mccName && (
                  <p className="text-xs text-red-500">{errors.mccName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="feeProgram" className="text-sm font-medium">
                  Fee Program <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.feeProgram} onValueChange={(value) => handleInputChange('feeProgram', value)}>
                  <SelectTrigger className={errors.feeProgram ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select program" />
                  </SelectTrigger>
                  <SelectContent>
                    {feePrograms.map((program) => (
                      <SelectItem key={program.value} value={program.value}>
                        {program.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.feeProgram && (
                  <p className="text-xs text-red-500">{errors.feeProgram}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="routingProfileName" className="text-sm font-medium">
                  Routing Profile Name <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.routingProfileName} onValueChange={(value) => handleInputChange('routingProfileName', value)}>
                  <SelectTrigger className={errors.routingProfileName ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select profile" />
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

              <div className="space-y-2">
                <Label htmlFor="localCurrency" className="text-sm font-medium">
                  Local Currency <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="localCurrency"
                  placeholder="INR"
                  value={formData.localCurrency}
                  onChange={(e) => handleInputChange('localCurrency', e.target.value)}
                  className={errors.localCurrency ? 'border-red-500' : ''}
                />
                {errors.localCurrency && (
                  <p className="text-xs text-red-500">{errors.localCurrency}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-mb-blue/5">
                <h4 className="text-lg font-semibold text-mb-blue mb-4">Support Terminals</h4>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Virtual Terminal Options <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sale"
                          checked={formData.virtualTerminalOptions.sale}
                          onCheckedChange={(checked) => handleTerminalOptionChange('sale', checked as boolean)}
                        />
                        <Label htmlFor="sale" className="text-sm">Sale</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="refund"
                          checked={formData.virtualTerminalOptions.refund}
                          onCheckedChange={(checked) => handleTerminalOptionChange('refund', checked as boolean)}
                        />
                        <Label htmlFor="refund" className="text-sm">Refund</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="preAuth"
                          checked={formData.virtualTerminalOptions.preAuth}
                          onCheckedChange={(checked) => handleTerminalOptionChange('preAuth', checked as boolean)}
                        />
                        <Label htmlFor="preAuth" className="text-sm">Pre Auth</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="void"
                          checked={formData.virtualTerminalOptions.void}
                          onCheckedChange={(checked) => handleTerminalOptionChange('void', checked as boolean)}
                        />
                        <Label htmlFor="void" className="text-sm">Void</Label>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="online"
                      checked={formData.online}
                      onCheckedChange={(checked) => handleInputChange('online', checked)}
                    />
                    <Label htmlFor="online" className="text-sm">Online</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Basic Info Summary */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <User className="h-5 w-5 text-mb-blue" />
                  <span>Basic Info</span>
                </h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Merchant Name:</strong> {formData.merchantName}</div>
                  <div><strong>First Name:</strong> {formData.firstName}</div>
                  <div><strong>Last Name:</strong> {formData.lastName}</div>
                  <div><strong>Mobile Phone:</strong> {formData.mobilePhone}</div>
                  <div><strong>Email ID:</strong> {formData.emailId}</div>
                  <div><strong>Address 1:</strong> {formData.address1}</div>
                  <div><strong>Address 2:</strong> {formData.address2}</div>
                  <div><strong>City:</strong> {formData.city}</div>
                  <div><strong>Country:</strong> {formData.country}</div>
                  <div><strong>State:</strong> {formData.state}</div>
                  <div><strong>Zip Code:</strong> {formData.zipCode}</div>
                  <div><strong>Application Mode:</strong> {formData.applicationMode}</div>
                  <div><strong>Business URL:</strong> {formData.businessUrl}</div>
                  <div><strong>Business Type:</strong> {formData.businessType}</div>
                  <div><strong>User Name:</strong> {formData.userName}</div>
                  <div><strong>DCC Enable:</strong> {formData.dccEnable ? 'Yes' : 'No'}</div>
                  <div><strong>DCC Supported Currency:</strong> {formData.dccSupportedCurrency.join(', ')}</div>
                </div>
              </div>

              {/* Bank Info Summary */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Landmark className="h-5 w-5 text-mb-blue" />
                  <span>Bank Info</span>
                </h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Name:</strong> {formData.bankName}</div>
                  <div><strong>Bank Routing Number:</strong> {formData.bankRoutingNumber}</div>
                  <div><strong>Bank Account Number:</strong> {formData.bankAccountNumber}</div>
                  <div><strong>Type:</strong> {formData.bankType}</div>
                  <div><strong>Address 1:</strong> {formData.bankAddress1}</div>
                  <div><strong>Address 2:</strong> {formData.bankAddress2}</div>
                  <div><strong>City:</strong> {formData.bankCity}</div>
                  <div><strong>Country:</strong> {formData.bankCountry}</div>
                  <div><strong>State:</strong> {formData.bankState}</div>
                  <div><strong>Zip Code:</strong> {formData.bankZipCode}</div>
                  <div><strong>Name on Account:</strong> {formData.nameOnAccount}</div>
                  <div><strong>Currency:</strong> {formData.currency}</div>
                  <div><strong>ISO:</strong> {formData.iso}</div>
                </div>
              </div>

              {/* Configurations Summary */}
              <div className="space-y-4 lg:col-span-2">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-mb-blue" />
                  <span>Configurations</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-2">
                    <div><strong>Merchant Type:</strong> {formData.merchantType}</div>
                    <div><strong>Category:</strong> {formData.category}</div>
                    <div><strong>Auto Transfer Limit:</strong> {formData.autoTransferLimit}</div>
                    <div><strong>Auto Payment Method:</strong> {formData.autoPaymentMethod}</div>
                    <div><strong>Auto Transfer Period:</strong> {formData.autoTransferPeriod}</div>
                    <div><strong>Bank:</strong> {formData.bank}</div>
                    <div><strong>MCC Name:</strong> {formData.mccName}</div>
                    <div><strong>Fee Program:</strong> {formData.feeProgram}</div>
                    <div><strong>Routing Profile Name:</strong> {formData.routingProfileName}</div>
                    <div><strong>Local Currency:</strong> {formData.localCurrency}</div>
                  </div>
                  <div className="space-y-2">
                    <div><strong>Virtual Terminal Options:</strong></div>
                    <ul className="ml-4 space-y-1">
                      {formData.virtualTerminalOptions.sale && <li>• Sale</li>}
                      {formData.virtualTerminalOptions.refund && <li>• Refund</li>}
                      {formData.virtualTerminalOptions.preAuth && <li>• Pre Auth</li>}
                      {formData.virtualTerminalOptions.void && <li>• Void</li>}
                    </ul>
                    <div><strong>Online:</strong> {formData.online ? 'Yes' : 'No'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="shadow-glass">
      <CardHeader className="bg-gradient-to-r from-mb-blue/5 to-mb-silver/5 border-b">
        <CardTitle className="flex items-center space-x-3">
          <div className="p-2 bg-mb-blue/10 rounded-lg">
            <Store className="h-6 w-6 text-mb-blue" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Create Merchant</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Complete the multi-step process to configure a new merchant
            </p>
          </div>
        </CardTitle>
      </CardHeader>

      {/* Stepper */}
      <div className="px-4 md:px-6 lg:px-8 pt-6">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200
                  ${currentStep >= step.id 
                    ? 'bg-mb-blue border-mb-blue text-white' 
                    : 'border-gray-300 text-gray-400'
                  }
                `}>
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <div className={`text-sm font-medium ${currentStep >= step.id ? 'text-mb-blue' : 'text-gray-400'}`}>
                    {step.title}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`
                  w-12 sm:w-24 h-0.5 mx-4 transition-all duration-200
                  ${currentStep > step.id ? 'bg-mb-blue' : 'bg-gray-300'}
                `} />
              )}
            </div>
          ))}
        </div>
      </div>

      <CardContent className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4 pt-6 md:pt-8 border-t">
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onCancel} className="min-w-[100px]">
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button variant="outline" onClick={handleReset} className="min-w-[100px]">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>

          <div className="flex space-x-2">
            {currentStep > 1 && (
              <Button variant="outline" onClick={prevStep} className="min-w-[100px]">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            )}
            
            {currentStep < steps.length ? (
              <Button onClick={nextStep} className="min-w-[100px] bg-mb-blue hover:bg-mb-blue/90">
                Continue
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="min-w-[100px] bg-mb-blue hover:bg-mb-blue/90">
                <Plus className="mr-2 h-4 w-4" />
                Create
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
