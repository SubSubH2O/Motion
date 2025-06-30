// test-connection.js
const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'motion',
});

// Test the connection
pool.query('SELECT NOW()', (err, result) => {
    if (err) {
        console.error('Connection failed:', err);
    } else {
        console.log('Connected successfully!');
        console.log('Current time:', result.rows[0].now);
    }
    pool.end();
});