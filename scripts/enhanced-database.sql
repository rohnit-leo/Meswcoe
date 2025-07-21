-- Enhanced Database Schema with Additional Features
-- Run this to add more tables and features

-- Update users table with additional fields
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(20);
ALTER TABLE users ADD COLUMN IF NOT EXISTS branch VARCHAR(100);
ALTER TABLE users ADD COLUMN IF NOT EXISTS batch_year INTEGER;
ALTER TABLE users ADD COLUMN IF NOT EXISTS city VARCHAR(100);
ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_image_url TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS linkedin_url TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS github_url TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  achievement_type VARCHAR(50) DEFAULT 'general', -- academic, sports, cultural, technical
  date_achieved DATE,
  certificate_url TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_skills table
CREATE TABLE IF NOT EXISTS user_skills (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  skill_name VARCHAR(100) NOT NULL,
  proficiency_level VARCHAR(20) DEFAULT 'beginner', -- beginner, intermediate, advanced, expert
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, skill_name)
);

-- Create job_postings table
CREATE TABLE IF NOT EXISTS job_postings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  company_logo_url TEXT,
  description TEXT NOT NULL,
  requirements TEXT,
  location VARCHAR(255),
  job_type VARCHAR(50) DEFAULT 'full-time', -- full-time, part-time, internship, contract
  experience_level VARCHAR(50) DEFAULT 'entry', -- entry, mid, senior
  salary_range VARCHAR(100),
  application_deadline DATE,
  application_url TEXT,
  contact_email VARCHAR(255),
  posted_by UUID REFERENCES users(id),
  active BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  job_id UUID REFERENCES job_postings(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  resume_url TEXT,
  cover_letter TEXT,
  status VARCHAR(50) DEFAULT 'applied', -- applied, shortlisted, interviewed, selected, rejected
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(job_id, user_id)
);

-- Create study_materials table
CREATE TABLE IF NOT EXISTS study_materials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  subject VARCHAR(100) NOT NULL,
  branch VARCHAR(100),
  semester INTEGER,
  material_type VARCHAR(50) DEFAULT 'notes', -- notes, books, videos, assignments, papers
  file_url TEXT,
  download_count INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0.0,
  uploaded_by UUID REFERENCES users(id),
  approved BOOLEAN DEFAULT FALSE,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create material_ratings table
CREATE TABLE IF NOT EXISTS material_ratings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  material_id UUID REFERENCES study_materials(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(material_id, user_id)
);

-- Create clubs table
CREATE TABLE IF NOT EXISTS clubs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  club_type VARCHAR(50) DEFAULT 'technical', -- technical, cultural, sports, social
  logo_url TEXT,
  president_id UUID REFERENCES users(id),
  vice_president_id UUID REFERENCES users(id),
  secretary_id UUID REFERENCES users(id),
  faculty_coordinator_id UUID REFERENCES users(id),
  established_year INTEGER,
  member_count INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  contact_email VARCHAR(255),
  social_links JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create club_members table
CREATE TABLE IF NOT EXISTS club_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  club_id UUID REFERENCES clubs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'member', -- member, coordinator, executive
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  active BOOLEAN DEFAULT TRUE,
  UNIQUE(club_id, user_id)
);

-- Create club_events table
CREATE TABLE IF NOT EXISTS club_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  club_id UUID REFERENCES clubs(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_date DATE,
  event_time TIME,
  location VARCHAR(255),
  event_type VARCHAR(50) DEFAULT 'workshop', -- workshop, seminar, competition, social
  registration_required BOOLEAN DEFAULT FALSE,
  registration_fee DECIMAL(10,2) DEFAULT 0.00,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  image_url TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create event_registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES club_events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed
  payment_id VARCHAR(255),
  attended BOOLEAN DEFAULT FALSE,
  certificate_issued BOOLEAN DEFAULT FALSE,
  UNIQUE(event_id, user_id)
);

