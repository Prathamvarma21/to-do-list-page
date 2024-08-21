document.addEventListener('DOMContentLoaded', loadTasks);
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const taskInput = document.getElementById('task-input').value;
    const taskImageInput = document.getElementById('task-image').files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const taskImage = event.target.result;
        const task = {
            text: taskInput,
            image: taskImage
        };

        addTaskToList(task);
        saveTask(task);
        taskForm.reset();
    };
    
    if (taskImageInput) {
        reader.readAsDataURL(taskImageInput);
    } else {
        const task = {
            text: taskInput,
            image: null
        };
        addTaskToList(task);
        saveTask(task);
        taskForm.reset();
    }
});

function addTaskToList(task) {
    const li = document.createElement('li');
    li.innerHTML = `
        ${task.image ? `<img src="${task.image}" alt="Task Image">` : ''}
        ${task.text}
        <button onclick="deleteTask(this)">Delete</button>
    `;
    taskList.appendChild(li);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToList(task));
}

function deleteTask(button) {
    const taskItem = button.parentElement;
    taskList.removeChild(taskItem);
    
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(task => task.text !== taskItem.textContent.trim());
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
