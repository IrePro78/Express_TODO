const express = require('express');

const router = express.Router();

router.post('/add',(req, res) => {
        console.log(req.body)
        console.log(req.path)
        res.json(req.body)
    })


module.exports = {
    taskRouter: router
};
