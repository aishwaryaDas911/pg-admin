import React, { useState, useCallback } from 'react';
import { FormGenerator } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ISO_STRINGS } from '@/constants/isoConstants';
import { isoConfig, isoMockData } from './formConfig';
import { isoService } from '@/services/isoService';
import { Search } from 'lucide-react';

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
            fields={isoConfig.searchFields.map(field => {
              if (field.button?.name === 'exportPDF') {
                return {
                  ...field,
                  button: {
                    ...field.button,
                    onClick: handleExportPDF
                  }
                };
              }
              if (field.button?.name === 'exportCSV') {
                return {
                  ...field,
                  button: {
                    ...field.button,
                    onClick: handleExportCSV
                  }
                };
              }
              return field;
            })}
            tableDataConfig={{
              columns: isoConfig.tableConfig.columns,
              rows: searchResults
            }}
            onSubmit={handleSearch}
            className="w-full"
          />
        </CardContent>
      </Card>

    </div>
  );
};

export default ISOSearchTab;
