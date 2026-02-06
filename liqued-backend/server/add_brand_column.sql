-- Add brand column to products table
ALTER TABLE products ADD COLUMN brand VARCHAR(100) AFTER stock;

-- Verify the change
DESCRIBE products;
