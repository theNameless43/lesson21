"use strict";

let loadDataFromFile = () => {
    let json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': ('status.json'),
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
};

let getTasks = () => {
    tasks = getDataFromLocalStorage();
    if(tasks === null){
        tasks = [];
    }
    return tasks;
};

let addNewTask = () => $('#add').click(addTaskClickHandler);

let sendDataToLocalStorage = () => localStorage.setItem('taskList', JSON.stringify(tasks));

let getDataFromLocalStorage = () => tasks = JSON.parse(localStorage.getItem('taskList'));

let addTaskClickHandler = () => {
    let text = document.forms[0].elements.text.value;
    let task = {
        text: text,
        priority: loadedData[0].priority1,
        status: loadedData[1].status1,
    };

    if(text === ''){
        $('#empty').modal('show');
    } else {
        tasks.push(task);
        $('#tasks').html('');
        sendDataToLocalStorage();
        showTasks();
    }
    $('.input-task').val('');
};

function deleteClickHandler() {
    let taskIndex = this.getAttribute('data-delete-index');
    $('#myModal').modal('show');
    $('#yes').on('click', function(){
        tasks.splice(taskIndex, 1);
        sendDataToLocalStorage();
        showTasks();
        $('#yes').off();
    });
}


function editClickHandler() {
    let taskIndex = this.getAttribute('data-edit-index');
    const input = $('<input>',{
        'class': 'new-text',
        'type': 'text',
        'value': tasks[taskIndex].text,
    });
    $('#task' + taskIndex).html(input);

    setNewPriority(taskIndex);

    setNewStatus(taskIndex);

    const save = $('<button>', {
        type: 'button',
        class: 'btn btn-primary',
        text: 'Save',
        'data-save-index': taskIndex,
    }).click(saveClickHandler);

    $('#buttons' + taskIndex).html(save);
    removePriorityStyle(taskIndex);
}

function saveClickHandler() {
    let taskIndex = this.getAttribute('data-save-index');
    tasks[taskIndex].text = $('.new-text').val();
    tasks[taskIndex].priority = $('.new-priority').val();
    tasks[taskIndex].status = $('.new-status').val();

    sendDataToLocalStorage();
    showTasks();
}

let sendDataToServer = () => {
    $('.btn-outline-secondary').on('click', function () {
        const url = "vrelsu.com";
        let websocket = new WebSocket(url);
        let message = localStorage.getItem('taskList');
        websocket.send(message);
    });
};