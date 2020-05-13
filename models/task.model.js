const mongoose = require('mongoose');

const {Schema} = mongoose;

function allowEmptyString() {
  return typeof this.assigned_to === 'string';
}

const LoadSchema = new Schema({
  created_by: {
    type: String,
    required: true,
  },
  assigned_to: {
    type: String,
    required: allowEmptyString(),
    default: '',
  },
  status: {
    type: String,
    required: true,
    default: 'new',
  },
  state: {
    type: String,
    required: true,
    default: 'unassigned',
  },
  payload: {
    type: Number,
    required: true,
  },
  dimensions: {
    length: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
  },
  logs: [
    {
      message: {
        type: String,
      },
      time: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model('Tasks', LoadSchema);
