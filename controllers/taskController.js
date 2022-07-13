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

    db.push(req.body);
    res.send(`Added task:\nName: ${req.body.name}\nDescription: ${req.body.description}`);
    await saveToFile(db);

};

//Edit task
const editTask = async (req, res) => {
    const data = JSON.parse(await readFromFile());
    console.log(data);

    res.send(data);
};

const delTask = () => {};


//Get list taks
const listTasks = async (req, res) => {
    const db = await readFromFile();
    console.log(db);
    res.send(db);
};


module.exports = {
    addTask,
    editTask,
    delTask,
    listTasks
};

