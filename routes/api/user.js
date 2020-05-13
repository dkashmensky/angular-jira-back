const express = require('express');
const userController = require('../../controllers/user.controller');

const router = new express.Router();

router.put('/users/password', (req, res) => {
  userController.change_user_password(req, res);
});

router.get('/users', (req, res) => {
  userController.get_user_info(req, res);
});

router.get('/users/all', (req, res) => {
  userController.get_users(req, res);
});

router.delete('/users', (req, res) => {
  userController.delete_user(req, res);
});

router.put('/users', (req, res) => {
  userController.update_user_info(req, res);
});

router.put('/users/avatar', (req, res) => {
  userController.upload_avatar(req, res);
});

module.exports = router;
