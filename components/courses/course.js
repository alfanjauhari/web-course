const { Schema, model } = require('mongoose');
const validate = require('mongoose-validator');

const contentValidator = [
    validate({
        validator: 'isLength',
        arguments: [200,3000]
    })
];

const courseSchema = new Schema(
  {
    teacherId: {
      type: Number,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true,
      unique: true
    },
    category: {
      type: String,
      required: true,
    },
    media: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true,
      validate: contentValidator
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Course', courseSchema);
