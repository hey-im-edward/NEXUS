-- Migration: Add Documents Table for Tiptap Editor
-- Created: November 7, 2025
-- Purpose: Support rich text documents (Notion-like pages)

-- ============================================
-- DOCUMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
  
  -- Document metadata
  title TEXT DEFAULT 'Untitled Document' NOT NULL,
  content TEXT DEFAULT '', -- HTML content from Tiptap editor
  
  -- Organization
  parent_id UUID REFERENCES public.documents(id) ON DELETE CASCADE, -- for nested docs
  position INTEGER DEFAULT 0, -- order in sidebar
  
  -- Permissions
  is_public BOOLEAN DEFAULT FALSE,
  
  -- Tracking
  created_by UUID REFERENCES public.profiles(id) NOT NULL,
  last_edited_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Version history (future)
  version INTEGER DEFAULT 1
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_documents_workspace ON public.documents(workspace_id);
CREATE INDEX idx_documents_parent ON public.documents(parent_id);
CREATE INDEX idx_documents_creator ON public.documents(created_by);
CREATE INDEX idx_documents_position ON public.documents(workspace_id, position);

-- Full-text search on title and content
CREATE INDEX idx_documents_search ON public.documents USING GIN (
  to_tsvector('english', title || ' ' || content)
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Members can view workspace documents
CREATE POLICY "Members can view workspace documents" 
  ON public.documents FOR SELECT 
  USING (
    workspace_id IN (
      SELECT workspace_id FROM workspace_members 
      WHERE user_id = auth.uid()
    ) OR is_public = TRUE
  );

-- Members can create documents
CREATE POLICY "Members can create documents" 
  ON public.documents FOR INSERT 
  WITH CHECK (
    created_by = auth.uid() AND
    workspace_id IN (
      SELECT workspace_id FROM workspace_members 
      WHERE user_id = auth.uid()
    )
  );

-- Members can update documents
CREATE POLICY "Members can update documents" 
  ON public.documents FOR UPDATE 
  USING (
    workspace_id IN (
      SELECT workspace_id FROM workspace_members 
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin', 'member')
    )
  );

-- Owners and admins can delete documents
CREATE POLICY "Admins can delete documents" 
  ON public.documents FOR DELETE 
  USING (
    created_by = auth.uid() OR
    workspace_id IN (
      SELECT workspace_id FROM workspace_members 
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- ============================================
-- TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE TRIGGER update_documents_updated_at
  BEFORE UPDATE ON public.documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to get document tree (nested structure)
CREATE OR REPLACE FUNCTION get_document_tree(workspace_uuid UUID)
RETURNS TABLE (
  id UUID,
  title TEXT,
  parent_id UUID,
  position INTEGER,
  level INTEGER
) AS $$
  WITH RECURSIVE doc_tree AS (
    -- Base case: root documents
    SELECT 
      d.id,
      d.title,
      d.parent_id,
      d.position,
      0 as level
    FROM documents d
    WHERE d.workspace_id = workspace_uuid 
      AND d.parent_id IS NULL
    
    UNION ALL
    
    -- Recursive case: child documents
    SELECT 
      d.id,
      d.title,
      d.parent_id,
      d.position,
      dt.level + 1
    FROM documents d
    INNER JOIN doc_tree dt ON d.parent_id = dt.id
    WHERE d.workspace_id = workspace_uuid
  )
  SELECT * FROM doc_tree
  ORDER BY parent_id NULLS FIRST, position;
$$ LANGUAGE sql STABLE;

-- ============================================
-- NOTES
-- ============================================

/*
Usage Example:

1. Create a new document:
INSERT INTO documents (workspace_id, title, content, created_by)
VALUES ('workspace-uuid', 'My First Doc', '<p>Hello world</p>', 'user-uuid');

2. Create nested document:
INSERT INTO documents (workspace_id, parent_id, title, content, created_by)
VALUES ('workspace-uuid', 'parent-doc-uuid', 'Child Doc', '<p>Nested content</p>', 'user-uuid');

3. Get document tree:
SELECT * FROM get_document_tree('workspace-uuid');

4. Full-text search:
SELECT * FROM documents 
WHERE to_tsvector('english', title || ' ' || content) @@ to_tsquery('search & term');
*/
