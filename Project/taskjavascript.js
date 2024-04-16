let startTime;
let intervalId;
let tasks = [];

function startTimer() {
    startTime = new Date().getTime();
    intervalId = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(intervalId);
    const endTime = new Date().getTime();
    const duration = formatTime((endTime - startTime) / 1000);
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    addTaskToTable(taskName, taskDescription, duration);
    document.getElementById('timer').innerText = '';
}

function updateTimer() {
    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - startTime) / 1000;
    document.getElementById('timer').innerText = 'Elapsed Time: ' + formatTime(elapsedTime);
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
}

function pad(number) {
    return (number < 10 ? '0' : '') + number;
}

function addTaskToTable(taskName, taskDescription, duration) {
    tasks.push({ taskName, taskDescription, duration });
    renderTasks();
}

function renderTasks() {
    const tableBody = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    tasks.forEach((task, index) => {
        const newRow = tableBody.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3); // New cell for delete button
        cell1.innerText = task.taskName;
        cell2.innerText = task.taskDescription;
        cell3.innerText = task.duration;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function() {
            deleteTask(index);
        };
        cell4.appendChild(deleteButton);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function filterTasksByName() {
    const filterValue = document.getElementById('filterByName').value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.taskName.toLowerCase().includes(filterValue));
    renderFilteredTasks(filteredTasks);
}

function renderFilteredTasks(filteredTasks) {
    const tableBody = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    filteredTasks.forEach(task => {
        const newRow = tableBody.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        cell1.innerText = task.taskName;
        cell2.innerText = task.taskDescription;
        cell3.innerText = task.duration;
    });
}
