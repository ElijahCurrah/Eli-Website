// Save tasks in cookies
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#todoList li').forEach(task => {
        tasks.push(task.textContent);
    });

    const tasksString = JSON.stringify(tasks);
    console.log("Saving tasks to cookie:", tasksString);  // Debugging: Print tasks before saving

    // Save tasks as a cookie (1 year)
    document.cookie = `tasks=${tasksString}; path=/; max-age=31536000`;  // Check path and expiration
    console.log("Cookie saved:", document.cookie);  // Debugging: Print cookie after saving
}

// Load tasks from cookies
function loadTasks() {
    const cookieString = document.cookie;
    console.log("Loaded cookies:", cookieString);  // Debugging: Print cookies on load

    // Find the cookie that starts with 'tasks='
    const cookies = cookieString.split('; ').find(row => row.startsWith('tasks='));

    if (cookies) {
        const tasks = JSON.parse(cookies.split('=')[1]);
        console.log("Tasks loaded from cookie:", tasks);  // Debugging: Print tasks after loading

        const todoList = document.getElementById('todoList');
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;
            li.onclick = function() {
                removeTask(li);
            };
            todoList.appendChild(li);
        });
    } else {
        console.log("No tasks cookie found");
    }
}

// Load tasks automatically when the DOM is ready
document.addEventListener("DOMContentLoaded", function() {
    loadTasks();  // Automatically load tasks when the page is loaded
});
