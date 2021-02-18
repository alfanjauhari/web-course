const Course = require('./course');
const { response, isEmpty } = require('../../libs/helpers');
const { NotFoundError } = require('../../errors');

module.exports = {
  /**
   * Get all courses data
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @returns {Express.Response} Returns all courses data from database
   */
  index: async (req, res) => {
    try {
      const courses = await Course.find();

      if (isEmpty(courses)) {
        throw new NotFoundError('Courses Not Found!');
      }

      return response(res, {
        code: 200,
        success: true,
        message: 'Successfully get courses data!',
        content: courses
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
   * Get specific course data with {slug} parameter.
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   *
   * @returns {Express.Response} Return ourse data with specific course data by querying
   * {slug} parameter from database
   */
  getOne: async (req, res) => {
    const { slug } = req.params;

    try {
      const course = await Course.findOne({ slug });

      if (isEmpty(course)) throw new NotFoundError(`Course with slug ${slug} not found!`);

      return response(res, {
        code: 200,
        success: true,
        message: `Successfuly get ${slug} data!`,
        content: course
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
   * Insert new course
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   *
   * @todo Write media upload script
   *
   * @returns {Express.Response} Return created course data
   */
  insert: async (req, res) => {
    const { teacherId, title, slug, category, media, content } = req.body;

    try {
      const newCourse = await Course.create({
        teacherId,
        title,
        slug,
        category,
        media,
        content
      });

      return response(res, {
        code: 201,
        success: true,
        message: 'Successfully insert new course!',
        content: {
          course: newCourse
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
   * Update course data
   * @param {Express.Request} req
   * @param {Express.Response} res
   *
   * @returns {Express.Response} Return updated course data
   */
  update: async (req, res) => {
    const { id } = req.params;
    const { teacherId, title, slug, category, media, content } = req.body;

    try {
      const updatedCourse = await Course.findOneAndUpdate(
        id,
        {
          teacherId,
          title,
          slug,
          category,
          media,
          content
        },
        { new: true }
      );

      return response(res, {
        code: 200,
        success: true,
        message: 'Successfully update user',
        content: updatedCourse
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
   * Delete course data from database
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   *
   * @returns {Express.Response} Return success messages after delete course
   */
  delete: async (req, res) => {
    const { id } = req.params;

    try {
      await Course.deleteOne({ _id: id });

      return response(res, {
        code: 200,
        success: true,
        message: 'Successfully delete course!'
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
