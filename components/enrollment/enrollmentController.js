const Enrollment = require('./enrollment');
const { response, isEmpty } = require('../../libs/helpers');
const { NotFoundError } = require('../../errors');

module.exports = {
  /**
   * Get all enrollments data
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @returns {Express.Response} Returns all enrollments data from database
   */
  index: async (req, res) => {
    try {
      const enrollments = await Enrollment.find();

      if (isEmpty(enrollments)) {
        throw new NotFoundError('Enrollments Not Found!');
      }

      return response(res, {
        code: 200,
        success: true,
        message: 'Successfully get enrollments data!',
        content: enrollments
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
   * Get specific enrollment data with {_id} parameter.
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   *
   * @returns {Express.Response} Return specific enrollment data by querying
   * {_id} parameter from database
   */
  getOne: async (req, res) => {
    const { _id } = req.params;

    try {
      const enrollment = await Enrollment.findOne({ _id });

      if (isEmpty(enrollment)) throw new NotFoundError(`Enrollment with id ${_id} not found!`);

      return response(res, {
        code: 200,
        success: true,
        message: `Successfuly get enrollment data!`,
        content: enrollment
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
   * Enroll course
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   * 
   * @todo Retrieve user data so this method doesn't need any body request for {studentId}
   *
   * @returns {Express.Response} Return new enrollment course data
   */
  enroll: async (req, res) => {
    const { courseId } = req.params;
    const { studentId } = req.body;
    const datetime = new Date();

    try {
      const newEnroll = await Enrollment.create({
        courseId,
        studentId,
        dateEnrolled: `${datetime.getDate()}-${datetime.getMonth()+1}-${datetime.getFullYear()}`,
        status: 'enrolled'
      });

      return response(res, {
        code: 201,
        success: true,
        message: 'Successfully enrolled the course!',
        content: {
          course: newEnroll
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
   * Update enrollment status data
   * @param {Express.Request} req
   * @param {Express.Response} res
   *
   * @returns {Express.Response} Return updated enrollment data
   */
  update: async (req, res) => {
    const { id } = req.params;
    const { courseId, studentId, dateEnrolled } = req.body;

    try {
      const updatedEnrollment = await Enrollment.findOneAndUpdate(
        id,
        {
          courseId,
          studentId,
          dateEnrolled,
          status: 'completed'
        },
        { new: true }
      );

      return response(res, {
        code: 200,
        success: true,
        message: 'Successfully update user',
        content: updatedEnrollment
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
