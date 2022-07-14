const {readFile, writeFile} = require('fs').promises;


const FILE_NAME = './data/tasks.json';

const saveToFile = async (db) => {
    return await writeFile(FILE_NAME, JSON.stringify(db,null, 4), 'utf-8');
};


const readFromFile = async () => {
    const data = await readFile(FILE_NAME, 'utf-8');
    return data ? JSON.parse(data) : [];
};

//Add task to list
const addTask = async (req, res) => {
    const db = await readFromFile();

    req.body['task_id'] = db.length+1;

    db.push(req.body);
    const {task_id, title, description, status} = req.body;
    res.send(`Added task:\nID: ${task_id}\nTitle: ${title}\nDescription: ${description}\nStatus: ${status}`);

    await saveToFile(db);

};

//Remove task
const removeTask = async (req, res) => {
    const db = await readFromFile();
    const {taskId} = req.params;
    // const task_id = db.find(i => i.task_id === task_Id - 1);
    // delete db[taskId];
    db.splice(taskId, 1);



    console.log(db);
    console.log(taskId);

    await saveToFile(db);
    res.send(`Deleting task: ${taskId}`);
};

//Confirm task
const confirmTask = () => {};


//Get list taks
const listTasks = async (req, res) => {
    const db = await readFromFile();
    res.send(db);
};


module.exports = {
    addTask,
    removeTask,
    confirmTask,
    listTasks
};
