'use client';

import type { ComponentType } from '@/lib/stores/editor';

interface Props {
  type: ComponentType;
  props: Record<string, any>;
}

export function PlaceholderComponent({ type, props }: Props) {
  switch (type) {
    case 'TextBlock':
      return (
        <div
          className="p-4 bg-background border rounded"
          style={{
            fontSize: props.fontSize || '16px',
            color: props.color || '#000000',
          }}
        >
          {props.content || 'Enter text here...'}
        </div>
      );

    case 'Button':
      return (
        <button
          className={`
            px-4 py-2 rounded font-medium
            ${props.variant === 'destructive' ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground'}
          `}
        >
          {props.text || 'Click me'}
        </button>
      );

    case 'Container':
      return (
        <div
          className="p-4 border-2 border-dashed border-border rounded-lg bg-background"
          style={{
            padding: props.padding || '16px',
            backgroundColor: props.backgroundColor || 'transparent',
            display: 'flex',
            flexDirection: (props.flexDirection as any) || 'column',
            gap: '8px',
          }}
        >
          {/* Children will be rendered by RenderedComponent */}
        </div>
      );

    default:
      return (
        <div className="p-4 border border-destructive rounded text-destructive">
          Unknown component: {type}
        </div>
      );
  }
}
