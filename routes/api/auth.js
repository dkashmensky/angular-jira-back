const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {secret} = require('config');

const User = mongoose.model('Users');
const router = new express.Router();

router.post('/auth/login', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).json({
        status: 'MongooseError',
        error: err,
      });
      return;
    }

    const {email, password} = req.body;

    const [user] = users.filter(
        (item) =>
          item.email === email &&
          bcrypt.compareSync(password, item.password)
    );

    if (!user) {
      res.status(400).json({
        status: 'UserNotFound',
      });
      return;
    }

    const token = jwt.sign(user.toJSON(), secret);
    res.json({
      status: 'User authenticated successfully',
      token,
    });
    res.header();
  });
});

module.exports = router;
