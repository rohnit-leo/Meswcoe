-- Complete Supabase Database Setup for MESCOE Connect
-- Run this script in Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table for authentication and role management
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) NOT NULL DEFAULT 'prospective' CHECK (role IN ('prospective', 'current', 'alumni', 'teacher')),
  phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table for community chat
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  content TEXT NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  channel VARCHAR(100) NOT NULL DEFAULT 'general',
  anonymous BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create replies table for threaded conversations
CREATE TABLE IF NOT EXISTS replies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  parent_message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  anonymous BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table for merchandise
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  stock INTEGER DEFAULT 0,
  available_sizes TEXT[], -- Array of sizes like ['S', 'M', 'L', 'XL']
  category VARCHAR(100),
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table for merchandise purchases
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  size VARCHAR(10),
  total_amount DECIMAL(10,2) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  razorpay_payment_id VARCHAR(255),
  razorpay_order_id VARCHAR(255),
  shipping_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table for college events and notices
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_date DATE,
  event_time TIME,
  location VARCHAR(255),
  category VARCHAR(100) DEFAULT 'general',
  image_url TEXT,
  registration_required BOOLEAN DEFAULT FALSE,
  registration_link TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notices table for official announcements
CREATE TABLE IF NOT EXISTS notices (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  file_url TEXT,
  target_audience VARCHAR(100) DEFAULT 'all',
  active BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100),
  batch_year INTEGER,
  branch VARCHAR(100),
  content TEXT NOT NULL,
  image_url TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create faqs table for chatbot
CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100) DEFAULT 'general',
  tags TEXT[],
  view_count INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create calculator_submissions table
CREATE TABLE IF NOT EXISTS calculator_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  pcm_percentage DECIMAL(5,2),
  cet_score INTEGER,
  jee_score INTEGER,
  eligible_branches TEXT[],
  confidence_level VARCHAR(20),
  user_id UUID REFERENCES users(id),
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_messages_channel ON messages(channel);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_notices_active ON notices(active) WHERE active = TRUE;
CREATE INDEX IF NOT EXISTS idx_products_active ON products(active) WHERE active = TRUE;

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for security
CREATE POLICY "Users can view their own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own data" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own data" ON users FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Anyone can view messages" ON messages FOR SELECT TO authenticated;
CREATE POLICY "Authenticated users can insert messages" ON messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view replies" ON replies FOR SELECT TO authenticated;
CREATE POLICY "Authenticated users can insert replies" ON replies FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow public read access to some tables
CREATE POLICY "Anyone can view products" ON products FOR SELECT TO anon, authenticated;
CREATE POLICY "Anyone can view events" ON events FOR SELECT TO anon, authenticated;
CREATE POLICY "Anyone can view notices" ON notices FOR SELECT TO anon, authenticated;
CREATE POLICY "Anyone can view faqs" ON faqs FOR SELECT TO anon, authenticated;
CREATE POLICY "Anyone can view testimonials" ON testimonials FOR SELECT TO anon, authenticated WHERE approved = true;

-- Insert sample data
INSERT INTO products (name, description, price, image_url, stock, available_sizes, category) VALUES
('MESCOE College T-Shirt', 'Official MESCOE college t-shirt with college logo. Made from premium cotton.', 499.00, '/placeholder.svg?height=400&width=400&text=MESCOE+T-Shirt', 50, ARRAY['S', 'M', 'L', 'XL', 'XXL'], 'apparel'),
('MESCOE Hoodie', 'Comfortable hoodie perfect for campus life. Features college branding and warm fleece lining.', 899.00, '/placeholder.svg?height=400&width=400&text=MESCOE+Hoodie', 30, ARRAY['S', 'M', 'L', 'XL'], 'apparel'),
('MESCOE Coffee Mug', 'Start your day with MESCOE pride. Ceramic mug with college logo and motivational quote.', 299.00, '/placeholder.svg?height=400&width=400&text=MESCOE+Mug', 100, NULL, 'accessories'),
('MESCOE Laptop Bag', 'Durable laptop bag with college branding. Perfect for students and professionals.', 1299.00, '/placeholder.svg?height=400&width=400&text=MESCOE+Bag', 25, NULL, 'accessories'),
('MESCOE Cap', 'Stylish cap with embroidered college logo. Great for casual wear.', 399.00, '/placeholder.svg?height=400&width=400&text=MESCOE+Cap', 40, ARRAY['One Size'], 'accessories');

