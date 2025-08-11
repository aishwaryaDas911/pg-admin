import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { Search, RotateCcw, FileText, Download, Eye, Edit, Trash2, Pause, Play } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';

export interface SearchField {
  name: string;
  label: string;
  type: 'text' | 'select';
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  required?: boolean;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  className?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

export interface ActionConfig {
  type: 'view' | 'edit' | 'delete' | 'suspend' | 'activate';
  icon: React.ComponentType<{ className?: string }>;
  color: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  tooltip: string;
  condition?: (row: any) => boolean;
}

export interface ReusableSearchProps {
  title?: string;
  searchFields: SearchField[];
  tableColumns: TableColumn[];
  data: any[];
  onSearch: (filters: any) => void;
  onAction?: (action: string, row: any) => void;
  actions?: ActionConfig[];
  loading?: boolean;
  enableExport?: boolean;
  exportFileName?: string;
  recordsPerPageOptions?: Array<{ label: string; value: string }>;
  className?: string;
}

const defaultActions: ActionConfig[] = [
  {
    type: 'view',
    icon: Eye,
    color: 'blue',
    tooltip: 'View Details'
  },
  {
    type: 'edit',
    icon: Edit,
    color: 'green',
    tooltip: 'Edit'
  },
  {
    type: 'delete',
    icon: Trash2,
    color: 'red',
    tooltip: 'Delete'
  }
];

const defaultRecordsPerPageOptions = [
  { label: '10', value: '10' },
  { label: '25', value: '25' },
  { label: '50', value: '50' },
  { label: '100', value: '100' }
];

export const ReusableSearchComponent: React.FC<ReusableSearchProps> = ({
  title,
  searchFields,
  tableColumns,
  data,
  onSearch,
  onAction,
  actions = defaultActions,
  loading = false,
  enableExport = true,
  exportFileName = 'export',
  recordsPerPageOptions = defaultRecordsPerPageOptions,
  className = ''
}) => {
  const { toast } = useToast();
  const [searchResults, setSearchResults] = useState<any[]>(data);

  // Create default values for form
  const defaultValues = searchFields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {} as Record<string, string>);

  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      ...defaultValues,
      recordsPerPage: '10'
    }
  });

  // Handle search
  const handleSearch = (formData: any) => {
    onSearch(formData);
    setSearchResults(data);
  };

  // Handle reset
  const handleReset = () => {
    reset();
    setSearchResults([]);
    toast({
      title: "Filters Reset",
      description: "All search filters have been cleared",
    });
  };

  // Handle action
  const handleActionClick = (action: string, row: any) => {
    onAction?.(action, row);
  };

  // Export functions
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text(`${title || 'Export'} Report`, 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 35);
    
    const headers = tableColumns.filter(col => col.key !== 'actions').map(col => col.label);
    const tableData = searchResults.map(row => 
      tableColumns
        .filter(col => col.key !== 'actions')
        .map(col => {
          const value = row[col.key];
          if (typeof value === 'object' && value !== null) {
            return typeof value.props?.children === 'string' ? value.props.children : String(value);
          }
          return String(value || '');
        })
    );

    autoTable(doc, {
      head: [headers],
      body: tableData,
      startY: 50,
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: [41, 121, 255], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 245, 245] }
    });

    doc.save(`${exportFileName}_${new Date().toISOString().split('T')[0]}.pdf`);
    
    toast({
      title: "PDF Export Successful",
      description: `Exported ${searchResults.length} records to PDF`,
    });
  };

  const exportToCSV = () => {
    const headers = tableColumns.filter(col => col.key !== 'actions');
    const csvData = searchResults.map(row => {
      const csvRow: Record<string, any> = {};
      headers.forEach(header => {
        const value = row[header.key];
        if (typeof value === 'object' && value !== null) {
          csvRow[header.label] = typeof value.props?.children === 'string' ? value.props.children : String(value);
        } else {
          csvRow[header.label] = String(value || '');
        }
      });
      return csvRow;
    });

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${exportFileName}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    toast({
      title: "CSV Export Successful",
      description: `Exported ${searchResults.length} records to CSV`,
    });
  };

  // Get action button color classes
  const getActionColorClasses = (color: string) => {
    const colorMap = {
      blue: 'text-blue-600 hover:text-blue-700 hover:bg-blue-50',
      green: 'text-green-600 hover:text-green-700 hover:bg-green-50',
      red: 'text-red-600 hover:text-red-700 hover:bg-red-50',
      yellow: 'text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50',
      gray: 'text-gray-600 hover:text-gray-700 hover:bg-gray-50'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search Filters Section */}
      <Card className="shadow-sm border-border/50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">Search Filters</h3>
          </div>
          
          <form onSubmit={handleSubmit(handleSearch)} className="space-y-4">
            {/* Search Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {searchFields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name} className="text-sm">
                    {field.label}
                    {field.required && <span className="text-destructive ml-1">*</span>}
                  </Label>
                  
                  {field.type === 'select' ? (
                    <Select onValueChange={(value) => setValue(field.name, value)}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id={field.name}
                      placeholder={field.placeholder}
                      className="h-9"
                      {...register(field.name)}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Records Per Page */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="recordsPerPage" className="text-sm">
                  Records Per Page
                </Label>
                <Select 
                  defaultValue="10"
                  onValueChange={(value) => setValue('recordsPerPage', value)}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select records per page" />
                  </SelectTrigger>
                  <SelectContent>
                    {recordsPerPageOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 pt-2">
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-black hover:bg-gray-800 text-white px-6"
              >
                <Search className="h-4 w-4 mr-2" />
                {loading ? 'Searching...' : 'Search'}
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleReset}
                className="px-6"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Search Results Section */}
      {searchResults.length > 0 && (
        <Card className="shadow-sm border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-medium">
                Search Results ({searchResults.length} found)
              </h3>
              {enableExport && (
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={exportToPDF}
                    className="text-sm"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={exportToCSV}
                    className="text-sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    CSV
                  </Button>
                </div>
              )}
            </div>

            {/* Results Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    {tableColumns.map((column) => (
                      <TableHead key={column.key} className={`text-xs font-medium ${column.className || ''}`}>
                        {column.label}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchResults.map((row, index) => (
                    <TableRow key={row.id || index} className="hover:bg-muted/30">
                      {tableColumns.map((column) => (
                        <TableCell 
                          key={column.key} 
                          className={column.className || (column.key === 'actions' ? '' : 'text-sm')}
                        >
                          {column.key === 'actions' ? (
                            <div className="flex items-center space-x-1">
                              {actions.map((action) => {
                                const shouldShow = action.condition ? action.condition(row) : true;
                                if (!shouldShow) return null;

                                const Icon = action.icon;
                                return (
                                  <TooltipProvider key={action.type}>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className={`h-8 w-8 ${getActionColorClasses(action.color)}`}
                                          onClick={() => handleActionClick(action.type, row)}
                                        >
                                          <Icon className="h-4 w-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>{action.tooltip}</TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                );
                              })}
                            </div>
                          ) : column.render ? (
                            column.render(row[column.key], row)
                          ) : (
                            row[column.key]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReusableSearchComponent;
