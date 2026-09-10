const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

(async () => {
  const host = process.env.DB_HOST || 'localhost';
  const port = process.env.DB_PORT || 3306;
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'website_vue_node';

  const conn = await mysql.createConnection({
    host, port, user, password,
    multipleStatements: true
  });

  console.log(`Ensuring database "${database}" exists...`);
  await conn.query(
    `CREATE DATABASE IF NOT EXISTS \`${database}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );
  await conn.query(`USE \`${database}\``);

  const sqlPath = path.join(__dirname, '..', 'sql', 'init.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');
  console.log('Running init SQL...');
  await conn.query(sql);

  console.log('Database initialized successfully.');
  await conn.end();
})().catch(err => {
  console.error('Init failed:', err.message);
  process.exit(1);
});
