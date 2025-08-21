import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { MerchantGroupSearchTab } from './MerchantGroupSearchTab';
import { MerchantGroupCreate } from './MerchantGroupCreate';
import { MERCHANT_GROUP_STRINGS } from '@/constants/merchantGroupConstants';
import { merchantGroupService, MerchantGroupData } from '@/services/merchantGroupService';
import {
  Users,
  Search,
  Plus,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const MerchantGroupIndexManagement: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'search' | 'create'>('search');
  const [currentView, setCurrentView] = useState<'index' | 'view' | 'edit'>('index');
  const [selectedMerchantGroupId, setSelectedMerchantGroupId] = useState<string | null>(null);
  const [selectedMerchantGroupData, setSelectedMerchantGroupData] = useState<MerchantGroupData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'search' | 'create');
  };

  const handleViewClick = async (id: string) => {
    try {
      setIsLoading(true);
      setSelectedMerchantGroupId(id);

      // For development, find the data from mock data by ID
      const { merchantGroupMockData } = await import('./formConfig');
      const foundData = merchantGroupMockData.find(item => item.id === id);

      if (foundData) {
        setSelectedMerchantGroupData(foundData);
        setCurrentView('view');
      } else {
        throw new Error('Merchant group not found');
      }

      // Uncomment this when API is ready
      // const data = await merchantGroupService.getById(id);
      // setSelectedMerchantGroupData(data);
      // setCurrentView('view');
    } catch (error) {
      console.error('Error fetching merchant group:', error);
      toast({
        title: MERCHANT_GROUP_STRINGS.TOAST.VALIDATION_ERROR_TITLE,
        description: 'Failed to load merchant group details. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = async (id: string) => {
    try {
      setIsLoading(true);
      setSelectedMerchantGroupId(id);

      // For development, find the data from mock data by ID
      const { merchantGroupMockData } = await import('./formConfig');
      const foundData = merchantGroupMockData.find(item => item.id === id);

      if (foundData) {
        // Convert masked account number to full number for editing
        const editableData = {
          ...foundData,
          accountNumber: foundData.accountNumber.replace('****', '1234567890')
        };
        setSelectedMerchantGroupData(editableData);
        setCurrentView('edit');
      } else {
        throw new Error('Merchant group not found');
      }

      // Uncomment this when API is ready
      // const data = await merchantGroupService.getById(id);
      // setSelectedMerchantGroupData(data);
      // setCurrentView('edit');
    } catch (error) {
      console.error('Error fetching merchant group:', error);
      toast({
        title: MERCHANT_GROUP_STRINGS.TOAST.VALIDATION_ERROR_TITLE,
        description: 'Failed to load merchant group details. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSuccess = () => {
    setActiveTab('search');
    toast({
      title: MERCHANT_GROUP_STRINGS.TOAST.MERCHANT_GROUP_CREATED_TITLE,
      description: MERCHANT_GROUP_STRINGS.TOAST.MERCHANT_GROUP_CREATED_DESCRIPTION,
    });
  };

  const handleUpdateSuccess = () => {
    setCurrentView('index');
    setSelectedMerchantGroupId(null);
    setSelectedMerchantGroupData(null);
    setActiveTab('search');
    toast({
      title: MERCHANT_GROUP_STRINGS.TOAST.MERCHANT_GROUP_UPDATED_TITLE,
      description: MERCHANT_GROUP_STRINGS.TOAST.MERCHANT_GROUP_UPDATED_DESCRIPTION,
    });
  };

  const handleCancel = () => {
    if (currentView !== 'index') {
      setCurrentView('index');
      setSelectedMerchantGroupId(null);
      setSelectedMerchantGroupData(null);
    }
  };

  const handleBackToIndex = () => {
    setCurrentView('index');
    setSelectedMerchantGroupId(null);
    setSelectedMerchantGroupData(null);
  };

  // Render view/edit form
  if (currentView === 'view' || currentView === 'edit') {
    return (
      <div className="space-y-6">
        {/* Back button */}
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={handleBackToIndex}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Merchant Groups</span>
          </Button>
          <Badge variant="outline">
            {currentView === 'view' ? 'Viewing' : 'Editing'} Merchant Group
          </Badge>
        </div>

        {/* Form */}
        <MerchantGroupCreate
          mode={currentView}
          initialData={selectedMerchantGroupData || undefined}
          onSuccess={currentView === 'edit' ? handleUpdateSuccess : undefined}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  // Render main index with tabs
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-mb-blue/20">
        <CardHeader className="bg-gradient-to-r from-mb-blue/5 to-mb-silver/5">
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-mb-blue/10 rounded-lg">
              <Users className="h-6 w-6 text-mb-blue" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {MERCHANT_GROUP_STRINGS.TITLES.MAIN}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {MERCHANT_GROUP_STRINGS.DESCRIPTIONS.MAIN}
              </p>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="search" className="flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <span>{MERCHANT_GROUP_STRINGS.TABS.SEARCH}</span>
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>{MERCHANT_GROUP_STRINGS.TABS.CREATE}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-6">
          <MerchantGroupSearchTab
            onViewClick={handleViewClick}
            onEditClick={handleEditClick}
            onCreateSuccess={handleCreateSuccess}
          />
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <MerchantGroupCreate
            mode="create"
            onSuccess={handleCreateSuccess}
            onCancel={() => setActiveTab('search')}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MerchantGroupIndexManagement;
