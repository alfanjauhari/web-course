const User = require('./user');
const { isEmpty, response } = require('../../libs/helpers');
const { NotFoundError, WrongPasswordError } = require('../../errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  login: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const user = await User.findOne({
        $or: [
          {
            username
          },
          {
            email
          }
        ]
      });

      if (isEmpty(user))
        throw new NotFoundError("Username or email doesn't exists!");

      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword)
        throw new WrongPasswordError(
          'Your password not match with our records!'
        );

      const token = jwt.sign({ username: user.username });

      res.cookie('token', token, { httpOnly: true });
      return response(res, {
        code: 200,
        success: true,
        message: 'Login successfuly!',
        content: {
          user,
          token
        }
      });
    } catch (error) {
      if (
        error.name === 'NotFoundError' ||
        error.name === 'WrongPasswordError'
      ) {
        return response(res, {
          code: 400,
          success: false,
          message: error.message
        });
      }

      return response(res, {
        code: 500,
        success: false,
        message: error.message || 'Something went wrong',
        content: error
      });
    }
  },
  /**
   * Register user
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   *
   * @todo Write validation
   * @todo Write image upload script
   *
   * @returns {Express.Response} Return created user data and set HTTP Only cookie
   * from generated token JWT
   */
  register: async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;

    try {
      const hashedPassword = await hashPassword(password);

      const createdUser = await User.create({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword
      });

      const token = jwt.sign(
        { username: createdUser.username },
        process.env.JWT_SECRET
      );

      res.cookie('token', token, { httpOnly: true });
      return response(res, {
        code: 201,
        success: true,
        message: 'Register successfuly!',
        content: {
          user: createdUser,
          token
        }
      });
    } catch (error) {
      return response(res, {
        code: 500,
        success: false,
        message: error.message || 'Something went wrong!',
        content: error
      });
    }
  }
};
