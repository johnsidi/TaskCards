const { Schema, model } = require('mongoose');

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: false,
    },
    dueDate: {
      type: String,
      required: false,
    },
    completionDate: {
      type: String,
      required: false,
    },
    interval: {
      type: String,
      required: false,
    },
    tags: {
      type: String,
      required: false,
    },
    QRcode: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = model('Task', taskSchema);
