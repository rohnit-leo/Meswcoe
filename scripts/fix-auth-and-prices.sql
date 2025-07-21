-- Disable email confirmation and update all product prices to Rs 1

-- First, let's update all existing product prices to Rs 1
UPDATE products SET price = 1.00;

-- Insert/Update sample products with Rs 1 price
INSERT INTO products (name, description, price, image_url, stock, available_sizes, category) VALUES
('MESCOE College T-Shirt', 'Official MESCOE college t-shirt with college logo. Made from premium cotton.', 1.00, '/placeholder.svg?height=400&width=400&text=MESCOE+T-Shirt', 50, ARRAY['S', 'M', 'L', 'XL', 'XXL'], 'apparel'),
('MESCOE Hoodie', 'Comfortable hoodie perfect for campus life. Features college branding and warm fleece lining.', 1.00, '/placeholder.svg?height=400&width=400&text=MESCOE+Hoodie', 30, ARRAY['S', 'M', 'L', 'XL'], 'apparel'),
('MESCOE Coffee Mug', 'Start your day with MESCOE pride. Ceramic mug with college logo and motivational quote.', 1.00, '/placeholder.svg?height=400&width=400&text=MESCOE+Mug', 100, NULL, 'accessories'),
('MESCOE Laptop Bag', 'Durable laptop bag with college branding. Perfect for students and professionals.', 1.00, '/placeholder.svg?height=400&width=400&text=MESCOE+Bag', 25, NULL, 'accessories'),
('MESCOE Cap', 'Stylish cap with embroidered college logo. Great for casual wear.', 1.00, '/placeholder.svg?height=400&width=400&text=MESCOE+Cap', 40, ARRAY['One Size'], 'accessories')
ON CONFLICT (id) DO UPDATE SET price = 1.00;

-- Verify all products are now Rs 1
SELECT name, price FROM products ORDER BY name;
