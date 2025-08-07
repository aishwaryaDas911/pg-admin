import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ADMIN_STRINGS, DROPDOWN_OPTIONS, FILE_CONSTRAINTS } from '@/constants/adminConstants';
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
  Trash2
} from 'lucide-react';

interface PanRange {
  id: string;
  panLow: string;
  panHigh: string;
}

interface ISOData {
  programManager: string;
  isoName: string;
  businessEntityName: string;
  contactPerson: string;
  currency: string;
  processor: string;
  address: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  extension: string;
  emailId: string;
  bankName: string;
  bankAccountNumber: string;
  bankRoutingNumber: string;
  isoLogo: File | null;
  panRanges: PanRange[];
}

interface ISOFormProps {
  onSubmit: (data: ISOData) => void;
  onCancel: () => void;
  onReset: () => void;
}

export const ISOForm: React.FC<ISOFormProps> = ({
  onSubmit,
  onCancel,
  onReset
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ISOData>({
    programManager: '',
    isoName: '',
    businessEntityName: '',
    contactPerson: '',
    currency: '',
    processor: '',
    address: '',
    city: '',
    country: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    extension: '',
    emailId: '',
    bankName: '',
    bankAccountNumber: '',
    bankRoutingNumber: '',
    isoLogo: null,
    panRanges: [{ id: '1', panLow: '', panHigh: '' }]
  });

  const [logoPreview, setLogoPreview] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock data for dropdowns
  const programManagers = [
    { value: 'pm1', label: 'Program Manager 1' },
    { value: 'pm2', label: 'Program Manager 2' },
    { value: 'pm3', label: 'Program Manager 3' }
  ];

  const currencies = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'JPY', label: 'JPY - Japanese Yen' },
    { value: 'CAD', label: 'CAD - Canadian Dollar' },
    { value: 'AUD', label: 'AUD - Australian Dollar' }
  ];

  const processors = [
    { value: 'visa', label: 'Visa' },
    { value: 'mastercard', label: 'Mastercard' },
    { value: 'amex', label: 'American Express' },
    { value: 'discover', label: 'Discover' },
    { value: 'diners', label: 'Diners Club' }
  ];

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
    { value: 'CN', label: 'China' }
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

  const handleInputChange = (field: keyof ISOData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: "Please select an image file",
          variant: "destructive"
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive"
        });
        return;
      }

      setFormData(prev => ({ ...prev, isoLogo: file }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setFormData(prev => ({ ...prev, isoLogo: null }));
    setLogoPreview('');
  };

  const addPanRange = () => {
    const newRange: PanRange = {
      id: Date.now().toString(),
      panLow: '',
      panHigh: ''
    };
    setFormData(prev => ({
      ...prev,
      panRanges: [...prev.panRanges, newRange]
    }));
  };

  const removePanRange = (id: string) => {
    if (formData.panRanges.length > 1) {
      setFormData(prev => ({
        ...prev,
        panRanges: prev.panRanges.filter(range => range.id !== id)
      }));
    }
  };

  const updatePanRange = (id: string, field: 'panLow' | 'panHigh', value: string) => {
    setFormData(prev => ({
      ...prev,
      panRanges: prev.panRanges.map(range =>
        range.id === id ? { ...range, [field]: value } : range
      )
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required field validation
    const requiredFields = {
      programManager: 'Program Manager',
      isoName: 'ISO Name',
      businessEntityName: 'Business Entity Name',
      contactPerson: 'Contact Person',
      currency: 'Currency',
      processor: 'Processor',
      address: 'Address',
      city: 'City',
      country: 'Country',
      state: 'State',
      zipCode: 'Zip Code',
      phoneNumber: 'Phone Number',
      emailId: 'Email ID'
    };

    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!formData[field as keyof ISOData]) {
        newErrors[field] = `${label} is required`;
      }
    });

    // Email validation
    if (formData.emailId && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) {
      newErrors.emailId = 'Please enter a valid email address';
    }

    // Phone number validation
    if (formData.phoneNumber && !/^\+?[\d\s-()]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    // Zip code validation
    if (formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid zip code';
    }

    // PAN range validation
    formData.panRanges.forEach((range, index) => {
      if (!range.panLow) {
        newErrors[`panLow_${index}`] = 'Pan Low is required';
      } else if (!/^\d{6}$/.test(range.panLow)) {
        newErrors[`panLow_${index}`] = 'Pan Low must be 6 digits';
      }

      if (!range.panHigh) {
        newErrors[`panHigh_${index}`] = 'Pan High is required';
      } else if (!/^\d{6}$/.test(range.panHigh)) {
        newErrors[`panHigh_${index}`] = 'Pan High must be 6 digits';
      }

      if (range.panLow && range.panHigh && parseInt(range.panLow) >= parseInt(range.panHigh)) {
        newErrors[`panHigh_${index}`] = 'Pan High must be greater than Pan Low';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      toast({
        title: "ISO Created",
        description: "ISO has been created successfully",
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
      programManager: '',
      isoName: '',
      businessEntityName: '',
      contactPerson: '',
      currency: '',
      processor: '',
      address: '',
      city: '',
      country: '',
      state: '',
      zipCode: '',
      phoneNumber: '',
      extension: '',
      emailId: '',
      bankName: '',
      bankAccountNumber: '',
      bankRoutingNumber: '',
      isoLogo: null,
      panRanges: [{ id: '1', panLow: '', panHigh: '' }]
    });
    setLogoPreview('');
    setErrors({});
    onReset();
  };

  return (
    <Card className="shadow-glass">
      <CardHeader className="bg-gradient-to-r from-mb-blue/5 to-mb-silver/5 border-b">
        <CardTitle className="flex items-center space-x-3">
          <div className="p-2 bg-mb-blue/10 rounded-lg">
            <Building className="h-6 w-6 text-mb-blue" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Create ISO</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Configure a new ISO with all required details and PAN ranges
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
        {/* Basic Information Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 pb-2 border-b">
            <User className="h-5 w-5 text-mb-blue" />
            <h3 className="text-lg font-semibold">Basic Information</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="space-y-2">
              <Label htmlFor="programManager" className="text-sm font-medium">
                Program Manager <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.programManager} onValueChange={(value) => handleInputChange('programManager', value)}>
                <SelectTrigger className={errors.programManager ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select program manager" />
                </SelectTrigger>
                <SelectContent>
                  {programManagers.map((pm) => (
                    <SelectItem key={pm.value} value={pm.value}>
                      {pm.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.programManager && (
                <p className="text-xs text-red-500">{errors.programManager}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="isoName" className="text-sm font-medium">
                ISO Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="isoName"
                placeholder="Enter ISO name"
                value={formData.isoName}
                onChange={(e) => handleInputChange('isoName', e.target.value)}
                className={errors.isoName ? 'border-red-500' : ''}
              />
              {errors.isoName && (
                <p className="text-xs text-red-500">{errors.isoName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessEntityName" className="text-sm font-medium">
                Business Entity Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="businessEntityName"
                placeholder="Enter business entity name"
                value={formData.businessEntityName}
                onChange={(e) => handleInputChange('businessEntityName', e.target.value)}
                className={errors.businessEntityName ? 'border-red-500' : ''}
              />
              {errors.businessEntityName && (
                <p className="text-xs text-red-500">{errors.businessEntityName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPerson" className="text-sm font-medium">
                Contact Person <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contactPerson"
                placeholder="Enter contact person"
                value={formData.contactPerson}
                onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                className={errors.contactPerson ? 'border-red-500' : ''}
              />
              {errors.contactPerson && (
                <p className="text-xs text-red-500">{errors.contactPerson}</p>
              )}
            </div>
          </div>
        </div>

        {/* Payment & Processing Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 pb-2 border-b">
            <CreditCard className="h-5 w-5 text-mb-blue" />
            <h3 className="text-lg font-semibold">Payment & Processing</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="space-y-2">
              <Label htmlFor="currency" className="text-sm font-medium">
                Currency <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                <SelectTrigger className={errors.currency ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((currency) => (
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
              <Label htmlFor="processor" className="text-sm font-medium">
                Processor <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.processor} onValueChange={(value) => handleInputChange('processor', value)}>
                <SelectTrigger className={errors.processor ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select processor" />
                </SelectTrigger>
                <SelectContent>
                  {processors.map((processor) => (
                    <SelectItem key={processor.value} value={processor.value}>
                      {processor.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.processor && (
                <p className="text-xs text-red-500">{errors.processor}</p>
              )}
            </div>
          </div>
        </div>

        {/* Address Information Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 pb-2 border-b">
            <MapPin className="h-5 w-5 text-mb-blue" />
            <h3 className="text-lg font-semibold">Address Information</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="address" className="text-sm font-medium">
                Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className={errors.address ? 'border-red-500' : ''}
              />
              {errors.address && (
                <p className="text-xs text-red-500">{errors.address}</p>
              )}
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
                  <SelectValue placeholder="Select state" />
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
              <Label htmlFor="phoneNumber" className="text-sm font-medium">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phoneNumber"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className={errors.phoneNumber ? 'border-red-500' : ''}
              />
              {errors.phoneNumber && (
                <p className="text-xs text-red-500">{errors.phoneNumber}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact & Banking Information Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 pb-2 border-b">
            <Badge variant="outline" className="bg-mb-silver/10">Contact & Banking</Badge>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
              <Label htmlFor="bankName" className="text-sm font-medium">
                Bank Name
              </Label>
              <Input
                id="bankName"
                placeholder="Enter bank name"
                value={formData.bankName}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankAccountNumber" className="text-sm font-medium">
                Bank Account Number
              </Label>
              <Input
                id="bankAccountNumber"
                placeholder="Enter account number"
                value={formData.bankAccountNumber}
                onChange={(e) => handleInputChange('bankAccountNumber', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankRoutingNumber" className="text-sm font-medium">
                Bank Routing Number
              </Label>
              <Input
                id="bankRoutingNumber"
                placeholder="Enter routing number"
                value={formData.bankRoutingNumber}
                onChange={(e) => handleInputChange('bankRoutingNumber', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">ISO Logo</Label>
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
                    <span>Browse</span>
                  </Button>
                  <input
                    id="iso-logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {formData.isoLogo && (
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
                      alt="Logo preview"
                      className="h-20 w-20 object-contain border rounded-lg p-2 bg-gray-50"
                    />
                  </div>
                )}
                
                {formData.isoLogo && (
                  <p className="text-xs text-muted-foreground">
                    {formData.isoLogo.name} ({(formData.isoLogo.size / 1024).toFixed(1)} KB)
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
              <h3 className="text-lg font-semibold text-mb-blue">Pan IIN Range</h3>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addPanRange}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Range</span>
            </Button>
          </div>
          
          <div className="space-y-4">
            {formData.panRanges.map((range, index) => (
              <div key={range.id} className="flex items-end space-x-4 p-4 bg-mb-blue/5 rounded-lg border">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`panLow_${index}`} className="text-sm font-medium">
                    Pan Low <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`panLow_${index}`}
                    placeholder="Enter 6-digit PAN low"
                    value={range.panLow}
                    onChange={(e) => updatePanRange(range.id, 'panLow', e.target.value)}
                    className={errors[`panLow_${index}`] ? 'border-red-500' : ''}
                    maxLength={6}
                  />
                  {errors[`panLow_${index}`] && (
                    <p className="text-xs text-red-500">{errors[`panLow_${index}`]}</p>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <Label htmlFor={`panHigh_${index}`} className="text-sm font-medium">
                    Pan High <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`panHigh_${index}`}
                    placeholder="Enter 6-digit PAN high"
                    value={range.panHigh}
                    onChange={(e) => updatePanRange(range.id, 'panHigh', e.target.value)}
                    className={errors[`panHigh_${index}`] ? 'border-red-500' : ''}
                    maxLength={6}
                  />
                  {errors[`panHigh_${index}`] && (
                    <p className="text-xs text-red-500">{errors[`panHigh_${index}`]}</p>
                  )}
                </div>

                {formData.panRanges.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removePanRange(range.id)}
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
