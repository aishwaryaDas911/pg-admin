import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ADMIN_STRINGS } from '@/constants/adminConstants';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Users, 
  Smartphone, 
  Package, 
  Activity,
  TrendingUp,
  Server,
  Shield,
  AlertTriangle
} from 'lucide-react';

interface DashboardProps {
  className?: string;
}

const statsData = [
  {
    title: ADMIN_STRINGS.DASHBOARD.TOTAL_USERS,
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'text-mb-blue'
  },
  {
    title: ADMIN_STRINGS.DASHBOARD.ACTIVE_DEVICES,
    value: '1,234',
    change: '+8.2%',
    trend: 'up',
    icon: Smartphone,
    color: 'text-green-600'
  },
  {
    title: ADMIN_STRINGS.DASHBOARD.APPLICATIONS,
    value: '456',
    change: '+3.1%',
    trend: 'up',
    icon: Package,
    color: 'text-orange-600'
  },
  {
    title: ADMIN_STRINGS.DASHBOARD.SYSTEM_STATUS,
    value: '99.9%',
    change: '+0.1%',
    trend: 'up',
    icon: Activity,
    color: 'text-emerald-600'
  },
];

const deviceData = [
  { name: 'Samsung', value: 45, count: 556 },
  { name: 'Apple', value: 30, count: 372 },
  { name: 'Huawei', value: 15, count: 186 },
  { name: 'Others', value: 10, count: 124 },
];

const activityData = [
  { name: 'Mon', value: 120 },
  { name: 'Tue', value: 135 },
  { name: 'Wed', value: 95 },
  { name: 'Thu', value: 165 },
  { name: 'Fri', value: 180 },
  { name: 'Sat', value: 75 },
  { name: 'Sun', value: 90 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const Dashboard: React.FC<DashboardProps> = ({ className = '' }) => {
  return (
    <div className={`space-y-6 animate-fade-in ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to Payment Gateway Admin Portal
          </p>
        </div>
        <Badge variant="secondary" className="bg-mb-blue/10 text-mb-blue border-mb-blue/20">
          Real-time Data
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-glass hover:shadow-elevated transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-sm text-green-600 font-medium">
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted/50 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Distribution */}
        <Card className="shadow-glass">
          <CardHeader>
            <CardTitle>Device Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}%`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Activity */}
        <Card className="shadow-glass">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: '#e5e7eb' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: '#e5e7eb' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--mb-blue))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Server Status
            </CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Online</div>
            <p className="text-xs text-muted-foreground">
              All services operational
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Security Alerts
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">2</div>
            <p className="text-xs text-muted-foreground">
              Pending security reviews
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              System Warnings
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">5</div>
            <p className="text-xs text-muted-foreground">
              Non-critical warnings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="shadow-glass">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { user: 'admin@mb.com', action: 'Updated device configuration', time: '2 minutes ago' },
              { user: 'system', action: 'Automatic backup completed', time: '15 minutes ago' },
              { user: 'manager@mb.com', action: 'Created new merchant group', time: '1 hour ago' },
              { user: 'admin@mb.com', action: 'Deployed software update', time: '2 hours ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-muted/30">
                <div className="h-2 w-2 rounded-full bg-mb-blue"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">by {activity.user}</p>
                </div>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
