import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AcquirerProtocolForm } from './Manage/AcquirerProtocol';
import { ProgramManagerForm, ProgramManagerSearch } from './Manage/ProgramManager';
import { ISOForm } from './Manage/ISO';
import { MerchantGroupForm } from './Manage/MerchantGroup';
import { MerchantForm } from './Manage/Merchant';
import { SubMerchantForm } from './Manage/SubMerchant';
import { BankForm } from './Manage/Bank';
import { FeeProgramForm } from './Programs/FeeProgram';
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
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Search, 
  Plus, 
  Eye, 
  Pause, 
  Edit, 
  Trash2,
  Filter,
  RotateCcw,
  Download,
  FileText
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';
import { FilterFields, CreateFields, TableRow as TableRowType, ActionType, ActionConfig } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';
import { ADMIN_STRINGS } from '@/constants/adminConstants';

interface TabContentProps {
  title: string;
  className?: string;
}

const actionConfigs: ActionConfig[] = [
  { type: 'view', icon: 'Eye', variant: 'outline', tooltip: 'View Details' },
  { type: 'suspend', icon: 'Pause', variant: 'secondary', tooltip: 'Suspend' },
  { type: 'edit', icon: 'Edit', variant: 'default', tooltip: 'Edit' },
  { type: 'delete', icon: 'Trash2', variant: 'destructive', tooltip: 'Delete' },
];

