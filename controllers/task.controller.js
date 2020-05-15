const mongoose = require('mongoose');
const joi = require('@hapi/joi');
const validateSchemas = require('../utils/validator');

const Task = mongoose.model('Tasks');

module.exports.get_tasks = (req, res) => {
  Task.find({}, (err, tasks) => {
    if (err) {
      res.status(500).json({
        status: `Mongoose error: ${err}`,
      });
      return;
    }

    res.status(200).json({
      status: 'Success',
      tasks,
    });
  });
};

module.exports.get_task = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({
      status: 'ID missing',
    });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      status: 'Invalid ID',
    });
    return;
  }

  Task.findOne({_id: id}, (err, task) => {
    if (err) {
      res.status(500).json({
        status: `Mongoose error: ${err}`,
      });
      return;
    }

    res.status(200).json({
      status: 'Success',
      task,
    });
  });
};

module.exports.delete_task = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({
      status: 'ID missing',
    });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      status: 'Invalid ID',
    });
    return;
  }

  Task.findOneAndDelete({_id: id}, (err, task) => {
    if (err) {
      res.status(500).json({
        status: `Mongoose error: ${err}`,
      });
      return;
    }

    res.status(200).json({
      status: 'Success',
    });
  });
};

module.exports.create_task = (req, res) => {
  const validation = validateSchemas.create_task_schema.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      status: 'ValidationError',
      error: validation.error.details[0].message,
    });
    return;
  }

  const {
    title,
    type,
    priority,
    description,
    assigned,
    due,
  } = req.body;
  const {user} = req;

  const newTask = new Task({
    title,
    type,
    priority,
    description: description || '',
    persons: {
      assigned,
      created: user._id,
    },
    dates: {
      created: Date.now(),
      due: due || 0,
    },
  });

  newTask.save((err, task) => {
    if (err) {
      res.status(500).json({
        status: `Mongoose error: ${err}`,
      });
      return;
    }

    res.status(200).json({
      status: 'Success',
    });
  });
};

module.exports.update_task = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({
      status: 'ID missing',
    });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      status: 'Invalid ID',
    });
    return;
  }

  const validation = validateSchemas.update_task_schema.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      status: 'ValidationError',
      error: validation.error.details[0].message,
    });
    return;
  }

  const {
    title,
    type,
    priority,
    description,
    assigned,
    due,
    status,
    resolution,
  } = req.body;

  Task.findOneAndUpdate(
      {_id: id},
      {
        title,
        type,
        priority,
        description,
        status,
        resolution,
        persons: {
          assigned,
        },
        dates: {
          due,
          updated: Date.now(),
          resolved: status === 'Done' ? Date.now() : 0,
        },
      },
      (err, task) => {
        if (err) {
          res.status(500).json({
            status: `Mongoose error: ${err}`,
          });
          return;
        }

        res.status(200).json({
          status: 'Success',
        });
      }
  );
};
