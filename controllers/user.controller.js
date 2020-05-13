const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const utils = require('../utils/utils');

const saltRounds = 10;
const User = mongoose.model('Users');
const Task = mongoose.model('Tasks');

module.exports.get_users = (req, res) => {

};
