import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ISO_STRINGS } from '@/constants/isoConstants';
import { ISOCreate } from './ISOCreate';
import { ISOSearchTab } from './ISOSearchTab';
import {
  Building,
  Search,
  Plus,
} from 'lucide-react';

interface ISOIndexManagementProps {
  className?: string;
}

export const ISOIndexManagement: React.FC<ISOIndexManagementProps> = ({ className }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('search');

  // Handle successful ISO creation
  const handleCreateSuccess = () => {
    setActiveTab('search');
    toast({
      title: ISO_STRINGS.TOAST.ISO_CREATED_TITLE,
      description: 'Switching to search tab to view the new ISO',
    });
  };

  // Handle create new ISO from search tab
  const handleCreateNew = () => {
    setActiveTab('create');
  };

  // Handle edit ISO
  const handleEdit = (iso: any) => {
    toast({
      title: 'Edit ISO',
      description: `Opening edit form for ${iso.isoName}`,
    });
    // In a real app, this would navigate to edit form or open modal
  };

  // Handle view ISO details
  const handleView = (iso: any) => {
    toast({
      title: 'View ISO Details',
      description: `Viewing details for ${iso.isoName}`,
    });
    // In a real app, this would navigate to detail view or open modal
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
                <span>{ISO_STRINGS.TABS.SEARCH}</span>
              </TabsTrigger>
              <TabsTrigger value="create" className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>{ISO_STRINGS.TABS.CREATE}</span>
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent className="p-0">
            <TabsContent value="search" className="mt-0">
              <div className="p-6">
                <ISOSearchTab
                  onEdit={handleEdit}
                  onView={handleView}
                  onCreateNew={handleCreateNew}
                />
              </div>
            </TabsContent>

            <TabsContent value="create" className="mt-0">
              <div className="p-6">
                <ISOCreate
                  onSuccess={handleCreateSuccess}
                  onCancel={() => setActiveTab('search')}
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

export default ISOIndexManagement;
