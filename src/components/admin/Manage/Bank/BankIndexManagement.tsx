import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { BANK_STRINGS } from '@/constants/bankConstants';
import { BankForm } from './BankForm';
import { BankSearchTab } from './BankSearchTab';
import { Bank } from '@/services/bankService';
import {
  Landmark,
  Search,
  Plus,
} from 'lucide-react';

interface BankIndexManagementProps {
  className?: string;
}

export const BankIndexManagement: React.FC<BankIndexManagementProps> = ({ className }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('search');

  // Handle successful bank creation
  const handleCreateSuccess = () => {
    setActiveTab('search');
    toast({
      title: BANK_STRINGS.TOAST.BANK_CREATED_TITLE,
      description: 'Switching to search tab to view the new bank',
    });
  };

  // Handle create new bank from search tab
  const handleCreateNew = () => {
    setActiveTab('create');
  };

  // Handle edit bank
  const handleEdit = (bank: Bank) => {
    toast({
      title: 'Edit Bank',
      description: `Opening edit form for ${bank.bankName}`,
    });
    // In a real app, this would navigate to edit form or open modal
  };

  // Handle view bank details
  const handleView = (bank: Bank) => {
    toast({
      title: 'View Bank Details',
      description: `Viewing details for ${bank.bankName}`,
    });
    // In a real app, this would navigate to detail view or open modal
  };

  // Handle bank form submission
  const handleBankFormSubmit = (data: any) => {
    toast({
      title: 'Bank Created',
      description: `${data.bankName} has been created successfully`,
    });
    handleCreateSuccess();
  };

  // Handle bank form cancel
  const handleBankFormCancel = () => {
    setActiveTab('search');
  };

  // Handle bank form reset
  const handleBankFormReset = () => {
    toast({
      title: 'Form Reset',
      description: 'Bank form has been reset',
    });
  };

  return (
    <div className={className}>
      {/* Main Content with Tabs */}
      <Card className="shadow-glass">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <CardHeader className="border-b">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="search" className="flex items-center space-x-2">
                <Search className="h-4 w-4" />
                <span>{BANK_STRINGS.TABS.SEARCH}</span>
              </TabsTrigger>
              <TabsTrigger value="create" className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>{BANK_STRINGS.TABS.CREATE}</span>
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent className="p-0">
            <TabsContent value="search" className="mt-0">
              <div className="p-6">
                <BankSearchTab
                  onEdit={handleEdit}
                  onView={handleView}
                  onCreateNew={handleCreateNew}
                />
              </div>
            </TabsContent>

            <TabsContent value="create" className="mt-0">
              <div className="p-6">
                <BankForm
                  onSubmit={handleBankFormSubmit}
                  onCancel={handleBankFormCancel}
                  onReset={handleBankFormReset}
                />
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>

      {/* Footer Information */}
      <div className="mt-6">
        <Card className="shadow-glass bg-gradient-to-r from-mb-silver/5 to-mb-blue/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Landmark className="h-4 w-4" />
                  <span>Bank Management System</span>
                </div>
                <span>•</span>
                <span>Manage banking institutions and their details</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>Total Banks: {/* This would come from API */}5</span>
                <span>•</span>
                <span>Active: 2</span>
                <span>•</span>
                <span>Inactive: 1</span>
                <span>•</span>
                <span>Pending: 1</span>
                <span>•</span>
                <span>Suspended: 1</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};