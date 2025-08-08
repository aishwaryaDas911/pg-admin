import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ADMIN_STRINGS, DROPDOWN_OPTIONS } from '@/constants/adminConstants';
import {
  Receipt,
  Plus,
  Trash2,
  RotateCcw,
  X
} from 'lucide-react';

const { 
  PROGRAM_MANAGERS, 
  ISO_OPTIONS, 
  MCC_NAMES, 
  FEE_TYPES, 
  SCHEMES, 
  TXN_TYPES, 
  TXN_VOLUMES 
} = DROPDOWN_OPTIONS;

interface SlabRange {
  id: string;
  slabFrom: string;
  slabTo: string;
  totalFee: string;
}

interface Configuration {
  id: string;
  scheme: string;
  txnType: string;
  txnVolume: string;
  pmShare: string;
  mspShare: string;
  slabRanges: SlabRange[];
}

interface FeeProgramData {
  feeProgramName: string;
  programManagerName: string;
  isoName: string;
  mcc: string;
  feeType: string;
  configurations: Configuration[];
}

interface FeeProgramFormProps {
  onSubmit: (data: FeeProgramData) => void;
  onCancel: () => void;
  onReset: () => void;
}

export const FeeProgramForm: React.FC<FeeProgramFormProps> = ({
  onSubmit,
  onCancel,
  onReset
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FeeProgramData>({
    feeProgramName: '',
    programManagerName: '',
    isoName: '',
    mcc: '',
    feeType: '',
    configurations: [
      {
        id: '1',
        scheme: '',
        txnType: '',
        txnVolume: '',
        pmShare: '',
        mspShare: '',
        slabRanges: [
          {
            id: '1',
            slabFrom: '',
            slabTo: '',
            totalFee: ''
          }
        ]
      }
    ]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof FeeProgramData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleConfigurationChange = (configId: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      configurations: prev.configurations.map(config =>
        config.id === configId ? { ...config, [field]: value } : config
      )
    }));
  };

  const handleSlabRangeChange = (configId: string, slabId: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      configurations: prev.configurations.map(config =>
        config.id === configId
          ? {
              ...config,
              slabRanges: config.slabRanges.map(slab =>
                slab.id === slabId ? { ...slab, [field]: value } : slab
              )
            }
          : config
      )
    }));
  };

  const addSlabRange = (configId: string) => {
    const newSlab: SlabRange = {
      id: Date.now().toString(),
      slabFrom: '',
      slabTo: '',
      totalFee: ''
    };

    setFormData(prev => ({
      ...prev,
      configurations: prev.configurations.map(config =>
        config.id === configId
          ? { ...config, slabRanges: [...config.slabRanges, newSlab] }
          : config
      )
    }));
  };

  const removeSlabRange = (configId: string, slabId: string) => {
    setFormData(prev => ({
      ...prev,
      configurations: prev.configurations.map(config =>
        config.id === configId
          ? {
              ...config,
              slabRanges: config.slabRanges.filter(slab => slab.id !== slabId)
            }
          : config
      )
    }));
  };

  const addCardType = () => {
    const newConfiguration: Configuration = {
      id: Date.now().toString(),
      scheme: '',
      txnType: '',
      txnVolume: '',
      pmShare: '',
      mspShare: '',
      slabRanges: [
        {
          id: '1',
          slabFrom: '',
          slabTo: '',
          totalFee: ''
        }
      ]
    };

    setFormData(prev => ({
      ...prev,
      configurations: [...prev.configurations, newConfiguration]
    }));
  };

  const removeCardType = (configId: string) => {
    if (formData.configurations.length > 1) {
      setFormData(prev => ({
        ...prev,
        configurations: prev.configurations.filter(config => config.id !== configId)
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required field validation
    if (!formData.feeProgramName) {
      newErrors.feeProgramName = `${ADMIN_STRINGS.FORM_LABELS.FEE_PROGRAM_NAME} ${ADMIN_STRINGS.VALIDATION.REQUIRED}`;
    }
    if (!formData.programManagerName) {
      newErrors.programManagerName = `${ADMIN_STRINGS.FORM_LABELS.PROGRAM_MANAGER_NAME} ${ADMIN_STRINGS.VALIDATION.REQUIRED}`;
    }
    if (!formData.isoName) {
      newErrors.isoName = `${ADMIN_STRINGS.FORM_LABELS.ISO_NAME} ${ADMIN_STRINGS.VALIDATION.REQUIRED}`;
    }
    if (!formData.mcc) {
      newErrors.mcc = `${ADMIN_STRINGS.FORM_LABELS.MCC} ${ADMIN_STRINGS.VALIDATION.REQUIRED}`;
    }
    if (!formData.feeType) {
      newErrors.feeType = `${ADMIN_STRINGS.FORM_LABELS.FEE_TYPE} ${ADMIN_STRINGS.VALIDATION.REQUIRED}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      toast({
        title: ADMIN_STRINGS.TOAST.CREATED_SUCCESS,
        description: ADMIN_STRINGS.TOAST.FEE_PROGRAM_CREATED,
      });
    } else {
      toast({
        title: ADMIN_STRINGS.TOAST.VALIDATION_ERROR,
        description: ADMIN_STRINGS.VALIDATION.FIX_ERRORS_AND_TRY_AGAIN,
        variant: "destructive"
      });
    }
  };

  const handleReset = () => {
    setFormData({
      feeProgramName: '',
      programManagerName: '',
      isoName: '',
      mcc: '',
      feeType: '',
      configurations: [
        {
          id: '1',
          scheme: '',
          txnType: '',
          txnVolume: '',
          pmShare: '',
          mspShare: '',
          slabRanges: [
            {
              id: '1',
              slabFrom: '',
              slabTo: '',
              totalFee: ''
            }
          ]
        }
      ]
    });
    setErrors({});
    onReset();
    toast({
      title: ADMIN_STRINGS.TOAST.FORM_RESET,
      description: ADMIN_STRINGS.TOAST.FEE_PROGRAM_FIELDS_CLEARED,
    });
  };

  return (
    <Card className="shadow-glass">
      <CardHeader className="bg-gradient-to-r from-mb-blue/5 to-mb-silver/5 border-b">
        <CardTitle className="flex items-center space-x-3">
          <div className="p-2 bg-mb-blue/10 rounded-lg">
            <Receipt className="h-6 w-6 text-mb-blue" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{ADMIN_STRINGS.PAGES.CREATE_FEE_PROGRAM}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {ADMIN_STRINGS.DESCRIPTIONS.FEE_PROGRAM_DESC}
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
        {/* Basic Information Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="space-y-2">
            <Label htmlFor="feeProgramName" className="text-sm font-medium">
              {ADMIN_STRINGS.FORM_LABELS.FEE_PROGRAM_NAME} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="feeProgramName"
              placeholder={ADMIN_STRINGS.PLACEHOLDERS.ENTER_FEE_PROGRAM_NAME}
              value={formData.feeProgramName}
              onChange={(e) => handleInputChange('feeProgramName', e.target.value)}
              className={errors.feeProgramName ? 'border-red-500' : ''}
            />
            {errors.feeProgramName && (
              <p className="text-xs text-red-500">{errors.feeProgramName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="programManagerName" className="text-sm font-medium">
              {ADMIN_STRINGS.FORM_LABELS.PROGRAM_MANAGER_NAME} <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.programManagerName} onValueChange={(value) => handleInputChange('programManagerName', value)}>
              <SelectTrigger className={errors.programManagerName ? 'border-red-500' : ''}>
                <SelectValue placeholder={ADMIN_STRINGS.PLACEHOLDERS.SELECT_PROGRAM_MANAGER} />
              </SelectTrigger>
              <SelectContent>
                {PROGRAM_MANAGERS.map((pm) => (
                  <SelectItem key={pm.value} value={pm.value}>
                    {pm.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.programManagerName && (
              <p className="text-xs text-red-500">{errors.programManagerName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="isoName" className="text-sm font-medium">
              {ADMIN_STRINGS.FORM_LABELS.ISO_NAME} <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.isoName} onValueChange={(value) => handleInputChange('isoName', value)}>
              <SelectTrigger className={errors.isoName ? 'border-red-500' : ''}>
                <SelectValue placeholder={ADMIN_STRINGS.PLACEHOLDERS.SELECT_ISO} />
              </SelectTrigger>
              <SelectContent>
                {ISO_OPTIONS.map((iso) => (
                  <SelectItem key={iso.value} value={iso.value}>
                    {iso.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.isoName && (
              <p className="text-xs text-red-500">{errors.isoName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="mcc" className="text-sm font-medium">
              {ADMIN_STRINGS.FORM_LABELS.MCC} <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.mcc} onValueChange={(value) => handleInputChange('mcc', value)}>
              <SelectTrigger className={errors.mcc ? 'border-red-500' : ''}>
                <SelectValue placeholder={ADMIN_STRINGS.PLACEHOLDERS.SELECT_MCC} />
              </SelectTrigger>
              <SelectContent>
                {MCC_NAMES.map((mcc) => (
                  <SelectItem key={mcc.value} value={mcc.value}>
                    {mcc.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.mcc && (
              <p className="text-xs text-red-500">{errors.mcc}</p>
            )}
          </div>
        </div>

        {/* Fee Type Section */}
        <div className="space-y-2">
          <Label htmlFor="feeType" className="text-sm font-medium">
            {ADMIN_STRINGS.FORM_LABELS.FEE_TYPE} <span className="text-red-500">*</span>
          </Label>
          <div className="w-full sm:w-1/4">
            <Select value={formData.feeType} onValueChange={(value) => handleInputChange('feeType', value)}>
              <SelectTrigger className={errors.feeType ? 'border-red-500' : ''}>
                <SelectValue placeholder={ADMIN_STRINGS.PLACEHOLDERS.SELECT_FEE_TYPE} />
              </SelectTrigger>
              <SelectContent>
                {FEE_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.feeType && (
              <p className="text-xs text-red-500">{errors.feeType}</p>
            )}
          </div>
        </div>

        {/* Configuration Sections */}
        {formData.configurations.map((config, configIndex) => (
          <div key={config.id} className="space-y-4 border rounded-lg p-4 bg-mb-blue/5">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-lg font-semibold">{ADMIN_STRINGS.SECTIONS.CONFIGURATION}</h3>
              {formData.configurations.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeCardType(config.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Configuration Header Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 border-b pb-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  {ADMIN_STRINGS.FORM_LABELS.SCHEME} <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={config.scheme}
                  onValueChange={(value) => handleConfigurationChange(config.id, 'scheme', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={ADMIN_STRINGS.PLACEHOLDERS.SELECT_SCHEME} />
                  </SelectTrigger>
                  <SelectContent>
                    {SCHEMES.map((scheme) => (
                      <SelectItem key={scheme.value} value={scheme.value}>
                        {scheme.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  {ADMIN_STRINGS.FORM_LABELS.TXN_TYPE} <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={config.txnType}
                  onValueChange={(value) => handleConfigurationChange(config.id, 'txnType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={ADMIN_STRINGS.PLACEHOLDERS.SELECT_TXN_TYPE} />
                  </SelectTrigger>
                  <SelectContent>
                    {TXN_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  {ADMIN_STRINGS.FORM_LABELS.TXN_VOLUME} <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={config.txnVolume}
                  onValueChange={(value) => handleConfigurationChange(config.id, 'txnVolume', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={ADMIN_STRINGS.PLACEHOLDERS.SELECT_TXN_VOLUME} />
                  </SelectTrigger>
                  <SelectContent>
                    {TXN_VOLUMES.map((volume) => (
                      <SelectItem key={volume.value} value={volume.value}>
                        {volume.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  {ADMIN_STRINGS.FORM_LABELS.PM_SHARE} <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder={ADMIN_STRINGS.PLACEHOLDERS.ENTER_PM_SHARE}
                  value={config.pmShare}
                  onChange={(e) => handleConfigurationChange(config.id, 'pmShare', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  {ADMIN_STRINGS.FORM_LABELS.MSP_SHARE} <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder={ADMIN_STRINGS.PLACEHOLDERS.ENTER_MSP_SHARE}
                  value={config.mspShare}
                  onChange={(e) => handleConfigurationChange(config.id, 'mspShare', e.target.value)}
                />
              </div>
            </div>

            {/* Slab Ranges */}
            <div className="space-y-3">
              {config.slabRanges.map((slab, slabIndex) => (
                <div key={slab.id} className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-end bg-white p-3 rounded border">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      {ADMIN_STRINGS.FORM_LABELS.SLAB_FROM} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder={ADMIN_STRINGS.PLACEHOLDERS.ENTER_SLAB_FROM}
                      value={slab.slabFrom}
                      onChange={(e) => handleSlabRangeChange(config.id, slab.id, 'slabFrom', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      {ADMIN_STRINGS.FORM_LABELS.SLAB_TO} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder={ADMIN_STRINGS.PLACEHOLDERS.ENTER_SLAB_TO}
                      value={slab.slabTo}
                      onChange={(e) => handleSlabRangeChange(config.id, slab.id, 'slabTo', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      {ADMIN_STRINGS.FORM_LABELS.TOTAL_FEE} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder={ADMIN_STRINGS.PLACEHOLDERS.ENTER_TOTAL_FEE}
                      value={slab.totalFee}
                      onChange={(e) => handleSlabRangeChange(config.id, slab.id, 'totalFee', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-2">
                    {slabIndex === config.slabRanges.length - 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addSlabRange(config.id)}
                        className="flex items-center space-x-1"
                      >
                        <Plus className="h-4 w-4" />
                        <span>{ADMIN_STRINGS.FORM_LABELS.ADD_RANGE}</span>
                      </Button>
                    )}
                    {config.slabRanges.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeSlabRange(config.id, slab.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Add Card Type Button */}
        <div className="flex justify-start">
          <Button
            type="button"
            variant="outline"
            onClick={addCardType}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>{ADMIN_STRINGS.FORM_LABELS.ADD_CARD_TYPE}</span>
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-6 md:pt-8 border-t">
          <Button variant="outline" onClick={onCancel} className="w-full sm:w-auto min-w-[100px]">
            <X className="mr-2 h-4 w-4" />
            {ADMIN_STRINGS.ACTIONS.CANCEL}
          </Button>
          <Button variant="outline" onClick={handleReset} className="w-full sm:w-auto min-w-[100px]">
            <RotateCcw className="mr-2 h-4 w-4" />
            {ADMIN_STRINGS.ACTIONS.RESET}
          </Button>
          <Button onClick={handleSubmit} className="w-full sm:w-auto min-w-[100px] bg-mb-blue hover:bg-mb-blue/90">
            <Plus className="mr-2 h-4 w-4" />
            {ADMIN_STRINGS.ACTIONS.CREATE}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
