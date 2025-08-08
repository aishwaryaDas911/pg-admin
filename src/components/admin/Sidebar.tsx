import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ADMIN_STRINGS } from '@/constants/adminConstants';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import * as Icons from 'lucide-react';
import { MenuItem } from '@/types/admin';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface SidebarProps {
  menuItems: MenuItem[];
  className?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface SidebarItemProps {
  item: MenuItem;
  level?: number;
  onItemClick?: () => void;
  isCollapsed?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, level = 0, onItemClick, isCollapsed = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const hasChildren = item.children && item.children.length > 0;
  
  // Get the icon component dynamically
  const IconComponent = Icons[item.icon as keyof typeof Icons] as React.ComponentType<any>;
  
  const isActive = item.path ? location.pathname === item.path : false;
  const hasActiveChild = hasChildren && item.children?.some(child => 
    child.path === location.pathname
  );

  const handleToggle = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  if (hasChildren) {
    // Don't show expandable items when collapsed unless they're top level
    if (isCollapsed && level > 0) {
      return null;
    }

    // When collapsed, show submenu on hover
    if (isCollapsed) {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-center h-auto py-3 px-2 font-normal",
                "hover:bg-accent hover:text-accent-foreground transition-all duration-200",
                hasActiveChild && "bg-accent text-accent-foreground"
              )}
              title={item.label}
            >
              {IconComponent && <IconComponent className="h-5 w-5" />}
            </Button>
          </PopoverTrigger>
          <PopoverContent side="right" className="w-48 p-2" sideOffset={8}>
            <div className="space-y-1">
              <div className="font-medium text-sm px-2 py-1 border-b mb-2">
                {item.label}
              </div>
              {item.children?.map((child) => {
                const ChildIcon = Icons[child.icon as keyof typeof Icons] as React.ComponentType<any>;
                return (
                  <NavLink
                    key={child.id}
                    to={child.path || '#'}
                    onClick={onItemClick}
                    className={({ isActive }) => cn(
                      "flex items-center px-2 py-2 text-sm font-normal transition-all duration-200",
                      "hover:bg-accent hover:text-accent-foreground rounded-md space-x-2",
                      isActive && "bg-accent text-accent-foreground font-medium"
                    )}
                  >
                    {ChildIcon && <ChildIcon className="h-4 w-4" />}
                    <span>{child.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      );
    }

    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start h-auto py-3 px-4 font-normal text-left",
              "hover:bg-accent hover:text-accent-foreground transition-all duration-200",
              (hasActiveChild || isOpen) && "bg-accent text-accent-foreground",
              level > 0 && "ml-4"
            )}
            onClick={handleToggle}
          >
            <div className="flex items-center w-full justify-between">
              <div className="flex items-center space-x-3">
                {IconComponent && <IconComponent className="h-5 w-5" />}
                <span className="text-sm">{item.label}</span>
              </div>
              {isOpen ? (
                <ChevronDown className="h-4 w-4 transition-transform duration-200" />
              ) : (
                <ChevronRight className="h-4 w-4 transition-transform duration-200" />
              )}
            </div>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1">
          {item.children?.map((child) => (
            <SidebarItem 
              key={child.id} 
              item={child} 
              level={level + 1} 
              onItemClick={onItemClick}
              isCollapsed={isCollapsed}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <NavLink
      to={item.path || '#'}
      onClick={onItemClick}
      className={({ isActive }) => cn(
        "flex items-center py-3 text-sm font-normal transition-all duration-200",
        "hover:bg-accent hover:text-accent-foreground rounded-md mt-3",
        isActive && "bg-accent text-accent-foreground font-medium shadow-sm",
        level > 0 && "ml-4",
        isCollapsed ? "justify-center px-2 mx-2 w-12" : "px-4 mx-2 space-x-3"
      )}
      title={isCollapsed ? item.label : undefined}
    >
      {IconComponent && <IconComponent className="h-5 w-5" />}
      {!isCollapsed && <span>{item.label}</span>}
    </NavLink>
  );
};

const SidebarContent: React.FC<{ 
  menuItems: MenuItem[]; 
  onItemClick?: () => void;
  isCollapsed?: boolean;
}> = ({ 
  menuItems, 
  onItemClick,
  isCollapsed = false
}) => (
  <div className="space-y-2 py-4">
    {menuItems.map((item) => (
      <SidebarItem 
        key={item.id} 
        item={item} 
        onItemClick={onItemClick}
        isCollapsed={isCollapsed}
      />
    ))}
  </div>
);

export const Sidebar: React.FC<SidebarProps> = ({ 
  menuItems, 
  className = '', 
  isCollapsed = false, 
  onToggleCollapse 
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 z-50 lg:hidden bg-background/80 backdrop-blur-sm border"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">{ADMIN_STRINGS.NAVIGATION.DASHBOARD}</h2>
          </div>
          <ScrollArea className="h-[calc(100vh-80px)]">
            <SidebarContent 
              menuItems={menuItems} 
              onItemClick={() => setMobileOpen(false)}
            />
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden lg:block fixed left-0 top-16 bottom-0 border-r border-border",
        "bg-card shadow-glass animate-slide-in transition-all duration-300",
        isCollapsed ? "w-16" : "w-72",
        className
      )}>

        <ScrollArea className="h-full">
          <div className={cn("p-4", isCollapsed && "px-2")}>
            <SidebarContent 
              menuItems={menuItems} 
              isCollapsed={isCollapsed}
            />
          </div>
        </ScrollArea>
      </div>
    </>
  );
};
