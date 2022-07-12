const express = require('express');
const {taskRouter} = require('./routes/taskRoute');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.json());


app.use('/tasks', taskRouter );


app.listen(3000, 'localhost');
