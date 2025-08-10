-- Insert categories
INSERT INTO categories (id, name, slug, description) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Wines', 'wines', 'Premium wines from Kenya and around the world'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Spirits', 'spirits', 'Premium spirits and whiskeys'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Beers', 'beers', 'Local and imported beers'),
  ('550e8400-e29b-41d4-a716-446655440004', 'Champagne', 'champagne', 'Sparkling wines and champagne');

-- Insert sample products
INSERT INTO products (id, name, slug, description, price, category_id, region, alcohol_content, volume, brand, image_url, stock, is_active) VALUES
  ('650e8400-e29b-41d4-a716-446655440001', 'Tusker Lager', 'tusker-lager', 'Kenya''s premium lager beer', '280.00', '550e8400-e29b-41d4-a716-446655440003', 'Kenya', '4.2%', '500ml', 'Tusker', '/images/tusker.jpg', 50, true),
  ('650e8400-e29b-41d4-a716-446655440002', 'White Cap Lager', 'white-cap-lager', 'Classic Kenyan beer', '250.00', '550e8400-e29b-41d4-a716-446655440003', 'Kenya', '4.0%', '500ml', 'White Cap', '/images/whitecap.jpg', 75, true),
  ('650e8400-e29b-41d4-a716-446655440003', 'Johnnie Walker Black Label', 'johnnie-walker-black', 'Premium blended Scotch whisky', '4500.00', '550e8400-e29b-41d4-a716-446655440002', 'Scotland', '40%', '750ml', 'Johnnie Walker', '/images/jw-black.jpg', 25, true),
  ('650e8400-e29b-41d4-a716-446655440004', 'Hennessy VS', 'hennessy-vs', 'Premium French cognac', '6800.00', '550e8400-e29b-41d4-a716-446655440002', 'France', '40%', '700ml', 'Hennessy', '/images/hennessy.jpg', 15, true),
  ('650e8400-e29b-41d4-a716-446655440005', 'KWV Classic Collection Shiraz', 'kwv-shiraz', 'Premium South African red wine', '1800.00', '550e8400-e29b-41d4-a716-446655440001', 'South Africa', '14%', '750ml', 'KWV', '/images/kwv-shiraz.jpg', 30, true),
  ('650e8400-e29b-41d4-a716-446655440006', 'Moet & Chandon Imperial', 'moet-chandon', 'Premium French champagne', '8500.00', '550e8400-e29b-41d4-a716-446655440004', 'France', '12%', '750ml', 'Moet & Chandon', '/images/moet.jpg', 12, true);
