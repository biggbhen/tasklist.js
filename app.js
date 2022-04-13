const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadAllEventListeners();
function loadAllEventListeners() {
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTask);
  filter.addEventListener('keyup', filterTask);
  document.addEventListener('DOMContentLoaded', getTasks)
}

function addTask(e) {
  const li = document.createElement('li');
  li.className = 'collection-item';
  const textResult = document.createTextNode(taskInput.value);
  li.appendChild(textResult);

  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);
  taskList.appendChild(li);

  
  addTaskToLocalStorage(taskInput.value)
  taskInput.value = '';
  // console.log(li);
  e.preventDefault();
}

// get Tasks from localStorage

function getTasks(task) {
   let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
   }else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks))

  tasks.forEach(function(task){
    const li = document.createElement('li');
  li.className = 'collection-item';
  const textResult = document.createTextNode(task);
  li.appendChild(textResult);

  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);
  taskList.appendChild(li);
  })
}

// add task to local storage
function addTaskToLocalStorage(task){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
   }else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks))
}



// remove task
function removeTask(e) {
  // console.log(e.target.parentElement.classList);
  if (e.target.parentElement.classList.contains('delete-item')) {
    e.target.parentElement.parentElement.remove();

    removeTaskFromLocalStorage(e.target.parentElement.parentElement)
  }
  //  console.log(e.target);
}
function removeTaskFromLocalStorage (taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
   }else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.forEach(function(task, index) {
    if(taskItem.textContent === task){
    tasks.splice(index, 1)
    }
  })
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function clearTask(e) {
  // console.log(e.target);
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  e.preventDefault();
}

function filterTask(e) {
  const text = e.target.value.toLowerCase();
  const lis = document.querySelectorAll('.collection-item');
  lis.forEach(function (x) {
    const item = x.firstChild.textContent.toLowerCase();
    if (item.indexOf(text) != -1) {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  });
}
