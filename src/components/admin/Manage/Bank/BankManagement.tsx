import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { BANK_STRINGS } from '@/constants/bankConstants';
import { BankForm } from './BankForm';
import { BankSearchTab } from './BankSearchTab';
import {
  Landmark,
  Search,
  Plus,
} from 'lucide-react';

interface BankManagementProps {
  className?: string;
}

export const BankManagement: React.FC<BankManagementProps> = ({ className }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('search');
  const [formMode, setFormMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedBank, setSelectedBank] = useState<any>(null);

  // Handle successful Bank creation
  const handleCreateSuccess = () => {
    setActiveTab('search');
    setFormMode('create');
    setSelectedBank(null);
    toast({
      title: BANK_STRINGS.TOAST.BANK_CREATED_TITLE,
      description: 'Switching to search tab to view the new Bank',
    });
  };

  // Handle create new Bank from search tab
  const handleCreateNew = () => {
    setFormMode('create');
    setSelectedBank(null);
    setActiveTab('create');
  };

  // Handle edit Bank
  const handleEdit = (bank: any) => {
    setFormMode('edit');
    setSelectedBank(bank);
    setActiveTab('create');
    toast({
      title: 'Edit Bank',
      description: `Opening edit form for ${bank.bankName}`,
    });
  };

  // Handle view Bank details
  const handleView = (bank: any) => {
    setFormMode('view');
    setSelectedBank(bank);
    setActiveTab('create');
    toast({
      title: 'View Bank Details',
      description: `Viewing details for ${bank.bankName}`,
    });
  };

  // Handle form cancel/back
  const handleFormCancel = () => {
    setActiveTab('search');
    setFormMode('create');
    setSelectedBank(null);
  };

  // Handle form submission
  const handleFormSubmit = (data: any) => {
    console.log('Form submitted with data:', data);
    // The form component handles the API call and success notification
  };

  // Get the appropriate label and icon for the second tab
  const getSecondTabLabel = () => {
    if (formMode === 'view') return 'View';
    if (formMode === 'edit') return 'Edit';
    return BANK_STRINGS.TABS.CREATE;
  };

  const getSecondTabIcon = () => {
    if (formMode === 'view') {
      return <Landmark className="h-4 w-4" />;
    } else if (formMode === 'edit') {
      return <Landmark className="h-4 w-4" />;
    } else {
      return <Plus className="h-4 w-4" />;
    }
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
                {getSecondTabIcon()}
                <span>{getSecondTabLabel()}</span>
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
                  mode={formMode}
                  initialData={selectedBank}
                  onSubmit={handleFormSubmit}
                  onCancel={handleFormCancel}
                  onSuccess={handleCreateSuccess}
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
                <span>Last updated: {new Date().toLocaleString()}</span>
                <span>•</span>
                <span>System status: All services operational</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>Version 2.1.0</span>
                <span>•</span>
                <span>Payment Gateway Admin</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BankManagement;
