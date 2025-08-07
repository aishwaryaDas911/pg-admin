import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  UserCog, 
  Upload, 
  RotateCcw, 
  X,
  Plus,
  Clock,
  Building2
} from 'lucide-react';

interface ProgramManagerData {
  programManagerName: string;
  companyName: string;
  businessEntityName: string;
  contactPerson: string;
  phoneNumber: string;
  extension: string;
  emailId: string;
  currency: string;
  country: string;
  state: string;
  programManagerTimeZone: string;
  batchPrefix: string;
  schedulerRunTime: string;
  associatedBankNames: string[];
  programManagerLogo: File | null;
}

interface ProgramManagerFormProps {
  onSubmit: (data: ProgramManagerData) => void;
  onCancel: () => void;
  onReset: () => void;
}

export const ProgramManagerForm: React.FC<ProgramManagerFormProps> = ({
  onSubmit,
  onCancel,
  onReset
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ProgramManagerData>({
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
    associatedBankNames: [],
    programManagerLogo: null
  });

  const [logoPreview, setLogoPreview] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currencies = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'JPY', label: 'JPY - Japanese Yen' },
    { value: 'CAD', label: 'CAD - Canadian Dollar' },
    { value: 'AUD', label: 'AUD - Australian Dollar' },
    { value: 'CHF', label: 'CHF - Swiss Franc' },
    { value: 'CNY', label: 'CNY - Chinese Yuan' }
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

  const timeZones = [
    { value: 'UTC-12', label: 'UTC-12:00' },
    { value: 'UTC-11', label: 'UTC-11:00' },
    { value: 'UTC-10', label: 'UTC-10:00' },
    { value: 'UTC-9', label: 'UTC-09:00' },
    { value: 'UTC-8', label: 'UTC-08:00 (PST)' },
    { value: 'UTC-7', label: 'UTC-07:00 (MST)' },
    { value: 'UTC-6', label: 'UTC-06:00 (CST)' },
    { value: 'UTC-5', label: 'UTC-05:00 (EST)' },
    { value: 'UTC-4', label: 'UTC-04:00' },
    { value: 'UTC-3', label: 'UTC-03:00' },
    { value: 'UTC-2', label: 'UTC-02:00' },
    { value: 'UTC-1', label: 'UTC-01:00' },
    { value: 'UTC+0', label: 'UTC+00:00 (GMT)' },
    { value: 'UTC+1', label: 'UTC+01:00 (CET)' },
    { value: 'UTC+2', label: 'UTC+02:00' },
    { value: 'UTC+3', label: 'UTC+03:00' },
    { value: 'UTC+4', label: 'UTC+04:00' },
    { value: 'UTC+5', label: 'UTC+05:00' },
    { value: 'UTC+6', label: 'UTC+06:00' },
    { value: 'UTC+7', label: 'UTC+07:00' },
    { value: 'UTC+8', label: 'UTC+08:00' },
    { value: 'UTC+9', label: 'UTC+09:00 (JST)' },
    { value: 'UTC+10', label: 'UTC+10:00' },
    { value: 'UTC+11', label: 'UTC+11:00' },
    { value: 'UTC+12', label: 'UTC+12:00' }
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

  const handleInputChange = (field: keyof ProgramManagerData, value: string) => {
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

      setFormData(prev => ({ ...prev, programManagerLogo: file }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setFormData(prev => ({ ...prev, programManagerLogo: null }));
    setLogoPreview('');
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required field validation
    const requiredFields = {
      programManagerName: 'Program Manager Name',
      companyName: 'Company Name',
      businessEntityName: 'Business Entity Name',
      contactPerson: 'Contact Person',
      phoneNumber: 'Phone Number',
      emailId: 'Email ID',
      currency: 'Currency',
      country: 'Country',
      state: 'State',
      programManagerTimeZone: 'Program Manager Time Zone',
      batchPrefix: 'Batch Prefix'
    };

    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!formData[field as keyof ProgramManagerData]) {
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      toast({
        title: "Program Manager Created",
        description: "Program Manager has been created successfully",
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
      associatedBankNames: [],
      programManagerLogo: null
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
            <UserCog className="h-6 w-6 text-mb-blue" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Create Program Manager</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Configure a new program manager with all required details
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
        {/* Basic Information Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 pb-2 border-b">
            <Building2 className="h-5 w-5 text-mb-blue" />
            <h3 className="text-lg font-semibold">Basic Information</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="space-y-2">
              <Label htmlFor="programManagerName" className="text-sm font-medium">
                Program Manager Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="programManagerName"
                placeholder="Enter program manager name"
                value={formData.programManagerName}
                onChange={(e) => handleInputChange('programManagerName', e.target.value)}
                className={errors.programManagerName ? 'border-red-500' : ''}
              />
              {errors.programManagerName && (
                <p className="text-xs text-red-500">{errors.programManagerName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-sm font-medium">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="companyName"
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className={errors.companyName ? 'border-red-500' : ''}
              />
              {errors.companyName && (
                <p className="text-xs text-red-500">{errors.companyName}</p>
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

        {/* Contact Information Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 pb-2 border-b">
            <Badge variant="outline" className="bg-mb-silver/10">Contact Details</Badge>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
          </div>
        </div>

        {/* Location & Configuration Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 pb-2 border-b">
            <Badge variant="outline" className="bg-mb-blue/10">Location & Configuration</Badge>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
              <Label htmlFor="programManagerTimeZone" className="text-sm font-medium">
                Program Manager Time Zone <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.programManagerTimeZone} onValueChange={(value) => handleInputChange('programManagerTimeZone', value)}>
                <SelectTrigger className={errors.programManagerTimeZone ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  {timeZones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.programManagerTimeZone && (
                <p className="text-xs text-red-500">{errors.programManagerTimeZone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="batchPrefix" className="text-sm font-medium">
                Batch Prefix <span className="text-red-500">*</span>
              </Label>
              <Input
                id="batchPrefix"
                placeholder="Enter batch prefix"
                value={formData.batchPrefix}
                onChange={(e) => handleInputChange('batchPrefix', e.target.value)}
                className={errors.batchPrefix ? 'border-red-500' : ''}
              />
              {errors.batchPrefix && (
                <p className="text-xs text-red-500">{errors.batchPrefix}</p>
              )}
            </div>
          </div>
        </div>

        {/* Scheduler & Logo Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 pb-2 border-b">
            <Clock className="h-5 w-5 text-mb-blue" />
            <h3 className="text-lg font-semibold">Scheduler & Logo</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="space-y-2">
              <Label htmlFor="schedulerRunTime" className="text-sm font-medium">
                Scheduler Run Time <span className="text-red-500">*</span>
              </Label>
              <Input
                id="schedulerRunTime"
                type="time"
                step="1"
                value={formData.schedulerRunTime}
                onChange={(e) => handleInputChange('schedulerRunTime', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="associatedBankNames" className="text-sm font-medium">
                Associated Bank Name(s) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="associatedBankNames"
                placeholder="Enter bank names (comma separated)"
                value={formData.associatedBankNames.join(', ')}
                onChange={(e) => {
                  const banks = e.target.value.split(',').map(bank => bank.trim()).filter(bank => bank);
                  setFormData(prev => ({ ...prev, associatedBankNames: banks }));
                }}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Program Manager Logo</Label>
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => document.getElementById('logo-upload')?.click()}
                    className="flex items-center space-x-2"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Browse</span>
                  </Button>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {formData.programManagerLogo && (
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
                
                {formData.programManagerLogo && (
                  <p className="text-xs text-muted-foreground">
                    {formData.programManagerLogo.name} ({(formData.programManagerLogo.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>
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
