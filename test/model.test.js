const mongoose = require('mongoose');
const UserModel = require('../models/user.model');
const user = {
  name: 'User',
  email: 'user@example.com',
  password: '123456',
  color: '255, 255, 255',
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
      expect(error.errors.email).toBeDefined();
      done();
    });

    test('fields not defined in schema should be undefined', async (done) => {
      const validUser = new UserModel({...user, ...{fullname: 'John'}});
      const savedUser = await validUser.save();
      expect(savedUser.name).toBeDefined();
      expect(savedUser.fullname).toBeUndefined();
      done();
    });
  });

  describe('Task model', () => {
    test('should create and save task', () => {
      // TODO Task model tests
    });
  });

  afterAll((done) => {
    mongoose.connection.close();
    done();
  });
});
