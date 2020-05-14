const express = require('express');
const userController = require('../../controllers/user.controller');

const router = new express.Router();

router.get('/users', (req, res) => {
  userController.get_users(req, res);
});

router.get('/users/:id', (req, res) => {
  userController.get_user(req, res);
});

router.post('/users', (req, res) => {
  userController.create_user(req, res);
});

router.delete('/users/:id', (req, res) => {
  userController.delete_user(req, res);
});

module.exports = router;
