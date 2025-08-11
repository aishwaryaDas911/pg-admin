import { MenuItem } from '@/types/admin';

export const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    path: '/dashboard'
  },
  {
    id: 'setup',
    label: 'SetUp',
    icon: 'Settings',
    children: [
      {
        id: 'roles',
        label: 'Roles',
        icon: 'Shield',
        path: '/setup/roles'
      },
      {
        id: 'user',
        label: 'User',
        icon: 'User',
        path: '/setup/user'
      },
      {
        id: 'currency',
        label: 'Currency',
        icon: 'DollarSign',
        path: '/setup/currency'
      },
      {
        id: 'merchant-category-code',
        label: 'Merchant Category Code',
        icon: 'Tag',
        path: '/setup/merchant-category-code'
      },
      {
        id: 'bin',
        label: 'BIN',
        icon: 'CreditCard',
        path: '/setup/bin'
      },
      {
        id: 'payment-scheme',
        label: 'Payment Scheme',
        icon: 'Banknote',
        path: '/setup/payment-scheme'
      },
      {
        id: 'country',
        label: 'Country',
        icon: 'Globe2',
        path: '/setup/country'
      },
      {
        id: 'city',
        label: 'City',
        icon: 'MapPin',
        path: '/setup/city'
      },
      {
        id: 'dcc-markup',
        label: 'DCC MarkUp',
        icon: 'Percent',
        path: '/setup/dcc-markup'
      },
      {
        id: 'exchange-rate',
        label: 'Exchange Rate',
        icon: 'ArrowLeftRight',
        path: '/setup/exchange-rate'
      }
    ]
  },
  {
    id: 'programs',
    label: 'Programs',
    icon: 'Package',
    children: [
      {
        id: 'fee-program',
        label: 'Fee Program',
        icon: 'Receipt',
        path: '/programs/fee-program'
      }
    ]
  },
  {
    id: 'manage',
    label: 'Manage',
    icon: 'Settings2',
    children: [
      {
        id: 'program-manager',
        label: 'Program Manager',
        icon: 'UserCog',
        path: '/program-manager-management'
      },
      {
        id: 'iso',
        label: 'ISO',
        icon: 'Building',
        path: '/manage/iso'
      },
      {
        id: 'merchant-group',
        label: 'Merchant Group',
        icon: 'Users',
        path: '/manage/merchant-group'
      },
      {
        id: 'merchant',
        label: 'Merchant',
        icon: 'Store',
        path: '/manage/merchant'
      },
      {
        id: 'sub-merchant',
        label: 'Sub Merchant',
        icon: 'ShoppingBag',
        path: '/manage/sub-merchant'
      },
      {
        id: 'bank',
        label: 'Bank',
        icon: 'Landmark',
        path: '/manage/bank'
      },
      {
        id: 'transaction-type',
        label: 'Transaction Type',
        icon: 'Receipt',
        path: '/manage/transaction-type'
      }
    ]
  },
  {
    id: 'connector',
    label: 'Connector',
    icon: 'Plug',
    children: [
      {
        id: 'network-connector',
        label: 'Network Connector',
        icon: 'Network',
        path: '/connector/network-connector'
      },
      {
        id: 'routing-rule',
        label: 'Routing Rule',
        icon: 'Route',
        path: '/connector/routing-rule'
      },
      {
        id: 'connector-maintenance',
        label: 'Connector Maintenance',
        icon: 'Wrench',
        path: '/connector/connector-maintenance'
      },
      {
        id: 'routing-profile',
        label: 'Routing Profile',
        icon: 'GitBranch',
        path: '/connector/routing-profile'
      },
      {
        id: 'key-management',
        label: 'Key Management',
        icon: 'Key',
        path: '/connector/key-management'
      }
    ]
  },
  {
    id: 'adjustments',
    label: 'Adjustments',
    icon: 'TrendingUp',
    children: [
      {
        id: 'manual-credit',
        label: 'Manual Credit',
        icon: 'Plus',
        path: '/adjustments/manual-credit'
      },
      {
        id: 'manual-debit',
        label: 'Manual Debit',
        icon: 'Minus',
        path: '/adjustments/manual-debit'
      }
    ]
  },
  {
    id: 'virtual-terminals',
    label: 'Virtual Terminals',
    icon: 'Monitor',
    children: [
      {
        id: 'sale',
        label: 'Sale',
        icon: 'ShoppingCart',
        path: '/virtual-terminals/sale'
      }
    ]
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'FileBarChart',
    children: [
      {
        id: 'overview-balance-sheet',
        label: 'Overview & Balance Sheet',
        icon: 'BarChart3',
        path: '/reports/overview-balance-sheet'
      },
      {
        id: 'transaction-report',
        label: 'Transaction Report',
        icon: 'Receipt',
        path: '/reports/transaction-report'
      },
      {
        id: 'balance-reports',
        label: 'Balance Reports',
        icon: 'Scale',
        path: '/reports/balance-reports'
      },
      {
        id: 'manual-transactions',
        label: 'Manual Transactions',
        icon: 'Edit',
        path: '/reports/manual-transactions'
      },
      {
        id: 'settlement-report',
        label: 'Settlement Report',
        icon: 'Handshake',
        path: '/reports/settlement-report'
      },
      {
        id: 'batch-report',
        label: 'Batch Report',
        icon: 'Package2',
        path: '/reports/batch-report'
      },
      {
        id: 'fee-report',
        label: 'Fee Report',
        icon: 'DollarSign',
        path: '/reports/fee-report'
      },
      {
        id: 'iso-revenue',
        label: 'ISO Revenue',
        icon: 'TrendingUp',
        path: '/reports/iso-revenue'
      },
      {
        id: 'pm-revenue',
        label: 'PM Revenue',
        icon: 'TrendingUp',
        path: '/reports/pm-revenue'
      },
      {
        id: 'merchant-account-statements',
        label: 'Merchant Account Statements',
        icon: 'FileText',
        path: '/reports/merchant-account-statements'
      },
      {
        id: 'pending-transactions',
        label: 'Pending Transactions',
        icon: 'Clock',
        path: '/reports/pending-transactions'
      },
      {
        id: 'sub-merchant-account-statements',
        label: 'Sub-Merchant Account Statements',
        icon: 'File',
        path: '/reports/sub-merchant-account-statements'
      },
      {
        id: 'statistics-report',
        label: 'Statistics Report',
        icon: 'PieChart',
        path: '/reports/statistics-report'
      },
      {
        id: 'reconciliation-report',
        label: 'Reconciliation Report',
        icon: 'CheckSquare',
        path: '/reports/reconciliation-report'
      },
      {
        id: 'merchant-payout-report',
        label: 'Merchant Payout Report',
        icon: 'Banknote',
        path: '/reports/merchant-payout-report'
      }
    ]
  }
];
