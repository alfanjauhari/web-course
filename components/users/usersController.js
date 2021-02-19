const User = require('./user');
const { response, isEmpty, hashPassword } = require('../../libs/helpers');
const { NotFoundError } = require('../../errors');

module.exports = {
  /**
   * Get all users data
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @returns {Express.Response} Returns all users data from database
   */
  index: async (req, res) => {
    try {
      const users = await User.find();

      if (isEmpty(users)) {
        throw new NotFoundError('Users Not Found!');
      }

      return response(res, {
        code: 200,
        success: true,
        message: 'Successfully get users data!',
        content: users
      });
    } catch (error) {
      if (error.name === 'NotFoundError') {
        return response(res, {
          code: 404,
          success: false,
          message: error.message
        });
      }

      return response(res, {
        code: 500,
        success: false,
        message: error.message || 'Something went wrong!',
        content: error
      });
    }
  },
  /**
   * Get specific user data with {username} parameter.
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   *
   * @returns {Express.Response} Return user data with specific user data by querying
   * {username} parameter from database
   */
  getOne: async (req, res) => {
    const { username } = req.params;

    try {
      const user = await User.findOne({ username });

      if (isEmpty(user)) throw new NotFoundError(`User with username ${username} not found!`);

      return response(res, {
        code: 200,
        success: true,
        message: `Successfuly get ${username} data!`,
        content: user
      });
    } catch (error) {
      if (error.name === 'NotFoundError') {
        return response(res, {
          code: 404,
          success: false,
          message: error.message
        });
      }

      return response(res, {
        code: 500,
        success: false,
        message: error.message || 'Something went wrong!',
        content: error
      });
    }
  },
  /**
   * Update user data
   * @param {Express.Request} req
   * @param {Express.Response} res
   *
   * @returns {Express.Response} Return updated user data
   */
  update: async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, username, email, password } = req.body;

    try {
      const hashedPassword = await hashPassword(password);

      const updatedUser = await User.findOneAndUpdate(
        id,
        {
          firstName,
          lastName,
          username,
          email,
          password: hashedPassword
        },
        { new: true }
      );

      return response(res, {
        code: 200,
        success: true,
        message: 'Successfuly update user',
        content: updatedUser
      });
    } catch (error) {
      return response(res, {
        code: 500,
        success: false,
        message: error.message || 'Something went wrong!',
        content: error
      });
    }
  },
  /**
   * Delete user data from database
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   *
   * @returns {Express.Response} Return success messages after delete user
   */
  delete: async (req, res) => {
    const { id } = req.params;

    try {
      await User.deleteOne({ _id: id });

      return response(res, {
        code: 200,
        success: true,
        message: 'Successfuly delete user!'
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
