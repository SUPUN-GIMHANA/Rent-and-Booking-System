import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  LayoutDashboard,
  Package,
  Plus,
  BarChart3,
  MessageSquare,
  Menu,
  Home,
  Settings,
  Zap,
  Megaphone
} from 'lucide-react';

const navigation = [
  {
    name: 'Dashboard',
    href: '/index1',
    icon: LayoutDashboard
  },
  {
    name: 'Manage Items',
    href: '/manage-items',
    icon: Package
  },
  {
    name: 'Add Advertisement',
    href: '/add-advertisement',
    icon: Plus
  },
  {
    name: 'Boost Advertisement',
    href: '/boost-advertisement',
    icon: Zap
  },
  {
    name: 'Commercial Ads',
    href: '/commercial-ads',
    icon: Megaphone
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart3
  },
  {
    name: 'Comments',
    href: '/comments',
    icon: MessageSquare
  }
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Home className="h-6 w-6" />
          <span>Admin Panel</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  isActive && 'bg-muted text-primary'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
      <div className="mt-auto p-4">
        <Button variant="outline" size="sm" className="w-full">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn('hidden border-r bg-muted/40 md:block', className)}>
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden fixed top-4 left-4 z-40"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}