'use client';

/**
 * ProjectGrid Component - Placeholder
 * TODO Week 5: Implement full project grid with stats
 */

export function ProjectGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="border rounded-lg p-4 bg-card">
        <p className="text-sm text-muted-foreground">No projects yet. Create your first project.</p>
      </div>
    </div>
  );
}
