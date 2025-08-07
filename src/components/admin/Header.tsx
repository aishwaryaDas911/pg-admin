import React from 'react';
import { Button } from '@/components/ui/button';
import { ADMIN_STRINGS } from '@/constants/adminConstants';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Settings, 
  User, 
  LogOut, 
  Clock,
  Timer,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { User as UserType } from '@/types/admin';

interface HeaderProps {
  user: UserType;
  onLogout: () => void;
  onProfile: () => void;
  onSettings: () => void;
  className?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onLogout,
  onProfile,
  onSettings,
  className = '',
  isCollapsed,
  onToggleCollapse
}) => {
  const formatDuration = (loginTime: Date) => {
    const now = new Date();
    const diff = now.getTime() - loginTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const formatLoginTime = (loginTime: Date) => {
    return loginTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <header className={`
      sticky top-0 z-50 w-full border-b border-border/40 
      bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60
      shadow-glass animate-fade-in
      ${className}
    `}>
      <div className="container flex h-16 items-center justify-between px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          {/* Sidebar Toggle Button */}
          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="hidden lg:flex h-8 w-8 rounded-md hover:bg-accent hover:text-accent-foreground"
            >
              {isCollapsed ? (
                <PanelLeftOpen className="h-4 w-4" />
              ) : (
                <PanelLeftClose className="h-4 w-4" />
              )}
            </Button>
          )}
          
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-mb flex items-center justify-center">
              <span className="text-white font-bold text-sm">MB</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold tracking-tight">Admin Portal</h1>
              <span className="text-xs text-muted-foreground">Mercedes-Benz</span>
            </div>
          </div>
        </div>

        {/* User Info Section */}
        <div className="flex items-center space-x-6">
          {/* User Session Info */}
          <div className="hidden md:flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-muted/50">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Login:</span>
              <span className="font-medium">{formatLoginTime(user.loginTime)}</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-muted/50">
              <Timer className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Duration:</span>
              <span className="font-medium">{formatDuration(user.loginTime)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onSettings}
              className="rounded-full hover:bg-accent hover:text-accent-foreground"
            >
              <Settings className="h-5 w-5" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-border">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback className="bg-gradient-mb text-white">
                      {user.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="end" forceMount>
                <div className="flex items-center space-x-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback className="bg-gradient-mb text-white text-xs">
                      {user.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.username}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      Administrator
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onProfile} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onSettings} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
