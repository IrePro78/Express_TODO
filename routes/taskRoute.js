const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router
    .post('/add', taskController.addTask)

    .delete('/delete/:taskId', taskController.removeTask)

    .put('/confirm/:taskId', taskController.confirmTask)

    .get('/list', taskController.getListTasks);

module.exports = {
    taskRouter: router
};
