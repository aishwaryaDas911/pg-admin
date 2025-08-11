import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Eye, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ProgramManagerSearchComponent } from './search/ProgramManagerSearchComponent';
import { ProgramManagerCreateComponent } from './create/ProgramManagerCreateComponent';

// ==============================|| Program Manager Management ||============================== //

export const ProgramManagerManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('program-manager-tab') || 'search';
  });
  const [tableActionState, setTableActionState] = useState('');
  const [hideCreateTab, setHideCreateTab] = useState(false);
  const [isTableDataChanged, setIsTableDataChanged] = useState(false);

  // Get the appropriate label and icon for the second tab
  const getSecondTabLabel = () => {
    if (tableActionState === 'view') return 'View';
    if (tableActionState === 'edit') return 'Edit';
    return 'Create';
  };

  const getSecondTabIcon = () => {
    if (tableActionState === 'view') {
      return <Eye className="h-4 w-4 text-primary" />;
    } else if (tableActionState === 'edit') {
      return <Edit className="h-4 w-4 text-primary" />;
    } else {
      return <Plus className="h-4 w-4 text-primary" />;
    }
  };

  const handleTabChange = (newValue: string) => {
    setActiveTab(newValue);
    localStorage.setItem('program-manager-tab', newValue);
    
    if (tableActionState) {
      setHideCreateTab(true);
      setTableActionState('');
    }
    setIsTableDataChanged(false);
  };

  // Handle search button click from config
  const handleSearchClick = () => {
    // This will be passed to the search component
    toast({
      title: "Search Initiated",
      description: "Searching for Program Managers...",
    });
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      localStorage.removeItem('program-manager-tab');
    };
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Program Manager</h1>
        <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
          Payment Gateway
        </Badge>
      </div>

      <Card className="shadow-glass bg-card/95 border-border/50">
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="border-b border-border/40 bg-muted/30">
              <TabsList className="grid w-full grid-cols-2 bg-transparent">
                <TabsTrigger 
                  value="search" 
                  className="flex items-center space-x-2 data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="create" 
                  className="flex items-center space-x-2 data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  {getSecondTabIcon()}
                  <span>{getSecondTabLabel()}</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="search" className="mt-0">
                <ProgramManagerSearchComponent 
                  tabName="search"
                  handleChangeTab={handleTabChange}
                  onSearchClick={handleSearchClick}
                  tableActionState={tableActionState}
                  setTableActionState={setTableActionState}
                  setHideCreateTab={setHideCreateTab}
                />
              </TabsContent>

              <TabsContent value="create" className="mt-0">
                <ProgramManagerCreateComponent 
                  tabName="create"
                  handleChangeTab={handleTabChange}
                  tableActionState={tableActionState}
                  setTableActionState={setTableActionState}
                  isTableDataChanged={isTableDataChanged}
                  setIsTableDataChanged={setIsTableDataChanged}
                />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgramManagerManagement;
