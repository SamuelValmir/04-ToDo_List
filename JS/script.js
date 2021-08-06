function Task(id, task, explication, dateToFinish, dateAdded) {
    this.id = id;
    this.task = task;
    this.explication = explication;
    this.dateToFinish = dateToFinish;
    this.dateAdded = dateAdded;
    this.finishedDate;

    this.getId = function () {
        return this.id;
    }

    this.setTask = function (task) {
        this.task = task;
    }

    this.getTask = function () {
        return this.task;
    }

    this.setFinishedDate = function (finishedDate) {
        this.finishedDate = finishedDate;
    }

    this.getFinishedDate = function () {
        return this.finishedDate;
    }
}

function checkFields(element) {
    transformToJson();
    saveTask();
    return
    let task = document.getElementsByName('taskForm')[0]
    if (task.value == '' || task.value == null || task.value == undefined) {
        alert('Task needs to be filled!')
    } else {
        // alert('Task Saved with success!')
    }
    //* window.location.href = 'index.html';
}

function saveTask() {
    let div = document.getElementById('container');

    div.innerHTML +=
    ("<div id='taskContainer'>" +
        "<div id='checkContainer'>" + 
            "<input type='checkbox' id='completed'>" + 
        "</div>" + 
        
        "<div id='descriptionContainer'>" + 
            "<h4 id='task'>"+ "abcdefg" +"</h4>" + 

            "<div id='explicationContainer'>" +
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa in placeat accusamus, velit facilis eveniet dolorum fuga est esse eaque rerum explicabo laudantium dicta fugit ratione fugiat nihil, quasi veritatis!" +
            "</div>" +

            "<p id='dateToFinish'>06/08/2021</p>" +
        "</div>" +

        "<div id='editContainer' class='icon'>" +
            "<img src='./Assets/Icons/edit-icon.png' alt='edit icon' title='edit icon'>" +
        "</div>" +

        "<div id='deleteContainer' class='icon'>" +
            "<img src='./Assets/Icons/delete-icon.png' alt='delete icon' title='delete icon'>" +
        "</div>" +
    "</div>");

}

function transformToJson(){
    let tasks = Array();
    
    let id = tasks.length + 1;
    let task = document.getElementById('taskForm');
    let explication = document.getElementById('explicationForm');
    let dateToFinish = document.getElementById('dateToFinishForm');
    let timeToFinish = document.getElementById('timeToFinishForm');


    //Joins up the date to finish with the time to finish through template string
    let fullDateToFinish = dateToFinish.value + '/' + timeToFinish.value; // layout: 'YYYY-MM-DD/hh:mm'

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
    let fullDateAdded = dateAdded + '/' + timeAdded;

    //Instantiates a task
    let taskObj = new Task(id, task, explication, fullDateToFinish, fullDateAdded);
    //Transform task object to JSON and save it in local storage.
    //The save is based on the id of the task
    tasks.push(taskObj);

    // localStorage.setItem("tasks", JSON.stringify(task));
    // console.log(localStorage.getItem("tasks"));
    let a =JSON.stringify(tasks);
    console.log(a);
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

