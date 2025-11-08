'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

/**
 * useWorkspace Hook
 * 
 * Lấy workspace ID của user hiện tại
 * - Auto-create workspace nếu chưa có
 * - Cache workspace ID
 */

export function useWorkspace() {
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function getOrCreateWorkspace() {
      try {
        const supabase = createClient();
        
        // 1. Check if user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError) throw authError;
        if (!user) {
          throw new Error('User not authenticated');
        }
        
        console.log('✅ User authenticated:', user.id, user.email);
        
        // 2. Check if user has a workspace
        const { data: workspaces, error: workspaceError } = await supabase
          .from('workspaces')
          .select('id')
          .eq('owner_id', user.id)
          .limit(1);
        
        if (workspaceError) {
          console.error('Error fetching workspace:', workspaceError);
          throw workspaceError;
        }
        
        // 3. If workspace exists, use it
        if (workspaces && workspaces.length > 0) {
          console.log('📦 Found existing workspace:', workspaces[0].id);
          setWorkspaceId(workspaces[0].id);
          return;
        }
        
        // 4. Create new workspace
        console.log('🔨 Creating new workspace for user:', user.id);
        const { data: newWorkspace, error: createError } = await supabase
          .from('workspaces')
          .insert({
            name: `${user.email}'s Workspace`,
            owner_id: user.id,
          })
          .select('id')
          .single();
        
        if (createError) {
          console.error('Error creating workspace:', createError);
          throw createError;
        }
        
        console.log('✅ Created new workspace:', newWorkspace.id);
        setWorkspaceId(newWorkspace.id);
        
      } catch (err) {
        console.error('Error in getOrCreateWorkspace:', err);
        setError(err instanceof Error ? err.message : 'Failed to get workspace');
      } finally {
        setLoading(false);
      }
    }
    
    getOrCreateWorkspace();
  }, []);
  
  return { workspaceId, loading, error };
}
