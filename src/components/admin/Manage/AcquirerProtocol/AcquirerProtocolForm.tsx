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
  Settings,
  RotateCcw,
  X,
  Plus,
  Clock,
  Network,
  Zap
} from 'lucide-react';

interface AcquirerProtocolData {
  acquirerProtocolParamName: string;
  acquirerId: string;
  applicationId: string;
  financialAuthorization: string;
  financialReversalAdvice: string;
  cancellationRequest: string;
  cancellationAdvice: string;
  completionAdvice: string;
  diagnosticRequest: string;
  financialCompletionAdvice: string;
  reversalAdvice: string;
  reconciliationRequest: string;
  timeoutCompletionAdvice: string;
  schedulerStartup: string;
  keepAlive: string;
  startTime: string;
  timeInterval: string;
  currencyConversionRequest: string;
  financialCapture: string;
  exchangePolicy: string;
  maximumNumber: string;
  maximumAmount: string;
  retryDelay: string;
  retryMaximumNumber: string;
  period: string;
}

interface AcquirerProtocolFormProps {
  onSubmit: (data: AcquirerProtocolData) => void;
  onCancel: () => void;
  onReset: () => void;
}

export const AcquirerProtocolForm: React.FC<AcquirerProtocolFormProps> = ({
  onSubmit,
  onCancel,
  onReset
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<AcquirerProtocolData>({
    acquirerProtocolParamName: '',
    acquirerId: '',
    applicationId: '',
    financialAuthorization: '',
    financialReversalAdvice: '',
    cancellationRequest: '',
    cancellationAdvice: '',
    completionAdvice: '',
    diagnosticRequest: '',
    financialCompletionAdvice: '',
    reversalAdvice: '',
    reconciliationRequest: '',
    timeoutCompletionAdvice: '',
    schedulerStartup: '',
    keepAlive: '',
    startTime: '00:00:00',
    timeInterval: '',
    currencyConversionRequest: '',
    financialCapture: '',
    exchangePolicy: '',
    maximumNumber: '',
    maximumAmount: '',
    retryDelay: '',
    retryMaximumNumber: '',
    period: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { TIME_INTERVALS } = DROPDOWN_OPTIONS;

  const handleInputChange = (field: keyof AcquirerProtocolData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const requiredFields = {
      acquirerProtocolParamName: ADMIN_STRINGS.FORM_LABELS.ACQUIRER_PROTOCOL_PARAM_NAME,
      acquirerId: ADMIN_STRINGS.FORM_LABELS.ACQUIRER_ID,
      applicationId: ADMIN_STRINGS.FORM_LABELS.APPLICATION_ID,
    };

    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!formData[field as keyof AcquirerProtocolData]) {
        newErrors[field] = `${label} ${ADMIN_STRINGS.VALIDATION.REQUIRED}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      toast({
        title: ADMIN_STRINGS.TOAST.CREATED_SUCCESS,
        description: ADMIN_STRINGS.TOAST.ACQUIRER_PROTOCOL_CREATED,
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
      acquirerProtocolParamName: '',
      acquirerId: '',
      applicationId: '',
      financialAuthorization: '',
      financialReversalAdvice: '',
      cancellationRequest: '',
      cancellationAdvice: '',
      completionAdvice: '',
      diagnosticRequest: '',
      financialCompletionAdvice: '',
      reversalAdvice: '',
      reconciliationRequest: '',
      timeoutCompletionAdvice: '',
      schedulerStartup: '',
      keepAlive: '',
      startTime: '00:00:00',
      timeInterval: '',
      currencyConversionRequest: '',
      financialCapture: '',
      exchangePolicy: '',
      maximumNumber: '',
      maximumAmount: '',
      retryDelay: '',
      retryMaximumNumber: '',
      period: ''
    });
    setErrors({});
    onReset();
  };

  return (
    <Card className="shadow-glass">
      <CardHeader className="bg-gradient-to-r from-mb-blue/5 to-mb-silver/5 border-b">
        <CardTitle className="flex items-center space-x-3">
          <div className="p-2 bg-mb-blue/10 rounded-lg">
            <Settings className="h-6 w-6 text-mb-blue" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{ADMIN_STRINGS.PAGES.CREATE_ACQUIRER_PROTOCOL}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {ADMIN_STRINGS.DESCRIPTIONS.ACQUIRER_PROTOCOL_DESC}
            </p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
        {/* Basic Information Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 pb-2 border-b">
            <Network className="h-5 w-5 text-mb-blue" />
            <h3 className="text-lg font-semibold">{ADMIN_STRINGS.SECTIONS.ACQUIRER_PROTOCOL}</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="space-y-2">
              <Label htmlFor="acquirerProtocolParamName" className="text-sm font-medium">
                {ADMIN_STRINGS.FORM_LABELS.ACQUIRER_PROTOCOL_PARAM_NAME} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="acquirerProtocolParamName"
                placeholder="Enter protocol parameter name"
                value={formData.acquirerProtocolParamName}
                onChange={(e) => handleInputChange('acquirerProtocolParamName', e.target.value)}
                className={errors.acquirerProtocolParamName ? 'border-red-500' : ''}
              />
              {errors.acquirerProtocolParamName && (
                <p className="text-xs text-red-500">{errors.acquirerProtocolParamName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="acquirerId" className="text-sm font-medium">
                {ADMIN_STRINGS.FORM_LABELS.ACQUIRER_ID} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="acquirerId"
                placeholder="Enter acquirer ID"
                value={formData.acquirerId}
                onChange={(e) => handleInputChange('acquirerId', e.target.value)}
                className={errors.acquirerId ? 'border-red-500' : ''}
              />
              {errors.acquirerId && (
                <p className="text-xs text-red-500">{errors.acquirerId}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="applicationId" className="text-sm font-medium">
                {ADMIN_STRINGS.FORM_LABELS.APPLICATION_ID} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="applicationId"
                placeholder="Enter application ID"
                value={formData.applicationId}
                onChange={(e) => handleInputChange('applicationId', e.target.value)}
                className={errors.applicationId ? 'border-red-500' : ''}
              />
              {errors.applicationId && (
                <p className="text-xs text-red-500">{errors.applicationId}</p>
              )}
            </div>
          </div>
        </div>

        {/* Online Capabilities Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 pb-2 border-b">
            <Zap className="h-5 w-5 text-mb-blue" />
            <h3 className="text-lg font-semibold">{ADMIN_STRINGS.SECTIONS.ONLINE_CAPABILITIES}</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { key: 'financialAuthorization', label: ADMIN_STRINGS.FORM_LABELS.FINANCIAL_AUTHORIZATION },
              { key: 'financialReversalAdvice', label: ADMIN_STRINGS.FORM_LABELS.FINANCIAL_REVERSAL_ADVICE },
              { key: 'cancellationRequest', label: ADMIN_STRINGS.FORM_LABELS.CANCELLATION_REQUEST },
              { key: 'cancellationAdvice', label: ADMIN_STRINGS.FORM_LABELS.CANCELLATION_ADVICE },
              { key: 'completionAdvice', label: ADMIN_STRINGS.FORM_LABELS.COMPLETION_ADVICE },
              { key: 'diagnosticRequest', label: ADMIN_STRINGS.FORM_LABELS.DIAGNOSTIC_REQUEST },
              { key: 'financialCompletionAdvice', label: ADMIN_STRINGS.FORM_LABELS.FINANCIAL_COMPLETION_ADVICE },
              { key: 'reversalAdvice', label: ADMIN_STRINGS.FORM_LABELS.REVERSAL_ADVICE },
            ].map(field => (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={field.key} className="text-sm font-medium">
                  {field.label}
                </Label>
                <Input
                  id={field.key}
                  placeholder="Enter value"
                  value={formData[field.key as keyof AcquirerProtocolData]}
                  onChange={(e) => handleInputChange(field.key as keyof AcquirerProtocolData, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Settings Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 pb-2 border-b">
            <Clock className="h-5 w-5 text-mb-blue" />
            <h3 className="text-lg font-semibold">{ADMIN_STRINGS.SECTIONS.SCHEDULE_SETTINGS}</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="space-y-2">
              <Label htmlFor="startTime" className="text-sm font-medium">
                {ADMIN_STRINGS.FORM_LABELS.START_TIME}
              </Label>
              <Input
                id="startTime"
                type="time"
                step="1"
                value={formData.startTime}
                onChange={(e) => handleInputChange('startTime', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeInterval" className="text-sm font-medium">
                {ADMIN_STRINGS.FORM_LABELS.TIME_INTERVAL}
              </Label>
              <Select value={formData.timeInterval} onValueChange={(value) => handleInputChange('timeInterval', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_INTERVALS.map((interval) => (
                    <SelectItem key={interval.value} value={interval.value}>
                      {interval.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="period" className="text-sm font-medium">
                {ADMIN_STRINGS.FORM_LABELS.PERIOD}
              </Label>
              <Input
                id="period"
                placeholder="Enter period"
                value={formData.period}
                onChange={(e) => handleInputChange('period', e.target.value)}
              />
            </div>
          </div>
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
