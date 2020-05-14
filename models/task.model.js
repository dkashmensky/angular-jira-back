const mongoose = require('mongoose');

const {Schema} = mongoose;

function allowEmptyString() {
  return typeof this.assigned_to === 'string';
}

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Epic',
      'User Story',
      'Task',
      'Feature',
      'Bug'],
    required: true,
  },
  priority: {
    type: String,
    enum: ['Blocker',
      'Critical',
      'Major',
      'Minor',
      'Trivial'],
    required: true,
  },
  status: {
    type: String,
    enum: ['To Do',
      'In Progress',
      'In Review',
      'Done'],
    required: true,
  },
  resolution: {
    type: String,
    enum: ['Unresolved',
      'Fixed',
      'Not fixable',
      'Duplicate',
      'Incomplete',
      'Cannot reproduce',
      'Done'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  persons: {
    created: {
      type: String,
      required: true,
    },
    assigned: {
      type: String,
      required: allowEmptyString(),
      default: '',
    },
  },
  dates: {
    created: {
      type: Number,
      required: true,
    },
    updated: Number,
    due: Number,
    resolved: Number,
  },
});

module.exports = mongoose.model('Tasks', TaskSchema);
