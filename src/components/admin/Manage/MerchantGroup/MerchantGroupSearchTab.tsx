import React, { useState, useCallback } from 'react';
import { FormGenerator } from '@/components/common/FormGenerator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { merchantGroupConfig, merchantGroupMockData } from './formConfig';
import { MERCHANT_GROUP_STRINGS } from '@/constants/merchantGroupConstants';
import { merchantGroupService, MerchantGroupSearchParams } from '@/services/merchantGroupService';
import {
  Search,
  Download,
  FileText,
  Eye,
  Edit,
  Copy,
  Ban,
  Trash2,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface MerchantGroupSearchTabProps {
  onViewClick?: (id: string) => void;
  onEditClick?: (id: string) => void;
  onCreateSuccess?: () => void;
}

export const MerchantGroupSearchTab: React.FC<MerchantGroupSearchTabProps> = ({
  onViewClick,
  onEditClick,
  onCreateSuccess
}) => {
  const { toast } = useToast();
  const [searchResults, setSearchResults] = useState(merchantGroupMockData);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(merchantGroupMockData.length);
  const [searchParams, setSearchParams] = useState<MerchantGroupSearchParams>({});

  const handleFormSubmit = useCallback(async (formData: any, buttonName: string) => {
    switch (buttonName) {
      case 'search':
        await handleSearch(formData);
        break;
      case 'reset':
        handleReset();
        break;
      case 'exportPDF':
        await handleExportPDF();
        break;
      case 'exportCSV':
        await handleExportCSV();
        break;
      default:
        console.log('Unknown button clicked:', buttonName);
    }
  }, []);

  const handleSearch = async (formData: any) => {
    setIsLoading(true);
    try {
      const searchParams: MerchantGroupSearchParams = {
        merchantGroupName: formData.merchantGroupName || undefined,
        contactName: formData.contactName || undefined,
        contactPhone: formData.contactPhone || undefined,
        contactEmail: formData.contactEmail || undefined,
        status: formData.status || undefined,
        recordsPerPage: formData.recordsPerPage ? parseInt(formData.recordsPerPage) : 25,
        page: 1,
      };

      setSearchParams(searchParams);

      // For development, use mock data with filtering
      let filteredResults = merchantGroupMockData;

      if (searchParams.merchantGroupName) {
        filteredResults = filteredResults.filter(item =>
          item.merchantGroupName.toLowerCase().includes(searchParams.merchantGroupName!.toLowerCase())
        );
      }

      if (searchParams.contactName) {
        filteredResults = filteredResults.filter(item =>
          item.contactName.toLowerCase().includes(searchParams.contactName!.toLowerCase())
        );
      }

      if (searchParams.contactPhone) {
        filteredResults = filteredResults.filter(item =>
          item.contactPhone.includes(searchParams.contactPhone!)
        );
      }

      if (searchParams.contactEmail) {
        filteredResults = filteredResults.filter(item =>
          item.contactEmailId.toLowerCase().includes(searchParams.contactEmail!.toLowerCase())
        );
      }

      if (searchParams.status && searchParams.status !== '') {
        filteredResults = filteredResults.filter(item =>
          item.status === searchParams.status
        );
      }

      setSearchResults(filteredResults);
      setTotalRecords(filteredResults.length);
      setCurrentPage(1);
      setTotalPages(Math.ceil(filteredResults.length / (searchParams.recordsPerPage || 25)));

      // Uncomment this when API is ready
      // const response = await merchantGroupService.search(searchParams);
      // setSearchResults(response.data);
      // setTotalRecords(response.total);
      // setCurrentPage(response.page);
      // setTotalPages(response.totalPages);

      toast({
        title: MERCHANT_GROUP_STRINGS.TOAST.SEARCH_COMPLETED_TITLE,
        description: `Found ${filteredResults.length} merchant group(s)`,
      });
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: MERCHANT_GROUP_STRINGS.TOAST.VALIDATION_ERROR_TITLE,
        description: 'Failed to search merchant groups. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSearchResults(merchantGroupMockData);
    setSearchParams({});
    setCurrentPage(1);
    setTotalPages(1);
    setTotalRecords(merchantGroupMockData.length);
    
    toast({
      title: MERCHANT_GROUP_STRINGS.TOAST.FORM_RESET_TITLE,
      description: MERCHANT_GROUP_STRINGS.TOAST.FORM_RESET_DESCRIPTION,
    });
  };

  const handleExportPDF = async () => {
    try {
      setIsLoading(true);
      // For development, show mock success
      toast({
        title: MERCHANT_GROUP_STRINGS.TOAST.EXPORT_SUCCESS_TITLE,
        description: MERCHANT_GROUP_STRINGS.EXPORT.PDF_SUCCESS,
      });

      // Uncomment this when API is ready
      // const blob = await merchantGroupService.exportToPdf(searchParams);
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.style.display = 'none';
      // a.href = url;
      // a.download = `merchant-groups-${new Date().toISOString().split('T')[0]}.pdf`;
      // document.body.appendChild(a);
      // a.click();
      // window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export PDF error:', error);
      toast({
        title: MERCHANT_GROUP_STRINGS.TOAST.VALIDATION_ERROR_TITLE,
        description: MERCHANT_GROUP_STRINGS.EXPORT.EXPORT_FAILED,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      setIsLoading(true);
      // For development, show mock success
      toast({
        title: MERCHANT_GROUP_STRINGS.TOAST.EXPORT_SUCCESS_TITLE,
        description: MERCHANT_GROUP_STRINGS.EXPORT.CSV_SUCCESS,
      });

      // Uncomment this when API is ready
      // const blob = await merchantGroupService.exportToCsv(searchParams);
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.style.display = 'none';
      // a.href = url;
      // a.download = `merchant-groups-${new Date().toISOString().split('T')[0]}.csv`;
      // document.body.appendChild(a);
      // a.click();
      // window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export CSV error:', error);
      toast({
        title: MERCHANT_GROUP_STRINGS.TOAST.VALIDATION_ERROR_TITLE,
        description: MERCHANT_GROUP_STRINGS.EXPORT.EXPORT_FAILED,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (merchantGroup: any) => {
    onViewClick?.(merchantGroup.id);
  };

  const handleEdit = (merchantGroup: any) => {
    onEditClick?.(merchantGroup.id);
  };

  const handleDuplicate = async (merchantGroup: any) => {
    try {
      // For development, show mock success
      toast({
        title: MERCHANT_GROUP_STRINGS.TOAST.MERCHANT_GROUP_CREATED_TITLE,
        description: `Duplicated "${merchantGroup.merchantGroupName}" successfully`,
      });

      // Uncomment this when API is ready
      // await merchantGroupService.duplicate(merchantGroup.id);
      // handleSearch(searchParams); // Refresh the search results
      // onCreateSuccess?.();
    } catch (error) {
      console.error('Duplicate error:', error);
      toast({
        title: MERCHANT_GROUP_STRINGS.TOAST.VALIDATION_ERROR_TITLE,
        description: 'Failed to duplicate merchant group. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleSuspend = async (merchantGroup: any) => {
    try {
      // For development, show mock success
      const newStatus = merchantGroup.status === 'active' ? 'suspended' : 'active';
      const action = newStatus === 'suspended' ? 'suspended' : 'activated';
      
      toast({
        title: MERCHANT_GROUP_STRINGS.TOAST.MERCHANT_GROUP_UPDATED_TITLE,
        description: `Merchant group "${merchantGroup.merchantGroupName}" has been ${action}`,
      });

      // Uncomment this when API is ready
      // if (merchantGroup.status === 'active') {
      //   await merchantGroupService.suspend(merchantGroup.id);
      // } else {
      //   await merchantGroupService.activate(merchantGroup.id);
      // }
      // handleSearch(searchParams); // Refresh the search results
    } catch (error) {
      console.error('Status change error:', error);
      toast({
        title: MERCHANT_GROUP_STRINGS.TOAST.VALIDATION_ERROR_TITLE,
        description: 'Failed to change merchant group status. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (merchantGroup: any) => {
    if (!confirm(MERCHANT_GROUP_STRINGS.CONFIRMATIONS.DELETE_MERCHANT_GROUP)) {
      return;
    }

    try {
      // For development, show mock success
      toast({
        title: MERCHANT_GROUP_STRINGS.TOAST.MERCHANT_GROUP_DELETED_TITLE,
        description: `Merchant group "${merchantGroup.merchantGroupName}" has been deleted`,
      });

      // Uncomment this when API is ready
      // await merchantGroupService.delete(merchantGroup.id);
      // handleSearch(searchParams); // Refresh the search results
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: MERCHANT_GROUP_STRINGS.TOAST.VALIDATION_ERROR_TITLE,
        description: 'Failed to delete merchant group. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: 'default' as const, className: 'bg-green-100 text-green-800' },
      inactive: { variant: 'secondary' as const, className: 'bg-gray-100 text-gray-800' },
      pending: { variant: 'outline' as const, className: 'bg-yellow-100 text-yellow-800' },
      suspended: { variant: 'destructive' as const, className: 'bg-red-100 text-red-800' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive;
    
    return (
      <Badge variant={config.variant} className={config.className}>
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-mb-blue" />
            <span>{MERCHANT_GROUP_STRINGS.SECTIONS.SEARCH_FILTERS}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormGenerator
            fields={merchantGroupConfig.searchFields}
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-mb-blue" />
              <span>{MERCHANT_GROUP_STRINGS.SECTIONS.SEARCH_RESULTS}</span>
              <Badge variant="outline" className="ml-2">
                {totalRecords} {totalRecords === 1 ? 'result' : 'results'}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportPDF}
                disabled={isLoading}
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>PDF</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportCSV}
                disabled={isLoading}
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>CSV</span>
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {searchResults.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">{MERCHANT_GROUP_STRINGS.EMPTY_STATES.NO_RESULTS}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {MERCHANT_GROUP_STRINGS.EMPTY_STATES.NO_RESULTS_DESCRIPTION}
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {merchantGroupConfig.tableConfig.columns.map((column) => (
                        <TableHead key={column.key} className="whitespace-nowrap">
                          {column.label}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {searchResults.map((merchantGroup) => (
                      <TableRow key={merchantGroup.id}>
                        <TableCell className="font-medium">
                          {merchantGroup.merchantGroupName}
                        </TableCell>
                        <TableCell>{merchantGroup.contactName}</TableCell>
                        <TableCell>{merchantGroup.contactPhone}</TableCell>
                        <TableCell>{merchantGroup.contactEmailId}</TableCell>
                        <TableCell>{merchantGroup.corporateLegalName}</TableCell>
                        <TableCell>{merchantGroup.city}</TableCell>
                        <TableCell>{merchantGroup.state}</TableCell>
                        <TableCell>
                          {getStatusBadge(merchantGroup.status)}
                        </TableCell>
                        <TableCell>{formatDate(merchantGroup.createdDate)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleView(merchantGroup)}
                                className="flex items-center space-x-2"
                              >
                                <Eye className="h-4 w-4" />
                                <span>{MERCHANT_GROUP_STRINGS.BUTTONS.VIEW}</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEdit(merchantGroup)}
                                className="flex items-center space-x-2"
                              >
                                <Edit className="h-4 w-4" />
                                <span>{MERCHANT_GROUP_STRINGS.BUTTONS.EDIT}</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDuplicate(merchantGroup)}
                                className="flex items-center space-x-2"
                              >
                                <Copy className="h-4 w-4" />
                                <span>{MERCHANT_GROUP_STRINGS.BUTTONS.DUPLICATE}</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleSuspend(merchantGroup)}
                                className="flex items-center space-x-2"
                              >
                                <Ban className="h-4 w-4" />
                                <span>
                                  {merchantGroup.status === 'active' 
                                    ? MERCHANT_GROUP_STRINGS.BUTTONS.SUSPEND 
                                    : MERCHANT_GROUP_STRINGS.BUTTONS.ACTIVATE
                                  }
                                </span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(merchantGroup)}
                                className="flex items-center space-x-2 text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span>{MERCHANT_GROUP_STRINGS.BUTTONS.DELETE}</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between space-x-2 py-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {((currentPage - 1) * 25) + 1} to {Math.min(currentPage * 25, totalRecords)} of {totalRecords} results
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium">
                        Page {currentPage} of {totalPages}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MerchantGroupSearchTab;
