import React, { useState, useCallback } from 'react';
import { FormGenerator } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { BANK_STRINGS } from '@/constants/bankConstants';
import { bankSearchFields } from './bankFormConfig';
import { bankService, BankSearchFilters, Bank } from '@/services/bankService';
import { 
  Search, 
  RotateCcw,
  Plus,
  Eye,
  Edit,
  Trash2,
  Landmark
} from 'lucide-react';

interface BankSearchTabProps {
  onEdit?: (bank: Bank) => void;
  onView?: (bank: Bank) => void;
  onCreateNew?: () => void;
}

export const BankSearchTab: React.FC<BankSearchTabProps> = ({
  onEdit,
  onView,
  onCreateNew,
}) => {
  const { toast } = useToast();
  const [searchResults, setSearchResults] = useState<Bank[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Handle form submission for search
  const handleSearch = useCallback(async (formData: BankSearchFilters) => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const results = await bankService.searchBanks(formData);
      setSearchResults(results);

      toast({
        title: BANK_STRINGS.TOAST.SEARCH_COMPLETED_TITLE,
        description: `Found ${results.length} records`,
      });
    } catch (error) {
      toast({
        title: 'Search Error',
        description: 'Failed to search banks. Please try again.',
        variant: 'destructive',
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
      title: BANK_STRINGS.TOAST.FORM_RESET_TITLE,
      description: 'Search filters have been cleared',
    });
  }, [toast]);

  // Handle view bank
  const handleViewBank = (bank: Bank) => {
    if (onView) {
      onView(bank);
    } else {
      toast({
        title: 'View Bank',
        description: `Viewing details for ${bank.bankName}`,
      });
    }
  };

  // Handle edit bank
  const handleEditBank = (bank: Bank) => {
    if (onEdit) {
      onEdit(bank);
    } else {
      toast({
        title: 'Edit Bank',
        description: `Opening edit form for ${bank.bankName}`,
      });
    }
  };

  // Handle delete bank
  const handleDeleteBank = async (bank: Bank) => {
    try {
      await bankService.deleteBank(bank.id);
      setSearchResults(prev => prev.filter(b => b.id !== bank.id));
      toast({
        title: 'Bank Deleted',
        description: `${bank.bankName} has been deleted successfully`,
      });
    } catch (error) {
      toast({
        title: 'Delete Error',
        description: 'Failed to delete bank. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'inactive':
        return 'secondary';
      case 'pending':
        return 'outline';
      case 'suspended':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card className="shadow-glass">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Search className="h-5 w-5 text-mb-blue" />
            <span>{BANK_STRINGS.FORM.SEARCH_TITLE}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormGenerator
            fields={bankSearchFields}
            onSubmit={handleSearch}
          />
        </CardContent>
      </Card>

      {/* Search Results */}
      {hasSearched && (
        <Card className="shadow-glass">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Landmark className="h-5 w-5 text-mb-blue" />
                <span>Search Results</span>
                {searchResults.length > 0 && (
                  <Badge variant="outline" className="ml-2">
                    {searchResults.length} banks found
                  </Badge>
                )}
              </CardTitle>
              {onCreateNew && (
                <Button onClick={onCreateNew} className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>{BANK_STRINGS.FORM.CREATE_NEW_BUTTON}</span>
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mb-blue mx-auto"></div>
                <p className="text-muted-foreground mt-2">{BANK_STRINGS.TABLE.LOADING}</p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-8">
                <Landmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">{BANK_STRINGS.TABLE.NO_RESULTS}</p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{BANK_STRINGS.TABLE.BANK_NAME}</TableHead>
                      <TableHead>{BANK_STRINGS.TABLE.BANK_CODE}</TableHead>
                      <TableHead>{BANK_STRINGS.TABLE.EMAIL_ADDRESS}</TableHead>
                      <TableHead>{BANK_STRINGS.TABLE.STATUS}</TableHead>
                      <TableHead className="text-right">{BANK_STRINGS.TABLE.ACTIONS}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {searchResults.map((bank) => (
                      <TableRow key={bank.id}>
                        <TableCell className="font-medium">{bank.bankName}</TableCell>
                        <TableCell>{bank.bankCode}</TableCell>
                        <TableCell>{bank.emailAddress}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(bank.status)}>
                            {bank.status.charAt(0).toUpperCase() + bank.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewBank(bank)}
                              className="h-8 w-8 p-0"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditBank(bank)}
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteBank(bank)}
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};