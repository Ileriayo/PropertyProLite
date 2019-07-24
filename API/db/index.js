import { Pool } from 'pg';

import dotenv from 'dotenv';

dotenv.config();

/* CONNECTION TO PRODUCTION DB */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/* CONNECTION TO LOCAL DB */
// const pool = new Pool({
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DB,
//   password: process.env.PG_PASSWORD,
//   port: process.env.PG_PORT,
// });

class Query {
  static async query(text, params) {
    try {
      const result = await pool.query(text, params);
      return result.rows;
    } catch (err) {
      return err;
    }
  }
}

export default Query;
