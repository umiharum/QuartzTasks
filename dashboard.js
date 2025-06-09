const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const displayWeekDay = document.getElementById('day');
const displayDayNb = document.getElementById('number');
const displayMonth = document.getElementById('month');

const day = new Date();
let dayName = day.getDay();
let dayNumber = day.getDate();
let monthName = day.getMonth();

displayWeekDay.innerHTML = weekdays[dayName];
displayDayNb.innerHTML = dayNumber;
displayMonth.innerHTML = months[monthName];

const addTaskButton = document.getElementById('add-task-btn');
const taskInput = document.getElementById('input-task');
let taskList = [];
const taskSpans = [];

const progressBar = document.getElementById('progress-bar');
let totalTasks = 0;

const finishBtn = document.getElementById('finish-btn');
finishBtn.addEventListener('click', () => {
    console.log('Saving progress:', progressBar.value);
    localStorage.setItem('finalProgress', progressBar.value);
    window.electronAPI.loadPage('finish.html');
});

for(let i = 0; i < 7; i++){
    let taskSpan = document.getElementById(`text-task-${i}`);

    if(taskSpan){
        taskSpans.push(taskSpan);

        taskSpan.addEventListener('click', (event) => {
            event.target.classList.toggle('done');
            event.target.classList.toggle('checked');
            updateProgressBar();
        });
    }
}

addTaskButton.addEventListener('click', () => {
    if (taskInput.value.trim() === '') {
        console.warn('Task input is empty');
    }
    else if (taskList.length >= 7) {
        console.warn('Maximum of 7 tasks reached');
    } else {
        taskList.push(taskInput.value);
        updateTaskDisplay();
        taskInput.value = '';
        totalTasks++;
        updateProgressBar();
    }
});

function updateTaskDisplay() {
    for (let i = 0; i < taskSpans.length; i++){
        if(taskList[i]){
            taskSpans[i].innerHTML = taskList[i];
        }
        else{
            taskSpans[i].textContent = '';
        }
    }
}

function updateProgressBar() {
    const checkedElements = document.querySelectorAll(".checked");
    const checkedCount = checkedElements.length;
    const totalTasks = taskList.length;
    const progress = checkedCount / totalTasks;

    progressBar.value = progress * 100;
}