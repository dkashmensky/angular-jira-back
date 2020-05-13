const express = require('express');
const taskController = require('../../controllers/task.controller');

const router = new express.Router();

router.post('/loads', (req, res) => {
  loadController.create_load(req, res);
});

router.get('/loads', (req, res) => {
  loadController.get_loads(req, res);
});

router.put('/loads/:id', (req, res) => {
  loadController.update_load(req, res);
});

router.delete('/loads/:id', (req, res) => {
  loadController.delete_load(req, res);
});

router.patch('/loads/:id/post', (req, res) => {
  loadController.post_load(req, res);
});

router.get('/loads/:id/info', (req, res) => {
  loadController.get_load_info(req, res);
});

router.patch('/loads/:id/state', (req, res) => {
  loadController.change_load_state(req, res);
});

module.exports = router;
