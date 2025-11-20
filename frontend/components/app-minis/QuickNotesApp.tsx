'use client';

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
import { Textarea } from '@/components/ui/textarea';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'nexus-quick-notes';

export function QuickNotesApp() {
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text, 500);

  // Load từ localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setText(saved);
  }, []);

  // Save vào localStorage khi text change (debounced)
  useEffect(() => {
    if (debouncedText !== null && debouncedText !== undefined) {
      localStorage.setItem(STORAGE_KEY, debouncedText);
    }
  }, [debouncedText]);

  const handleClear = () => {
    setText('');
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="flex flex-col h-full gap-2">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Quick notes..."
        className="flex-1 resize-none"
      />
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{text.length} characters</span>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" disabled={!text}>
              Clear
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear notes?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete your quick notes. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleClear}>Clear</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
