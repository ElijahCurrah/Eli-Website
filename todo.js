// Function to add a task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();
    if (task) {
        const todoList = document.getElementById('todoList');
        const li = document.createElement('li');
        li.textContent = task;
        li.onclick = function() {
            removeTask(li);
        };
        todoList.appendChild(li);
        saveTasks();
        taskInput.value = ''; // Clear input after adding
    }
}

// Function to remove a task
function removeTask(taskElement) {
    taskElement.remove();
    saveTasks();
}

// Save tasks in cookies
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#todoList li').forEach(task => {
        tasks.push(task.textContent);
    });
    document.cookie = `tasks=${JSON.stringify(tasks)}; path=/; max-age=31536000`; // Save for 1 year
}

// Load tasks from cookies
function loadTasks() {
    const cookies = document.cookie.split('; ').find(row => row.startsWith('tasks='));
    if (cookies) {
        const tasks = JSON.parse(cookies.split('=')[1]);
        const todoList = document.getElementById('todoList');
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;
            li.onclick = function() {
                removeTask(li);
            };
            todoList.appendChild(li);
        });
    }
}

// Load tasks when the page is loaded
window.onload = loadTasks;
