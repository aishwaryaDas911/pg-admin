import { MenuItem } from '@/types/admin';

export const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    path: '/dashboard'
  },
  {
    id: 'software-management',
    label: 'Software Management',
    icon: 'Package',
    children: [
      {
        id: 'software-update',
        label: 'Software Update Management',
        icon: 'Upload',
        path: '/software/update-management'
      },
      {
        id: 'software-scheduler',
        label: 'Software Scheduler Management',
        icon: 'Calendar',
        path: '/software/scheduler-management'
      },
      {
        id: 'software-onboarded',
        label: 'Software Onboarded',
        icon: 'CheckCircle',
        path: '/software/onboarded'
      }
    ]
  },
  {
    id: 'setup',
    label: 'SetUp',
    icon: 'Settings',
    children: [
      {
        id: 'acquirer-management',
        label: 'Acquirer Management',
        icon: 'Building',
        path: '/setup/acquirer-management'
      },
      {
        id: 'device-management',
        label: 'Device Management',
        icon: 'Smartphone',
        path: '/setup/device-management'
      },
      {
        id: 'issuance-management',
        label: 'Issuance Management',
        icon: 'FileText',
        path: '/setup/issuance-management'
      },
      {
        id: 'merchant-management',
        label: 'Merchant Management',
        icon: 'Store',
        path: '/setup/merchant-management'
      },
      {
        id: 'merchant-group-management',
        label: 'Merchant Group Management',
        icon: 'Users',
        path: '/setup/merchant-group-management'
      },
      {
        id: 'terminal-management',
        label: 'Terminal Management',
        icon: 'Monitor',
        path: '/setup/terminal-management'
      },
      {
        id: 'device-group-management',
        label: 'Device Group Management',
        icon: 'Layers',
        path: '/setup/device-group-management'
      },
      {
        id: 'device-manufacturer',
        label: 'Device Manufacturer',
        icon: 'Factory',
        path: '/setup/device-manufacturer'
      },
      {
        id: 'frequency-configuration',
        label: 'Frequency Configuration',
        icon: 'Radio',
        path: '/setup/frequency-configuration'
      },
      {
        id: 'role-management',
        label: 'Role Management',
        icon: 'Shield',
        path: '/setup/role-management'
      },
      {
        id: 'user-management',
        label: 'User Management',
        icon: 'UserCog',
        path: '/setup/user-management'
      },
      {
        id: 'currency',
        label: 'Currency',
        icon: 'DollarSign',
        path: '/setup/currency'
      }
    ]
  },
  {
    id: 'parameter',
    label: 'Parameter',
    icon: 'Sliders',
    children: [
      {
        id: 'card-parameter',
        label: 'Card Parameter',
        icon: 'CreditCard',
        path: '/parameter/card-parameter'
      },
      {
        id: 'aid-parameter',
        label: 'AID Parameter',
        icon: 'Key',
        path: '/parameter/aid-parameter'
      },
      {
        id: 'emv-ctlc-config',
        label: 'EMV CTLC Config',
        icon: 'Zap',
        path: '/parameter/emv-ctlc-config'
      },
      {
        id: 'terminal-profile',
        label: 'Terminal Profile',
        icon: 'Terminal',
        path: '/parameter/terminal-profile'
      },
      {
        id: 'ca-public-keys',
        label: 'CA Public Keys',
        icon: 'Lock',
        path: '/parameter/ca-public-keys'
      },
      {
        id: 'merchant-profile',
        label: 'Merchant Profile',
        icon: 'UserCheck',
        path: '/parameter/merchant-profile'
      },
      {
        id: 'parameter-profile',
        label: 'Parameter Profile',
        icon: 'Settings2',
        path: '/parameter/parameter-profile'
      },
      {
        id: 'parameter-config-schedule',
        label: 'Parameter Config Schedule',
        icon: 'Schedule',
        path: '/parameter/parameter-config-schedule'
      }
    ]
  },
  {
    id: 'nexo-parameter',
    label: 'Nexo Parameter',
    icon: 'Network',
    children: [
      {
        id: 'acquirer-protocol-parameter',
        label: 'Acquirer Protocol Parameter',
        icon: 'Globe',
        path: '/nexo-parameter/acquirer-protocol-parameter'
      },
      {
        id: 'aid-reference-parameter',
        label: 'AID Reference Parameter',
        icon: 'Link',
        path: '/nexo-parameter/aid-reference-parameter'
      },
      {
        id: 'application-profile-selection-non-chip',
        label: 'Application Profile Selection Non Chip',
        icon: 'Cpu',
        path: '/nexo-parameter/application-profile-selection-non-chip'
      },
      {
        id: 'application-parameter',
        label: 'Application Parameter',
        icon: 'AppWindow',
        path: '/nexo-parameter/application-parameter'
      },
      {
        id: 'application-profile',
        label: 'Application Profile',
        icon: 'User',
        path: '/nexo-parameter/application-profile'
      },
      {
        id: 'application-profile-selection-e2',
        label: 'Application Profile Selection E2',
        icon: 'Zap',
        path: '/nexo-parameter/application-profile-selection-e2'
      },
      {
        id: 'acquirer-parameter-ed',
        label: 'Acquirer Parameter ED',
        icon: 'Database',
        path: '/nexo-parameter/acquirer-parameter-ed'
      }
    ]
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'FileBarChart',
    children: [
      {
        id: 'parameter-download-report',
        label: 'Parameter Download Report',
        icon: 'Download',
        path: '/reports/parameter-download-report'
      },
      {
        id: 'software-update-report',
        label: 'Software Update Report',
        icon: 'RefreshCw',
        path: '/reports/software-update-report'
      },
      {
        id: 'device-report',
        label: 'Device Report',
        icon: 'Smartphone',
        path: '/reports/device-report'
      },
      {
        id: 'audit-report',
        label: 'Audit Report',
        icon: 'FileSearch',
        path: '/reports/audit-report'
      },
      {
        id: 'diagnostics-report',
        label: 'Diagnostics Report',
        icon: 'Activity',
        path: '/reports/diagnostics-report'
      }
    ]
  }
];