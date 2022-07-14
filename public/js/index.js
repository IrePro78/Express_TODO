const form = document.querySelector('#taskform');
const result = document.querySelector('#result');
const list = document.querySelector('#task-container');
const btnList = document.querySelector('.btn-list');


const addTask = async (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());

    const response = await fetch('tasks/add', {
        method: 'POST',
        body: JSON.stringify(value),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    result.innerText = await response.text();
    form.reset();
};

const getTasks = async (event) => {
    list.innerText = '';
    event.preventDefault();
    const res = await fetch('tasks/list');
    const json = await res.json();

    console.log(res);


    json.forEach(({task_id, title, description, status}, i) => {
        const div = document.createElement('div');
        const p = document.createElement('p');
        const btnDelete = document.createElement('button');
        btnDelete.innerText = 'Delete';
        const btnConfirm = document.createElement('button');
        btnConfirm.innerText = 'Confirm';
        btnDelete.dataset.id = i;
        btnConfirm.dataset.id = i;
        p.innerText = `ID: ${task_id}\n Title: ${title}\n Description:  ${description}\n Status: ${status}`;
        btnDelete.addEventListener('click', removeTask);
        btnConfirm.addEventListener('click', confirmTask);


        div.appendChild(p);
        div.appendChild(btnDelete);
        div.appendChild(btnConfirm);
        list.appendChild(div);


    });
    return json;
};
const removeTask = async event => {
    const id = Number(event.target.dataset.id);
    console.log(id);
    const res = await fetch(`tasks/delete/${id}`, {
        method: 'POST',
    });
    console.log(res);


};

const confirmTask = async event => {
    const id = Number(event.target.dataset.id);
    const tasks = await getTasks(event);
    const task = tasks.find(i => i.task_id === id + 1);
    console.log(task);
    console.log(id);
};


form.addEventListener('submit', addTask);
btnList.addEventListener('click', getTasks);
