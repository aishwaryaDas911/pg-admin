import React, { useState, useEffect } from 'react';
import FormGenerator from '@/components/common/FormGenerator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Eye, Edit, Pause, Trash2, FileText, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ProgramManagerConfig } from '../config/ProgramManagerConfig';
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
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Get configuration
  const config = ProgramManagerConfig({ 
    onClickEvent: handleSearch,
    tableActionState 
  });

  // Handle search functionality
  function handleSearch() {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSearchResults(config.mockData);
      setLoading(false);
      onSearchClick();
      
      toast({
        title: "Search Completed",
        description: `Found ${config.mockData.length} Program Managers`,
      });
    }, 1000);
  }

  // Handle form submission
  const handleFormSubmit = (data: any) => {
    setLoading(true);
    
    setTimeout(() => {
      // Filter results based on search criteria
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
        filteredResults = filteredResults.filter(item => item.status === data.status);
      }
      
      if (data.bankName) {
        filteredResults = filteredResults.filter(item =>
          item.associatedBankNames.some((bank: string) => 
            bank.toLowerCase().includes(data.bankName.toLowerCase())
          )
        );
      }

      setSearchResults(filteredResults);
      setLoading(false);
      
      toast({
        title: "Search Completed",
        description: `Found ${filteredResults.length} Program Managers`,
      });
    }, 1000);
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
      case 'suspend':
        toast({
          title: "Suspend Action",
          description: `Suspending ${row.programManagerName}`,
          variant: "destructive"
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

  const renderActionButton = (type: string, row: any) => {
    const configs = {
      view: { icon: Eye, variant: 'outline' as const, tooltip: 'View Details' },
      edit: { icon: Edit, variant: 'default' as const, tooltip: 'Edit' },
      suspend: { icon: Pause, variant: 'secondary' as const, tooltip: 'Suspend' },
      delete: { icon: Trash2, variant: 'destructive' as const, tooltip: 'Delete' }
    };

    const config = configs[type as keyof typeof configs];
    if (!config) return null;

    const Icon = config.icon;

    return (
      <TooltipProvider key={type}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={config.variant}
              size="icon"
              className="h-8 w-8"
              onClick={() => handleAction(type, row)}
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
      Array.isArray(row.associatedBankNames) ? row.associatedBankNames.join(', ') : row.associatedBankNames,
      row.status
    ]);

    autoTable(doc, {
      head: [['Program Manager', 'Company', 'Contact Person', 'Phone', 'Email', 'Banks', 'Status']],
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
      'Business Entity Name': row.businessEntityName,
      'Contact Person': row.contactPerson,
      'Phone Number': row.phoneNumber,
      'Email ID': row.emailId,
      'Currency': row.currency,
      'Country': row.country,
      'State': row.state,
      'Status': row.status,
      'Associated Bank Names': Array.isArray(row.associatedBankNames) ? row.associatedBankNames.join(', ') : row.associatedBankNames,
      'Created At': row.createdAt?.toLocaleDateString(),
      'Updated At': row.updatedAt?.toLocaleDateString()
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

  // Enhanced search fields with export functionality
  const enhancedSearchFields = config.searchInputData.concat([
    {
      label: 'Export PDF',
      hide: false,
      button: {
        name: 'exportPDF',
        label: 'Export PDF',
        variant: 'secondary' as const,
        size: 'default' as const,
        onClick: exportToPDF
      }
    },
    {
      label: 'Export CSV',
      hide: false,
      button: {
        name: 'exportCSV',
        label: 'Export CSV',
        variant: 'secondary' as const,
        size: 'default' as const,
        onClick: exportToCSV
      }
    }
  ]).concat(config.searchButtonData);

  return (
    <div className="space-y-6">
      <FormGenerator
        fields={enhancedSearchFields}
        tableDataConfig={{
          columns: config.tableHeaderData[0].headerJson.concat([
            { key: 'actions', label: 'Actions', sortable: false }
          ]),
          rows: searchResults.map(item => ({
            ...item,
            associatedBankNames: Array.isArray(item.associatedBankNames) 
              ? item.associatedBankNames.join(', ') 
              : item.associatedBankNames,
            status: (
              <Badge 
                variant={item.status === 'ACTIVE' ? 'default' : 'secondary'}
                className={item.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : ''}
              >
                {item.status}
              </Badge>
            ),
            actions: (
              <div className="flex items-center space-x-2">
                {renderActionButton('view', item)}
                {renderActionButton('edit', item)}
                {renderActionButton('suspend', item)}
                {renderActionButton('delete', item)}
              </div>
            )
          }))
        }}
        onSubmit={handleFormSubmit}
        className="bg-transparent"
      />
    </div>
  );
};

export default ProgramManagerSearchComponent;
