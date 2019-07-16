/* eslint-disable no-console */
import { Pool } from 'pg';

import dotenv from 'dotenv';

dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

(async () => {
  const client = await pool.connect();
  try {
    console.log('Connection to database established');
  } finally {
    client.release();
  }
})().catch(e => console.error(e.stack));

export default pool;
