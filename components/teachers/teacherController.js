const Teacher = require('./teacher');
const { response, isEmpty } = require('../../libs/helpers');
const { NotFoundError } = require('../../errors');

module.exports = {
  /**
   * Get all teachers data
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @returns {Express.Response} Returns all teachers data from database
   */
  index: async (req, res) => {
    try {
      const teachers = await Teacher.find();

      if (isEmpty(teachers)) {
        throw new NotFoundError('Teachers Not Found!');
      }

      return response(res, {
        code: 200,
        success: true,
        message: 'Successfully get teachers data!',
        content: teachers
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
   * Get specific teacher data with {_id} parameter.
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   *
   * @returns {Express.Response} Return specific teacher data by querying
   * {_id} parameter from database
   */
  getOne: async (req, res) => {
    const { _id } = req.params;

    try {
      const teacher = await Teacher.findOne({ _id });

      if (isEmpty(teacher)) throw new NotFoundError(`Teacher with id ${_id} not found!`);

      return response(res, {
        code: 200,
        success: true,
        message: `Successfuly get ${_id} data!`,
        content: teacher
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
   * Insert new teacher
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   *
   * @returns {Express.Response} Return created teacher data
   */
  insert: async (req, res) => {
    const { fullName, schoolName } = req.body;

    try {
      const newTeacher = await Teacher.create({
        fullName,
        schoolName
      });

      return response(res, {
        code: 201,
        success: true,
        message: 'Successfully insert new teacher!',
        content: {
          course: newTeacher
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
  },
  /**
   * Update teacher data
   * @param {Express.Request} req
   * @param {Express.Response} res
   *
   * @returns {Express.Response} Return updated teacher data
   */
  update: async (req, res) => {
    const { id } = req.params;
    const { fullName, schoolName } = req.body;

    try {
      const updatedTeacher = await Teacher.findOneAndUpdate(
        id,
        {
          fullName,
          schoolName
        },
        { new: true }
      );

      return response(res, {
        code: 200,
        success: true,
        message: 'Successfully update teacher',
        content: updatedTeacher
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
   * Delete teacher data from database
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   *
   * @returns {Express.Response} Return success messages after delete teacher
   */
  delete: async (req, res) => {
    const { id } = req.params;

    try {
      await Teacher.deleteOne({ _id: id });

      return response(res, {
        code: 200,
        success: true,
        message: 'Successfully delete teacher!'
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
