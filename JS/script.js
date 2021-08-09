//System for not reset the value of the tasksJson stored in "local storage"
//It's important to make just one instance of the "database"/local storage
let canStorageTasksJson = localStorage.getItem("canStorageTasksJson");

if (canStorageTasksJson == null) {
    localStorage.setItem("tasksJson", "");
    localStorage.setItem("canStorageTasksJson", false)
    console.log("Local storage defined")
}

window.onload = function () {

    //Shows each task on screen by writing in HTML
    {
        let tasksJson = localStorage.getItem("tasksJson");

        //If Json tasks in local storage is not empty...
        if (tasksJson != "") {
            tasks = JSON.parse(tasksJson);
            for (const task of tasks) {
                addTask(task);
            }
        }
    }
}

//Main Class (Task)
function Task(id, title, explication, dateToFinish, timeToFinish, dateAdded, timeAdded) {
    this.id = id;
    this.title = title;
    this.explication = explication;
    this.dateToFinish = dateToFinish;
    this.timeToFinish = timeToFinish;
    this.dateAdded = dateAdded;
    this.timeToFinish = timeToFinish;
    this.finishedDate;
}

function checkFields() {
    //Don't allow the task title be empty
    let task = document.getElementById('taskForm').value;
    if (task == '' || task == null || task == undefined) {
        alert('Task title must be filled!')
    } else {
        //Analyze if it will save or edit a task based on presence or not of the id in HTML.
        const id = document.getElementById("id").value;
        saveTask(id);
        loadNewTask();

        alert('Task saved with success!');
    }
}

function saveTask(id) {
    let tasksLength = 0;
    let tasks = Array()

    let tasksJson = localStorage.getItem("tasksJson");

    //If Json tasks in local storage is not empty...
    if (tasksJson != "") {
        //Parses json tasks to array
        tasks = JSON.parse(tasksJson)
        //Redefines the length of the tasks
        tasksLength = tasks.length;
    }

    //Picks up all the values of the form
    let title = document.getElementById('taskForm').value;
    let explication = document.getElementById('explicationForm').value;
    let dateToFinish = document.getElementById('dateToFinishForm').value;
    let timeToFinish = document.getElementById('timeToFinishForm').value;

    //Picks up today's date
    let dateObj = new Date();
    let dayAdded = dateObj.getDate();
    let monthAdded = dateObj.getMonth() + 1;
    let yearAdded = dateObj.getFullYear();
    //Picks up today's time
    let hourAdded = dateObj.getHours();
    let minAdded = dateObj.getMinutes();
    //formats time that the task wad added
    let dateAdded = yearAdded + '-' + monthAdded + '-' + dayAdded //layout: 'YYYY-MM-DD'
    let timeAdded = hourAdded + ':' + minAdded; //layout: 'hh:mm'

    let taskObj;
    //If id its empty...
    if (id == "" || id == null || id == undefined) {
        //It'll receive a value based on the length of tasks.
        id = tasksLength + 1;
        //Instantiates a task
        taskObj = new Task(id, title, explication, dateToFinish, timeToFinish, dateAdded, timeAdded);
        //Append object task in array
        tasks.push(taskObj);
    } else {
        taskObj = tasks[id - 1];
        //It'll receive a value based on task object id.
        id = taskObj.id;
        taskObj.title = title;
        taskObj.explication = explication;
        taskObj.dateToFinish = dateToFinish;
        taskObj.timeToFinish = timeToFinish;
    }

    //save tasks array in local storage
    localStorage.setItem("tasksJson", JSON.stringify(tasks));
    window.location.href = "index.html";
}

function loadNewTask() { //Picks up the last object of the array tasks and sends for addTask function to be added on screen
    //Parses json tasks to array
    let tasks = JSON.parse(localStorage.getItem("tasksJson"));

    //Picks up the last item of the task array
    let task = tasks[tasks.length - 1];

    addTask(task, tasks);
}