export const TabContent: React.FC<TabContentProps> = ({ title, className = '' }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('search');
  const [filters, setFilters] = useState<FilterFields>({});
  const [createData, setCreateData] = useState<CreateFields>({});
  const [searchResults, setSearchResults] = useState<TableRowType[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data for demonstration
  const mockData: TableRowType[] = [
    {
      id: '1',
      deviceManufacturer: 'Samsung',
      deviceModelName: 'Galaxy S21',
      applicationType: 'Payment',
      packageName: 'com.samsung.pay',
      applicationName: 'Samsung Pay',
      applicationVersion: '1.2.3',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '2',
      deviceManufacturer: 'Apple',
      deviceModelName: 'iPhone 14',
      applicationType: 'Banking',
      packageName: 'com.apple.wallet',
      applicationName: 'Apple Wallet',
      applicationVersion: '2.1.0',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-18')
    },
    // Add more mock data as needed
  ];

  const handleSearch = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockData);
      setLoading(false);
      toast({
        title: ADMIN_STRINGS.TOAST.SEARCH_COMPLETED,
        description: `${ADMIN_STRINGS.GENERIC.FOUND} ${mockData.length} ${ADMIN_STRINGS.TOAST.FOUND_RESULTS}`,
      });
    }, 1000);
  };

  const handleCreate = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setCreateData({});
      toast({
        title: ADMIN_STRINGS.TOAST.CREATED_SUCCESS,
        description: ADMIN_STRINGS.TOAST.NEW_RECORD_CREATED,
      });
    }, 1000);
  };

  const handleAction = (action: ActionType, row: TableRowType) => {
    const actionMessages = {
      view: `Viewing details for ${row.applicationName}`,
      suspend: `Suspending ${row.applicationName}`,
      edit: `Editing ${row.applicationName}`,
      delete: `Deleting ${row.applicationName}`
    };

    toast({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} Action`,
      description: actionMessages[action],
      variant: action === 'delete' ? 'destructive' : 'default'
    });
  };

  const renderActionButton = (config: ActionConfig, row: TableRowType) => {
    const IconMap = {
      Eye,
      Pause,
      Edit,
      Trash2
    };
    const Icon = IconMap[config.icon as keyof typeof IconMap];

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

  const resetFilters = () => {
    setFilters({});
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text(`${title} - Export Report`, 20, 20);
    
    // Add export timestamp
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 35);
    
    // Prepare table data
    const tableData = searchResults.map(row => [
      row.deviceManufacturer,
      row.deviceModelName,
      row.applicationType,
      row.packageName,
      row.applicationName,
      row.applicationVersion
    ]);

    // Create table
    autoTable(doc, {
      head: [['Device Manufacturer', 'Model Name', 'Application Type', 'Package Name', 'Application Name', 'Version']],
      body: tableData,
      startY: 50,
      styles: {
        fontSize: 8,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [41, 121, 255], // Mercedes blue color
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      margin: { top: 50 }
    });

    // Save the PDF
    doc.save(`${title.replace(/\s+/g, '_')}_export_${new Date().toISOString().split('T')[0]}.pdf`);
    
    toast({
      title: "PDF Export Successful",
      description: `Exported ${searchResults.length} records to PDF`,
    });
  };

  const exportToCSV = () => {
    const csvData = searchResults.map(row => ({
      'Device Manufacturer': row.deviceManufacturer,
      'Model Name': row.deviceModelName,
      'Application Type': row.applicationType,
      'Package Name': row.packageName,
      'Application Name': row.applicationName,
      'Version': row.applicationVersion,
      'Created At': row.createdAt.toLocaleDateString(),
      'Updated At': row.updatedAt.toLocaleDateString()
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${title.replace(/\s+/g, '_')}_export_${new Date().toISOString().split('T')[0]}.csv`);
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

  const totalPages = Math.ceil(searchResults.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedResults = searchResults.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={`space-y-6 animate-fade-in ${className}`}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <Badge variant="secondary" className="bg-mb-blue/10 text-mb-blue border-mb-blue/20">
          {ADMIN_STRINGS.NAVIGATION.ADMIN_PORTAL}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="search" className="flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <span>{ADMIN_STRINGS.ACTIONS.SEARCH}</span>
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>{ADMIN_STRINGS.ACTIONS.CREATE}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-6">
          {title === 'Program Manager' ? (
            <ProgramManagerSearch
              onSearchComplete={(results) => {
                console.log('Program Manager search results:', results);
              }}
            />
          ) : (
            <>
              <Card className="shadow-glass">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Filter className="h-5 w-5" />
                    <span>Search Filters</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="deviceManufacturer">Device Manufacturer</Label>
                      <Input
                        id="deviceManufacturer"
                        placeholder="Enter manufacturer"
                        value={filters.deviceManufacturer || ''}
                        onChange={(e) => setFilters(prev => ({ ...prev, deviceManufacturer: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deviceModelName">Device Model Name</Label>
                      <Input
                        id="deviceModelName"
                        placeholder="Enter model name"
                        value={filters.deviceModelName || ''}
                        onChange={(e) => setFilters(prev => ({ ...prev, deviceModelName: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="applicationType">Application Type</Label>
                      <Input
                        id="applicationType"
                        placeholder="Enter application type"
                        value={filters.applicationType || ''}
                        onChange={(e) => setFilters(prev => ({ ...prev, applicationType: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="packageName">Package Name</Label>
                      <Input
                        id="packageName"
                        placeholder="Enter package name"
                        value={filters.packageName || ''}
                        onChange={(e) => setFilters(prev => ({ ...prev, packageName: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="applicationName">Application Name</Label>
                      <Input
                        id="applicationName"
                        placeholder="Enter application name"
                        value={filters.applicationName || ''}
                        onChange={(e) => setFilters(prev => ({ ...prev, applicationName: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="applicationVersion">Application Version</Label>
                      <Input
                        id="applicationVersion"
                        placeholder="Enter version"
                        value={filters.applicationVersion || ''}
                        onChange={(e) => setFilters(prev => ({ ...prev, applicationVersion: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 pt-4">
                    <Button onClick={handleSearch} disabled={loading}>
                      <Search className="mr-2 h-4 w-4" />
                      {loading ? 'Searching...' : 'Search'}
                    </Button>
                    <Button variant="outline" onClick={resetFilters}>
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {searchResults.length > 0 && (
                <Card className="shadow-glass">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Search Results ({searchResults.length} found)</CardTitle>
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
                              <p>Export to PDF</p>
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
                              <p>Export to CSV</p>
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
                            <TableHead>Device Manufacturer</TableHead>
                            <TableHead>Model Name</TableHead>
                            <TableHead>Application Type</TableHead>
                            <TableHead>Package Name</TableHead>
                            <TableHead>Application Name</TableHead>
                            <TableHead>Version</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paginatedResults.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell className="font-medium">{row.deviceManufacturer}</TableCell>
                              <TableCell>{row.deviceModelName}</TableCell>
                              <TableCell>{row.applicationType}</TableCell>
                              <TableCell className="font-mono text-xs">{row.packageName}</TableCell>
                              <TableCell>{row.applicationName}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{row.applicationVersion}</Badge>
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
            </>
          )}
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          {title === 'Acquirer Protocol Parameter' ? (
            <AcquirerProtocolForm
              onSubmit={(data) => {
                toast({
                  title: ADMIN_STRINGS.TOAST.CREATED_SUCCESS,
                  description: ADMIN_STRINGS.TOAST.ACQUIRER_PROTOCOL_CREATED,
                });
                console.log('Form data:', data);
              }}
              onCancel={() => {
                toast({
                  title: ADMIN_STRINGS.TOAST.CANCELLED,
                  description: ADMIN_STRINGS.TOAST.FORM_CREATION_CANCELLED,
                });
              }}
              onReset={() => {
                toast({
                  title: ADMIN_STRINGS.TOAST.FORM_RESET,
                  description: ADMIN_STRINGS.TOAST.ALL_FIELDS_CLEARED,
                });
              }}
            />
          ) : title === 'Program Manager' ? (
            <ProgramManagerForm
              onSubmit={(data) => {
                toast({
                  title: ADMIN_STRINGS.TOAST.CREATED_SUCCESS,
                  description: ADMIN_STRINGS.TOAST.PROGRAM_MANAGER_CREATED,
                });
                console.log('Program Manager data:', data);
              }}
              onCancel={() => {
                toast({
                  title: ADMIN_STRINGS.TOAST.CANCELLED,
                  description: ADMIN_STRINGS.TOAST.PROGRAM_MANAGER_CREATION_CANCELLED,
                });
              }}
              onReset={() => {
                toast({
                  title: ADMIN_STRINGS.TOAST.FORM_RESET,
                  description: ADMIN_STRINGS.TOAST.PROGRAM_MANAGER_FIELDS_CLEARED,
                });
              }}
            />
          ) : title === 'ISO' ? (
            <ISOForm
              onSubmit={(data) => {
                toast({
                  title: ADMIN_STRINGS.TOAST.CREATED_SUCCESS,
                  description: ADMIN_STRINGS.TOAST.ISO_CREATED,
                });
                console.log('ISO data:', data);
              }}
              onCancel={() => {
                toast({
                  title: ADMIN_STRINGS.TOAST.CANCELLED,
                  description: ADMIN_STRINGS.TOAST.ISO_CREATION_CANCELLED,
                });
              }}
              onReset={() => {
                toast({
                  title: ADMIN_STRINGS.TOAST.FORM_RESET,
                  description: ADMIN_STRINGS.TOAST.ISO_FIELDS_CLEARED,
                });
              }}
            />
          ) : title === 'Merchant Group' ? (
            <MerchantGroupForm
              onSubmit={(data) => {
                toast({
                  title: "Created Successfully",
                  description: "Merchant Group has been created successfully",
                });
                console.log('Merchant Group data:', data);
              }}
              onCancel={() => {
                toast({
                  title: "Cancelled",
                  description: "Merchant Group creation was cancelled",
                });
              }}
              onReset={() => {
                toast({
                  title: "Form Reset",
                  description: "All Merchant Group fields have been cleared",
                });
              }}
            />
          ) : title === 'Merchant' ? (
            <MerchantForm
              onSubmit={(data) => {
                toast({
                  title: "Created Successfully",
                  description: "Merchant has been created successfully",
                });
                console.log('Merchant data:', data);
              }}
              onCancel={() => {
                toast({
                  title: "Cancelled",
                  description: "Merchant creation was cancelled",
                });
              }}
              onReset={() => {
                toast({
                  title: "Form Reset",
                  description: "All Merchant fields have been cleared",
                });
              }}
            />
          ) : title === 'Sub Merchant' ? (
            <SubMerchantForm
              onSubmit={(data) => {
                toast({
                  title: "Created Successfully",
                  description: "Sub-Merchant has been created successfully",
                });
                console.log('Sub-Merchant data:', data);
              }}
              onCancel={() => {
                toast({
                  title: "Cancelled",
                  description: "Sub-Merchant creation was cancelled",
                });
              }}
              onReset={() => {
                toast({
                  title: "Form Reset",
                  description: "All Sub-Merchant fields have been cleared",
                });
              }}
            />
          ) : title === 'Bank' ? (
            <BankForm
              onSubmit={(data) => {
                toast({
                  title: ADMIN_STRINGS.TOAST.CREATED_SUCCESS,
                  description: ADMIN_STRINGS.TOAST.BANK_CREATED,
                });
                console.log('Bank data:', data);
              }}
              onCancel={() => {
                toast({
                  title: ADMIN_STRINGS.TOAST.CANCELLED,
                  description: ADMIN_STRINGS.TOAST.BANK_CREATION_CANCELLED,
                });
              }}
              onReset={() => {
                toast({
                  title: ADMIN_STRINGS.TOAST.FORM_RESET,
                  description: ADMIN_STRINGS.TOAST.BANK_FIELDS_CLEARED,
                });
              }}
            />
          ) : title === 'Fee Program' ? (
            <FeeProgramForm
              onSubmit={(data) => {
                toast({
                  title: ADMIN_STRINGS.TOAST.CREATED_SUCCESS,
                  description: ADMIN_STRINGS.TOAST.FEE_PROGRAM_CREATED,
                });
                console.log('Fee Program data:', data);
              }}
              onCancel={() => {
                toast({
                  title: ADMIN_STRINGS.TOAST.CANCELLED,
                  description: ADMIN_STRINGS.TOAST.FEE_PROGRAM_CREATION_CANCELLED,
                });
              }}
              onReset={() => {
                toast({
                  title: ADMIN_STRINGS.TOAST.FORM_RESET,
                  description: ADMIN_STRINGS.TOAST.FEE_PROGRAM_FIELDS_CLEARED,
                });
              }}
            />
          ) : (
            <Card className="shadow-glass">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Create New Record</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="create-deviceManufacturer">Device Manufacturer *</Label>
                    <Input
                      id="create-deviceManufacturer"
                      placeholder="Enter manufacturer"
                      value={createData.deviceManufacturer || ''}
                      onChange={(e) => setCreateData(prev => ({ ...prev, deviceManufacturer: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="create-deviceModelName">Device Model Name *</Label>
                    <Input
                      id="create-deviceModelName"
                      placeholder="Enter model name"
                      value={createData.deviceModelName || ''}
                      onChange={(e) => setCreateData(prev => ({ ...prev, deviceModelName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="create-applicationType">Application Type *</Label>
                    <Input
                      id="create-applicationType"
                      placeholder="Enter application type"
                      value={createData.applicationType || ''}
                      onChange={(e) => setCreateData(prev => ({ ...prev, applicationType: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="create-packageName">Package Name *</Label>
                    <Input
                      id="create-packageName"
                      placeholder="Enter package name"
                      value={createData.packageName || ''}
                      onChange={(e) => setCreateData(prev => ({ ...prev, packageName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="create-applicationName">Application Name *</Label>
                    <Input
                      id="create-applicationName"
                      placeholder="Enter application name"
                      value={createData.applicationName || ''}
                      onChange={(e) => setCreateData(prev => ({ ...prev, applicationName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="create-applicationVersion">Application Version *</Label>
                    <Input
                      id="create-applicationVersion"
                      placeholder="Enter version"
                      value={createData.applicationVersion || ''}
                      onChange={(e) => setCreateData(prev => ({ ...prev, applicationVersion: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4 pt-6">
                  <Button onClick={handleCreate} disabled={loading}>
                    <Plus className="mr-2 h-4 w-4" />
                    {loading ? 'Creating...' : 'Create'}
                  </Button>
                  <Button variant="outline" onClick={() => setCreateData({})}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
