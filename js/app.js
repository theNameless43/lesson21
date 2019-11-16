"use strict";

let tasks = [];

let loadedData = loadDataFromFile();

getTasks();
showTasks();
addNewTask();
sendDataToServer();
