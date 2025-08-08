import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import {
  Filter,
  Download,
  FileText,
  Eye,
  Pause,
  Edit,
  Trash2
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';
import { useToast } from '@/hooks/use-toast';
import { ADMIN_STRINGS, DROPDOWN_OPTIONS } from '@/constants/adminConstants';
import FormGenerator, { FormField, TableConfig } from '@/components/common/FormGenerator';

interface ProgramManagerSearchResult {
  id: string;
  programManagerName: string;
  companyName: string;
  businessEntityName: string;
  contactPerson: string;
  phoneNumber: string;
  emailId: string;
  currency: string;
  country: string;
  state: string;
  status: string;
  associatedBankNames: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface ProgramManagerSearchProps {
  onSearchComplete?: (results: ProgramManagerSearchResult[]) => void;
}

const actionConfigs = [
  { type: 'view', icon: Eye, variant: 'outline' as const, tooltip: ADMIN_STRINGS.TOOLTIPS.VIEW_DETAILS },
  { type: 'suspend', icon: Pause, variant: 'secondary' as const, tooltip: ADMIN_STRINGS.TOOLTIPS.SUSPEND },
  { type: 'edit', icon: Edit, variant: 'default' as const, tooltip: ADMIN_STRINGS.TOOLTIPS.EDIT },
  { type: 'delete', icon: Trash2, variant: 'destructive' as const, tooltip: ADMIN_STRINGS.TOOLTIPS.DELETE },
];

export const ProgramManagerSearchWithFormGenerator: React.FC<ProgramManagerSearchProps> = ({
  onSearchComplete
}) => {
  const { toast } = useToast();
  const [searchResults, setSearchResults] = useState<ProgramManagerSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  // Mock data for demonstration
  const mockData: ProgramManagerSearchResult[] = [
    {
      id: '1',
      programManagerName: 'Mercedes Payment Solutions',
      companyName: 'Mercedes-Benz Financial',
      businessEntityName: 'MB Payment Corp',
      contactPerson: 'John Smith',
      phoneNumber: '+1-555-0123',
      emailId: 'john.smith@mercedes-financial.com',
      currency: 'USD',
      country: 'US',
      state: 'CA',
      status: 'active',
      associatedBankNames: ['HDFC', 'Axis'],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '2',
      programManagerName: 'Global Automotive Payments',
      companyName: 'Mercedes Global Services',
      businessEntityName: 'MG Services LLC',
      contactPerson: 'Sarah Johnson',
      phoneNumber: '+1-555-0456',
      emailId: 'sarah.johnson@mercedes-global.com',
      currency: 'EUR',
      country: 'DE',
      state: 'CA',
      status: 'active',
      associatedBankNames: ['ICICI', 'SBI'],
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-18')
    },
    {
      id: '3',
      programManagerName: 'Regional Payment Hub',
      companyName: 'Mercedes Asia Pacific',
      businessEntityName: 'MAP Holdings',
      contactPerson: 'David Chen',
      phoneNumber: '+1-555-0789',
      emailId: 'david.chen@mercedes-ap.com',
      currency: 'INR',
      country: 'IN',
      state: 'KA',
      status: 'pending',
      associatedBankNames: ['HDFC'],
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-15')
    }
  ];

  const { BANKS, STATUS_OPTIONS, RECORDS_PER_PAGE } = DROPDOWN_OPTIONS;

  // Configure form fields for FormGenerator
  const searchFormFields: FormField[] = [
    {
      label: ADMIN_STRINGS.FORM_LABELS.PROGRAM_MANAGER_NAME,
      hide: false,
      input: {
        name: 'programManagerName',
        type: 'text',
        placeholder: ADMIN_STRINGS.PLACEHOLDERS.ENTER_PROGRAM_MANAGER_NAME,
        mandatory: false
      }
    },
    {
      label: ADMIN_STRINGS.FORM_LABELS.COMPANY_NAME,
      hide: false,
      input: {
        name: 'companyName',
        type: 'text',
        placeholder: ADMIN_STRINGS.PLACEHOLDERS.ENTER_COMPANY_NAME,
        mandatory: false
      }
    },
    {
      label: ADMIN_STRINGS.FORM_LABELS.BANK_NAME,
      hide: false,
      dropdown: {
        name: 'bankName',
        placeholder: ADMIN_STRINGS.PLACEHOLDERS.SELECT_BANK_NAME,
        options: BANKS.map(bank => ({ label: bank.label, value: bank.value })),
        mandatory: false
      }
    },
    {
      label: ADMIN_STRINGS.FORM_LABELS.STATUS,
      hide: false,
      dropdown: {
        name: 'status',
        placeholder: ADMIN_STRINGS.PLACEHOLDERS.SELECT_STATUS,
        options: STATUS_OPTIONS.map(status => ({ label: status.label, value: status.value })),
        mandatory: false
      }
    },
    {
      label: ADMIN_STRINGS.FORM_LABELS.RECORDS_PER_PAGE,
      hide: false,
      dropdown: {
        name: 'recordsPerPage',
        placeholder: ADMIN_STRINGS.PLACEHOLDERS.SELECT_RECORDS_PER_PAGE,
        options: RECORDS_PER_PAGE.map(option => ({ label: option.label, value: option.value })),
        mandatory: false
      }
    },
    {
      label: 'Search',
      hide: false,
      button: {
        name: 'search',
        label: loading ? ADMIN_STRINGS.ACTIONS.SEARCHING : ADMIN_STRINGS.ACTIONS.SEARCH,
        variant: 'default',
        size: 'default'
      }
    },
    {
      label: 'Reset',
      hide: false,
      button: {
        name: 'reset',
        label: ADMIN_STRINGS.ACTIONS.RESET,
        variant: 'outline',
        size: 'default'
      }
    },
    {
      label: 'Export PDF',
      hide: false,
      button: {
        name: 'exportPDF',
        label: 'Export PDF',
        variant: 'secondary',
        size: 'default',
        onClick: exportToPDF
      }
    },
    {
      label: 'Export CSV',
      hide: false,
      button: {
        name: 'exportCSV',
        label: 'Export CSV',
        variant: 'secondary',
        size: 'default',
        onClick: exportToCSV
      }
    }
  ];

  // This would be used by FormGenerator if it had built-in table functionality
  // For now, we handle the table separately below
  const tableConfig: TableConfig = {
    columns: [
      { key: 'programManagerName', label: ADMIN_STRINGS.FORM_LABELS.PROGRAM_MANAGER_NAME, sortable: true },
      { key: 'companyName', label: ADMIN_STRINGS.FORM_LABELS.COMPANY_NAME, sortable: true },
      { key: 'contactPerson', label: ADMIN_STRINGS.FORM_LABELS.CONTACT_PERSON, sortable: true },
      { key: 'phoneNumber', label: ADMIN_STRINGS.FORM_LABELS.PHONE, sortable: false },
      { key: 'emailId', label: ADMIN_STRINGS.FORM_LABELS.EMAIL, sortable: false },
      { key: 'associatedBankNames', label: ADMIN_STRINGS.FORM_LABELS.ASSOCIATED_BANK_NAMES, sortable: false },
      { key: 'status', label: ADMIN_STRINGS.FORM_LABELS.STATUS, sortable: true }
    ],
    rows: searchResults.map(result => ({
      ...result,
      associatedBankNames: result.associatedBankNames.join(', ')
    }))
  };

  const handleFormSubmit = (data: any) => {
    setLoading(true);
    
    // Simulate API call with filtering
    setTimeout(() => {
      let filteredResults = mockData;

      // Apply filters
      if (data.programManagerName) {
        filteredResults = filteredResults.filter(item =>
          item.programManagerName.toLowerCase().includes(data.programManagerName.toLowerCase())
        );
      }
      if (data.companyName) {
        filteredResults = filteredResults.filter(item =>
          item.companyName.toLowerCase().includes(data.companyName.toLowerCase())
        );
      }
      if (data.bankName) {
        filteredResults = filteredResults.filter(item =>
          item.associatedBankNames.some(bank => 
            bank.toLowerCase().includes(data.bankName.toLowerCase())
          )
        );
      }
      if (data.status) {
        filteredResults = filteredResults.filter(item => item.status === data.status);
      }

      // Update records per page if specified
      if (data.recordsPerPage) {
        setRecordsPerPage(parseInt(data.recordsPerPage) || 10);
      }

      setSearchResults(filteredResults);
      setCurrentPage(1);
      setLoading(false);
      onSearchComplete?.(filteredResults);
      
      toast({
        title: ADMIN_STRINGS.TOAST.SEARCH_COMPLETED,
        description: `${ADMIN_STRINGS.GENERIC.FOUND} ${filteredResults.length} ${ADMIN_STRINGS.TOAST.FOUND_RESULTS}`,
      });
    }, 1000);
  };

  const handleAction = (action: string, row: ProgramManagerSearchResult) => {
    const actionMessages = {
      view: `Viewing details for ${row.programManagerName}`,
      suspend: `Suspending ${row.programManagerName}`,
      edit: `Editing ${row.programManagerName}`,
      delete: `Deleting ${row.programManagerName}`
    };

    toast({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} Action`,
      description: actionMessages[action as keyof typeof actionMessages],
      variant: action === 'delete' ? 'destructive' : 'default'
    });
  };

  const renderActionButton = (config: typeof actionConfigs[0], row: ProgramManagerSearchResult) => {
    const Icon = config.icon;

    return (
      <TooltipProvider key={config.type}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={config.variant}
              size="icon"
              className="h-8 w-8"
              onClick={() => handleAction(config.type, row)}
            >
              <Icon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{config.tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  function exportToPDF() {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Program Manager - Export Report', 20, 20);
    
    // Add export timestamp
    doc.setFontSize(12);
    doc.text(`${ADMIN_STRINGS.GENERIC.GENERATED_ON} ${new Date().toLocaleString()}`, 20, 35);
    
    // Prepare table data
    const tableData = searchResults.map(row => [
      row.programManagerName,
      row.companyName,
      row.contactPerson,
      row.phoneNumber,
      row.emailId,
      row.associatedBankNames.join(', '),
      row.status
    ]);

    // Create table
    autoTable(doc, {
      head: [['Program Manager Name', 'Company Name', 'Contact Person', 'Phone', 'Email', 'Bank Names', 'Status']],
      body: tableData,
      startY: 50,
      styles: {
        fontSize: 8,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [41, 121, 255],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      margin: { top: 50 }
    });

    // Save the PDF
    doc.save(`Program_Manager_export_${new Date().toISOString().split('T')[0]}.pdf`);
    
    toast({
      title: ADMIN_STRINGS.TOAST.PDF_EXPORT_SUCCESS,
      description: `${ADMIN_STRINGS.TOAST.EXPORTED_RECORDS_PDF}: ${searchResults.length}`,
    });
  }

  function exportToCSV() {
    const csvData = searchResults.map(row => ({
      'Program Manager Name': row.programManagerName,
      'Company Name': row.companyName,
      'Business Entity Name': row.businessEntityName,
      'Contact Person': row.contactPerson,
      'Phone Number': row.phoneNumber,
      'Email ID': row.emailId,
      'Currency': row.currency,
      'Country': row.country,
      'State': row.state,
      'Status': row.status,
      'Associated Bank Names': row.associatedBankNames.join(', '),
      'Created At': row.createdAt.toLocaleDateString(),
      'Updated At': row.updatedAt.toLocaleDateString()
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `Program_Manager_export_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    toast({
      title: ADMIN_STRINGS.TOAST.CSV_EXPORT_SUCCESS,
      description: `${ADMIN_STRINGS.TOAST.EXPORTED_RECORDS_CSV}: ${searchResults.length}`,
    });
  }

  const totalPages = Math.ceil(searchResults.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedResults = searchResults.slice(startIndex, startIndex + recordsPerPage);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search Form using FormGenerator */}
      <Card className="shadow-glass">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>{ADMIN_STRINGS.SECTIONS.SEARCH_FILTERS}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormGenerator
            fields={searchFormFields}
            onSubmit={handleFormSubmit}
            className="bg-transparent"
          />
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card className="shadow-glass">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {ADMIN_STRINGS.SECTIONS.SEARCH_RESULTS} ({searchResults.length} {ADMIN_STRINGS.GENERIC.FOUND})
              </CardTitle>
              <div className="flex items-center space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={exportToPDF}
                        disabled={searchResults.length === 0}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        PDF
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{ADMIN_STRINGS.TOOLTIPS.EXPORT_PDF}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={exportToCSV}
                        disabled={searchResults.length === 0}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        CSV
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{ADMIN_STRINGS.TOOLTIPS.EXPORT_CSV}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{ADMIN_STRINGS.FORM_LABELS.PROGRAM_MANAGER_NAME}</TableHead>
                    <TableHead>{ADMIN_STRINGS.FORM_LABELS.COMPANY_NAME}</TableHead>
                    <TableHead>{ADMIN_STRINGS.FORM_LABELS.CONTACT_PERSON}</TableHead>
                    <TableHead>{ADMIN_STRINGS.FORM_LABELS.PHONE}</TableHead>
                    <TableHead>{ADMIN_STRINGS.FORM_LABELS.EMAIL}</TableHead>
                    <TableHead>{ADMIN_STRINGS.FORM_LABELS.ASSOCIATED_BANK_NAMES}</TableHead>
                    <TableHead>{ADMIN_STRINGS.FORM_LABELS.STATUS}</TableHead>
                    <TableHead>{ADMIN_STRINGS.TABLE_HEADERS.ACTIONS}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedResults.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.programManagerName}</TableCell>
                      <TableCell>{row.companyName}</TableCell>
                      <TableCell>{row.contactPerson}</TableCell>
                      <TableCell>{row.phoneNumber}</TableCell>
                      <TableCell>{row.emailId}</TableCell>
                      <TableCell>{row.associatedBankNames.join(', ')}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={row.status === 'active' ? 'default' : 'secondary'}
                          className={row.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {actionConfigs.map(config => renderActionButton(config, row))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {totalPages > 1 && (
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
