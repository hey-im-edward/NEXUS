'use client';

import { Card } from '@/components/ui/card';
import { AppMiniCardHeader } from './AppMiniCardHeader';

interface AppMiniCardProps {
  appId: string;
  appType?: 'quick-notes' | 'pomodoro' | 'today-tasks' | 'custom';
  title: string;
  icon?: React.ReactNode;
  onRemove: () => void;
  children: React.ReactNode;
  cardSize?: { w: number; h: number };
}

export function AppMiniCard({
  appId: _appId,
  appType: _appType,
  title,
  icon,
  onRemove,
  children,
  cardSize: _cardSize,
}: AppMiniCardProps) {
  return (
    <Card className="flex flex-col h-full w-full overflow-hidden gap-0 p-0">
      {/* Header với drag handle, icon, title và close button */}
      <AppMiniCardHeader
        title={title}
        icon={icon}
        onRemove={onRemove}
      />

      {/* Body - scrollable content area */}
      <div className="flex-1 p-4 overflow-auto">
        {children}
      </div>
    </Card>
  );
}
