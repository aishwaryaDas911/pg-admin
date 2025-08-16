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
import { ProgramManagerConfig } from '../config/ProgramManagerConfig';
import { ProgramManagerService, ProgramManagerSearchParams } from '@/services/programManagerService';
import { Search, RotateCcw, FileText, Download, Eye, Edit, Trash2 } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';

interface ProgramManagerSearchProps {
  tabName: string;
  handleChangeTab: (tab: string) => void;
  onSearchClick: () => void;
  tableActionState: string;
  setTableActionState: (state: string) => void;
  setHideCreateTab: (hide: boolean) => void;
}

export const ProgramManagerSearchComponent: React.FC<ProgramManagerSearchProps> = ({
  tabName,
  handleChangeTab,
  onSearchClick,
  tableActionState,
  setTableActionState,
  setHideCreateTab
}) => {
  const { toast } = useToast();
  const config = ProgramManagerConfig({ tableActionState });
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      programManagerName: '',
      companyName: '',
      bankName: '',
      status: '',
      recordsPerPage: '10'
    }
  });

  // Handle search functionality using the API service
  const handleSearch = async (data: any) => {
    setLoading(true);
    setHasSearched(true);

    try {
      console.log('🔍 Starting Program Manager search with data:', data);
      console.log('🌐 API URL:', ProgramManagerService.getApiUrl());

      // Prepare search parameters for the API
      const searchParams: ProgramManagerSearchParams = {
        programManagerName: data.programManagerName || undefined,
        companyName: data.companyName || undefined,
        bankName: data.bankName || undefined,
        status: data.status || undefined,
        recordsPerPage: data.recordsPerPage || '10',
        pageNumber: 1, // Start with first page
        sortBy: 'programManagerName',
        sortOrder: 'asc'
      };

      // Call the API service
      const response = await ProgramManagerService.searchProgramManagers(searchParams);
      console.log('📦 Full API Response:', response);

      if (response.success && response.data) {
        console.log('✅ API Response Success - Data received:', response.data);
        console.log('📁 Data type:', typeof response.data, 'Is Array:', Array.isArray(response.data));

        // Handle different response formats
        let resultsArray = [];
        if (Array.isArray(response.data)) {
          resultsArray = response.data;
        } else if (response.data.programManagersList && Array.isArray(response.data.programManagersList)) {
          // Handle if API returns {programManagersList: [...]}
          resultsArray = response.data.programManagersList;
          console.log('📁 Found programManagersList array:', resultsArray);
        } else if (response.data.results && Array.isArray(response.data.results)) {
          // Handle if API returns {results: [...]}
          resultsArray = response.data.results;
        } else {
          // Single object response
          resultsArray = [response.data];
        }

        console.log('📊 Final results array:', resultsArray);
        console.log('📊 Results count:', resultsArray.length);

        setSearchResults(resultsArray);
        onSearchClick();

        toast({
          title: "Search Completed Successfully",
          description: `Found ${resultsArray.length} Program Manager(s)${response.totalRecords ? ` out of ${response.totalRecords} total records` : ''}`,
        });
      } else {
        // API call failed, fall back to mock data for development
        console.warn('⚠️ API search failed, falling back to mock data');

        let filteredResults = config.mockData;

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

        if (data.status) {
          filteredResults = filteredResults.filter(item =>
            item.status.toLowerCase() === data.status.toLowerCase()
          );
        }

        if (data.bankName) {
          filteredResults = filteredResults.filter(item =>
            item.associatedBankNames.toLowerCase().includes(data.bankName.toLowerCase())
          );
        }

        setSearchResults(filteredResults);
        onSearchClick();

        toast({
          title: "Search Completed (Demo Mode)",
          description: `Found ${filteredResults.length} Program Manager(s) - ${response.error || 'API unavailable, using sample data'}`,
          variant: "secondary"
        });
      }
    } catch (error) {
      console.error('❌ Search error:', error);

      // On any error, fall back to mock data
      let filteredResults = config.mockData;

      if (data.programManagerName) {
        filteredResults = filteredResults.filter(item =>
          item.programManagerName.toLowerCase().includes(data.programManagerName.toLowerCase())
        );
      }

      setSearchResults(filteredResults);
      onSearchClick();

      toast({
        title: "Search Error - Using Demo Data",
        description: `API error occurred, showing ${filteredResults.length} sample records`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle reset
  const handleReset = () => {
    reset();
    setSearchResults([]);
    setHasSearched(false);
    toast({
      title: "Filters Reset",
      description: "All search filters have been cleared",
    });
  };

  // Action handlers
  const handleAction = (action: string, row: any) => {
    switch (action) {
      case 'view':
        setTableActionState('view');
        setHideCreateTab(false);
        handleChangeTab('create');
        toast({
          title: "View Mode",
          description: `Viewing details for ${row.programManagerName}`,
        });
        break;
      case 'edit':
        setTableActionState('edit');
        setHideCreateTab(false);
        handleChangeTab('create');
        toast({
          title: "Edit Mode",
          description: `Editing ${row.programManagerName}`,
        });
        break;
      case 'delete':
        toast({
          title: "Delete Action",
          description: `Deleting ${row.programManagerName}`,
          variant: "destructive"
        });
        break;
    }
  };

  // Export functions
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Program Manager - Export Report', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 35);
    
    const tableData = searchResults.map(row => [
      row.programManagerName,
      row.companyName,
      row.contactPerson,
      row.phoneNumber,
      row.emailId,
      row.associatedBankNames,
      row.status
    ]);

    autoTable(doc, {
      head: [['Program Manager', 'Company', 'Contact Person', 'Phone', 'Email', 'Associated Banks', 'Status']],
      body: tableData,
      startY: 50,
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: [41, 121, 255], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 245, 245] }
    });

    doc.save(`Program_Manager_export_${new Date().toISOString().split('T')[0]}.pdf`);
    
    toast({
      title: "PDF Export Successful",
      description: `Exported ${searchResults.length} records to PDF`,
    });
  };

  const exportToCSV = () => {
    const csvData = searchResults.map(row => ({
      'Program Manager Name': row.programManagerName,
      'Company Name': row.companyName,
      'Contact Person': row.contactPerson,
      'Phone': row.phoneNumber,
      'Email': row.emailId,
      'Associated Bank Names': row.associatedBankNames,
      'Status': row.status
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
      title: "CSV Export Successful",
      description: `Exported ${searchResults.length} records to CSV`,
    });
  };

  return (
    <div className="space-y-6">
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
              <div className="space-y-2">
                <Label htmlFor="programManagerName" className="text-sm">
                  Program Manager Name
                </Label>
                <Input
                  id="programManagerName"
                  placeholder="Enter program manager name"
                  className="h-9"
                  {...register('programManagerName')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm">
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  placeholder="Enter company name"
                  className="h-9"
                  {...register('companyName')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankName" className="text-sm">
                  Bank Name
                </Label>
                <Select onValueChange={(value) => setValue('bankName', value)}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select bank name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hdfc">HDFC</SelectItem>
                    <SelectItem value="axis">Axis Bank</SelectItem>
                    <SelectItem value="icici">ICICI Bank</SelectItem>
                    <SelectItem value="sbi">SBI</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm">
                  Status
                </Label>
                <Select onValueChange={(value) => setValue('status', value)}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
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

      {/* Search Results Section - Always show after search */}
      {(searchResults.length > 0 || loading) && (
        <Card className="shadow-sm border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-medium">
                {loading ? 'Searching...' : `Search Results (${searchResults.length} found)`}
              </h3>
              {searchResults.length > 0 && (
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
                    <TableHead className="text-xs font-medium">Program Manager Name</TableHead>
                    <TableHead className="text-xs font-medium">Company Name</TableHead>
                    <TableHead className="text-xs font-medium">Contact Person</TableHead>
                    <TableHead className="text-xs font-medium">Phone</TableHead>
                    <TableHead className="text-xs font-medium">Email</TableHead>
                    <TableHead className="text-xs font-medium">Associated Bank Name(s)</TableHead>
                    <TableHead className="text-xs font-medium">Status</TableHead>
                    <TableHead className="text-xs font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                          <span className="text-muted-foreground">Searching...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((row, index) => (
                      <TableRow key={row.id || index} className="hover:bg-muted/30">
                        <TableCell className="font-medium text-sm">{row.programManagerName || '-'}</TableCell>
                        <TableCell className="text-sm">{row.companyName || '-'}</TableCell>
                        <TableCell className="text-sm">{row.contactPerson || '-'}</TableCell>
                        <TableCell className="text-sm">{row.phoneNumber || '-'}</TableCell>
                        <TableCell className="text-sm font-mono text-xs">{row.emailId || '-'}</TableCell>
                        <TableCell className="text-sm">{row.associatedBankNames || '-'}</TableCell>
                        <TableCell>
                          <Badge
                            variant={row.status === 'ACTIVE' ? 'default' : 'secondary'}
                            className={`text-xs ${
                              row.status === 'ACTIVE'
                                ? 'bg-green-100 text-green-800 border-green-200'
                                : row.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                                : 'bg-gray-100 text-gray-800 border-gray-200'
                            }`}
                          >
                            {row.status ? row.status.toLowerCase() : 'unknown'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                    onClick={() => handleAction('view', row)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>View</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                                    onClick={() => handleAction('edit', row)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Edit</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => handleAction('delete', row)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Delete</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-12">
                        <div className="flex flex-col items-center space-y-2">
                          <Search className="h-8 w-8 text-muted-foreground" />
                          <span className="text-muted-foreground font-medium">No records found</span>
                          <span className="text-sm text-muted-foreground">Try adjusting your search criteria</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProgramManagerSearchComponent;
