import { ProductivityHeader } from '@/components/dashboard/productivity-header';
import { ProductivitySidebar } from '@/components/dashboard/productivity-sidebar';
import { ReactNode } from 'react';

/**
 * Layout for Productivity OS routes
 * Provides shared sidebar navigation and header
 * Routes: /today, /inbox, /upcoming, /projects, /calendar, /pages
 */
export default function ProductivityLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Navigation */}
      <ProductivitySidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header - Search, Command Palette, Profile */}
        <ProductivityHeader />

        {/* Page Content - Scrollable */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
