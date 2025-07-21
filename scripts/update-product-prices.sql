-- Update all product prices to Rs 1
UPDATE products SET price = 1.00 WHERE id IS NOT NULL;

-- Verify the update
SELECT name, price FROM products;
