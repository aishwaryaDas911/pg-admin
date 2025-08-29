import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { FEE_PROGRAM_STRINGS } from '@/constants/feeProgramConstants';
import { FeeProgramForm } from './FeeProgramForm';
import { FeeProgramSearchTab } from './FeeProgramSearchTab';
import { Search, Plus, Landmark } from 'lucide-react';

interface FeeProgramManagementProps { className?: string }

export const FeeProgramManagement: React.FC<FeeProgramManagementProps> = ({ className }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('search');
  const [formMode, setFormMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selected, setSelected] = useState<any>(null);

  const handleCreateSuccess = () => {
    setActiveTab('search');
    setFormMode('create');
    setSelected(null);
    toast({ title: FEE_PROGRAM_STRINGS.TOAST.CREATED_TITLE, description: 'Switching to search tab to view the new Fee Program' });
  };

  const handleCreateNew = () => { setFormMode('create'); setSelected(null); setActiveTab('create'); };
  const handleEdit = (row: any) => { setFormMode('edit'); setSelected(row); setActiveTab('create'); };
  const handleView = (row: any) => { setFormMode('view'); setSelected(row); setActiveTab('create'); };
  const handleCancel = () => { setActiveTab('search'); setFormMode('create'); setSelected(null); };

  const getSecondTabLabel = () => formMode === 'view' ? 'View' : formMode === 'edit' ? 'Edit' : FEE_PROGRAM_STRINGS.TABS.CREATE;
  const getSecondTabIcon = () => formMode === 'create' ? <Plus className="h-4 w-4" /> : <Landmark className="h-4 w-4" />;

  return (
    <div className={className}>
      <Card className="shadow-glass">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <CardHeader className="border-b">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="search" className="flex items-center space-x-2">
                <Search className="h-4 w-4" />
                <span>{FEE_PROGRAM_STRINGS.TABS.SEARCH}</span>
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
                <FeeProgramSearchTab onEdit={handleEdit} onView={handleView} onCreateNew={handleCreateNew} />
              </div>
            </TabsContent>

            <TabsContent value="create" className="mt-0">
              <div className="p-6">
                <FeeProgramForm mode={formMode} initialData={selected} onCancel={handleCancel} onSubmit={() => {}} onSuccess={handleCreateSuccess} />
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default FeeProgramManagement;
