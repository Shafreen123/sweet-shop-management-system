import app from './app';
import { connectDatabase, createTables } from './database';

const PORT = process.env.PORT || 3000;

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();
    
    // Create tables if they don't exist
    await createTables();
    
    // Start Express server
    app.listen(PORT, () => {
      console.log('');
      console.log('=================================');
      console.log('🍬 Sweet Shop API Server Started');
      console.log('=================================');
      console.log(`📍 Server running on: http://localhost:${PORT}`);
      console.log(`🗄️  Database: Connected`);
      console.log(`📝 API Documentation:`);
      console.log(`   - Auth: http://localhost:${PORT}/api/auth`);
      console.log(`   - Sweets: http://localhost:${PORT}/api/sweets`);
      console.log('=================================');
      console.log('');
      console.log('🔐 Default Admin Account:');
      console.log('   Email: admin@sweetshop.com');
      console.log('   Password: admin123');
      console.log('');
      console.log('Press CTRL+C to stop the server');
      console.log('');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();