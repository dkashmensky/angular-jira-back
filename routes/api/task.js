const express = require('express');
const taskController = require('../../controllers/task.controller');

const router = new express.Router();

router.get('/tasks', (req, res) => {
  taskController.get_tasks(req, res);
});

router.get('/tasks/:id', (req, res) => {
  taskController.get_task(req, res);
});

router.delete('/tasks/:id', (req, res) => {
  taskController.delete_task(req, res);
});

router.post('/tasks', (req, res) => {
  taskController.create_task(req, res);
});

router.update('/tasks/:id', (req, res) => {
  taskController.update_task(req, res);
});

module.exports = router;
