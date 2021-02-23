const { Schema, model } = require('mongoose');

const enrollmentSchema = new Schema(
  {
    studentId: {
      type: Number,
      required: true,
    },
    courseId: {
      type: Number,
      required: true,
    },
    dateEnrolled: {
      type: String,
      required: true,
      unique: true
    },
    status: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Enrollment', enrollmentSchema);
