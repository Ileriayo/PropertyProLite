import pool from './index';

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
