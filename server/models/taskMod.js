const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const taskSchema = new mongoose.Schema(
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
    completed: {
      type: Boolean,
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
    category: {
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

taskSchema.plugin(AutoIncrement, { inc_field: 'ticket' });

module.exports = mongoose.model('Task', taskSchema);
