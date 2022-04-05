const form =  document.querySelector('#task-form')
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


loadAllEventListeners();
function loadAllEventListeners(){
 form.addEventListener('submit', addTask);
 taskList.addEventListener('click', removeTask)
 clearBtn.addEventListener('click', clearTask)
}

function addTask(e){
 const li = document.createElement('li')
 li.className = 'collection-item'
 const textResult = document.createTextNode(taskInput.value);
li.appendChild(textResult);

const link = document.createElement('a');
link.className = 'delete-item secondary-content'
link.innerHTML= '<i class="fa fa-remove"></i>'
li.appendChild(link);
taskList.appendChild(li)

taskInput.value=''
// console.log(li);
 e.preventDefault()
}

// remove task
function removeTask(e){
 // console.log(e.target.parentElement.classList);
 if(e.target.parentElement.classList.contains('delete-item')){
e.target.parentElement.parentElement.remove();
 }
//  console.log(e);
}

function clearTask(e){
// console.log(e.target);
while(taskList.firstChild){
taskList.removeChild(taskList.firstChild);
}

e.preventDefault()
}
