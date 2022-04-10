let form = document.querySelector('#task_form');
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_task_btn');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');



//define ui elements


//define eventlistener
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearAllTasks);
filter.addEventListener('keyup', filterSearch);
document.addEventListener('DOMContentLoaded', showTasks);

//define functions
//add task

function addTask(e) {
    if (taskInput.value === '') {
        alert('Please Add a task!');
    }

    else {
        //create li element
        let newTaskItem = document.createElement('li');
        newTaskItem.appendChild(document.createTextNode(taskInput.value + " "));
        let linkCross = document.createElement('a');
        linkCross.setAttribute('href', '#');
        linkCross.innerHTML = 'x';
        newTaskItem.appendChild(linkCross);
        taskList.appendChild(newTaskItem);

        storeLocal(taskInput.value);


        taskInput.value = '';
        e.preventDefault();

    }
}

function removeTask(e) {
    //console.log(e.target);
    if (e.target.hasAttribute('href')) {
        if (confirm("Sure?")) {
            e.target.parentElement.remove();
            removeFromStorage(e.target.parentElement);
        }
    }

}

function clearAllTasks(e) {
    let allTasks = document.querySelectorAll('li');
    let i = 0;
    while (allTasks) {
        allTasks[i].remove();
        //console.log(i);
        i++;
        //console.log(i)
        if (i == allTasks.length) break;

    }
    // for (i = 0; i < allTasks.length; i++) {
    //     allTasks[i].remove();
    // }
    console.log('yes');
    localStorage.clear();

}

function filterSearch(e) {
    let text = filter.value.toLowerCase();

    document.querySelectorAll('li').forEach(list => {
        let listItem = list.firstChild.textContent;
        if (listItem.toLowerCase().indexOf(text) != -1) {
            list.style.display = 'block';
        }
        else {
            list.style.display = 'none';
        }
    });
}

//save into storage

storeLocal = newTask => {
    let tasks;
    if (localStorage.getItem('Tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('Tasks'));
    }
    tasks.push(newTask);
    localStorage.setItem('Tasks', JSON.stringify(tasks));
}

function showTasks() {
    let tasks;
    if (localStorage.getItem('Tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('Tasks'));
    }

    tasks.forEach(taskValue => {
        let newTaskItem = document.createElement('li');
        newTaskItem.appendChild(document.createTextNode(taskValue + " "));
        let linkCross = document.createElement('a');
        linkCross.setAttribute('href', '#');
        linkCross.innerHTML = 'x';
        newTaskItem.appendChild(linkCross);
        taskList.appendChild(newTaskItem);
    });

}

removeFromStorage = element => {
    let tasks;
    if (localStorage.getItem('Tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('Tasks'));
    }

    element.removeChild(element.lastChild);

    tasks.forEach((v, i) => {
        if (element.textContent.trim() === v) {
            tasks.splice(i, 1);
        }
    });

    localStorage.setItem('Tasks', JSON.stringify(tasks));
}