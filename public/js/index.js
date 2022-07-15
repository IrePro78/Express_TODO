const form = document.querySelector('#taskform');
const result = document.querySelector('#result');
const list = document.querySelector('#task-container');
const btnList = document.querySelector('.btn-list');


const addTask = async (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());

    const res = await fetch('tasks/add', {
        method: 'POST',
        body: JSON.stringify(value),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    result.innerText = await res.text();
    console.log(res);
    form.reset();
    await getTasks(event);

};

const getTasks = async (event) => {
    list.innerText = '';
    event.preventDefault();

    const res = await fetch('tasks/list');
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const json = await res.json();

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

};
const removeTask = async (event) => {
    const id = Number(event.target.dataset.id);
    console.log(id);
    const res = await fetch(`tasks/delete/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    console.log(res);
    await getTasks(event);


};

const confirmTask = async event => {
    const id = Number(event.target.dataset.id);
    console.log(id);
    const res = await fetch(`tasks/confirm/${id}`, {
        method: 'PATCH',
    });
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    console.log(res);

};


form.addEventListener('submit', addTask);
btnList.addEventListener('click', getTasks);
