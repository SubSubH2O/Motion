const Pool = require("pg").Pool;

const pool = new Pool({
    host: "localhost",
    port: 5432,
    database: "motion"
});

module.exports = pool;

