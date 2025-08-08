import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Calendar, CalendarDays } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import './FormGenerator.css';

export interface FormField {
  label: string;
  hide?: boolean;
  input?: {
    name: string;
    type: string;
    placeholder?: string;
    mandatory?: boolean;
  };
  dropdown?: {
    name: string;
    options: Array<{ label: string; value: string }>;
    placeholder?: string;
    mandatory?: boolean;
  };
  dateRangePicker?: {
    name: string;
    mandatory?: boolean;
  };
  datePicker?: {
    name: string;
    mandatory?: boolean;
  };
  button?: {
    name: string;
    label: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    onClick?: () => void;
  };
}

export interface TableConfig {
  columns: Array<{
    key: string;
    label: string;
    sortable?: boolean;
  }>;
  rows: Array<Record<string, any>>;
}

interface FormGeneratorProps {
  fields?: FormField[];
  tableDataConfig?: TableConfig;
  onSubmit?: (data: any) => void;
  className?: string;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({
  fields = [],
  tableDataConfig = { columns: [], rows: [] },
  onSubmit,
  className
}) => {
  const methods = useForm();
  const { register, setValue, watch, formState: { errors }, reset } = methods;
  const [showTable, setShowTable] = useState(false);
  const [rows, setRows] = useState<Array<Record<string, any>>>([]);

  // Filter out button fields and hidden fields for the form grid
  const formFields = fields.filter((f) => !f.button && f.hide === false);
  const buttons = fields.filter((f) => f.button && f.hide === false);

  const handleButtonClick = (e: React.MouseEvent, btn: FormField['button']) => {
    e.preventDefault();
    if (btn?.name === 'search') {
      // Call the onSubmit function with current form data
      if (onSubmit) {
        const formData = methods.getValues();
        onSubmit(formData);
      }
    } else if (btn?.name === 'reset') {
      reset();
      setShowTable(false);
      setRows([]);
    } else if (btn?.onClick) {
      btn.onClick();
    }
  };

  // Update rows when tableDataConfig changes
  React.useEffect(() => {
    if (tableDataConfig.rows && tableDataConfig.rows.length > 0) {
      setRows(tableDataConfig.rows);
      setShowTable(true);
    }
  }, [tableDataConfig.rows]);

  const handleFormSubmit = (data: any) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  const renderDatePicker = (field: FormField) => {
    const watchedValue = watch(field.datePicker!.name);
    
    return (
      <div className="form-item" key={field.datePicker!.name}>
        <Label className="form-label">{field.label}</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal custom-date-picker",
                !watchedValue && "text-muted-foreground"
              )}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {watchedValue ? format(watchedValue, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <CalendarComponent
              mode="single"
              selected={watchedValue}
              onSelect={(date) => setValue(field.datePicker!.name, date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors[field.datePicker!.name]?.message && (
          <p className="error-text">{String(errors[field.datePicker!.name]?.message)}</p>
        )}
      </div>
    );
  };

  const renderDateRangePicker = (field: FormField) => {
    const startDate = watch(`${field.dateRangePicker!.name}_start`);
    const endDate = watch(`${field.dateRangePicker!.name}_end`);
    
    return (
      <div className="form-item" key={field.dateRangePicker!.name}>
        <Label className="form-label">{field.label}</Label>
        <div className="date-range-picker-container">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "flex-1 justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : "Start date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={startDate}
                onSelect={(date) => setValue(`${field.dateRangePicker!.name}_start`, date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <span className="date-range-separator">to</span>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "flex-1 justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : "End date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={endDate}
                onSelect={(date) => setValue(`${field.dateRangePicker!.name}_end`, date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  };

  return (
    <FormProvider {...methods}>
      <form className={cn("form-container", className)} onSubmit={methods.handleSubmit(handleFormSubmit)}>
        {/* Fields Grid */}
        <div className="form-grid">
          {formFields.map((field) => {
            if (field?.input) {
              return (
                <div key={field.input.name} className="form-item">
                  <Label className="form-label">{field.label}</Label>
                  <Input
                    type={field.input.type}
                    placeholder={field.input.placeholder}
                    className="custom-input"
                    {...register(field.input.name, { 
                      required: field.input.mandatory ? `${field.label} is required` : false 
                    })}
                  />
                  {errors[field.input.name]?.message && (
                    <p className="error-text">{String(errors[field.input.name]?.message)}</p>
                  )}
                </div>
              );
            } else if (field?.dropdown) {
              return (
                <div key={field.dropdown.name} className="form-item">
                  <Label className="form-label">{field.label}</Label>
                  <Select onValueChange={(value) => setValue(field.dropdown!.name, value)}>
                    <SelectTrigger className="custom-dropdown">
                      <SelectValue placeholder={field.dropdown.placeholder || 'Select an option'} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.dropdown.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors[field.dropdown.name]?.message && (
                    <p className="error-text">{String(errors[field.dropdown.name]?.message)}</p>
                  )}
                </div>
              );
            } else if (field?.datePicker) {
              return renderDatePicker(field);
            } else if (field?.dateRangePicker) {
              return renderDateRangePicker(field);
            }
            return null;
          })}
        </div>

        {/* Buttons Row (Separate from Fields) */}
        {buttons.length > 0 && (
          <div className="form-buttons-row">
            <div className="form-buttons-wrapper">
              {buttons.map((field) => (
                <Button
                  key={field.button!.name}
                  variant={field.button!.variant || 'default'}
                  size={field.button!.size || 'default'}
                  onClick={(e) => handleButtonClick(e, field.button)}
                  className="button-spacing"
                  type="button"
                >
                  {field.button!.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Table Display */}
        {showTable && tableDataConfig.columns && rows.length > 0 && (
          <div className="table-container">
            <Table>
              <TableHeader>
                <TableRow>
                  {tableDataConfig.columns.map((column) => (
                    <TableHead key={column.key}>{column.label}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    {tableDataConfig.columns.map((column) => (
                      <TableCell key={column.key}>
                        {column.key === 'actions' ? (
                          row[column.key] || '-'
                        ) : column.key === 'status' ? (
                          <Badge
                            variant={row[column.key] === 'active' ? 'default' : 'secondary'}
                            className={row[column.key] === 'active' ? 'bg-green-100 text-green-800' : ''}
                          >
                            {row[column.key] || '-'}
                          </Badge>
                        ) : (
                          <span className={column.key.includes('email') || column.key.includes('Email') ? 'font-mono text-xs' : ''}>
                            {row[column.key] || '-'}
                          </span>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default FormGenerator;
