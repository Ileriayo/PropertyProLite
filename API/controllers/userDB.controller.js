/* eslint-disable camelcase */
// import userDBModel from '../models/usersDB.models';
import HashPassword from '../helpers/hashPassword';
import Tokenizer from '../helpers/tokenizer';
import Query from '../db/index';

const { query } = Query;

// const { addUser } = userDBModel;
const { hashPassword } = HashPassword;
const { tokenizer } = Tokenizer;

class UserController {
  static async signUp(req, res) {
    const {
      email, first_name, last_name, password, phone_number, address,
    } = req.body;
    try {
      const hashedPassword = await hashPassword(password);
      // const newUser = await addUser(`'${email}', '${first_name}', '${last_name}',
      // '${hashedPassword}', '${phone_number}', '${address}', false`);
      const querystring = `INSERT INTO users(email, first_name, last_name, password, phone_number, address, is_admin)
       VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;

      const newUser = await query(querystring,
        [email, first_name, last_name, hashedPassword, phone_number, address, false]);
      // console.log('This user just signed up:', newUser);
      const { id } = newUser[0];
      const token = await tokenizer({
        id, email, first_name, last_name, phone_number,
      });
      return res.status(201).json({
        status: 'success',
        message: 'Sign up successful',
        data: {
          token, id, email, first_name, last_name,
        },
      });
    } catch (error) {
      return error;
    }
  }

  static async signIn(req, res) {
    const { body: { email }, validUser } = req;
    // const validPassword = await checkPassword(password, validUser.password);
    // if (!validPassword) {
    //   return res.status(401).json({
    //     status: 'error',
    //     error: 'Login unsuccessful',
    //   });
    // }
    const {
      id, first_name, last_name, phone_number,
    } = validUser[0];
    const token = await tokenizer({
      id, email, first_name, last_name, phone_number,
    });
    return res.status(200).json({
      status: 'success',
      message: 'Sign in successful',
      data: {
        token, id, email, first_name, last_name,
      },
    });
  }
}

export default UserController;
