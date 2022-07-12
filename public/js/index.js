const form = document.querySelector('#taskform');
const result = document.querySelector('#taskslist');

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

    console.log(value);
    // console.log(response)

};
form.addEventListener('submit', handleSubmit);
