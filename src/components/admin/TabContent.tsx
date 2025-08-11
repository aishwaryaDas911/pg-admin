import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FormGenerator from '@/components/common/FormGenerator';
import { getModuleConfig, getMockDataForModule } from '@/config/fieldConfigurations';
import { AcquirerProtocolForm } from './Manage/AcquirerProtocol';
import { ISOForm } from './Manage/ISO';
import { MerchantGroupForm } from './Manage/MerchantGroup';
import { MerchantForm } from './Manage/Merchant';
import { SubMerchantForm } from './Manage/SubMerchant';
import { BankForm } from './Manage/Bank';
import { FeeProgramForm } from './Programs/FeeProgram';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Search,
  Plus,
  Eye,
  Pause,
  Edit,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ADMIN_STRINGS } from '@/constants/adminConstants';

interface TabContentProps {
  title: string;
  className?: string;
}

export const TabContent: React.FC<TabContentProps> = ({ title, className = '' }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('search');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Get dynamic configuration for this module
  const moduleConfig = getModuleConfig(title);
  const mockData = getMockDataForModule(title);

  // Export functions
  const exportToPDF = () => {
    // Basic PDF export implementation
    console.log('Export to PDF functionality would be implemented here');
    toast({
      title: "PDF Export",
      description: `Exported ${searchResults.length} records to PDF`,
    });
  };

  const exportToCSV = () => {
    // Basic CSV export implementation
    console.log('Export to CSV functionality would be implemented here');
    toast({
      title: "CSV Export",
      description: `Exported ${searchResults.length} records to CSV`,
    });
  };

  // Enhanced module config with export handlers
  const enhancedConfig = {
    ...moduleConfig,
    searchFields: moduleConfig.searchFields.map(field => {
      if (field.button?.name === 'exportPDF') {
        return {
          ...field,
          button: {
            ...field.button,
            onClick: exportToPDF
          }
        };
      }
      if (field.button?.name === 'exportCSV') {
        return {
          ...field,
          button: {
            ...field.button,
            onClick: exportToCSV
          }
        };
      }
      return field;
    })
  };

  // Handle form submission from FormGenerator
  const handleFormSubmit = (data: any) => {
    setLoading(true);

    // Simulate API call with filtering
    setTimeout(() => {
      let filteredResults = mockData;

      // Apply filters based on form data
      Object.keys(data).forEach(key => {
        if (data[key] && key !== 'recordsPerPage') {
          filteredResults = filteredResults.filter(item => {
            const itemValue = item[key];
            if (typeof itemValue === 'string') {
              return itemValue.toLowerCase().includes(data[key].toLowerCase());
            }
            if (Array.isArray(itemValue)) {
              return itemValue.some(val =>
                val.toLowerCase().includes(data[key].toLowerCase())
              );
            }
            return itemValue === data[key];
          });
        }
      });

      // Update table configuration with filtered data
      const updatedTableConfig = {
        ...moduleConfig.tableConfig,
        rows: filteredResults.map(item => ({
          ...item,
          associatedBankNames: Array.isArray(item.associatedBankNames)
            ? item.associatedBankNames.join(', ')
            : item.associatedBankNames
        }))
      };

      setSearchResults(filteredResults);
      setLoading(false);

      toast({
        title: ADMIN_STRINGS.TOAST.SEARCH_COMPLETED,
        description: `${ADMIN_STRINGS.GENERIC.FOUND} ${filteredResults.length} ${ADMIN_STRINGS.TOAST.FOUND_RESULTS}`,
      });
    }, 1000);
  };

  const handleAction = (action: string, row: any) => {
    const displayName = row.name || row.programManagerName || row.bankName || row.merchantName || row.isoName || 'item';
    const actionMessages = {
      view: `Viewing details for ${displayName}`,
      suspend: `Suspending ${displayName}`,
      edit: `Editing ${displayName}`,
      delete: `Deleting ${displayName}`
    };

    toast({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} Action`,
      description: actionMessages[action as keyof typeof actionMessages],
      variant: action === 'delete' ? 'destructive' : 'default'
    });
  };

  const renderActionButton = (type: string, row: any) => {
    const IconMap = {
      view: Eye,
      suspend: Pause,
      edit: Edit,
      delete: Trash2
    };

    const variants = {
      view: 'outline' as const,
      suspend: 'secondary' as const,
      edit: 'default' as const,
      delete: 'destructive' as const
    };

    const tooltips = {
      view: 'View Details',
      suspend: 'Suspend',
      edit: 'Edit',
      delete: 'Delete'
    };

    const Icon = IconMap[type as keyof typeof IconMap];

    if (!Icon) return null;

    return (
      <TooltipProvider key={type}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={variants[type as keyof typeof variants]}
              size="icon"
              className="h-8 w-8"
              onClick={() => handleAction(type, row)}
            >
              <Icon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltips[type as keyof typeof tooltips]}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div className={`space-y-6 animate-fade-in ${className}`}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <Badge variant="secondary" className="bg-mb-blue/10 text-mb-blue border-mb-blue/20">
          {ADMIN_STRINGS.NAVIGATION.ADMIN_PORTAL}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="search" className="flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <span>{ADMIN_STRINGS.ACTIONS.SEARCH}</span>
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>{ADMIN_STRINGS.ACTIONS.CREATE}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-6">
          {title === 'Program Manager' ? (
            // Use the new structured component for Program Manager
            <div>
              <p className="text-muted-foreground mb-4">
                Program Manager now uses the new structured component approach.
                Navigate to the Program Manager module directly for the enhanced experience.
              </p>
              <FormGenerator
                fields={enhancedConfig.searchFields}
                tableDataConfig={{
                  ...moduleConfig.tableConfig,
                  rows: searchResults.map(item => ({
                    ...item,
                    associatedBankNames: Array.isArray(item.associatedBankNames)
                      ? item.associatedBankNames.join(', ')
                      : item.associatedBankNames,
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
          ) : (
            <FormGenerator
              fields={enhancedConfig.searchFields}
              tableDataConfig={{
                ...moduleConfig.tableConfig,
                rows: searchResults.map(item => ({
                  ...item,
                  associatedBankNames: Array.isArray(item.associatedBankNames)
                    ? item.associatedBankNames.join(', ')
                    : item.associatedBankNames,
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
          )}
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          {title === 'Acquirer Protocol Parameter' ? (
            <AcquirerProtocolForm
              onSubmit={(data) => {
                toast({
                  title: ADMIN_STRINGS.TOAST.CREATED_SUCCESS,
                  description: ADMIN_STRINGS.TOAST.ACQUIRER_PROTOCOL_CREATED,
                });
                console.log('Form data:', data);
              }}
              onCancel={() => {
                toast({
                  title: ADMIN_STRINGS.TOAST.CANCELLED,
                  description: ADMIN_STRINGS.TOAST.FORM_CREATION_CANCELLED,
                });
              }}
              onReset={() => {
                toast({
                  title: ADMIN_STRINGS.TOAST.FORM_RESET,
                  description: ADMIN_STRINGS.TOAST.ALL_FIELDS_CLEARED,
                });
              }}
            />
          ) : title === 'Program Manager' ? (
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold mb-2">Program Manager - New Structure</h3>
              <p className="text-muted-foreground mb-4">
                Program Manager now uses the new structured component approach.
              </p>
              <p className="text-sm text-muted-foreground">
                Please navigate to <strong>/program-manager-management</strong> for the enhanced experience.
              </p>
            </div>
          ) : title === 'ISO' ? (
            <ISOForm
              onSubmit={(data) => {
                toast({
                  title: ADMIN_STRINGS.TOAST.CREATED_SUCCESS,
                  description: ADMIN_STRINGS.TOAST.ISO_CREATED,
                });
                console.log('ISO data:', data);
              }}
              onCancel={() => {
                toast({
                  title: ADMIN_STRINGS.TOAST.CANCELLED,
                  description: ADMIN_STRINGS.TOAST.ISO_CREATION_CANCELLED,
                });
              }}
              onReset={() => {
                toast({
                  title: ADMIN_STRINGS.TOAST.FORM_RESET,
                  description: ADMIN_STRINGS.TOAST.ISO_FIELDS_CLEARED,
                });
              }}
            />
          ) : title === 'Merchant Group' ? (
            <MerchantGroupForm
              onSubmit={(data) => {
                toast({
                  title: "Created Successfully",
                  description: "Merchant Group has been created successfully",
                });
                console.log('Merchant Group data:', data);
              }}
              onCancel={() => {
                toast({
                  title: "Cancelled",
                  description: "Merchant Group creation was cancelled",
                });
              }}
              onReset={() => {
                toast({
                  title: "Form Reset",
                  description: "All Merchant Group fields have been cleared",
                });
              }}
            />
          ) : title === 'Merchant' ? (
            <MerchantForm
              onSubmit={(data) => {
                toast({
                  title: "Created Successfully",
                  description: "Merchant has been created successfully",
                });
                console.log('Merchant data:', data);
              }}
              onCancel={() => {
                toast({
                  title: "Cancelled",
                  description: "Merchant creation was cancelled",
                });
              }}
              onReset={() => {
                toast({
                  title: "Form Reset",
                  description: "All Merchant fields have been cleared",
                });
              }}
            />
          ) : title === 'Sub Merchant' ? (
            <SubMerchantForm
              onSubmit={(data) => {
                toast({
                  title: "Created Successfully",
                  description: "Sub-Merchant has been created successfully",
                });
                console.log('Sub-Merchant data:', data);
              }}
              onCancel={() => {
                toast({
                  title: "Cancelled",
                  description: "Sub-Merchant creation was cancelled",
                });
              }}
              onReset={() => {
                toast({
                  title: "Form Reset",
                  description: "All Sub-Merchant fields have been cleared",
                });
              }}
            />
          ) : title === 'Bank' ? (
            <BankForm
              onSubmit={(data) => {
                toast({
                  title: ADMIN_STRINGS.TOAST.CREATED_SUCCESS,
                  description: ADMIN_STRINGS.TOAST.BANK_CREATED,
                });
                console.log('Bank data:', data);
              }}
              onCancel={() => {
                toast({
                  title: ADMIN_STRINGS.TOAST.CANCELLED,
                  description: ADMIN_STRINGS.TOAST.BANK_CREATION_CANCELLED,
                });
              }}
              onReset={() => {
                toast({
                  title: ADMIN_STRINGS.TOAST.FORM_RESET,
                  description: ADMIN_STRINGS.TOAST.BANK_FIELDS_CLEARED,
                });
              }}
            />
          ) : title === 'Fee Program' ? (
            <FeeProgramForm
              onSubmit={(data) => {
                toast({
                  title: ADMIN_STRINGS.TOAST.CREATED_SUCCESS,
                  description: ADMIN_STRINGS.TOAST.FEE_PROGRAM_CREATED,
                });
                console.log('Fee Program data:', data);
              }}
              onCancel={() => {
                toast({
                  title: ADMIN_STRINGS.TOAST.CANCELLED,
                  description: ADMIN_STRINGS.TOAST.FEE_PROGRAM_CREATION_CANCELLED,
                });
              }}
              onReset={() => {
                toast({
                  title: ADMIN_STRINGS.TOAST.FORM_RESET,
                  description: ADMIN_STRINGS.TOAST.FEE_PROGRAM_FIELDS_CLEARED,
                });
              }}
            />
          ) : (
            <Card className="shadow-glass">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Create New Record</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="create-deviceManufacturer">Device Manufacturer *</Label>
                    <Input
                      id="create-deviceManufacturer"
                      placeholder="Enter manufacturer"
                      value={createData.deviceManufacturer || ''}
                      onChange={(e) => setCreateData(prev => ({ ...prev, deviceManufacturer: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="create-deviceModelName">Device Model Name *</Label>
                    <Input
                      id="create-deviceModelName"
                      placeholder="Enter model name"
                      value={createData.deviceModelName || ''}
                      onChange={(e) => setCreateData(prev => ({ ...prev, deviceModelName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="create-applicationType">Application Type *</Label>
                    <Input
                      id="create-applicationType"
                      placeholder="Enter application type"
                      value={createData.applicationType || ''}
                      onChange={(e) => setCreateData(prev => ({ ...prev, applicationType: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="create-packageName">Package Name *</Label>
                    <Input
                      id="create-packageName"
                      placeholder="Enter package name"
                      value={createData.packageName || ''}
                      onChange={(e) => setCreateData(prev => ({ ...prev, packageName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="create-applicationName">Application Name *</Label>
                    <Input
                      id="create-applicationName"
                      placeholder="Enter application name"
                      value={createData.applicationName || ''}
                      onChange={(e) => setCreateData(prev => ({ ...prev, applicationName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="create-applicationVersion">Application Version *</Label>
                    <Input
                      id="create-applicationVersion"
                      placeholder="Enter version"
                      value={createData.applicationVersion || ''}
                      onChange={(e) => setCreateData(prev => ({ ...prev, applicationVersion: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4 pt-6">
                  <Button onClick={handleCreate} disabled={loading}>
                    <Plus className="mr-2 h-4 w-4" />
                    {loading ? 'Creating...' : 'Create'}
                  </Button>
                  <Button variant="outline" onClick={() => setCreateData({})}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
