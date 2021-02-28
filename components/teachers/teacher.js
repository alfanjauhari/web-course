const { Schema, model } = require('mongoose');

const teacherSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    schoolName: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Teacher', teacherSchema);
