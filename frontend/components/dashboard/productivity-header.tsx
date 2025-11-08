'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Search, Settings } from 'lucide-react';

/**
 * ProductivityHeader Component
 * Top bar with search, notifications, settings
 */

export function ProductivityHeader() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-6">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search tasks, pages... (Ctrl+K)"
          className="pl-10"
        />
      </div>
      
      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
