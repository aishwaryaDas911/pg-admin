import React, { useState, useCallback } from 'react';
import { FormGenerator } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { PROGRAM_MANAGER_STRINGS } from '@/constants/programManagerConstants';
import { programManagerConfig, programManagerMockData } from './formConfig';
import { ProgramManagerService, ProgramManagerSearchParams } from '@/services/programManagerService';
import { Search } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';

interface ProgramManagerSearchTabProps {
  onEdit?: (programManager: any) => void;
  onView?: (programManager: any) => void;
  onCreateNew?: () => void;
}

interface SearchFilters {
  programManagerName?: string;
  companyName?: string;
  bankName?: string;
  status?: string;
  recordsPerPage?: string;
}

export const ProgramManagerSearchTab: React.FC<ProgramManagerSearchTabProps> = ({
  onEdit,
  onView,
  onCreateNew,
}) => {
  const { toast } = useToast();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Handle form submission for search
  const handleSearch = useCallback(async (formData: SearchFilters) => {
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      console.log('🔍 Starting Program Manager search with data:', formData);
      console.log('🌐 API URL:', ProgramManagerService.getApiUrl());

      // Prepare search parameters for the API
      const searchParams: ProgramManagerSearchParams = {
        programManagerName: formData.programManagerName || undefined,
        companyName: formData.companyName || undefined,
        bankName: formData.bankName || undefined,
        status: formData.status || undefined,
        recordsPerPage: formData.recordsPerPage || '10',
        pageNumber: 1,
        sortBy: 'programManagerName',
        sortOrder: 'asc'
      };

      // Call the API service
      const response = await ProgramManagerService.searchProgramManagers(searchParams);
      console.log('📦 Full API Response:', response);

      if (response.success && response.data) {
        console.log('✅ API Response Success - Data received:', response.data);
        
        // Handle different response formats
        let resultsArray = [];
        if (Array.isArray(response.data)) {
          resultsArray = response.data;
        } else if (response.data.programManagersList && Array.isArray(response.data.programManagersList)) {
          resultsArray = response.data.programManagersList;
        } else if (response.data.results && Array.isArray(response.data.results)) {
          resultsArray = response.data.results;
        } else {
          resultsArray = [response.data];
        }

        setSearchResults(resultsArray);

        toast({
          title: PROGRAM_MANAGER_STRINGS.TOAST.SEARCH_COMPLETED_TITLE,
          description: `Found ${resultsArray.length} Program Manager(s)${response.totalRecords ? ` out of ${response.totalRecords} total records` : ''}`,
        });
      } else {
        // API call failed, fall back to mock data for development
        console.warn('⚠️ API search failed, falling back to mock data');

        let filteredResults = programManagerMockData;

        if (formData.programManagerName) {
          filteredResults = filteredResults.filter(item =>
            item.programManagerName.toLowerCase().includes(formData.programManagerName!.toLowerCase())
          );
        }

        if (formData.companyName) {
          filteredResults = filteredResults.filter(item =>
            item.companyName.toLowerCase().includes(formData.companyName!.toLowerCase())
          );
        }

        if (formData.status) {
          filteredResults = filteredResults.filter(item =>
            item.status.toLowerCase() === formData.status!.toLowerCase()
          );
        }

        if (formData.bankName) {
          filteredResults = filteredResults.filter(item =>
            item.associatedBankNames.toLowerCase().includes(formData.bankName!.toLowerCase())
          );
        }

        setSearchResults(filteredResults);

        toast({
          title: PROGRAM_MANAGER_STRINGS.TOAST.SEARCH_COMPLETED_TITLE,
          description: `Found ${filteredResults.length} Program Manager(s) - ${response.error || 'API unavailable, using sample data'}`,
          variant: "secondary"
        });
      }
    } catch (error) {
      console.error('❌ Search error:', error);

      // On any error, fall back to mock data
      let filteredResults = programManagerMockData;

      if (formData.programManagerName) {
        filteredResults = filteredResults.filter(item =>
          item.programManagerName.toLowerCase().includes(formData.programManagerName!.toLowerCase())
        );
      }

      setSearchResults(filteredResults);

      toast({
        title: PROGRAM_MANAGER_STRINGS.TOAST.SEARCH_ERROR_TITLE,
        description: `API error occurred, showing ${filteredResults.length} sample records`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Handle form reset
  const handleReset = useCallback(() => {
    setSearchResults([]);
    setHasSearched(false);

    toast({
      title: PROGRAM_MANAGER_STRINGS.TOAST.FILTERS_RESET_TITLE,
      description: PROGRAM_MANAGER_STRINGS.TOAST.FILTERS_RESET_DESCRIPTION,
    });
  }, [toast]);

  // Handle PDF export
  const handleExportPDF = useCallback(async () => {
    try {
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
        title: PROGRAM_MANAGER_STRINGS.TOAST.EXPORT_SUCCESS_TITLE,
        description: PROGRAM_MANAGER_STRINGS.EXPORT.PDF_SUCCESS,
      });
    } catch (error) {
      toast({
        title: 'Export Error',
        description: PROGRAM_MANAGER_STRINGS.EXPORT.EXPORT_FAILED,
        variant: 'destructive',
      });
    }
  }, [searchResults, toast]);

  // Handle CSV export
  const handleExportCSV = useCallback(async () => {
    try {
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
        title: PROGRAM_MANAGER_STRINGS.TOAST.EXPORT_SUCCESS_TITLE,
        description: PROGRAM_MANAGER_STRINGS.EXPORT.CSV_SUCCESS,
      });
    } catch (error) {
      toast({
        title: 'Export Error',
        description: PROGRAM_MANAGER_STRINGS.EXPORT.EXPORT_FAILED,
        variant: 'destructive',
      });
    }
  }, [searchResults, toast]);

  // Handle action buttons
  const handleView = useCallback((row: any) => {
    onView?.(row);
  }, [onView]);

  const handleEdit = useCallback((row: any) => {
    onEdit?.(row);
  }, [onEdit]);

  const handleDelete = useCallback((row: any) => {
    // Show confirmation and handle delete
    if (window.confirm(`Are you sure you want to delete ${row.programManagerName}?`)) {
      // Remove from search results
      setSearchResults(prev => prev.filter(item => item.id !== row.id));

      toast({
        title: PROGRAM_MANAGER_STRINGS.TOAST.PROGRAM_MANAGER_DELETED_TITLE,
        description: `${row.programManagerName} has been deleted successfully`,
      });
    }
  }, [toast]);

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
              <h3 className="text-xl font-bold text-foreground">{PROGRAM_MANAGER_STRINGS.SECTIONS.SEARCH_FILTERS}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {PROGRAM_MANAGER_STRINGS.DESCRIPTIONS.SEARCH}
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <FormGenerator
            fields={programManagerConfig.searchFields.map(field => {
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
            tableDataConfig={hasSearched ? {
              columns: programManagerConfig.tableConfig.columns,
              rows: searchResults
            } : { columns: [], rows: [] }}
            onSubmit={handleSearch}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            className="w-full"
            loading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgramManagerSearchTab;
