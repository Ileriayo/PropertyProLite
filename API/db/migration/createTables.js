import Query from '../query';

const { query } = Query;

const createUserTable = `
  CREATE TABLE IF NOT EXISTS
        users(
          id SERIAL PRIMARY KEY,
          email VARCHAR(128) NOT NULL,
          first_name VARCHAR(128) NOT NULL,
          last_name VARCHAR(128) NOT NULL,
          password VARCHAR(128) NOT NULL,
          phone_number VARCHAR(11) NOT NULL,
          address VARCHAR NOT NULL,
          is_admin BOOLEAN NOT NULL
        );`;

const createPropertiesTable = `
  CREATE TABLE IF NOT EXISTS
        properties(
        id SERIAL PRIMARY KEY,
        owner INT REFERENCES users(id),
        status VARCHAR(128) NOT NULL,
        price  NUMERIC(25,2) NOT NULL,
        state VARCHAR(128) NOT NULL,
        city VARCHAR(128) NOT NULL,
        address VARCHAR(128) NOT NULL,
        type VARCHAR(128) NOT NULL,
        created_on TIMESTAMP DEFAULT NOW(),
        image_url VARCHAR(512) NOT NULL
      );`;

(async () => {
  try {
    await query(createUserTable);
    await query(createPropertiesTable);
  } catch (error) {
    throw error;
  }
})();
