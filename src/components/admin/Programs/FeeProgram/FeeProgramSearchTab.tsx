import React, { useState, useCallback } from 'react';
import { FormGenerator } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { FEE_PROGRAM_STRINGS } from '@/constants/feeProgramConstants';
import { feeProgramConfig, feeProgramMockData } from './formConfig';
import { FeeProgramService, FeeProgramSearchParams } from '@/services/feeProgramService';
import { Search } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';

interface FeeProgramSearchTabProps {
  onEdit?: (row: any) => void;
  onView?: (row: any) => void;
  onCreateNew?: () => void;
}

export const FeeProgramSearchTab: React.FC<FeeProgramSearchTabProps> = ({ onEdit, onView }) => {
  const { toast } = useToast();
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (formData: any) => {
    setIsLoading(true);
    setHasSearched(true);

    try {
      const params: FeeProgramSearchParams = {
        feeProgramName: formData.feeProgramName || undefined,
        status: formData.status || undefined,
        recordsPerPage: formData.recordsPerPage || '10',
        pageNumber: 1,
        sortBy: 'feeProgramName',
        sortOrder: 'asc'
      };

      const response = await FeeProgramService.search(params);
      if (response.success && response.data) {
        let arrayData: any[] = [];
        if (Array.isArray(response.data)) arrayData = response.data; else if ((response as any).feeProgramList) arrayData = (response as any).feeProgramList; else arrayData = [response.data];
        setResults(arrayData);
        toast({ title: FEE_PROGRAM_STRINGS.TOAST.SEARCH_COMPLETED_TITLE, description: `Found ${arrayData.length} record(s)` });
      } else {
        let filtered = feeProgramMockData;
        if (formData.feeProgramName) filtered = filtered.filter(r => r.feeProgramName.toLowerCase().includes(formData.feeProgramName.toLowerCase()));
        if (formData.status) filtered = filtered.filter(r => r.status === formData.status);
        setResults(filtered);
        toast({ title: FEE_PROGRAM_STRINGS.TOAST.SEARCH_COMPLETED_TITLE, description: `Found ${filtered.length} record(s)` });
      }
    } catch (e) {
      let filtered = feeProgramMockData;
      setResults(filtered);
      toast({ title: 'Search Error', description: 'Showing sample data', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const handleExportPDF = useCallback(() => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Fee Program - Export Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 35);
    const tableData = results.map(r => [r.feeProgramName, r.programManagerName, r.isoName, r.mcc, r.feeType, r.status]);
    autoTable(doc, { head: [[ 'Fee Program', 'Program Manager', 'ISO', 'MCC', 'Fee Type', 'Status' ]], body: tableData, startY: 50, styles: { fontSize: 8, cellPadding: 3 } });
    doc.save(`FeeProgram_export_${new Date().toISOString().split('T')[0]}.pdf`);
  }, [results]);

  const handleExportCSV = useCallback(() => {
    const csvData = results.map(r => ({ 'Fee Program': r.feeProgramName, 'Program Manager': r.programManagerName, 'ISO': r.isoName, 'MCC': r.mcc, 'Fee Type': r.feeType, 'Status': r.status }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `FeeProgram_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [results]);

  return (
    <div className="space-y-6">
      <Card className="shadow-glass">
        <CardHeader className="bg-gradient-to-r from-mb-blue/5 to-mb-silver/5 border-b">
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-mb-blue/10 rounded-lg">
              <Search className="h-6 w-6 text-mb-blue" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">{FEE_PROGRAM_STRINGS.SECTIONS.SEARCH_FILTERS}</h3>
              <p className="text-sm text-muted-foreground mt-1">Search and manage existing Fee Programs</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <FormGenerator
            fields={feeProgramConfig.searchFields.map(field => {
              if (field.button?.name === 'exportPDF') {
                return { ...field, button: { ...field.button, onClick: handleExportPDF } };
              }
              if (field.button?.name === 'exportCSV') {
                return { ...field, button: { ...field.button, onClick: handleExportCSV } };
              }
              return field;
            })}
            tableDataConfig={hasSearched ? { columns: feeProgramConfig.tableConfig.columns, rows: results } : { columns: [], rows: [] }}
            onSubmit={handleSearch}
            onView={row => onView?.(row)}
            onEdit={row => onEdit?.(row)}
            onDelete={row => setResults(prev => prev.filter(p => p.id !== row.id))}
            className="w-full"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default FeeProgramSearchTab;
