const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

noteSchema.plugin(AutoIncrement, { inc_field: 'noteTicket' });

module.exports = mongoose.model('Note', noteSchema);
