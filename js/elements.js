"use strict";

let showTasks = () => {
    $('#tasks').html('');
    for(let i = 0; i < tasks.length; i++){
        $('<div>', {
            id: 'task-line' + i,
            class: 'row task-line',
            'data-task-index': i,
        }).appendTo('#tasks');

        $('<div>', {
            id: 'task' + i,
            text: tasks[i].text,
            class: 'col-6 task-col',
        }).appendTo('#task-line' + i);

        $('<div>', {
            id: 'priority-col' + i,
            class: 'col-2',
            text: tasks[i].priority,
        }).appendTo('#task-line' + i);

        setPriorityStyle(i);

        $('<div>', {
            id: 'status-col' + i,
            class: 'col-2',
            text: tasks[i].status,
        }).appendTo('#task-line' + i);

        setStatusStyle(i);

        $('<div>', {
            id: 'buttons' + i,
            class: 'col-2',
        }).appendTo('#task-line' + i);

        $('<button>', {
            type: 'button',
            class: 'btn btn-warning',
            text: 'Edit',
            'data-edit-index': i,
        }).appendTo('#buttons' + i).click(editClickHandler);

        $('<button>', {
            type: 'submit',
            class: 'btn btn-danger',
            'data-toggle': "modal",
            'data-target': "#myModal",
            text: 'Delete',
            'data-delete-index': i,
        }).appendTo('#buttons' + i).click(deleteClickHandler);
    }
};

let setOption = (value, text, appendTo) => {
    $('<option>',{
        value: value,
        text: text,
    }).appendTo(appendTo);
};

let setNewPriority = (taskIndex) => {
    const newPriority = $('<select>', {
        class: 'new-priority',
    });

    setOption(loadedData[0].priority1, loadedData[0].priority1, newPriority);
    setOption(loadedData[0].priority2, loadedData[0].priority2, newPriority);
    setOption(loadedData[0].priority3, loadedData[0].priority3, newPriority);

    $('#priority-col' + taskIndex).html(newPriority);
};

let setNewStatus = (taskIndex) => {
    const newStatus = $('<select>', {
        class: 'new-status',
    });

    setOption(loadedData[1].status1, loadedData[1].status1, newStatus);
    setOption(loadedData[1].status2, loadedData[1].status2, newStatus);
    setOption(loadedData[1].status3, loadedData[1].status3, newStatus);

    $('#status-col' + taskIndex).html(newStatus);
};

let setPriorityStyle = (index) => {
    if(tasks[index].priority === loadedData[0].priority1){
        $('#priority-col' + index).removeClass("medium low").addClass("high");
    } else if(tasks[index].priority === loadedData[0].priority2){
        $('#priority-col' + index).removeClass("high low").addClass("medium");
    } else if(tasks[index].priority === loadedData[0].priority3){
        $('#priority-col' + index).removeClass("high medium").addClass("low");
    }
};

let setStatusStyle = (index) => {
    if(tasks[index].status === loadedData[1].status1){
        $('#status-col' + index).removeClass("in-progress checked").addClass("open");
        $('#task' + index).removeClass("checked-task");
    } else if(tasks[index].status === loadedData[1].status2){
        $('#status-col' + index).removeClass("open checked").addClass("in-progress");
        $('#task' + index).removeClass("checked-task");
    } else if(tasks[index].status === loadedData[1].status3){
        $('#status-col' + index).removeClass("open in-progress").addClass("checked");
        $('#task' + index).addClass("checked-task");
        removePriorityStyle(index);
    }
};

let removePriorityStyle = (index) => $('#priority-col' + index).removeClass("high low medium");