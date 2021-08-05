function Task(task, explication, dateToFinish, addedDate) {
    this.task = task;
    this.name = explication;
    this.dateToFinish = dateToFinish;
    this.dateAdded = dateAdded;
    this.finishedDate;

    this.setFinishedDate = function (finishedDate) {
        this.finishedDate = finishedDate;
    }

    this.getFinishedDate = function () {
        this.finishedDate = this.finishedDate;
    }

}

