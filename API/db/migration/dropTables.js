import Query from '../query';

const { query } = Query;

const dropUserTable = 'DROP TABLE IF EXISTS users';
const dropPropertiesTable = 'DROP TABLE IF EXISTS properties';

(async () => {
  try {
    await query(dropPropertiesTable);
    await query(dropUserTable);
  } catch (error) {
    throw error;
  }
})();
