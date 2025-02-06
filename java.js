// Load tasks from local storage when the page loads
window.onload = function() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        addTaskToList(task.text, task.completed);
    });
};

// Function to add a task to the list and update local storage
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("taskList");

    // Create a new list item
    let li = document.createElement("li");

    // Create checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onclick = function () {
        toggleTaskCompletion(li, checkbox);
    };

    // Create task text span
    let taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    // Create Edit button
    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = function () {
        editTask(taskSpan);
    };

    // Create Delete button
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
        taskList.removeChild(li);
        removeTaskFromLocalStorage(taskText);
    };

    // Add elements to the list item
    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    // Add the task to the list
    taskList.appendChild(li);

    // Save task to local storage
    saveTaskToLocalStorage(taskText, checkbox.checked);

    // Clear the input field
    taskInput.value = "";
}

// Function to mark task as completed and show alert
function toggleTaskCompletion(taskItem, checkbox) {
    let taskText = taskItem.querySelector("span");
    
    if (checkbox.checked) {
        taskText.style.textDecoration = "line-through";
        alert("YAY! 😊");
    } else {
        taskText.style.textDecoration = "none";
    }

    // Update task completion status in local storage
    updateTaskInLocalStorage(taskText.textContent, checkbox.checked);
}

// Function to update task completion status in local storage
function updateTaskInLocalStorage(taskText, isCompleted) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let task = tasks.find(t => t.text === taskText);
    
    if (task) {
        task.completed = isCompleted;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

// Function to save a task to local storage
function saveTaskToLocalStorage(taskText, isCompleted) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, completed: isCompleted });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to remove a task from local storage
function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to edit a task
function editTask(taskSpan) {
    let newTask = prompt("Edit your task:", taskSpan.textContent);
    if (newTask !== null && newTask.trim() !== "") {
        taskSpan.textContent = newTask.trim();
        updateTaskInLocalStorage(newTask.trim(), taskSpan.parentNode.querySelector("input").checked);
    }
}

// Function to load tasks from local storage when the page loads
function addTaskToList(taskText, isCompleted) {
    let taskList = document.getElementById("taskList");

    // Create a new list item
    let li = document.createElement("li");

    // Create checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isCompleted;
    checkbox.onclick = function () {
        toggleTaskCompletion(li, checkbox);
    };

    // Create task text span
    let taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    if (isCompleted) {
        taskSpan.style.textDecoration = "line-through";
    }

    // Create Edit button
    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = function () {
        editTask(taskSpan);
    };

    // Create Delete button
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
        taskList.removeChild(li);
        removeTaskFromLocalStorage(taskText);
    };

    // Add elements to the list item
    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    // Add the task to the list
    taskList.appendChild(li);
}
