const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const joi = require('@hapi/joi');
const validateSchemas = require('../utils/validator');
const utils = require('../utils/utils');

const saltRounds = 10;
const User = mongoose.model('Users');

module.exports.get_user = (req, res) => {
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

  User.findOne({_id: id}, (err, user) => {
    if (err) {
      res.status(500).json({
        status: `Mongoose error: ${err}`,
      });
      return;
    }

    if (!user) {
      res.status(400).json({
        status: 'User not found',
      });
      return;
    }

    res.status(200).json({
      status: 'Success',
      user,
    });
  });
};

module.exports.get_users = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).json({
        status: `Mongoose error: ${err}`,
      });
      return;
    }

    res.status(200).json({
      status: 'Success',
      users,
    });
  });
};

module.exports.create_user = (req, res) => {
  const validation = validateSchemas.create_user_schema.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      status: 'ValidationError',
      error: validation.error.details[0].message,
    });
    return;
  }

  const {name, email, password} = req.body;
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).json({
        status: `Mongoose error: ${err}`,
      });
      return;
    }

    const emailExists = utils.checkEmail(users, email);
    if (emailExists) {
      res.status(400).json({
        status: 'Email exists',
      });
      return;
    }

    let rgb = utils.generateRgb();
    let brightness = Math.round(((parseInt(rgb[0]) * 299) +
      (parseInt(rgb[1]) * 587) +
      (parseInt(rgb[2]) * 114)) / 1000);

    while (brightness > 125) {
      rgb = utils.generateRgb();
      brightness = Math.round(((parseInt(rgb[0]) * 299) +
        (parseInt(rgb[1]) * 587) +
        (parseInt(rgb[2]) * 114)) / 1000);
    }

    const newUser = new User({
      name,
      email,
      password: bcrypt.hashSync(password, saltRounds),
      color: rgb.join(', '),
    });

    newUser.save((error, user) => {
      if (error) {
        res.status(500).json({
          status: `Mongoose error: ${error}`,
        });
        return;
      }

      res.status(200).json({
        status: 'Success',
      });
    });
  });
};

module.exports.delete_user = (req, res) => {
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

  User.findOneAndDelete({_id: id}, (err, user) => {
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
