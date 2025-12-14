import { Pool } from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

// Create connection pool to PostgreSQL
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test database connection
export const connectDatabase = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Connected to PostgreSQL database');
    client.release();
  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  }
};

// Create tables if they don't exist
export const createTables = async () => {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createSweetsTable = `
    CREATE TABLE IF NOT EXISTS sweets (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 0,
      description TEXT,
      image_url VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createUsersTable);
    console.log('✅ Users table ready');
    
    await pool.query(createSweetsTable);
    console.log('✅ Sweets table ready');
    
    // Insert a default admin user for testing
    await createDefaultAdmin();
    
    // Insert some sample sweets for testing
    await createSampleSweets();
    
  } catch (error) {
    console.error('❌ Error creating tables:', error);
    throw error;
  }
};

// Create a default admin user (password: admin123)
const createDefaultAdmin = async () => {
  const checkAdmin = 'SELECT * FROM users WHERE email = $1';
  const result = await pool.query(checkAdmin, ['admin@sweetshop.com']);
  
  if (result.rows.length === 0) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const insertAdmin = `
      INSERT INTO users (email, password_hash, role)
      VALUES ($1, $2, $3)
    `;
    await pool.query(insertAdmin, ['admin@sweetshop.com', hashedPassword, 'admin']);
    console.log('✅ Default admin created (email: admin@sweetshop.com, password: admin123)');
  }
};

// Create sample sweets for testing
const createSampleSweets = async () => {
  const checkSweets = 'SELECT COUNT(*) FROM sweets';
  const result = await pool.query(checkSweets);
  
  if (parseInt(result.rows[0].count) === 0) {
    const sampleSweets = [
      ['Chocolate Bar', 'chocolate', 2.99, 50, 'Delicious milk chocolate bar'],
      ['Gummy Bears', 'gummy', 1.99, 100, 'Colorful fruity gummy bears'],
      ['Lollipop', 'candy', 0.99, 200, 'Classic round lollipop'],
      ['Caramel Candy', 'caramel', 1.49, 75, 'Soft chewy caramel'],
      ['Sour Worms', 'gummy', 2.49, 80, 'Tangy sour gummy worms'],
    ];
    
    const insertSweet = `
      INSERT INTO sweets (name, category, price, quantity, description)
      VALUES ($1, $2, $3, $4, $5)
    `;
    
    for (const sweet of sampleSweets) {
      await pool.query(insertSweet, sweet);
    }
    console.log('✅ Sample sweets added to database');
  }
};