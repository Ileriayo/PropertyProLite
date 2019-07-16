import Query from '../db/index';
import SQLHelpers from '../helpers/sqlHelpers';

const { query } = Query;
const { select, insert } = SQLHelpers;

const userModel = {
  addUser: values => query(insert('users(email, first_name, last_name, password, phone_number, address, is_admin)', values)),
  getUserByEmail: userEmail => query(select('*', 'users', `email = '${userEmail}'`)),
};

export default userModel;
