'use client';

import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/lib/stores/editor';
import { Eye, Redo, Save, Trash2, Undo } from 'lucide-react';

export function Toolbar() {
  const { undo, redo, canUndo, canRedo, clear, components } = useEditorStore();
  const hasComponents = Object.keys(components).length > 0;

  const handleSave = () => {
    const appDefinition = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      components,
    };
    
    console.log('💾 Save app definition:', appDefinition);
    
    // TODO: Save to database
    alert('Save functionality not implemented yet');
  };

  const handlePreview = () => {
    console.log('👁️ Preview app');
    // TODO: Open preview in new window
    alert('Preview functionality not implemented yet');
  };

  const handleClear = () => {
    if (hasComponents && confirm('Are you sure you want to clear the canvas?')) {
      clear();
    }
  };

  return (
    <div className="border-b p-4 bg-background flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => undo()}
          disabled={!canUndo()}
          title="Undo (Ctrl+Z)"
        >
          <Undo className="h-4 w-4 mr-2" />
          Undo
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => redo()}
          disabled={!canRedo()}
          title="Redo (Ctrl+Y)"
        >
          <Redo className="h-4 w-4 mr-2" />
          Redo
        </Button>

        <div className="w-px h-6 bg-border mx-2" />

        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
          disabled={!hasComponents}
          title="Clear canvas"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreview}
          disabled={!hasComponents}
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>

        <Button
          size="sm"
          onClick={handleSave}
          disabled={!hasComponents}
        >
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </div>
    </div>
  );
}
