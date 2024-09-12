// Function to add a task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();  // Get the trimmed value

    if (task) {
        const todoList = document.getElementById('todoList');

        const li = document.createElement('li');
        li.textContent = task;

        // Add click event to remove the task
        li.onclick = function() {
            removeTask(li);
        };

        todoList.appendChild(li);  // Add the new task to the list
        saveTasks();  // Save the updated list of tasks in cookies

        taskInput.value = '';  // Clear the input after adding the task
    }
}

// Function to remove a task
function removeTask(taskElement) {
    taskElement.remove();  // Remove the task from the UI
    saveTasks();  // Update the cookie to reflect the removal
}

// Save tasks in cookies
function saveTasks() {
    const tasks = [];

    // Collect all the tasks from the list
    document.querySelectorAll('#todoList li').forEach(task => {
        tasks.push(task.textContent);
    });

    // Convert the array to a JSON string and save it in cookies
    const tasksString = JSON.stringify(tasks);
    document.cookie = `tasks=${tasksString}; path=/; max-age=31536000`;  // Save the cookie for 1 year

    console.log("Tasks saved to cookie:", tasksString);  // Debugging: Check the tasks being saved
}

// Load tasks from cookies
function loadTasks() {
    const cookieString = document.cookie;

    // Find the cookie that stores the tasks
    const cookies = cookieString.split('; ').find(row => row.startsWith('tasks='));

    if (cookies) {
        const tasks = JSON.parse(cookies.split('=')[1]);

        // Add tasks back into the list
        const todoList = document.getElementById('todoList');
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;

            // Add click event to remove the task
            li.onclick = function() {
                removeTask(li);
            };

            todoList.appendChild(li);  // Add each task back to the list
        });
    } else {
        console.log("No tasks found in cookies.");
    }
}

// Automatically load tasks when the page is loaded
document.addEventListener("DOMContentLoaded", function() {
    loadTasks();  // Load tasks from cookies on page load
});
