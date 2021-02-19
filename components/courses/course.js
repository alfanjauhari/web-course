const { Schema, model } = require('mongoose');

const courseSchema = new Schema(
  {
    teacherId: {
      type: Number,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    category: {
      type: String,
      required: true
    },
    media: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Course', courseSchema);