-- Insert sample FAQs
INSERT INTO faqs (question, answer, category, tags) VALUES
('What is the eligibility for Computer Engineering?', 'Candidates must have passed HSC (12th) with Physics, Chemistry, and Mathematics with minimum 45% marks. Valid MHT-CET or JEE Main score is required.', 'admission', ARRAY['eligibility', 'computer', 'admission']),
('What is the total tuition fee for engineering courses?', 'The total tuition fee for all UG engineering courses is ₹4.07 Lakhs for the complete 4-year program.', 'fees', ARRAY['fees', 'tuition', 'cost']),
('How many seats are available in ENTC Engineering?', 'ENTC (Electronics & Telecommunication) Engineering has 120 seats available for admission.', 'admission', ARRAY['seats', 'entc', 'electronics']),
('What is the placement record of MESCOE?', 'MESCOE has an excellent placement record with 85%+ students getting placed. Average package ranges from ₹3.8 to ₹4.5 LPA depending on the branch.', 'placement', ARRAY['placement', 'jobs', 'package']),
('Is hostel facility available?', 'Yes, MESCOE provides hostel facilities for both boys and girls with all modern amenities including Wi-Fi, mess, and recreational facilities.', 'facilities', ARRAY['hostel', 'accommodation', 'facilities']),
('What documents are required for admission?', 'Required documents include: HSC marksheet, MHT-CET/JEE scorecard, Aadhar card, passport size photos, caste certificate (if applicable), and income certificate.', 'admission', ARRAY['documents', 'admission', 'requirements']),
('Are there any scholarships available?', 'Yes, MESCOE offers various scholarships including merit-based, need-based, and government scholarships for eligible students.', 'fees', ARRAY['scholarship', 'financial aid', 'fees']);

-- Insert sample events
INSERT INTO events (title, description, event_date, event_time, location, category, registration_required) VALUES
('ACCET-2025 Technical Symposium', 'Annual technical symposium featuring competitions, workshops, and guest lectures from industry experts.', '2025-03-15', '09:00:00', 'MESCOE Campus', 'technical', true),
('RACE-2025 Cultural Festival', 'Inter-college cultural festival with music, dance, drama, and art competitions.', '2025-02-20', '10:00:00', 'MESCOE Auditorium', 'cultural', true),
('Industry Expert Lecture Series', 'Weekly lecture series by industry professionals sharing insights on latest technologies.', '2025-01-30', '14:00:00', 'Seminar Hall', 'academic', false),
('Placement Drive - TCS', 'Campus placement drive by Tata Consultancy Services for final year students.', '2025-02-05', '09:30:00', 'Placement Cell', 'placement', true);

-- Insert sample notices
INSERT INTO notices (title, content, priority, target_audience) VALUES
('Admission Process 2025-26 Started', 'The admission process for Academic Year 2025-26 has commenced. Students can apply through DTE Maharashtra CAP process.', 'high', 'all'),
('Library Timing Update', 'Library timings have been extended during examination period. New timings: 8:00 AM to 10:00 PM on weekdays.', 'normal', 'students'),
('Anti-Ragging Committee Notice', 'All students are informed that ragging is strictly prohibited. Report any incidents immediately.', 'urgent', 'students');

-- Insert sample testimonials
INSERT INTO testimonials (name, role, batch_year, branch, content, rating, approved) VALUES
('Priya Sharma', 'Alumni', 2023, 'Computer Engineering', 'MESCOE provided excellent technical education and industry exposure. The faculty support helped me secure a great job.', 5, true),
('Rahul Patil', 'Alumni', 2022, 'ENTC Engineering', 'The practical approach to learning at MESCOE prepared me well for the industry. Highly recommended!', 5, true),
('Dr. Anjali Desai', 'Faculty', NULL, 'Computer Engineering', 'Teaching at MESCOE has been rewarding. The institution encourages innovation and research.', 5, true);
