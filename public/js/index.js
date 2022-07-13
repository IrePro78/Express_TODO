const form = document.querySelector('#taskform');
const result = document.querySelector('#result');
const list = document.querySelector('.tasks-list');
const btnList = document.querySelector('.btn-list');



const handleSubmit = async (event) => {
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
    // event.preventDefault();
    const res = await fetch('tasks/list');
    const json = await res.json();

    console.log(res);


    json.forEach(({ name, description }, id) => {
        const newLi = document.createElement('li');
        newLi.dataset.id = id;
        newLi.innerText = `id: ${id+1},${name}, ${description}`;
        newLi.addEventListener('click', editTask);

        list.appendChild(newLi);

    });
};

const editTask = (event) => {
    const id = Number(event.target.dataset.id);
    console.log(id);
};


form.addEventListener('submit', handleSubmit);
btnList.addEventListener('click', getTasks);
