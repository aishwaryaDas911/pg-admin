import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { FEE_PROGRAM_STRINGS, FEE_PROGRAM_DROPDOWN_OPTIONS } from '@/constants/feeProgramConstants';
import { FeeProgramService, FeeProgramData } from '@/services/feeProgramService';
import { Receipt, Plus, Trash2, RotateCcw, X, Save } from 'lucide-react';

const { PROGRAM_MANAGERS, ISO_OPTIONS, MCC_NAMES, FEE_TYPES, SCHEMES, TXN_TYPES, TXN_VOLUMES } = FEE_PROGRAM_DROPDOWN_OPTIONS;

interface SlabRange { id: string; slabFrom: string; slabTo: string; totalFee: string; }
interface Configuration { id: string; scheme: string; txnType: string; txnVolume: string; pmShare: string; mspShare: string; slabRanges: SlabRange[]; }

interface FeeProgramFormProps {
  mode?: 'create' | 'edit' | 'view';
  initialData?: Partial<FeeProgramData>;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  onReset?: () => void;
  onSuccess?: () => void;
}

export const FeeProgramForm: React.FC<FeeProgramFormProps> = ({
  mode = 'create',
  initialData,
  onSubmit,
  onCancel,
  onReset,
  onSuccess,
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FeeProgramData>({
    feeProgramName: '',
    programManagerName: '',
    isoName: '',
    mcc: '',
    feeType: '',
    configurations: [
      { id: '1', scheme: '', txnType: '', txnVolume: '', pmShare: '', mspShare: '', slabRanges: [ { id: '1', slabFrom: '', slabTo: '', totalFee: '' } ] }
    ],
    status: 'active'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isView = mode === 'view';

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData } as FeeProgramData));
    }
  }, [initialData]);

  const handleInputChange = (field: keyof FeeProgramData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as string]) setErrors(prev => ({ ...prev, [field as string]: '' }));
  };

  const handleConfigurationChange = (configId: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      configurations: prev.configurations.map(config => config.id === configId ? { ...config, [field]: value } : config)
    }));
  };

  const handleSlabRangeChange = (configId: string, slabId: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      configurations: prev.configurations.map(config => config.id === configId ? { ...config, slabRanges: config.slabRanges.map(s => s.id === slabId ? { ...s, [field]: value } : s) } : config)
    }));
  };

  const addSlabRange = (configId: string) => {
    const newSlab: SlabRange = { id: Date.now().toString(), slabFrom: '', slabTo: '', totalFee: '' };
    setFormData(prev => ({ ...prev, configurations: prev.configurations.map(c => c.id === configId ? { ...c, slabRanges: [...c.slabRanges, newSlab] } : c) }));
  };

  const removeSlabRange = (configId: string, slabId: string) => {
    setFormData(prev => ({ ...prev, configurations: prev.configurations.map(c => c.id === configId ? { ...c, slabRanges: c.slabRanges.filter(s => s.id !== slabId) } : c) }));
  };

  const addCardType = () => {
    const newConfiguration: Configuration = { id: Date.now().toString(), scheme: '', txnType: '', txnVolume: '', pmShare: '', mspShare: '', slabRanges: [ { id: '1', slabFrom: '', slabTo: '', totalFee: '' } ] };
    setFormData(prev => ({ ...prev, configurations: [...prev.configurations, newConfiguration] }));
  };

  const removeCardType = (configId: string) => {
    if (formData.configurations.length > 1) setFormData(prev => ({ ...prev, configurations: prev.configurations.filter(c => c.id !== configId) }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.feeProgramName) newErrors.feeProgramName = `${FEE_PROGRAM_STRINGS.LABELS.FEE_PROGRAM_NAME} ${FEE_PROGRAM_STRINGS.VALIDATION.REQUIRED}`;
    if (!formData.programManagerName) newErrors.programManagerName = `${FEE_PROGRAM_STRINGS.LABELS.PROGRAM_MANAGER_NAME} ${FEE_PROGRAM_STRINGS.VALIDATION.REQUIRED}`;
    if (!formData.isoName) newErrors.isoName = `${FEE_PROGRAM_STRINGS.LABELS.ISO_NAME} ${FEE_PROGRAM_STRINGS.VALIDATION.REQUIRED}`;
    if (!formData.mcc) newErrors.mcc = `${FEE_PROGRAM_STRINGS.LABELS.MCC} ${FEE_PROGRAM_STRINGS.VALIDATION.REQUIRED}`;
    if (!formData.feeType) newErrors.feeType = `${FEE_PROGRAM_STRINGS.LABELS.FEE_TYPE} ${FEE_PROGRAM_STRINGS.VALIDATION.REQUIRED}`;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast({ title: FEE_PROGRAM_STRINGS.TOAST.VALIDATION_ERROR_TITLE, description: FEE_PROGRAM_STRINGS.VALIDATION.FIX_ERRORS_AND_TRY_AGAIN, variant: 'destructive' });
      return;
    }

    try {
      if (mode === 'create') {
        const res = await FeeProgramService.create(formData);
        if (res.success) {
          toast({ title: FEE_PROGRAM_STRINGS.TOAST.CREATED_TITLE, description: FEE_PROGRAM_STRINGS.CREATED_DESC });
          onSuccess?.();
        } else {
          toast({ title: 'Error', description: res.message || res.error || 'Failed to create', variant: 'destructive' });
        }
      } else if (mode === 'edit' && initialData?.id) {
        const res = await FeeProgramService.update({ ...(formData as any), id: initialData.id });
        if (res.success) {
          toast({ title: FEE_PROGRAM_STRINGS.TOAST.UPDATED_TITLE, description: FEE_PROGRAM_STRINGS.TOAST.UPDATED_DESC });
          onSuccess?.();
        } else {
          toast({ title: 'Error', description: res.message || res.error || 'Failed to update', variant: 'destructive' });
        }
      }
      onSubmit?.(formData);
    } catch (e) {
      toast({ title: 'Error', description: e instanceof Error ? e.message : 'Unknown error', variant: 'destructive' });
    }
  };

  const handleReset = () => {
    setFormData({
      feeProgramName: '', programManagerName: '', isoName: '', mcc: '', feeType: '', status: 'active',
      configurations: [ { id: '1', scheme: '', txnType: '', txnVolume: '', pmShare: '', mspShare: '', slabRanges: [ { id: '1', slabFrom: '', slabTo: '', totalFee: '' } ] } ]
    });
    setErrors({});
    onReset?.();
    toast({ title: FEE_PROGRAM_STRINGS.TOAST.FORM_RESET_TITLE, description: FEE_PROGRAM_STRINGS.TOAST.FORM_RESET_DESC });
  };

  const disabledProps = (cls?: string) => ({ disabled: isView, className: cls });

  return (
    <Card className="shadow-glass">
      <CardHeader className="bg-gradient-to-r from-mb-blue/5 to-mb-silver/5 border-b">
        <CardTitle className="flex items-center space-x-3">
          <div className="p-2 bg-mb-blue/10 rounded-lg">
            <Receipt className="h-6 w-6 text-mb-blue" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{mode === 'edit' ? FEE_PROGRAM_STRINGS.TITLES.EDIT : mode === 'view' ? FEE_PROGRAM_STRINGS.TITLES.VIEW : FEE_PROGRAM_STRINGS.TITLES.CREATE}</h2>
            <p className="text-sm text-muted-foreground mt-1">Configure fee structure with dynamic ranges and card type configurations</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium">{FEE_PROGRAM_STRINGS.LABELS.FEE_PROGRAM_NAME} <span className="text-red-500">*</span></Label>
            <Input placeholder={FEE_PROGRAM_STRINGS.PLACEHOLDERS.ENTER_FEE_PROGRAM_NAME} value={formData.feeProgramName} onChange={(e) => handleInputChange('feeProgramName', e.target.value)} {...disabledProps(errors.feeProgramName ? 'border-red-500' : '')} />
            {errors.feeProgramName && <p className="text-xs text-red-500">{errors.feeProgramName}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">{FEE_PROGRAM_STRINGS.LABELS.PROGRAM_MANAGER_NAME} <span className="text-red-500">*</span></Label>
            <Select value={formData.programManagerName} onValueChange={(v) => handleInputChange('programManagerName', v)} disabled={isView}>
              <SelectTrigger className={errors.programManagerName ? 'border-red-500' : ''}>
                <SelectValue placeholder={FEE_PROGRAM_STRINGS.PLACEHOLDERS.SELECT_PROGRAM_MANAGER} />
              </SelectTrigger>
              <SelectContent>
                {PROGRAM_MANAGERS.map(pm => (<SelectItem key={pm.value} value={pm.value}>{pm.label}</SelectItem>))}
              </SelectContent>
            </Select>
            {errors.programManagerName && <p className="text-xs text-red-500">{errors.programManagerName}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">{FEE_PROGRAM_STRINGS.LABELS.ISO_NAME} <span className="text-red-500">*</span></Label>
            <Select value={formData.isoName} onValueChange={(v) => handleInputChange('isoName', v)} disabled={isView}>
              <SelectTrigger className={errors.isoName ? 'border-red-500' : ''}>
                <SelectValue placeholder={FEE_PROGRAM_STRINGS.PLACEHOLDERS.SELECT_ISO} />
              </SelectTrigger>
              <SelectContent>
                {ISO_OPTIONS.map(opt => (<SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>))}
              </SelectContent>
            </Select>
            {errors.isoName && <p className="text-xs text-red-500">{errors.isoName}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">{FEE_PROGRAM_STRINGS.LABELS.MCC} <span className="text-red-500">*</span></Label>
            <Select value={formData.mcc} onValueChange={(v) => handleInputChange('mcc', v)} disabled={isView}>
              <SelectTrigger className={errors.mcc ? 'border-red-500' : ''}>
                <SelectValue placeholder={FEE_PROGRAM_STRINGS.PLACEHOLDERS.SELECT_MCC} />
              </SelectTrigger>
              <SelectContent>
                {MCC_NAMES.map(m => (<SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>))}
              </SelectContent>
            </Select>
            {errors.mcc && <p className="text-xs text-red-500">{errors.mcc}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">{FEE_PROGRAM_STRINGS.LABELS.FEE_TYPE} <span className="text-red-500">*</span></Label>
          <div className="w-full sm:w-1/4">
            <Select value={formData.feeType} onValueChange={(v) => handleInputChange('feeType', v)} disabled={isView}>
              <SelectTrigger className={errors.feeType ? 'border-red-500' : ''}>
                <SelectValue placeholder={FEE_PROGRAM_STRINGS.PLACEHOLDERS.SELECT_FEE_TYPE} />
              </SelectTrigger>
              <SelectContent>
                {FEE_TYPES.map(t => (<SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>))}
              </SelectContent>
            </Select>
            {errors.feeType && <p className="text-xs text-red-500">{errors.feeType}</p>}
          </div>
        </div>

        {formData.configurations.map(config => (
          <div key={config.id} className="space-y-4 border rounded-lg p-4 bg-mb-blue/5">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-lg font-semibold">{FEE_PROGRAM_STRINGS.SECTIONS.CONFIGURATION}</h3>
              {formData.configurations.length > 1 && !isView && (
                <Button type="button" variant="outline" size="sm" onClick={() => removeCardType(config.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 border-b pb-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">{FEE_PROGRAM_STRINGS.LABELS.SCHEME} <span className="text-red-500">*</span></Label>
                <Select value={config.scheme} onValueChange={(v) => handleConfigurationChange(config.id, 'scheme', v)} disabled={isView}>
                  <SelectTrigger>
                    <SelectValue placeholder={FEE_PROGRAM_STRINGS.PLACEHOLDERS.SELECT_SCHEME} />
                  </SelectTrigger>
                  <SelectContent>
                    {SCHEMES.map(s => (<SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">{FEE_PROGRAM_STRINGS.LABELS.TXN_TYPE} <span className="text-red-500">*</span></Label>
                <Select value={config.txnType} onValueChange={(v) => handleConfigurationChange(config.id, 'txnType', v)} disabled={isView}>
                  <SelectTrigger>
                    <SelectValue placeholder={FEE_PROGRAM_STRINGS.PLACEHOLDERS.SELECT_TXN_TYPE} />
                  </SelectTrigger>
                  <SelectContent>
                    {TXN_TYPES.map(t => (<SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">{FEE_PROGRAM_STRINGS.LABELS.TXN_VOLUME} <span className="text-red-500">*</span></Label>
                <Select value={config.txnVolume} onValueChange={(v) => handleConfigurationChange(config.id, 'txnVolume', v)} disabled={isView}>
                  <SelectTrigger>
                    <SelectValue placeholder={FEE_PROGRAM_STRINGS.PLACEHOLDERS.SELECT_TXN_VOLUME} />
                  </SelectTrigger>
                  <SelectContent>
                    {TXN_VOLUMES.map(v => (<SelectItem key={v.value} value={v.value}>{v.label}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">{FEE_PROGRAM_STRINGS.LABELS.PM_SHARE} <span className="text-red-500">*</span></Label>
                <Input placeholder={FEE_PROGRAM_STRINGS.PLACEHOLDERS.ENTER_PM_SHARE} value={config.pmShare} onChange={(e) => handleConfigurationChange(config.id, 'pmShare', e.target.value)} {...disabledProps()} />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">{FEE_PROGRAM_STRINGS.LABELS.MSP_SHARE} <span className="text-red-500">*</span></Label>
                <Input placeholder={FEE_PROGRAM_STRINGS.PLACEHOLDERS.ENTER_MSP_SHARE} value={config.mspShare} onChange={(e) => handleConfigurationChange(config.id, 'mspShare', e.target.value)} {...disabledProps()} />
              </div>
            </div>

            <div className="space-y-3">
              {config.slabRanges.map((slab, idx) => (
                <div key={slab.id} className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-end bg-white p-3 rounded border">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">{FEE_PROGRAM_STRINGS.LABELS.SLAB_FROM} <span className="text-red-500">*</span></Label>
                    <Input placeholder={FEE_PROGRAM_STRINGS.PLACEHOLDERS.ENTER_SLAB_FROM} value={slab.slabFrom} onChange={(e) => handleSlabRangeChange(config.id, slab.id, 'slabFrom', e.target.value)} {...disabledProps()} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">{FEE_PROGRAM_STRINGS.LABELS.SLAB_TO} <span className="text-red-500">*</span></Label>
                    <Input placeholder={FEE_PROGRAM_STRINGS.PLACEHOLDERS.ENTER_SLAB_TO} value={slab.slabTo} onChange={(e) => handleSlabRangeChange(config.id, slab.id, 'slabTo', e.target.value)} {...disabledProps()} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">{FEE_PROGRAM_STRINGS.LABELS.TOTAL_FEE} <span className="text-red-500">*</span></Label>
                    <Input placeholder={FEE_PROGRAM_STRINGS.PLACEHOLDERS.ENTER_TOTAL_FEE} value={slab.totalFee} onChange={(e) => handleSlabRangeChange(config.id, slab.id, 'totalFee', e.target.value)} {...disabledProps()} />
                  </div>
                  <div className="flex items-center justify-end space-x-2">
                    {idx === config.slabRanges.length - 1 && !isView && (
                      <Button type="button" variant="outline" size="sm" onClick={() => addSlabRange(config.id)} className="flex items-center space-x-1">
                        <Plus className="h-4 w-4" />
                        <span>{FEE_PROGRAM_STRINGS.BUTTONS.ADD_RANGE}</span>
                      </Button>
                    )}
                    {config.slabRanges.length > 1 && !isView && (
                      <Button type="button" variant="outline" size="sm" onClick={() => removeSlabRange(config.id, slab.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {!isView && (
          <div className="flex justify-start">
            <Button type="button" variant="outline" onClick={addCardType} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>{FEE_PROGRAM_STRINGS.BUTTONS.ADD_CARD_TYPE}</span>
            </Button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-6 md:pt-8 border-t">
          {onCancel && (
            <Button variant="outline" onClick={onCancel} className="w-full sm:w-auto min-w-[100px]">
              <X className="mr-2 h-4 w-4" />
              {FEE_PROGRAM_STRINGS.BUTTONS.CANCEL}
            </Button>
          )}
          {(!isView) && (
            <Button variant="outline" onClick={handleReset} className="w-full sm:w-auto min-w-[100px]">
              <RotateCcw className="mr-2 h-4 w-4" />
              {FEE_PROGRAM_STRINGS.BUTTONS.RESET}
            </Button>
          )}
          {(!isView) && (
            <Button onClick={handleSave} className="w-full sm:w-auto min-w-[120px] bg-mb-blue hover:bg-mb-blue/90 flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>{mode === 'edit' ? FEE_PROGRAM_STRINGS.BUTTONS.UPDATE : FEE_PROGRAM_STRINGS.BUTTONS.CREATE}</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
