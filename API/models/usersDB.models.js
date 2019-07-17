import Query from '../db/index';
import SQLHelpers from '../helpers/sqlHelpers';

const { query } = Query;
const { selectWhere, insert } = SQLHelpers;

const userModel = {
  addUser: values => query(insert('users(email, first_name, last_name, password, phone_number, address, is_admin)', values)),
  getUserByEmail: userEmail => query(selectWhere('*', 'users', `email = '${userEmail}'`)),
  getUserById: userId => query(selectWhere('*', 'users', `id = '${userId}'`)),
};

export default userModel;
