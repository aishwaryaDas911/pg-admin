import React, { useState, useCallback } from 'react';
import { FormGenerator } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { BANK_STRINGS } from '@/constants/bankConstants';
import { bankConfig, bankMockData } from './formConfig';
import { BankService, BankSearchParams } from '@/services/bankService';
import { Search } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';

interface BankSearchTabProps {
  onEdit?: (bank: any) => void;
  onView?: (bank: any) => void;
  onCreateNew?: () => void;
}

interface SearchFilters {
  bankName?: string;
  bankCode?: string;
  emailAddress?: string;
  status?: string;
  recordsPerPage?: string;
}

export const BankSearchTab: React.FC<BankSearchTabProps> = ({
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
      console.log('🔍 Starting Bank search with data:', formData);
      console.log('🌐 API URL:', BankService.getApiUrl());

      // Prepare search parameters for the API
      const searchParams: BankSearchParams = {
        bankName: formData.bankName || undefined,
        bankCode: formData.bankCode || undefined,
        emailAddress: formData.emailAddress || undefined,
        status: formData.status || undefined,
        recordsPerPage: formData.recordsPerPage || '10',
        pageNumber: 1,
        sortBy: 'bankName',
        sortOrder: 'asc'
      };

      // Call the API service
      const response = await BankService.searchBanks(searchParams);
      console.log('📦 Full API Response:', response);

      if (response.success && response.data) {
        console.log('✅ API Response Success - Data received:', response.data);
        
        // Handle different response formats
        let resultsArray = [];
        if (Array.isArray(response.data)) {
          resultsArray = response.data;
        } else if (response.data.banksList && Array.isArray(response.data.banksList)) {
          resultsArray = response.data.banksList;
        } else if (response.data.results && Array.isArray(response.data.results)) {
          resultsArray = response.data.results;
        } else {
          resultsArray = [response.data];
        }

        setSearchResults(resultsArray);

        toast({
          title: BANK_STRINGS.TOAST.SEARCH_COMPLETED_TITLE,
          description: `Found ${resultsArray.length} Bank(s)${response.totalRecords ? ` out of ${response.totalRecords} total records` : ''}`,
        });
      } else {
        // API call failed, fall back to mock data for development
        console.warn('⚠️ API search failed, falling back to mock data');

        let filteredResults = bankMockData;

        if (formData.bankName) {
          filteredResults = filteredResults.filter(item =>
            item.bankName.toLowerCase().includes(formData.bankName!.toLowerCase())
          );
        }

        if (formData.bankCode) {
          filteredResults = filteredResults.filter(item =>
            item.bankCode.toLowerCase().includes(formData.bankCode!.toLowerCase())
          );
        }

        if (formData.emailAddress) {
          filteredResults = filteredResults.filter(item =>
            item.emailAddress.toLowerCase().includes(formData.emailAddress!.toLowerCase())
          );
        }

        if (formData.status) {
          filteredResults = filteredResults.filter(item =>
            item.status.toLowerCase() === formData.status!.toLowerCase()
          );
        }

        setSearchResults(filteredResults);

        toast({
          title: BANK_STRINGS.TOAST.SEARCH_COMPLETED_TITLE,
          description: `Found ${filteredResults.length} Bank(s) - ${response.error || 'API unavailable, using sample data'}`,
          variant: "secondary"
        });
      }
    } catch (error) {
      console.error('❌ Search error:', error);

      // On any error, fall back to mock data
      let filteredResults = bankMockData;

      if (formData.bankName) {
        filteredResults = filteredResults.filter(item =>
          item.bankName.toLowerCase().includes(formData.bankName!.toLowerCase())
        );
      }

      setSearchResults(filteredResults);

      toast({
        title: BANK_STRINGS.TOAST.SEARCH_ERROR_TITLE,
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
      title: BANK_STRINGS.TOAST.FILTERS_RESET_TITLE,
      description: BANK_STRINGS.TOAST.FILTERS_RESET_DESCRIPTION,
    });
  }, [toast]);

  // Handle PDF export
  const handleExportPDF = useCallback(async () => {
    try {
      const doc = new jsPDF();
      
      doc.setFontSize(20);
      doc.text('Bank - Export Report', 20, 20);
      
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 35);
      
      const tableData = searchResults.map(row => [
        row.bankName,
        row.bankCode,
        row.settlementRoutingNumber,
        row.city,
        row.state,
        row.country,
        row.primaryContactName,
        row.contactPhoneNumber,
        row.emailAddress,
        row.localCurrency,
        row.status
      ]);

      autoTable(doc, {
        head: [['Bank Name', 'Bank Code', 'Routing Number', 'City', 'State', 'Country', 'Contact Name', 'Phone', 'Email', 'Currency', 'Status']],
        body: tableData,
        startY: 50,
        styles: { fontSize: 8, cellPadding: 3 },
        headStyles: { fillColor: [41, 121, 255], textColor: 255, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [245, 245, 245] }
      });

      doc.save(`Bank_export_${new Date().toISOString().split('T')[0]}.pdf`);

      toast({
        title: BANK_STRINGS.TOAST.EXPORT_SUCCESS_TITLE,
        description: BANK_STRINGS.EXPORT.PDF_SUCCESS,
      });
    } catch (error) {
      toast({
        title: 'Export Error',
        description: BANK_STRINGS.EXPORT.EXPORT_FAILED,
        variant: 'destructive',
      });
    }
  }, [searchResults, toast]);

  // Handle CSV export
  const handleExportCSV = useCallback(async () => {
    try {
      const csvData = searchResults.map(row => ({
        'Bank Name': row.bankName,
        'Bank Code': row.bankCode,
        'Settlement Routing Number': row.settlementRoutingNumber,
        'Settlement Account Number': row.settlementAccountNumber,
        'Address 1': row.address1,
        'Address 2': row.address2,
        'City': row.city,
        'State': row.state,
        'Country': row.country,
        'Zip Code': row.zipCode,
        'Primary Contact Name': row.primaryContactName,
        'Contact Mobile Number': row.contactMobileNumber,
        'Contact Phone Number': row.contactPhoneNumber,
        'Extension': row.extension,
        'Fax': row.fax,
        'Email Address': row.emailAddress,
        'Local Currency': row.localCurrency,
        'Status': row.status
      }));

      const csv = Papa.unparse(csvData);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `Bank_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      toast({
        title: BANK_STRINGS.TOAST.EXPORT_SUCCESS_TITLE,
        description: BANK_STRINGS.EXPORT.CSV_SUCCESS,
      });
    } catch (error) {
      toast({
        title: 'Export Error',
        description: BANK_STRINGS.EXPORT.EXPORT_FAILED,
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
    if (window.confirm(`Are you sure you want to delete ${row.bankName}?`)) {
      // Remove from search results
      setSearchResults(prev => prev.filter(item => item.id !== row.id));

      toast({
        title: BANK_STRINGS.TOAST.BANK_DELETED_TITLE,
        description: `${row.bankName} has been deleted successfully`,
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
              <h3 className="text-xl font-bold text-foreground">{BANK_STRINGS.SECTIONS.SEARCH_FILTERS}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {BANK_STRINGS.DESCRIPTIONS.SEARCH}
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <FormGenerator
            fields={bankConfig.searchFields.map(field => {
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
              columns: bankConfig.tableConfig.columns,
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

export default BankSearchTab;
