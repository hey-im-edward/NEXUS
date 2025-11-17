-- Create user_dashboard_layouts table for storing dashboard grid layouts
-- This table stores the layout configuration for each user's dashboard

CREATE TABLE IF NOT EXISTS user_dashboard_layouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  dashboard_name TEXT NOT NULL DEFAULT 'Main',
  layout_data JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, dashboard_name)
);

-- Add index for faster queries
CREATE INDEX idx_user_dashboard_layouts_user_id ON user_dashboard_layouts(user_id);
CREATE INDEX idx_user_dashboard_layouts_dashboard_name ON user_dashboard_layouts(user_id, dashboard_name);

-- Enable Row Level Security
ALTER TABLE user_dashboard_layouts ENABLE ROW LEVEL SECURITY;

-- Create RLS policy: Users can only manage their own dashboard layouts
CREATE POLICY "Users can manage their own dashboard layouts"
ON user_dashboard_layouts
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Add helpful comment
COMMENT ON TABLE user_dashboard_layouts IS 'Stores user dashboard grid layout configurations with drag-and-drop positions';
COMMENT ON COLUMN user_dashboard_layouts.layout_data IS 'JSONB array storing react-grid-layout configuration: [{i, x, y, w, h, minW, minH, maxW, maxH}]';
