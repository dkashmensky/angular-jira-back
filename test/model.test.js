const mongoose = require('mongoose');
const UserModel = require('../models/user.model');
const TaskModel = require('../models/task.model');
const user = {
  name: 'User',
  email: 'user@example.com',
  password: '123456',
  color: '255, 255, 255',
};
const task = {
  title: 'Task',
  type: 'Bug',
  priority: 'Major',
  status: 'To Do',
  resolution: 'Unresolved',
  description: 'Stuff',
  persons: {
    created: '5ebe5d416f384617a92c7579',
    assigned: '5ebe5d416f384617a92c7579',
  },
  dates: {
    created: 1589555589452,
    updated: 1589555589452,
    due: 1589555589452,
    resolved: 1589555589452,
  },
};

describe('Model testing', () => {
  beforeAll(async (done) => {
    await mongoose.connect(global.__MONGO_URI__,
        {useNewUrlParser: true, useCreateIndex: true},
        (err) => {
          if (err) {
            console.error(err);
            process.exit(1);
          }
        });
    done();
  });

  describe('User model', () => {
    test('should create and save user', async (done) => {
      const validUser = new UserModel(user);
      const savedUser = await validUser.save();
      expect(savedUser._id).toBeDefined;
      expect(savedUser.name).toBe(user.name);
      expect(savedUser.email).toBe(user.email);
      expect(savedUser.password).toBe(user.password);
      expect(savedUser.color).toBe(user.color);
      done();
    });

    test('should give an error if required fields are empty', async (done) => {
      const invalidUser = new UserModel({
        name: 'User',
      });

      let error;
      try {
        const savedUser = await invalidUser.save();
        error = savedUser;
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      done();
    });

    test('fields not defined in schema should be undefined', async (done) => {
      // eslint does not support object spread?
      const validUser = new UserModel({...user, ...{fullname: 'John'}});
      const savedUser = await validUser.save();
      expect(savedUser.name).toBeDefined();
      expect(savedUser.fullname).toBeUndefined();
      done();
    });
  });

  describe('Task model', () => {
    test('should create and save task', async (done) => {
      const validTask = new TaskModel(task);
      const savedTask = await validTask.save();
      expect(savedTask._id).toBeDefined;
      expect(savedTask.title).toBe(task.title);
      expect(savedTask.type).toBe(task.type);
      expect(savedTask.priority).toBe(task.priority);
      expect(savedTask.status).toBe(task.status);
      expect(savedTask.resolution).toBe(task.resolution);
      expect(savedTask.description).toBe(task.description);
      expect(savedTask.persons.created).toBe(task.persons.created);
      expect(savedTask.persons.assigned).toBe(task.persons.assigned);
      expect(savedTask.dates.created).toBe(task.dates.created);
      expect(savedTask.dates.updated).toBe(task.dates.updated);
      expect(savedTask.dates.resolved).toBe(task.dates.resolved);
      expect(savedTask.dates.due).toBe(task.dates.due);
      done();
    });

    test('should give an error if required fields are empty', async (done) => {
      const invalidTask = new TaskModel({
        title: 'Task',
      });

      let error;
      try {
        const savedTask = await invalidTask.save();
        error = savedTask;
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      done();
    });

    test('fields not defined in schema should be undefined', async (done) => {
      // eslint does not support object spread?
      const validTask = new TaskModel({...task, ...{deadline: 123}});
      const savedTask = await validTask.save();
      expect(savedTask.title).toBeDefined();
      expect(savedTask.deadline).toBeUndefined();
      done();
    })

    test('should give an error if type has unallowed value', async (done) => {
      const invalidTask = new UserModel({...task, ...{type: 'Unknown'}});

      let error;
      try {
        const savedTask = await invalidTask.save();
        error = savedTask;
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      done();
    });

    test('should give an error if priority has unallowed value', async (done) => {
      const invalidTask = new UserModel({...task, ...{priority: 'Unknown'}});

      let error;
      try {
        const savedTask = await invalidTask.save();
        error = savedTask;
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      done();
    });

    test('should give an error if status has unallowed value', async (done) => {
      const invalidTask = new UserModel({...task, ...{status: 'Unknown'}});

      let error;
      try {
        const savedTask = await invalidTask.save();
        error = savedTask;
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      done();
    });

    test('should give an error if resolution has unallowed value', async (done) => {
      const invalidTask = new UserModel({...task, ...{resolution: 'Unknown'}});

      let error;
      try {
        const savedTask = await invalidTask.save();
        error = savedTask;
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      done();
    });
  });

  afterAll((done) => {
    mongoose.connection.close();
    done();
  });
});
