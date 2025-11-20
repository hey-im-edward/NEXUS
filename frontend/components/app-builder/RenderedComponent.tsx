'use client';

import { useEditorStore } from '@/lib/stores/editor';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';
import { Fragment, useEffect, useRef } from 'react';
import { PlaceholderComponent } from './components/PlaceholderComponent';

interface Props {
  componentId: string;
}

export function RenderedComponent({ componentId }: Props) {
  const { components, selectedId, selectComponent, deleteComponent } = useEditorStore();
  const component = components[componentId];

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({
    id: componentId,
    data: {
      type: component?.type,
      parentId: component?.parent ?? null,
      isNew: false,
    },
  });

  const { setNodeRef: setEmptyZoneRef, isOver: isOverEmpty } = useDroppable({
    id: `${componentId}-empty`,
    data: { parentId: componentId },
    disabled: component?.type !== 'Container',
  });

  const sortableRef = useRef<HTMLElement | null>(null);

  const composedRef = (node: HTMLElement | null) => {
    setNodeRef(node);
    sortableRef.current = node;
  };

  useEffect(() => {
    if (!sortableRef.current) return;
    const el = sortableRef.current;
    const nextTransition = transition ?? '';
    const nextTransform = transform ? CSS.Transform.toString(transform) : undefined;
    el.style.transition = nextTransition;
    el.style.transform = nextTransform ?? '';
    return () => {
      if (!sortableRef.current) return;
      sortableRef.current.style.transition = '';
      sortableRef.current.style.transform = '';
    };
  }, [transform, transition]);

  if (!component) return null;

  const isSelected = selectedId === componentId;
  const isContainer = component.type === 'Container';

  return (
    <div
      ref={composedRef}
      onClick={(e) => {
        e.stopPropagation();
        selectComponent(componentId);
      }}
      data-component-id={componentId}
      data-component-type={component.type}
      data-parent-id={component.parent ?? 'root'}
      data-sortable-item
      className={`
        relative group
        ${isDragging ? 'opacity-50' : ''}
        ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}
        ${isOver && isContainer ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
      `}
    >
      {/* Component Controls - ALWAYS RENDERED for @dnd-kit */}
      {/* Use transform instead of inline opacity to hide */}
      <div 
        className={`
          absolute -top-8 left-0 flex items-center gap-1 
          bg-primary text-primary-foreground px-2 py-1 rounded text-xs
          transition-transform duration-200
          ${isSelected ? 'translate-y-0 opacity-100 z-10' : '-translate-y-4 opacity-0 -z-10 pointer-events-none'}
        `}
      >
        {/* Drag handle - @dnd-kit activator */}
        <div
          ref={setActivatorNodeRef}
          {...listeners}
          {...attributes}
          data-dnd-kit-draggable-id={componentId}
          className="flex items-center gap-1 cursor-move hover:bg-primary-foreground/10 px-1 py-0.5 rounded -mx-1"
          title="Drag to move"
        >
          <GripVertical className="h-3 w-3" />
          <span className="font-medium">{component.type}</span>
        </div>
        
        {/* Delete button - separate, not draggable */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteComponent(componentId);
          }}
          className="p-0.5 hover:bg-destructive rounded ml-1"
          title="Delete"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </div>

      {/* Render actual component */}
      <PlaceholderComponent type={component.type} props={component.props} />

      {/* Render children for Container */}
      {isContainer && (
        <div className="mt-2 pl-4 border-l-2 border-border space-y-2">
          <SortableContext
            id={componentId}
            items={component.children}
            strategy={verticalListSortingStrategy}
          >
            {component.children.map((childId) => (
              <Fragment key={`child-${childId}`}>
                <RenderedComponent componentId={childId} />
              </Fragment>
            ))}

            <div
              ref={setEmptyZoneRef}
              data-drop-zone={`container-${componentId}`}
              className={`mt-2 p-3 border-2 border-dashed rounded text-center text-xs transition-colors ${
                isOverEmpty ? 'border-primary bg-primary/10 text-primary' : 'border-border/70 text-muted-foreground'
              }`}
            >
              {component.children.length === 0
                ? 'Drop components here'
                : 'Thả vào đây để thêm component cuối danh sách'}
            </div>
          </SortableContext>
        </div>
      )}
    </div>
  );
}