function addTask(task) { //Appends one task in HTML
    //Formats how it'll be showed in HTML the date to finish of the task
    let fullDateToFinish = "";
    const timeToFinish = task.timeToFinish
    if (timeToFinish == "" || timeToFinish == null || timeToFinish == undefined) {
        fullDateToFinish = task.dateToFinish;
    } else {
        fullDateToFinish = task.dateToFinish + "/" + timeToFinish;
    }

    //Params variable was made because was no possible to send two parameters in checkBox onclick function
    let params = JSON.stringify({checkBoxId:"checkBox" + task.id, taskContentId:"taskContent" + task.id});
    let container = document.getElementById('container');
    container.innerHTML +=
        "<div id='taskContainer'>" +
            "<div id='checkContainer'>" +
                "<input type='checkbox' id='checkBox" + task.id + "' onclick=putLine(" + params + ")>" +
            "</div>" +

            "<div id='descriptionContainer'>" +
                "<div id='taskContent" + task.id + "'>" +
                    "<h4 id='task'>" + task.title + "</h4>" +
                    "<div id='explicationContainer'>" +
                        task.explication +
                    "</div>" +
                    "<p id='dateToFinish'>" + fullDateToFinish + "</p>" +
                "</div>" +
            "</div>" +

            "<div id='editContainer' class='icon' onclick='editTask(" + task.id + ")'>" +
                "<img src='./Assets/Icons/edit-icon.png' alt='edit icon' title='edit'>" +
            "</div>" +

            "<div id='deleteContainer' class='icon' onclick='deleteTask(" + task.id + ")'>" +
                "<img src='./Assets/Icons/delete-icon.png' alt='delete icon' title='delete'>" +
            "</div>" +
        "</div>";
}

function putLine(params){ //Decorates the task as press checkBox
    let checkBox = document.getElementById(params.checkBoxId);
    let content = document.getElementById(params.taskContentId);

    if (checkBox.checked == true){
        content.style.textDecoration = "line-through";
        content.style.opacity = "50%";
        return;
    } 
    content.style.textDecoration = "none";
    content.style.opacity = "100%";

}

function editTask(id) {
    //Picks the task string stored in local storage and parse to object
    tasks = JSON.parse(localStorage.getItem("tasksJson"));
    task = tasks[id - 1];
    //Edits a task by your id

    {
        //Sets up all the values of the form
        let htmlId = document.getElementById("id");
        htmlId.value = task.id;

        let title = document.getElementById('taskForm');
        title.value = task.title;

        let explication = document.getElementById('explicationForm');
        explication.value = task.explication;

        let formDateToFinish = document.getElementById('dateToFinishForm');
        const tDateToFinish = task.dateToFinish;
        if (tDateToFinish != "" || tDateToFinish != null || tDateToFinish != undefined) {
            formDateToFinish.value = tDateToFinish;
        }

        let formTimeToFinish = document.getElementById('timeToFinishForm');
        const tTimeToFinish = task.timeToFinish;
        if (tTimeToFinish != "" || tTimeToFinish != null || tTimeToFinish != undefined) {
            formTimeToFinish.value = tTimeToFinish;
        }
        document.getElementById("addTaskForm").value = "Edit Task"
    }
}

function deleteTask(id) {
    //Picks the task string stored in local storage and parse to object
    tasks = JSON.parse(localStorage.getItem("tasksJson"));
    //Deletes a task by your id
    tasks.splice(id - 1, 1);

    reorderId();

    localStorage.setItem("tasksJson", JSON.stringify(tasks));

    //reload screen
    window.location.href = "index.html";
}

function reorderId() { //Reorder each id of the task.
    //This is important to delete the correct element. This makes a relationship between the position of the task in array and your id.
    if (tasks.length != 0) {
        for (const sPos in tasks) {
            const iPos = parseInt(sPos);
            tasks[iPos].id = (iPos + 1)
        }
    }
}