-- Create alumni_directory table
CREATE TABLE IF NOT EXISTS alumni_directory (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  current_company VARCHAR(255),
  current_position VARCHAR(255),
  industry VARCHAR(100),
  experience_years INTEGER,
  achievements TEXT,
  mentoring_available BOOLEAN DEFAULT FALSE,
  contact_preference VARCHAR(50) DEFAULT 'email', -- email, linkedin, phone
  visibility VARCHAR(50) DEFAULT 'public', -- public, alumni_only, private
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create mentorship_requests table
CREATE TABLE IF NOT EXISTS mentorship_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  mentor_id UUID REFERENCES users(id) ON DELETE CASCADE,
  mentee_id UUID REFERENCES users(id) ON DELETE CASCADE,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, accepted, declined, completed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create research_papers table
CREATE TABLE IF NOT EXISTS research_papers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  abstract TEXT,
  authors TEXT[] NOT NULL,
  faculty_guide UUID REFERENCES users(id),
  department VARCHAR(100),
  publication_date DATE,
  journal_name VARCHAR(255),
  doi VARCHAR(255),
  pdf_url TEXT,
  keywords TEXT[],
  citation_count INTEGER DEFAULT 0,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create internship_opportunities table
CREATE TABLE IF NOT EXISTS internship_opportunities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  duration_months INTEGER,
  stipend_amount DECIMAL(10,2),
  location VARCHAR(255),
  application_deadline DATE,
  contact_email VARCHAR(255),
  posted_by UUID REFERENCES users(id),
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feedback_suggestions table
CREATE TABLE IF NOT EXISTS feedback_suggestions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  category VARCHAR(100) NOT NULL, -- website, academics, facilities, events
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  priority VARCHAR(20) DEFAULT 'medium', -- low, medium, high
  status VARCHAR(50) DEFAULT 'submitted', -- submitted, under_review, in_progress, resolved, closed
  admin_response TEXT,
  upvotes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notification_preferences table
CREATE TABLE IF NOT EXISTS notification_preferences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  email_notifications BOOLEAN DEFAULT TRUE,
  push_notifications BOOLEAN DEFAULT TRUE,
  sms_notifications BOOLEAN DEFAULT FALSE,
  event_reminders BOOLEAN DEFAULT TRUE,
  job_alerts BOOLEAN DEFAULT TRUE,
  club_updates BOOLEAN DEFAULT TRUE,
  academic_updates BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Insert sample data for new tables

-- Sample clubs
INSERT INTO clubs (name, description, club_type, established_year, contact_email) VALUES
('IEEE MESCOE Student Branch', 'IEEE Student Branch promoting technical excellence and innovation', 'technical', 2005, 'ieee@mescoe.org'),
('MESCOE Cultural Club', 'Promoting arts, culture, and creative expression among students', 'cultural', 2000, 'cultural@mescoe.org'),
('Robotics Club', 'Hands-on robotics projects and competitions', 'technical', 2010, 'robotics@mescoe.org'),
('Photography Club', 'Capturing moments and developing photography skills', 'cultural', 2015, 'photography@mescoe.org');

-- Sample job postings
INSERT INTO job_postings (title, company_name, description, location, job_type, salary_range, application_deadline) VALUES
('Software Developer Intern', 'TechCorp Solutions', 'Join our development team to work on cutting-edge web applications', 'Pune, Maharashtra', 'internship', '₹15,000 - ₹25,000/month', '2025-03-15'),
('Junior Data Analyst', 'DataInsights Pvt Ltd', 'Analyze data trends and create meaningful insights for business decisions', 'Mumbai, Maharashtra', 'full-time', '₹3.5 - ₹5.0 LPA', '2025-02-28'),
('Mechanical Design Engineer', 'AutoTech Industries', 'Design and develop automotive components using CAD software', 'Pune, Maharashtra', 'full-time', '₹4.0 - ₹6.0 LPA', '2025-03-10');

-- Sample study materials
INSERT INTO study_materials (title, description, subject, branch, semester, material_type, approved) VALUES
('Data Structures and Algorithms Notes', 'Comprehensive notes covering all DSA topics with examples', 'Data Structures', 'Computer Engineering', 3, 'notes', true),
('Digital Electronics Lab Manual', 'Complete lab manual with circuit diagrams and procedures', 'Digital Electronics', 'ENTC Engineering', 2, 'notes', true),
('Engineering Mathematics Question Bank', 'Previous year questions and solutions for Engineering Mathematics', 'Mathematics', 'All Branches', 1, 'papers', true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_branch ON users(branch);
CREATE INDEX IF NOT EXISTS idx_users_batch_year ON users(batch_year);
CREATE INDEX IF NOT EXISTS idx_job_postings_active ON job_postings(active) WHERE active = TRUE;
CREATE INDEX IF NOT EXISTS idx_study_materials_approved ON study_materials(approved) WHERE approved = TRUE;
CREATE INDEX IF NOT EXISTS idx_study_materials_branch ON study_materials(branch);
CREATE INDEX IF NOT EXISTS idx_club_events_date ON club_events(event_date);
CREATE INDEX IF NOT EXISTS idx_alumni_directory_company ON alumni_directory(current_company);

-- Create RLS policies for new tables
CREATE POLICY "Anyone can view approved study materials" ON study_materials FOR SELECT TO anon, authenticated USING (approved = true);
CREATE POLICY "Users can upload study materials" ON study_materials FOR INSERT TO authenticated WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Anyone can view active job postings" ON job_postings FOR SELECT TO anon, authenticated USING (active = true);
CREATE POLICY "Authenticated users can apply for jobs" ON job_applications FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view clubs" ON clubs FOR SELECT TO anon, authenticated USING (active = true);
CREATE POLICY "Club members can view member info" ON club_members FOR SELECT TO authenticated;

CREATE POLICY "Anyone can view public alumni profiles" ON alumni_directory FOR SELECT TO anon, authenticated USING (visibility = 'public');

CREATE POLICY "Users can submit feedback" ON feedback_suggestions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Users can view their own feedback" ON feedback_suggestions FOR SELECT TO authenticated USING (user_id = auth.uid());

-- Enable realtime for new tables
ALTER PUBLICATION supabase_realtime ADD TABLE job_postings;
ALTER PUBLICATION supabase_realtime ADD TABLE club_events;
ALTER PUBLICATION supabase_realtime ADD TABLE feedback_suggestions;

-- Update existing tables with sample data
UPDATE products SET stock = stock + 25 WHERE stock < 10;

-- Add more sample events
INSERT INTO events (title, description, event_date, event_time, location, category, registration_required) VALUES
('Tech Talk: AI in Engineering', 'Expert session on applications of AI in various engineering domains', '2025-02-15', '15:00:00', 'Auditorium', 'technical', true),
('Alumni Meet 2025', 'Annual alumni gathering with networking and cultural programs', '2025-03-01', '10:00:00', 'Campus Grounds', 'alumni', true),
('Hackathon 2025', '48-hour coding competition with exciting prizes', '2025-02-22', '09:00:00', 'Computer Lab', 'competition', true);

-- Verify all tables are created
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;
