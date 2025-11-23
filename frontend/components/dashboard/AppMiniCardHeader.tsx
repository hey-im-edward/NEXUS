'use client';

import { GripVertical, X } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface AppMiniCardHeaderProps {
  title: string;
  icon?: React.ReactNode;
  onRemove: () => void;
}

export function AppMiniCardHeader({ title, icon, onRemove }: AppMiniCardHeaderProps) {
  return (
    <div className="flex items-center gap-2 h-10 px-3 border-b bg-muted/30">
      {/* Drag Handle - ẩn trên mobile */}
      <div className="drag-handle hidden sm:flex cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors">
        <GripVertical className="w-4 h-4" />
      </div>

      {/* Icon */}
      {icon && (
        <div className="flex items-center justify-center w-5 h-5 text-muted-foreground">
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className="flex-1 min-w-0 text-sm font-medium truncate">
        {title}
      </h3>

      {/* Close Button với AlertDialog */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-sm opacity-70 hover:opacity-100 transition-opacity shrink-0"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Xóa app</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa <strong>{title}</strong> khỏi dashboard?
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={onRemove}>
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
