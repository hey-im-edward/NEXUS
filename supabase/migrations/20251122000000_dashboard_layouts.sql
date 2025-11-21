-- Migration: Dashboard Layouts Table
-- Created: 2025-11-22
-- Description: Table to store user dashboard layouts with drag-drop positions

-- Create user_dashboard_layouts table
CREATE TABLE IF NOT EXISTS user_dashboard_layouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  dashboard_name TEXT NOT NULL DEFAULT 'Main',
  layout_data JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, dashboard_name)
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_dashboard_layouts_user_id 
ON user_dashboard_layouts(user_id);

CREATE INDEX IF NOT EXISTS idx_user_dashboard_layouts_user_dashboard 
ON user_dashboard_layouts(user_id, dashboard_name);

-- Enable Row Level Security
ALTER TABLE user_dashboard_layouts ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can manage their own dashboard layouts
CREATE POLICY "Users can manage their own dashboard layouts"
ON user_dashboard_layouts
FOR ALL
USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_user_dashboard_layouts_updated_at
BEFORE UPDATE ON user_dashboard_layouts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Insert comment for documentation
COMMENT ON TABLE user_dashboard_layouts IS 'Stores user dashboard layouts with drag-drop positions in JSONB format';
COMMENT ON COLUMN user_dashboard_layouts.layout_data IS 'JSONB array of layout items: [{ i, x, y, w, h, minW, minH }]';
