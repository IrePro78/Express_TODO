const {readFile, writeFile} = require('fs').promises;
const {existsSync} = require('fs');


const PATH_FILE = './data/tasks.json';

const writeToFile = async (db) => {
    return await writeFile(PATH_FILE, JSON.stringify(db, null, 4), 'utf-8');
};


const readFromFile = async () => {
    if (existsSync(PATH_FILE)) {
        const data = await readFile(PATH_FILE, 'utf-8');
        return data ? JSON.parse(data) : [];
    } else {
        await writeToFile([]);
        return [];
    }
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

    await writeToFile(db);

};

//Remove task
const removeTask = async (req, res) => {
    const db = await readFromFile();
    const {taskId} = req.params;
    const taskIndex = db.findIndex(i => i.task_id === Number(taskId));
    db.splice(taskIndex, 1);

    await writeToFile(db);
    res.status(204);
    res.send(`Deleting task: ${taskId}`);
};

//Confirm task
const confirmTask = async (req,res) => {
    const db = await readFromFile();
    const {taskId} = req.params;

    const taskIndex = db.findIndex(i => i.task_id === Number(taskId));
    db[taskIndex] = {...db[taskIndex], status:'Done'};

    await writeToFile(db);
    res.status(200);
    res.send(`Confirmed task Id: ${taskId}`);
};

//Get list taks
const getListTasks = async (req, res) => {
    const db = await readFromFile();
    res.send(db);
};


module.exports = {
    addTask,
    removeTask,
    confirmTask,
    getListTasks
};
