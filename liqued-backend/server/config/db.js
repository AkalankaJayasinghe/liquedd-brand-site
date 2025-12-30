const mysql = require('mysql2');
require('dotenv').config();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'liqued_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error connecting to database:', err.message);
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('   Check your DB_USER and DB_PASSWORD in .env file');
    } else if (err.code === 'ER_BAD_DB_ERROR') {
      console.error('   Database does not exist. Create it first.');
    } else if (err.code === 'ECONNREFUSED') {
      console.error('   MySQL server is not running. Start MySQL service.');
    }
  } else {
    console.log('✅ Database connected successfully');
    console.log(`   Host: ${dbConfig.host}`);
    console.log(`   Database: ${dbConfig.database}`);
    connection.release();
  }
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('Database pool error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Database connection was closed.');
  }
  if (err.code === 'ER_CON_COUNT_ERROR') {
    console.error('Database has too many connections.');
  }
  if (err.code === 'ECONNREFUSED') {
    console.error('Database connection was refused.');
  }
});

// Export promise-based pool for async/await usage
module.exports = pool.promise();
