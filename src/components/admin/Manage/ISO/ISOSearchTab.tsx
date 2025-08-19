import React, { useState, useCallback } from 'react';
import { FormGenerator } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ISO_STRINGS } from '@/constants/isoConstants';
import { isoConfig, isoMockData } from './formConfig';
import { isoService } from '@/services/isoService';
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
  RefreshCw,
  Plus,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface ISOSearchTabProps {
  onEdit?: (iso: any) => void;
  onView?: (iso: any) => void;
  onCreateNew?: () => void;
}

interface SearchFilters {
  isoName?: string;
  businessEntityName?: string;
  phoneNumber?: string;
  emailId?: string;
  status?: string;
  recordsPerPage?: string;
}

export const ISOSearchTab: React.FC<ISOSearchTabProps> = ({
  onEdit,
  onView,
  onCreateNew,
}) => {
  const { toast } = useToast();
  const [searchResults, setSearchResults] = useState(isoMockData);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(isoMockData.length);

  // Handle form submission for search
  const handleSearch = useCallback(async (formData: SearchFilters) => {
    setIsLoading(true);
    try {
      // Filter mock data based on search criteria
      let filteredData = isoMockData;

      if (formData.isoName) {
        filteredData = filteredData.filter(iso =>
          iso.isoName.toLowerCase().includes(formData.isoName!.toLowerCase())
        );
      }

      if (formData.businessEntityName) {
        filteredData = filteredData.filter(iso =>
          iso.businessEntityName.toLowerCase().includes(formData.businessEntityName!.toLowerCase())
        );
      }

      if (formData.phoneNumber) {
        filteredData = filteredData.filter(iso =>
          iso.phoneNumber.includes(formData.phoneNumber!)
        );
      }

      if (formData.emailId) {
        filteredData = filteredData.filter(iso =>
          iso.emailId.toLowerCase().includes(formData.emailId!.toLowerCase())
        );
      }

      if (formData.status) {
        filteredData = filteredData.filter(iso =>
          iso.status === formData.status
        );
      }

      setSearchResults(filteredData);
      setTotalRecords(filteredData.length);
      setCurrentPage(1);

      toast({
        title: ISO_STRINGS.TOAST.SEARCH_COMPLETED_TITLE,
        description: `Found ${filteredData.length} ${ISO_STRINGS.COMMON.RECORDS.toLowerCase()}`,
      });
    } catch (error) {
      toast({
        title: 'Search Error',
        description: 'Failed to search ISOs. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Handle form reset
  const handleReset = useCallback(() => {
    setSearchResults(isoMockData);
    setTotalRecords(isoMockData.length);
    setCurrentPage(1);
    setSelectedRows([]);
    
    toast({
      title: ISO_STRINGS.TOAST.FORM_RESET_TITLE,
      description: 'Search filters have been cleared',
    });
  }, [toast]);

  // Handle PDF export
  const handleExportPDF = useCallback(async () => {
    try {
      // In a real app, this would call the service
      // await isoService.exportToPdf({ ids: selectedRows.length > 0 ? selectedRows : undefined });
      
      toast({
        title: ISO_STRINGS.TOAST.EXPORT_SUCCESS_TITLE,
        description: ISO_STRINGS.EXPORT.PDF_SUCCESS,
      });
    } catch (error) {
      toast({
        title: 'Export Error',
        description: ISO_STRINGS.EXPORT.EXPORT_FAILED,
        variant: 'destructive',
      });
    }
  }, [selectedRows, toast]);

  // Handle CSV export
  const handleExportCSV = useCallback(async () => {
    try {
      // In a real app, this would call the service
      // await isoService.exportToCsv({ ids: selectedRows.length > 0 ? selectedRows : undefined });
      
      toast({
        title: ISO_STRINGS.TOAST.EXPORT_SUCCESS_TITLE,
        description: ISO_STRINGS.EXPORT.CSV_SUCCESS,
      });
    } catch (error) {
      toast({
        title: 'Export Error',
        description: ISO_STRINGS.EXPORT.EXPORT_FAILED,
        variant: 'destructive',
      });
    }
  }, [selectedRows, toast]);

  // Handle row actions
  const handleView = (iso: any) => {
    onView?.(iso);
  };

  const handleEdit = (iso: any) => {
    onEdit?.(iso);
  };

  const handleDuplicate = (iso: any) => {
    toast({
      title: 'Duplicate ISO',
      description: `Duplicating ${iso.isoName}...`,
    });
  };

  const handleSuspend = (iso: any) => {
    toast({
      title: 'ISO Suspended',
      description: `${iso.isoName} has been suspended`,
    });
  };

  const handleDelete = async (iso: any) => {
    try {
      // In a real app, this would call the service
      // await isoService.delete(iso.id);
      
      // Remove from local state
      setSearchResults(prev => prev.filter(item => item.id !== iso.id));
      setTotalRecords(prev => prev - 1);
      
      toast({
        title: ISO_STRINGS.TOAST.ISO_DELETED_TITLE,
        description: ISO_STRINGS.TOAST.ISO_DELETED_DESCRIPTION,
      });
    } catch (error) {
      toast({
        title: 'Delete Error',
        description: 'Failed to delete ISO. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Handle row selection
  const handleRowSelect = (isoId: string, selected: boolean) => {
    setSelectedRows(prev => {
      if (selected) {
        return [...prev, isoId];
      } else {
        return prev.filter(id => id !== isoId);
      }
    });
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedRows(searchResults.map(iso => iso.id));
    } else {
      setSelectedRows([]);
    }
  };

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: 'bg-green-100 text-green-800 border-green-200',
      inactive: 'bg-gray-100 text-gray-800 border-gray-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      suspended: 'bg-red-100 text-red-800 border-red-200',
    };

    return (
      <Badge
        variant="outline"
        className={statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  // Pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalRecords);
  const currentResults = searchResults.slice(startIndex, endIndex);
  const totalPages = Math.ceil(totalRecords / pageSize);

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card className="shadow-glass">
        <CardHeader className="bg-gradient-to-r from-mb-blue/5 to-mb-silver/5 border-b">
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-mb-blue/10 rounded-lg">
              <Search className="h-6 w-6 text-mb-blue" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">{ISO_STRINGS.SECTIONS.SEARCH_FILTERS}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {ISO_STRINGS.DESCRIPTIONS.SEARCH}
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <FormGenerator
            fields={isoConfig.searchFields}
            onSubmit={handleSearch}
            onReset={handleReset}
            onExportPDF={handleExportPDF}
            onExportCSV={handleExportCSV}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      {/* Results Section */}
      <Card className="shadow-glass">
        <CardHeader className="bg-gradient-to-r from-mb-silver/5 to-mb-blue/5 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 bg-mb-silver/10 rounded-lg">
                <FileText className="h-6 w-6 text-mb-silver" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">{ISO_STRINGS.SECTIONS.SEARCH_RESULTS}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Showing {startIndex + 1}-{endIndex} of {totalRecords} results
                </p>
              </div>
            </CardTitle>
            <div className="flex space-x-2">
              {selectedRows.length > 0 && (
                <>
                  <Button variant="outline" size="sm" onClick={handleExportPDF}>
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF ({selectedRows.length})
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleExportCSV}>
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV ({selectedRows.length})
                  </Button>
                </>
              )}
              <Button onClick={onCreateNew} className="bg-mb-blue hover:bg-mb-blue/90">
                <Plus className="h-4 w-4 mr-2" />
                {ISO_STRINGS.BUTTONS.CREATE}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin text-mb-blue" />
              <span className="ml-3 text-lg">{ISO_STRINGS.LOADING.SEARCHING}</span>
            </div>
          ) : currentResults.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{ISO_STRINGS.EMPTY_STATES.NO_RESULTS}</h3>
              <p className="text-muted-foreground mb-4">
                {ISO_STRINGS.EMPTY_STATES.NO_RESULTS_DESCRIPTION}
              </p>
              <Button onClick={onCreateNew} className="bg-mb-blue hover:bg-mb-blue/90">
                <Plus className="h-4 w-4 mr-2" />
                Create New ISO
              </Button>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        checked={selectedRows.length === currentResults.length && currentResults.length > 0}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                    </TableHead>
                    <TableHead>{ISO_STRINGS.TABLE_HEADERS.ISO_NAME}</TableHead>
                    <TableHead>{ISO_STRINGS.TABLE_HEADERS.BUSINESS_ENTITY_NAME}</TableHead>
                    <TableHead>{ISO_STRINGS.TABLE_HEADERS.CONTACT_PERSON}</TableHead>
                    <TableHead>{ISO_STRINGS.TABLE_HEADERS.EMAIL_ID}</TableHead>
                    <TableHead>{ISO_STRINGS.TABLE_HEADERS.PHONE_NUMBER}</TableHead>
                    <TableHead>{ISO_STRINGS.TABLE_HEADERS.PROCESSOR}</TableHead>
                    <TableHead>{ISO_STRINGS.TABLE_HEADERS.STATUS}</TableHead>
                    <TableHead>{ISO_STRINGS.TABLE_HEADERS.CREATED_DATE}</TableHead>
                    <TableHead className="text-right">{ISO_STRINGS.TABLE_HEADERS.ACTIONS}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentResults.map((iso) => (
                    <TableRow key={iso.id} className="hover:bg-muted/50">
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(iso.id)}
                          onChange={(e) => handleRowSelect(iso.id, e.target.checked)}
                          className="rounded border-gray-300"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{iso.isoName}</TableCell>
                      <TableCell>{iso.businessEntityName}</TableCell>
                      <TableCell>{iso.contactPerson}</TableCell>
                      <TableCell>{iso.emailId}</TableCell>
                      <TableCell>{iso.phoneNumber}</TableCell>
                      <TableCell>{iso.processor}</TableCell>
                      <TableCell>{getStatusBadge(iso.status)}</TableCell>
                      <TableCell>{new Date(iso.createdDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => handleView(iso)}>
                              <Eye className="h-4 w-4 mr-2" />
                              {ISO_STRINGS.ACTIONS.VIEW_DETAILS}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(iso)}>
                              <Edit className="h-4 w-4 mr-2" />
                              {ISO_STRINGS.ACTIONS.EDIT_ISO}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicate(iso)}>
                              <Copy className="h-4 w-4 mr-2" />
                              {ISO_STRINGS.ACTIONS.DUPLICATE_ISO}
                            </DropdownMenuItem>
                            {iso.status === 'active' && (
                              <DropdownMenuItem onClick={() => handleSuspend(iso)}>
                                <Ban className="h-4 w-4 mr-2" />
                                {ISO_STRINGS.ACTIONS.SUSPEND_ISO}
                              </DropdownMenuItem>
                            )}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                  className="text-red-600 focus:text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  {ISO_STRINGS.ACTIONS.DELETE_ISO}
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>{ISO_STRINGS.CONFIRMATIONS.DELETE_ISO}</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    {ISO_STRINGS.CONFIRMATIONS.DELETE_ISO_DESCRIPTION}
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>{ISO_STRINGS.BUTTONS.CANCEL}</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(iso)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    {ISO_STRINGS.BUTTONS.DELETE}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    Showing {startIndex + 1} to {endIndex} of {totalRecords} results
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Button>
                        );
                      })}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
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

export default ISOSearchTab;
