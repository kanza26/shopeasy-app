const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'shopeasy',
  password: process.env.DB_PASSWORD || 'shopeasy',
  database: process.env.DB_NAME || 'shopeasy',
});

module.exports = pool;
