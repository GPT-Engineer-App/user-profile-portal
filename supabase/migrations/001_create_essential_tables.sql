-- Create essential tables in Supabase

-- Table: profiles
CREATE TABLE profiles (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text NOT NULL,
    portfolio text,
    contact text,
    skills text[],
    created_at timestamp with time zone DEFAULT timezone('utc', now())
);

-- Table: services
CREATE TABLE services (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES profiles(id),
    description text NOT NULL,
    price text NOT NULL,
    category text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc', now())
);

-- Enable realtime functionality
-- Enable Realtime on the profiles table
ALTER TABLE profiles
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable select for all users"
ON profiles
FOR SELECT
USING (true);

-- Enable Realtime on the services table
ALTER TABLE services
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable select for all users"
ON services
FOR SELECT
USING (true);

-- Import data from CSV or Excel
-- This part is typically done through the Supabase dashboard or using the Supabase CLI.
-- Example command for Supabase CLI:
-- supabase db import --file path/to/your/file.csv --table profiles