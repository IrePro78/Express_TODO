const {readFile, appendFile,writeFile, writeFileSync} = require('fs');


const FILE_NAME = './data/tasks.json';
let obj = {
    tasks: []
};


const saveToFile = async (task) => {
    await writeFile(FILE_NAME, task, 'utf-8', ()=>{});
};


const addTask = async (req, res) => {
    res.send(req.body);
    obj.tasks.push(req.body);

    const task = JSON.stringify(obj);

    console.log(task);
    // const strings = arrTasks.map((i) => JSON.parse(i));
    // res.json(arrTasks);
    // console.log(strings)
    // await writeFile(FILE_NAME, task, 'utf-8');
    return saveToFile(task);
};

const editTask = (req, res) => {
    res.json(req.body);
};

const delTask = () => {

};

module.exports = {
    addTask,
    editTask,
    delTask
};
