'use strict';

const field = document.querySelector('.field'); 
const add = document.querySelector('.add');
const tasks = document.querySelector('.list');
const filter = document.querySelector('.filter');

function createTask(value) {
  const task = document.createElement('div');
  const checkbox = document.createElement('input');
  const deleteButton = document.createElement('input')

  task.classList.add('task', 'unsuccess', 'list-group-item');
  task.textContent = value;

  checkbox.type = 'checkbox';
  checkbox.classList.add('status');
  checkbox.addEventListener('click', completeTask);

  deleteButton.type = 'button';
  deleteButton.classList.add('delete', 'btn', 'btn-danger');
  deleteButton.value = 'X';
  deleteButton.addEventListener('click', deleteTask);

  task.appendChild(checkbox);
  task.appendChild(deleteButton);

  return task;
}

function addTask() {
  if (field.value) {
   const task = createTask(field.value)

   tasks.appendChild(task);

   field.value = '';
  }

  saveTasks()
}

function completeTask(event) {
  const checkbox = event.target;
  const task = checkbox.parentElement;

  if (checkbox.checked) {
    task.classList.add('success');
    task.classList.remove('unsuccess');
  } else {
    task.classList.add('unsuccess')
    task.classList.remove('success')
  }

  saveTasks()
}

function filterTasks() {
  const tasks = document.querySelectorAll('.task');
  tasks.forEach(task => {
    if (task.classList.contains(filter.value)) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })
}

function handleEnterDown() {
   if (event.keyCode === 13) {
     addTask();
   }
}

function deleteTask(event) {
  const deleteButton = event.target;
  const task = deleteButton.parentElement;
  const askQuestion = confirm('Удалить?');

  if (askQuestion) {
    task.remove();
  }

  saveTasks()
}

function saveTasks() {
  const tasks = document.querySelectorAll('.task')

  const data = [...tasks].map((task, index) => (
    { id: index, content: task.textContent, status: task.querySelector('.status').checked }
  ))

  localStorage.setItem('tasks', JSON.stringify(data))
}

function loadTasks() {
  const data = JSON.parse(localStorage.getItem('tasks'))

  data.forEach(task => {
    const newTask = createTask(task.content)

    if (task.status) {
      newTask.classList.add('success');
      newTask.classList.remove('unsuccess');
      newTask.querySelector('.status').checked = true;
    }

    tasks.appendChild(newTask)
  })
}

filter.addEventListener('change', filterTasks);
add.addEventListener('click', addTask);
field.addEventListener('keydown', handleEnterDown);
document.addEventListener('DOMContentLoaded', loadTasks)
