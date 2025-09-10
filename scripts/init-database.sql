-- Initial database setup for MMS system
CREATE TABLE IF NOT EXISTS mms_data (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO mms_data (name, description, status) VALUES
  ('System Monitor', 'Core system monitoring component', 'active'),
  ('Data Processor', 'Main data processing engine', 'active'),
  ('Analytics Engine', 'Real-time analytics and reporting', 'maintenance')
ON CONFLICT DO NOTHING;
