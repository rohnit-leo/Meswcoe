-- Disable email confirmation in Supabase Auth settings
-- Run this in Supabase SQL Editor to completely disable email confirmation

-- Update auth.users to mark all users as email confirmed
UPDATE auth.users SET email_confirmed_at = NOW() WHERE email_confirmed_at IS NULL;

-- Update user profiles to mark as verified
UPDATE public.users SET is_verified = true WHERE is_verified = false;

-- Clear existing products and add new ones
DELETE FROM products;

-- Insert the new real products with ₹1 pricing
INSERT INTO products (name, description, price, image_url, stock, available_sizes, category, active) VALUES
('MESCOE Official Hoodie', 'Premium quality hoodie with official MESCOE college crest. Perfect for campus life and casual wear. Made from soft cotton blend for maximum comfort.', 1.00, '/images/mescoe-hoodie.png', 50, ARRAY['S', 'M', 'L', 'XL', 'XXL'], 'apparel', true),
('MESCOE Polo T-Shirt', 'Classic white polo t-shirt featuring the official MESCOE college logo. Professional look perfect for college events and daily wear.', 1.00, '/images/mescoe-tshirt.png', 75, ARRAY['S', 'M', 'L', 'XL', 'XXL'], 'apparel', true),
('MESCOE College Cap', 'Stylish white baseball cap with embroidered MESCOE college crest. Perfect accessory to show your college pride.', 1.00, '/images/mescoe-cap.png', 100, ARRAY['One Size'], 'accessories', true);

-- Verify the products were inserted
SELECT id, name, price, stock, available_sizes FROM products;

-- Update auth configuration (if accessible via SQL)
-- Note: You'll also need to go to Supabase Dashboard > Authentication > Settings
-- and disable "Enable email confirmations" in the Auth settings
