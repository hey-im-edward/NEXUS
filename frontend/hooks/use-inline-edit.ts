import { useState, useRef, useCallback, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

/**
 * useInlineEdit Hook
 * Priority: 70% - Core Productivity Feature
 * 
 * Reusable hook for inline editing functionality
 * Used for: Task titles, project names, page titles, etc.
 * 
 * Features:
 * - Auto-focus and select text on edit
 * - Save on Enter or Blur
 * - Cancel on ESC
 * - Validation support
 * - Loading state
 * - Error handling
 */

interface UseInlineEditProps {
  initialValue: string;
  onSave: (value: string) => Promise<void>;
  validate?: (value: string) => boolean;
  maxLength?: number;
  minLength?: number;
}

interface UseInlineEditReturn {
  isEditing: boolean;
  editValue: string;
  isSaving: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleStartEdit: () => void;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  setEditValue: (value: string) => void;
}

export function useInlineEdit({
  initialValue,
  onSave,
  validate,
  maxLength = 200,
  minLength = 1,
}: UseInlineEditProps): UseInlineEditReturn {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(initialValue);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Sync editValue when initialValue changes (task updated from elsewhere)
  useEffect(() => {
    if (!isEditing) {
      setEditValue(initialValue);
    }
  }, [initialValue, isEditing]);
  
  const handleStartEdit = useCallback(() => {
    setIsEditing(true);
    setEditValue(initialValue); // Reset to current value
    
    // Focus and select text after render
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  }, [initialValue]);
  
  const handleSave = useCallback(async () => {
    if (!isEditing) return;
    
    const trimmed = editValue.trim();
    
    // Validate length
    if (trimmed.length < minLength) {
      toast({
        title: 'Validation Error',
        description: `Text must be at least ${minLength} character${minLength > 1 ? 's' : ''}.`,
        variant: 'destructive',
      });
      setEditValue(initialValue); // Reset
      setIsEditing(false);
      return;
    }
    
    if (trimmed.length > maxLength) {
      toast({
        title: 'Validation Error',
        description: `Text is too long (max ${maxLength} characters).`,
        variant: 'destructive',
      });
      return; // Keep editing to let user fix
    }
    
    // Custom validation
    if (validate && !validate(trimmed)) {
      setEditValue(initialValue); // Reset
      setIsEditing(false);
      return;
    }
    
    // No change, just exit
    if (trimmed === initialValue.trim()) {
      setIsEditing(false);
      return;
    }
    
    // Save
    setIsSaving(true);
    try {
      await onSave(trimmed);
      setIsEditing(false);
      toast({
        title: 'Saved',
        description: 'Changes saved successfully.',
      });
    } catch (error) {
      // Revert on error
      console.error('Save failed:', error);
      setEditValue(initialValue);
      toast({
        title: 'Save Failed',
        description: 'Failed to save changes. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  }, [isEditing, editValue, initialValue, onSave, validate, minLength, maxLength]);
  
  const handleCancel = useCallback(() => {
    setEditValue(initialValue);
    setIsEditing(false);
  }, [initialValue]);
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  }, [handleSave, handleCancel]);
  
  return {
    isEditing,
    editValue,
    isSaving,
    inputRef,
    handleStartEdit,
    handleSave,
    handleCancel,
    handleKeyDown,
    setEditValue,
  };
}
