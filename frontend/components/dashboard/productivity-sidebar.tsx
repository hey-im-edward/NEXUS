'use client';

import { cn } from '@/lib/utils';
import {
    Calendar,
    Clock,
    FileText,
    Folder,
    Inbox,
    LayoutDashboard,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * ProductivitySidebar Component
 * Shared navigation for Productivity OS routes
 */

const NAV_ITEMS = [
  {
    label: 'Today',
    href: '/today',
    icon: Clock,
    description: 'My Day',
  },
  {
    label: 'Inbox',
    href: '/inbox',
    icon: Inbox,
    description: 'Capture everything',
  },
  {
    label: 'Upcoming',
    href: '/upcoming',
    icon: Calendar,
    description: 'Next 7 days',
  },
  {
    label: 'Projects',
    href: '/projects',
    icon: Folder,
    description: 'Organize tasks',
  },
  {
    label: 'Calendar',
    href: '/calendar',
    icon: Calendar,
    description: 'Time blocks',
  },
  {
    label: 'Pages',
    href: '/pages',
    icon: FileText,
    description: 'Notion-like docs',
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'App Minis',
  },
];

export function ProductivitySidebar() {
  const pathname = usePathname();
  
  return (
    <aside className="w-64 border-r bg-card">
      <div className="flex h-14 items-center border-b px-4">
        <h1 className="text-xl font-bold">NEXUS</h1>
      </div>
      
      <nav className="space-y-1 p-3">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="truncate">{item.label}</div>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
