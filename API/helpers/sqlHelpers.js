export default {
  select: (column, table) => `SELECT ${column} FROM ${table} LIMIT 50;`,
  selectWhere: (column, table, field) => `SELECT ${column} FROM ${table} WHERE ${field};`,
  insert: (table, values) => `INSERT INTO ${table} VALUES(${values}) RETURNING *;`,
  update: (table, value, field) => `UPDATE ${table} SET ${value} WHERE ${field} RETURNING *;`,
  deleteFromDB: (table, field) => `DELETE FROM ${table} WHERE ${field} RETURNING *;`,
};
