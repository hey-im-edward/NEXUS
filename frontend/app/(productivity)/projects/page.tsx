import { CreateProjectButton } from '@/components/projects/create-project-button';
import { ProjectGrid } from '@/components/projects/project-grid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | NEXUS',
  description: 'Organize tasks into projects',
};

/**
 * PROJECTS LIST VIEW
 * Priority: 70% - Core Productivity Feature
 * 
 * Shows:
 * - All projects in workspace
 * - Project stats (task count, completion %)
 * - Quick access to project views
 * 
 * Navigation:
 * - Click project → /projects/[id] (list view)
 * - Click board icon → /projects/[id]/board (kanban)
 */
export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Organize your work into projects
          </p>
        </div>
        <CreateProjectButton />
      </div>

      {/* Projects Grid */}
      <ProjectGrid />
    </div>
  );
}
