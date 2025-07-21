-- Insert sample products for merchandise store
INSERT INTO products (name, description, price, image_url, stock, available_sizes, category) VALUES
('MESCOE College T-Shirt', 'Official MESCOE college t-shirt with college logo. Made from premium cotton.', 499.00, '/placeholder.svg?height=400&width=400', 50, ARRAY['S', 'M', 'L', 'XL', 'XXL'], 'apparel'),
('MESCOE Hoodie', 'Comfortable hoodie perfect for campus life. Features college branding and warm fleece lining.', 899.00, '/placeholder.svg?height=400&width=400', 30, ARRAY['S', 'M', 'L', 'XL'], 'apparel'),
('MESCOE Coffee Mug', 'Start your day with MESCOE pride. Ceramic mug with college logo and motivational quote.', 299.00, '/placeholder.svg?height=400&width=400', 100, NULL, 'accessories');

-- Insert sample FAQs
INSERT INTO faqs (question, answer, category, tags) VALUES
('What is the eligibility for Computer Engineering?', 'Candidates must have passed HSC (12th) with Physics, Chemistry, and Mathematics with minimum 45% marks. Valid MHT-CET or JEE Main score is required.', 'admission', ARRAY['eligibility', 'computer', 'admission']),
('What is the total tuition fee for engineering courses?', 'The total tuition fee for all UG engineering courses is ₹4.07 Lakhs for the complete 4-year program.', 'fees', ARRAY['fees', 'tuition', 'cost']),
('How many seats are available in ENTC Engineering?', 'ENTC (Electronics & Telecommunication) Engineering has 120 seats available for admission.', 'admission', ARRAY['seats', 'entc', 'electronics']),
('What is the placement record of MESCOE?', 'MESCOE has an excellent placement record with 85%+ students getting placed. Average package ranges from ₹3.8 to ₹4.5 LPA depending on the branch.', 'placement', ARRAY['placement', 'jobs', 'package']),
('Is hostel facility available?', 'Yes, MESCOE provides hostel facilities for both boys and girls with all modern amenities including Wi-Fi, mess, and recreational facilities.', 'facilities', ARRAY['hostel', 'accommodation', 'facilities']);

-- Insert sample events
INSERT INTO events (title, description, event_date, event_time, location, category, registration_required) VALUES
('ACCET-2025 Technical Symposium', 'Annual technical symposium featuring competitions, workshops, and guest lectures from industry experts.', '2025-03-15', '09:00:00', 'MESCOE Campus', 'technical', true),
('RACE-2025 Cultural Festival', 'Inter-college cultural festival with music, dance, drama, and art competitions.', '2025-02-20', '10:00:00', 'MESCOE Auditorium', 'cultural', true),
('Industry Expert Lecture Series', 'Weekly lecture series by industry professionals sharing insights on latest technologies and career opportunities.', '2025-01-30', '14:00:00', 'Seminar Hall', 'academic', false),
('Placement Drive - TCS', 'Campus placement drive by Tata Consultancy Services for final year students.', '2025-02-05', '09:30:00', 'Placement Cell', 'placement', true);

-- Insert sample notices
INSERT INTO notices (title, content, priority, target_audience) VALUES
('Admission Process 2025-26 Started', 'The admission process for Academic Year 2025-26 has commenced. Students can apply through DTE Maharashtra CAP process. Important dates and eligibility criteria are available on the official website.', 'high', 'all'),
('Library Timing Update', 'Library timings have been extended during examination period. New timings: 8:00 AM to 10:00 PM on weekdays and 9:00 AM to 6:00 PM on weekends.', 'normal', 'students'),
('Faculty Development Program', 'A 5-day Faculty Development Program on "Emerging Technologies in Engineering Education" will be conducted from February 10-14, 2025.', 'normal', 'faculty'),
('Anti-Ragging Committee Notice', 'All students are informed that ragging is strictly prohibited. Any incident of ragging should be immediately reported to the Anti-Ragging Committee.', 'urgent', 'students');

-- Insert sample testimonials
INSERT INTO testimonials (name, role, batch_year, branch, content, rating, approved) VALUES
('Priya Sharma', 'Alumni', 2023, 'Computer Engineering', 'MESCOE provided me with excellent technical education and industry exposure. The faculty support and placement assistance helped me secure a great job at a leading IT company.', 5, true),
('Rahul Patil', 'Alumni', 2022, 'ENTC Engineering', 'The practical approach to learning at MESCOE, especially in the ENTC department, prepared me well for the industry. The labs are well-equipped and faculty is very supportive.', 5, true),
('Dr. Anjali Desai', 'Faculty', NULL, 'Computer Engineering', 'Teaching at MESCOE has been a rewarding experience. The institution encourages innovation and provides excellent infrastructure for both teaching and research.', 5, true),
('Amit Kumar', 'Current Student', 2025, 'Automation & Robotics', 'The Robotics program at MESCOE is cutting-edge. We get hands-on experience with latest technology and the industry connections are excellent.', 4, true);

-- Insert sample campus images for virtual tour
INSERT INTO campus_images (title, description, image_url, category, display_order) VALUES
('Main Building Entrance', 'The iconic entrance of MESCOE with modern architecture and welcoming atmosphere.', '/placeholder.svg?height=600&width=800', 'building', 1),
('Computer Engineering Lab', 'State-of-the-art computer lab with latest hardware and software for programming and development.', '/placeholder.svg?height=600&width=800', 'lab', 2),
('ENTC Electronics Lab', 'Well-equipped electronics laboratory with advanced testing equipment and project development facilities.', '/placeholder.svg?height=600&width=800', 'lab', 3),
('Central Library', 'Spacious library with extensive collection of books, journals, and digital resources.', '/placeholder.svg?height=600&width=800', 'facility', 4),
('Sports Ground', 'Large sports ground for cricket, football, and other outdoor activities.', '/placeholder.svg?height=600&width=800', 'sports', 5),
('Robotics Workshop', 'Dedicated workshop for robotics and automation projects with industrial-grade equipment.', '/placeholder.svg?height=600&width=800', 'lab', 6);
