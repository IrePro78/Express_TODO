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
    const task_id = db.length ? db.at(-1).task_id : 0;

    req.body['task_id'] = task_id+1;

    db.push(req.body);
    const {title, description, status} = req.body;
    res.status(201);
    res.send(`Added task:\nID: ${task_id+1}\nTitle: ${title}\nDescription: ${description}\nStatus: ${status}`);



    await saveToFile(db);

};

//Remove task
const removeTask = async (req, res) => {
    const db = await readFromFile();
    const {taskId} = req.params;
    db.splice(taskId, 1);

    await saveToFile(db);
    res.status(204);
    res.send(`Deleting task: ${taskId}`);
};

//Confirm task
const confirmTask = async (req,res) => {
    const db = await readFromFile();
    const {taskId} = req.params;
    const task = db.find(i => i.task_id === Number(taskId)+1);
    console.log(task);
    task['status'] = 'DONE';
    db.push(req.body);
    await saveToFile(db);
    res.status(200);
    res.send(`Confirmed task Id: ${taskId}`);

};



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
