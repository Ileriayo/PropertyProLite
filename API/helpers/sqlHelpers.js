export default {
  select: (column, table, field) => `SELECT ${column} FROM ${table} WHERE ${field};`,
  insert: (table, values) => `INSERT INTO ${table} VALUES(${values}) RETURNING *;`,
};
