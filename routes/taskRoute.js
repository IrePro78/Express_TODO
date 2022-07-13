const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router
    .post('/add', taskController.addTask)

    .post('/edit', taskController.editTask)

    .post('/delete', taskController.delTask)

    .get('/list', taskController.listTasks);

module.exports = {
    taskRouter: router
};
