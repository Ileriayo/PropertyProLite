import Query from '../db/index';
import SQLHelpers from '../helpers/sqlHelpers';

const { query } = Query;
const { selectWhere } = SQLHelpers;

const userModel = {
  getUserByEmail: userEmail => query(selectWhere('*', 'users', `email = '${userEmail}'`)),
};

export default userModel;
