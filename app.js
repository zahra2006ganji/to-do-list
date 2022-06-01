const inputTask = document.getElementById('task');
const form = document.getElementById('task-form');
const clearBtn = document.getElementById('btn2');
const taskList = document.querySelector('#tasks');
const inputFilter = document.getElementById('filter');

//all events
function loadListener() {
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', removeAllTasks);
    inputFilter.addEventListener('keyup', filterTasks);
}
loadListener();
//create task
function addTask(e){
    if(inputTask.value == '') {
        alert('لطفا متنی وارد کنید');
    } else {
    let li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(inputTask.value));
    let i = document.createElement('i');
    i.className = 'fas fa-times text-danger mr-auto delete-item';
    li.appendChild(i);
    taskList.appendChild(li);
    addTaskInLocalstorage(inputTask.value);
    inputTask.value = '';
    e.preventDefault();
    }
}
//get tasks from localstorage
function getTasks(e) {
    let tasks;
    if(localStorage.getItem('tasks') == null) {
        tasks =[];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
        let li = document.createElement('li');
        li.className = 'list-group-item';
        li.appendChild(document.createTextNode(task)); 
        let i = document.createElement('i');
        i.className = 'fas fa-times text-danger mr-auto delete-item';
        li.appendChild(i);
        taskList.appendChild(li);
    })
}
//add tasks to localstorage
function addTaskInLocalstorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));   
}

//remove all tasks
function removeAllTasks(e) {
    taskList.innerHTML = '';
    removeAllTasksFromLocalStorage();
}
//remove all from local storage
function removeAllTasksFromLocalStorage() {
    localStorage.clear();
}
//remove one task
function removeTask(e) {
    if(e.target.classList.contains('delete-item')) {
        if(confirm("are you sure?")){
            e.target.parentElement.remove();
            removeTasksFromLocalStorage(e.target.parentElement.textContent);
        }
    }
}
//remove one task from local storage
function removeTasksFromLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') == null) {
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(item, index) {
        if(item == task) {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    });
}
//filter tasks
function filterTasks(e) {
    let tasks = document.querySelectorAll('.list-group-item');
    console.log(tasks);
    let item = e.target.value.toLowerCase();
    tasks.forEach(function(task){
        if(task.textContent.toLowerCase().indexOf(item) != -1) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}






