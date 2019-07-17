export default {
  select: (column, table) => `SELECT ${column} FROM ${table} LIMIT 50;`,
  selectWhere: (column, table, field) => `SELECT ${column} FROM ${table} WHERE ${field};`,
  insert: (table, values) => `INSERT INTO ${table} VALUES(${values}) RETURNING *;`,
};
