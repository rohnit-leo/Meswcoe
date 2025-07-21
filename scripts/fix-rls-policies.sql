-- Fix the RLS policies that failed
-- Run this to fix the testimonials policy and ensure all policies are correct

-- Drop the failed policy if it exists
DROP POLICY IF EXISTS "Anyone can view testimonials" ON testimonials;

-- Create the correct RLS policies
CREATE POLICY "Anyone can view approved testimonials" ON testimonials 
FOR SELECT TO anon, authenticated 
USING (approved = true);

-- Ensure all other policies are created correctly
CREATE POLICY "Anyone can view products" ON products 
FOR SELECT TO anon, authenticated 
USING (active = true);

CREATE POLICY "Anyone can view events" ON events 
FOR SELECT TO anon, authenticated 
USING (true);

CREATE POLICY "Anyone can view notices" ON notices 
FOR SELECT TO anon, authenticated 
USING (active = true);

CREATE POLICY "Anyone can view faqs" ON faqs 
FOR SELECT TO anon, authenticated 
USING (true);

-- Allow authenticated users to submit calculator data
CREATE POLICY "Anyone can submit calculator data" ON calculator_submissions 
FOR INSERT TO anon, authenticated 
WITH CHECK (true);

-- Check if all tables exist and create missing ones if needed
DO $$
BEGIN
    -- Check and create campus_images table if it doesn't exist
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'campus_images') THEN
        CREATE TABLE campus_images (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            image_url TEXT NOT NULL,
            category VARCHAR(100),
            hotspots JSONB,
            display_order INTEGER DEFAULT 0,
            active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Insert sample campus images
        INSERT INTO campus_images (title, description, image_url, category, display_order) VALUES
        ('Main Building Entrance', 'The iconic entrance of MESCOE with modern architecture', '/placeholder.svg?height=600&width=800&text=Main+Building', 'building', 1),
        ('Computer Engineering Lab', 'State-of-the-art computer lab with latest hardware and software', '/placeholder.svg?height=600&width=800&text=Computer+Lab', 'lab', 2),
        ('ENTC Electronics Lab', 'Well-equipped electronics laboratory with advanced testing equipment', '/placeholder.svg?height=600&width=800&text=Electronics+Lab', 'lab', 3),
        ('Central Library', 'Spacious library with extensive collection of books and resources', '/placeholder.svg?height=600&width=800&text=Library', 'facility', 4),
        ('Sports Ground', 'Large sports ground for cricket, football, and outdoor activities', '/placeholder.svg?height=600&width=800&text=Sports+Ground', 'sports', 5),
        ('Robotics Workshop', 'Dedicated workshop for robotics and automation projects', '/placeholder.svg?height=600&width=800&text=Robotics+Lab', 'lab', 6);
        
        -- Create policy for campus images
        CREATE POLICY "Anyone can view campus images" ON campus_images 
        FOR SELECT TO anon, authenticated 
        USING (active = true);
    END IF;

    -- Check and create unanswered_questions table if it doesn't exist
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'unanswered_questions') THEN
        CREATE TABLE unanswered_questions (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            question TEXT NOT NULL,
            user_id UUID REFERENCES users(id),
            category VARCHAR(100),
            status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'answered', 'ignored')),
            admin_response TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Create policy for unanswered questions
        CREATE POLICY "Users can submit questions" ON unanswered_questions 
        FOR INSERT TO anon, authenticated 
        WITH CHECK (true);
        
        CREATE POLICY "Users can view their questions" ON unanswered_questions 
        FOR SELECT TO authenticated 
        USING (user_id = auth.uid());
    END IF;
END $$;

-- Enable realtime for messages table (for chat functionality)
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE replies;

-- Create additional indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_messages_user_id ON messages(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(approved) WHERE approved = true;

-- Verify all tables exist
SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables 
WHERE tablename IN (
    'users', 'messages', 'replies', 'products', 'orders', 
    'events', 'notices', 'testimonials', 'faqs', 
    'calculator_submissions', 'campus_images', 'unanswered_questions'
) 
ORDER BY tablename;
