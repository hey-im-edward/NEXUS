'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

/**
 * CreateProjectButton Component - Placeholder
 * TODO Week 5: Implement project creation modal
 */

export function CreateProjectButton() {
  return (
    <Button>
      <Plus className="h-4 w-4 mr-2" />
      New Project
    </Button>
  );
}
