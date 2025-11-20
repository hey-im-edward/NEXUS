'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEditorStore } from '@/lib/stores/editor';

const HEX_COLOR_REGEX = /^#([0-9A-Fa-f]{6})$/;

function getValidHex(value: string | undefined, fallback: string) {
  return typeof value === 'string' && HEX_COLOR_REGEX.test(value.trim())
    ? value
    : fallback;
}

export function PropertiesPanel() {
  const { components, selectedId, updateComponent } = useEditorStore();
  const selectedComponent = selectedId ? components[selectedId] : null;

  if (!selectedComponent) {
    return (
      <div className="w-80 border-l p-4 bg-background">
        <h2 className="font-semibold text-lg mb-4">Properties</h2>
        <div className="text-sm text-muted-foreground text-center py-8">
          <p>No component selected</p>
          <p className="mt-2">Click on a component to edit its properties</p>
        </div>
      </div>
    );
  }

  const { type, props } = selectedComponent;

  const handlePropChange = (key: string, value: any) => {
    if (!selectedId) return;
    updateComponent(selectedId, {
      props: {
        ...props,
        [key]: value,
      },
    });
  };

  return (
    <div className="w-80 border-l p-4 bg-background overflow-y-auto">
      <div className="mb-4">
        <h2 className="font-semibold text-lg mb-1">Properties</h2>
        <p className="text-xs text-muted-foreground">{type}</p>
      </div>

      <div className="space-y-4">
        {type === 'TextBlock' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Input
                id="content"
                value={props.content || ''}
                onChange={(e) => handlePropChange('content', e.target.value)}
                placeholder="Enter text..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fontSize">Font Size</Label>
              <Input
                id="fontSize"
                value={props.fontSize || '16px'}
                onChange={(e) => handlePropChange('fontSize', e.target.value)}
                placeholder="16px"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                type="color"
                value={getValidHex(props.color, '#000000')}
                onChange={(e) => handlePropChange('color', e.target.value)}
              />
            </div>
          </>
        )}

        {type === 'Button' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="text">Button Text</Label>
              <Input
                id="text"
                value={props.text || ''}
                onChange={(e) => handlePropChange('text', e.target.value)}
                placeholder="Click me"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="variant">Variant</Label>
              <Select
                value={props.variant || 'default'}
                onValueChange={(value: string) => handlePropChange('variant', value)}
              >
                <SelectTrigger id="variant">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="destructive">Destructive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {type === 'Container' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="padding">Padding</Label>
              <Input
                id="padding"
                value={props.padding || '16px'}
                onChange={(e) => handlePropChange('padding', e.target.value)}
                placeholder="16px"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="flexDirection">Flex Direction</Label>
              <Select
                value={props.flexDirection || 'column'}
                onValueChange={(value: string) => handlePropChange('flexDirection', value)}
              >
                <SelectTrigger id="flexDirection">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="column">Column</SelectItem>
                  <SelectItem value="row">Row</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="backgroundColor">Background Color</Label>
              <Input
                id="backgroundColor"
                type="color"
                value={getValidHex(props.backgroundColor, '#ffffff')}
                onChange={(e) => handlePropChange('backgroundColor', e.target.value)}
              />
            </div>
          </>
        )}
      </div>

      <div className="mt-6 pt-4 border-t text-xs text-muted-foreground">
        <p className="font-medium mb-1">Component ID</p>
        <code className="bg-muted px-2 py-1 rounded text-xs">{selectedId}</code>
      </div>
    </div>
  );
}
