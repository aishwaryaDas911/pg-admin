import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ADMIN_STRINGS, DROPDOWN_OPTIONS } from '@/constants/adminConstants';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface AcquirerProtocolParameterFormProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  onReset?: () => void;
}

export const AcquirerProtocolParameterForm: React.FC<AcquirerProtocolParameterFormProps> = ({
  onSubmit,
  onCancel,
  onReset
}) => {
  const [startTime, setStartTime] = React.useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    onSubmit?.(data);
  };

  const handleReset = () => {
    const form = document.querySelector('form') as HTMLFormElement;
    form?.reset();
    setStartTime(undefined);
    onReset?.();
  };

  const { GENERIC_OPTIONS, TIME_INTERVALS } = DROPDOWN_OPTIONS;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Acquirer Protocol Section */}
      <Card>
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-primary font-semibold">{ADMIN_STRINGS.SECTIONS.ACQUIRER_PROTOCOL}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Row 1 */}
            <div className="space-y-2">
              <Label htmlFor="acquirerProtocolParamName" className="text-sm font-medium">
                {ADMIN_STRINGS.FORM_LABELS.ACQUIRER_PROTOCOL_PARAM_NAME}*
              </Label>
              <Input 
                id="acquirerProtocolParamName"
                name="acquirerProtocolParamName"
                className="h-10"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="acquirerId" className="text-sm font-medium">
                {ADMIN_STRINGS.FORM_LABELS.ACQUIRER_ID}*
              </Label>
              <Input 
                id="acquirerId"
                name="acquirerId"
                className="h-10"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="applicationId" className="text-sm font-medium">
                {ADMIN_STRINGS.FORM_LABELS.APPLICATION_ID}*
              </Label>
              <Input 
                id="applicationId"
                name="applicationId"
                className="h-10"
                required
              />
            </div>

            {/* Row 2 */}
            <div className="space-y-2">
              <Label htmlFor="financialAuthorization" className="text-sm font-medium">
                {ADMIN_STRINGS.FORM_LABELS.FINANCIAL_AUTHORIZATION}*
              </Label>
              <Select name="financialAuthorization" required>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {selectOptions.map((option, index) => (
                    <SelectItem key={index} value={option.toLowerCase().replace(/\s+/g, '-')}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="financialReversalAdvice" className="text-sm font-medium">
                {ADMIN_STRINGS.FORM_LABELS.FINANCIAL_REVERSAL_ADVICE}*
              </Label>
              <Select name="financialReversalAdvice" required>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {selectOptions.map((option, index) => (
                    <SelectItem key={index} value={option.toLowerCase().replace(/\s+/g, '-')}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cancellationRequest" className="text-sm font-medium">
                {ADMIN_STRINGS.FORM_LABELS.CANCELLATION_REQUEST}*
              </Label>
              <Select name="cancellationRequest" required>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {selectOptions.map((option, index) => (
                    <SelectItem key={index} value={option.toLowerCase().replace(/\s+/g, '-')}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Row 3 */}
            <div className="space-y-2">
              <Label htmlFor="cancellationAdvice" className="text-sm font-medium">
                {ADMIN_STRINGS.FORM_LABELS.CANCELLATION_ADVICE}*
              </Label>
              <Select name="cancellationAdvice" required>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {selectOptions.map((option, index) => (
                    <SelectItem key={index} value={option.toLowerCase().replace(/\s+/g, '-')}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="completionAdvice" className="text-sm font-medium">
                {ADMIN_STRINGS.FORM_LABELS.COMPLETION_ADVICE}*
              </Label>
              <Select name="completionAdvice" required>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {selectOptions.map((option, index) => (
                    <SelectItem key={index} value={option.toLowerCase().replace(/\s+/g, '-')}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="diagnosticRequest" className="text-sm font-medium">
                {ADMIN_STRINGS.FORM_LABELS.DIAGNOSTIC_REQUEST}*
              </Label>
              <Select name="diagnosticRequest" required>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {selectOptions.map((option, index) => (
                    <SelectItem key={index} value={option.toLowerCase().replace(/\s+/g, '-')}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Row 4 */}
            <div className="space-y-2">
              <Label htmlFor="financialCompletionAdvice" className="text-sm font-medium">
                {ADMIN_STRINGS.FORM_LABELS.FINANCIAL_COMPLETION_ADVICE}*
              </Label>
              <Select name="financialCompletionAdvice" required>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {selectOptions.map((option, index) => (
                    <SelectItem key={index} value={option.toLowerCase().replace(/\s+/g, '-')}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reversalAdvice" className="text-sm font-medium">
                {ADMIN_STRINGS.FORM_LABELS.REVERSAL_ADVICE}*
              </Label>
              <Select name="reversalAdvice" required>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {selectOptions.map((option, index) => (
                    <SelectItem key={index} value={option.toLowerCase().replace(/\s+/g, '-')}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reconciliationRequest" className="text-sm font-medium">
                Reconciliation Request*
              </Label>
              <Select name="reconciliationRequest" required>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {selectOptions.map((option, index) => (
                    <SelectItem key={index} value={option.toLowerCase().replace(/\s+/g, '-')}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Row 5 */}
            <div className="space-y-2">
              <Label htmlFor="currencyConversionRequest" className="text-sm font-medium">
                Currency Conversion Request*
              </Label>
              <Select name="currencyConversionRequest" required>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {selectOptions.map((option, index) => (
                    <SelectItem key={index} value={option.toLowerCase().replace(/\s+/g, '-')}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Online Capabilities Section */}
      <Card>
        <CardHeader className="bg-primary/10">
          <CardTitle className="text-primary font-semibold">Online Capabilities</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="onlineFinancialCapture" className="text-sm font-medium">
                Financial Capture*
              </Label>
              <Select name="onlineFinancialCapture" required>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {selectOptions.map((option, index) => (
                    <SelectItem key={index} value={option.toLowerCase().replace(/\s+/g, '-')}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Batch Transfer Section */}
      <Card>
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-primary font-semibold">Batch Transfer</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="batchExchangePolicy" className="text-sm font-medium">
                Exchange Policy*
              </Label>
              <Select name="batchExchangePolicy" required>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {selectOptions.map((option, index) => (
                    <SelectItem key={index} value={option.toLowerCase().replace(/\s+/g, '-')}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="batchMaximumNumber" className="text-sm font-medium">
                Maximum Number*
              </Label>
              <Input 
                id="batchMaximumNumber"
                name="batchMaximumNumber"
                className="h-10"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="batchMaximumAmount" className="text-sm font-medium">
                Maximum Amount*
              </Label>
              <Input 
                id="batchMaximumAmount"
                name="batchMaximumAmount"
                className="h-10"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="batchRetryDelay" className="text-sm font-medium">
                Retry - Delay*
              </Label>
              <Input 
                id="batchRetryDelay"
                name="batchRetryDelay"
                className="h-10"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="batchRetryMaximumNumber" className="text-sm font-medium">
                Retry - Maximum Number*
              </Label>
              <Input 
                id="batchRetryMaximumNumber"
                name="batchRetryMaximumNumber"
                className="h-10"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Completion Exchange Section */}
      <Card>
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-primary font-semibold">Completion Exchange</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="completionExchangePolicy" className="text-sm font-medium">
                Exchange Policy*
              </Label>
              <Select name="completionExchangePolicy" required>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {selectOptions.map((option, index) => (
                    <SelectItem key={index} value={option.toLowerCase().replace(/\s+/g, '-')}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="completionRetryDelay" className="text-sm font-medium">
                Retry - Delay*
              </Label>
              <Input 
                id="completionRetryDelay"
                name="completionRetryDelay"
                className="h-10"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="completionRetryMaximumNumber" className="text-sm font-medium">
                Retry - Maximum Number*
              </Label>
              <Input 
                id="completionRetryMaximumNumber"
                name="completionRetryMaximumNumber"
                className="h-10"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Offline Capabilities Section */}
      <Card>
        <CardHeader className="bg-primary/10">
          <CardTitle className="text-primary font-semibold">Offline Capabilities</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="offlineFinancialCapture" className="text-sm font-medium">
                Financial Capture*
              </Label>
              <Select name="offlineFinancialCapture" required>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {selectOptions.map((option, index) => (
                    <SelectItem key={index} value={option.toLowerCase().replace(/\s+/g, '-')}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Second Batch Transfer Section */}
      <Card>
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-primary font-semibold">Batch Transfer</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="batchExchangePolicy2" className="text-sm font-medium">
                Exchange Policy*
              </Label>
              <Select name="batchExchangePolicy2" required>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {selectOptions.map((option, index) => (
                    <SelectItem key={index} value={option.toLowerCase().replace(/\s+/g, '-')}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="batchMaximumNumber2" className="text-sm font-medium">
                Maximum Number*
              </Label>
              <Input 
                id="batchMaximumNumber2"
                name="batchMaximumNumber2"
                className="h-10"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="batchMaximumAmount2" className="text-sm font-medium">
                Maximum Amount*
              </Label>
              <Input 
                id="batchMaximumAmount2"
                name="batchMaximumAmount2"
                className="h-10"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="batchRetryDelay2" className="text-sm font-medium">
                Retry - Delay*
              </Label>
              <Input 
                id="batchRetryDelay2"
                name="batchRetryDelay2"
                className="h-10"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="batchRetryMaximumNumber2" className="text-sm font-medium">
                Retry - Maximum Number*
              </Label>
              <Input 
                id="batchRetryMaximumNumber2"
                name="batchRetryMaximumNumber2"
                className="h-10"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reconciliation Section */}
      <Card>
        <CardHeader className="bg-primary/10">
          <CardTitle className="text-primary font-semibold">Reconciliation</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="reconciliationExchangePolicy" className="text-sm font-medium">
                Exchange Policy*
              </Label>
              <Select name="reconciliationExchangePolicy" required>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {selectOptions.map((option, index) => (
                    <SelectItem key={index} value={option.toLowerCase().replace(/\s+/g, '-')}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reconciliationRetryDelay" className="text-sm font-medium">
                Retry - Delay*
              </Label>
              <Input 
                id="reconciliationRetryDelay"
                name="reconciliationRetryDelay"
                className="h-10"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reconciliationRetryMaximumNumber" className="text-sm font-medium">
                Retry - Maximum Number*
              </Label>
              <Input 
                id="reconciliationRetryMaximumNumber"
                name="reconciliationRetryMaximumNumber"
                className="h-10"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startTime" className="text-sm font-medium">
                Start Time*
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-10 justify-start text-left font-normal",
                      !startTime && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startTime ? format(startTime, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startTime}
                    onSelect={setStartTime}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="period" className="text-sm font-medium">
                Period*
              </Label>
              <Input 
                id="period"
                name="period"
                className="h-10"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleReset}
          className="px-8 py-2 h-11"
        >
          Reset
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          className="px-8 py-2 h-11"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="px-8 py-2 h-11 bg-primary hover:bg-primary/90"
        >
          Create
        </Button>
      </div>
    </form>
  );
};
