const joi = require('@hapi/joi');

module.exports.create_user_schema = joi.object({
  name: joi.string().required(),
  email: joi
      .string()
      .email({minDomainSegments: 2})
      .required(),
  password: joi
      .string()
      .pattern(new RegExp('^[0-9a-zA-Z]{8,}$'))
      .required(),
});

module.exports.create_task_schema = joi.object({
  title: joi.string().required(),
  type: joi
      .string()
      .valid(
          'Epic',
          'User Story',
          'Task',
          'Feature',
          'Bug'
      )
      .required(),
  priority: joi
      .string()
      .valid(
          'Blocker',
          'Critical',
          'Major',
          'Minor',
          'Trivial'
      )
      .required(),
  description: joi.string().allow(''),
  assigned: joi.string().allow(''),
  due: joi.number(),
});

module.exports.update_task_schema = joi.object({
  title: joi.string().required(),
  type: joi
      .string()
      .valid(
          'Epic',
          'User Story',
          'Task',
          'Feature',
          'Bug'
      )
      .required(),
  priority: joi
      .string()
      .valid(
          'Blocker',
          'Critical',
          'Major',
          'Minor',
          'Trivial'
      )
      .required(),
  description: joi.string(),
  assigned: joi.string(),
  due: joi.number(),
  status: joi
      .string()
      .valid(
          'To Do',
          'In Progress',
          'In Review',
          'Done'
      )
      .required(),
  resolution: joi
      .string()
      .valid(
          'Unresolved',
          'Fixed',
          'Not fixable',
          'Duplicate',
          'Incomplete',
          'Cannot reproduce',
          'Done'
      )
      .required(),
});
