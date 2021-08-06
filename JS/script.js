
/*
 localStorage.removeItem("canStorageTasksJson")
 localStorage.clear("canStorageTasksJson")
 localStorage.removeItem("tasksJson")
 localStorage.clear("tasksJson")
*/

// console.log(localStorage)
//System for not reset the value of the tasksJson stored in "local storage"
let canStorageTasksJson = localStorage.getItem("canStorageTasksJson");

if (canStorageTasksJson == null){
    localStorage.setItem("tasksJson", "");
    localStorage.setItem("canStorageTasksJson", false)
    console.log("defined")
}


window.onload = function(){
    let tasksJson = localStorage.getItem("tasksJson");
    
    //If Json tasks in local storage is not empty...
    if (tasksJson != ""){
        console.log(localStorage.getItem("tasksJson"));
        tasks = JSON.parse(localStorage.getItem("tasksJson"));
        for (const task of tasks) {
            console.log("task:");
            console.log(task);
            addTask(task);
        }
    }
}

function deleteTask(id){

    console.log("id:")
    console.log(id)

    tasks = JSON.parse(localStorage.getItem("tasksJson"));
    tasks.splice(tasks[id - 1], 1);
    console.log("tasks:")
    console.log(tasks)
    localStorage.setItem("tasksJson", tasks);
}




//Main Class (Task)
function Task(id, title, explication, dateToFinish, dateAdded) {
    this.id = id;
    this.title = title;
    this.explication = explication;
    this.dateToFinish = dateToFinish;
    this.dateAdded = dateAdded;
    this.finishedDate;
}

function addTask(task, tasks){

    function findIndex(list, obj) {
        return list.findIndex((current) =>
          Object.keys(current).every((key) => obj[key] === current[key])
        );
      }
    let container = document.getElementById('container');
    container.innerHTML +=
    "<div id='taskContainer'>" +
        "<div id='checkContainer'>" + 
            "<input type='checkbox' id='completed'>" + 
        "</div>" + 
        
        "<div id='descriptionContainer'>" + 
            "<h4 id='task'>"+ task.title +"</h4>" + 

            "<div id='explicationContainer'>" +
                task.explication+
            "</div>" +

            "<p id='dateToFinish'>" + task.dateToFinish + "</p>" +
        "</div>" +

        "<div id='editContainer' class='icon'>" +
            "<img src='./Assets/Icons/edit-icon.png' alt='edit icon' title='edit icon'>" +
        "</div>" +

        "<div id='deleteContainer' class='icon' onclick='deleteTask(" + findIndex(tasks, task) + ")'>" +
        //!I need to make the id auto adjust itself, remake it count, or find the index of an element by searching a match of the value of each property of the element
            "<img src='./Assets/Icons/delete-icon.png' alt='delete icon' title='delete icon'>" +
        "</div>" +
    "</div>";
}

function checkFields(element) {
    saveTask();
    loadNewTask();
    return
    let task = document.getElementsByName('taskForm')[0]
    if (task.value == '' || task.value == null || task.value == undefined) {
        alert('Task title must be filled!')
    } else {
        // alert('Task Saved with success!')
    }
    //* window.location.href = 'index.html';
}

function loadNewTask() {
    //Parses json tasks to array
    let tasks = JSON.parse(localStorage.getItem("tasksJson"));

    //Picks up the last item of the task array
    let task = tasks[tasks.length - 1];

    //Adds a task on the html
    addTask(task, tasks);
}

function saveTask(){
    let tasksLength = 0;
    let tasks = Array()

    let tasksJson = localStorage.getItem("tasksJson");

    //If Json tasks in local storage is not empty...
    if (tasksJson != ""){
        //Parses json tasks to array
        tasks = JSON.parse(tasksJson)
        //Redefines the length of the tasks
        tasksLength = tasks.length;
    }

    //Picks up all the values of the form
    let id = tasksLength + 1;
    let title = document.getElementById('taskForm').value;
    let explication = document.getElementById('explicationForm').value;
    let dateToFinish = document.getElementById('dateToFinishForm').value;
    let timeToFinish = document.getElementById('timeToFinishForm').value;

    //Joins up the date to finish with the time to finish through template string
    let fullDateToFinish = dateToFinish + ' ' + timeToFinish; // layout: 'YYYY-MM-DD/hh:mm'

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
    let fullDateAdded = dateAdded + ' ' + timeAdded;

    //Instantiates a task
    let taskObj = new Task(id, title, explication, fullDateToFinish, fullDateAdded);
    //Transform task object to JSON and save it in local storage.
    //The save is based on the id of the task
    tasks.push(taskObj);

    // localStorage.setItem("tasks", JSON.stringify(task));
    // console.log(localStorage.getItem("tasks"));
    
    localStorage.setItem("tasksJson", JSON.stringify(tasks));

}
    
    
    

    /*
     <div id='taskContainer'>
                <div id='checkContainer'>
                    <input type='checkbox' name='' id=''>
                </div>

                <div id='descriptionContainer'>
                    <h4 id='task'>Comprar uma casa</h4>

                    <div id='explicationContainer'>
                        <p id='explication'></p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo illo,
                        totam maxime adipisci
                        atque illum repudiandae ad quasi sed ipsam obcaecati labore, delectus iure cum repellat
                        ratione expedita id! Tenetur.</p>
                    </div>

                    <p id='dateToFinish'>06/08/2021</p>
                </div>

                <div id='editContainer' class='icon'>
                    <img src='./Assets/Icons/edit-icon.png' alt='edit icon' title='edit icon'>
                </div>

                <div id='deleteContainer' class='icon'>
                    <img src='./Assets/Icons/delete-icon.png' alt='delete icon' title='delete icon'>
                </div>
            </div>
    */

