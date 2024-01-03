const tasks = loadTasks();

function calculatePriority(weight, dueDate, estimatedTime, completed) {
    if (completed) {
        return '-';
    }

    // Check through all tasks to see if there are any tasks due today and not completed
    let tasksDueToday = areTasksDueToday();

    let priority = 1;

    if (dueDate) {
        const today = new Date();
        const taskDueDate = new Date(dueDate);
        const daysUntilDue = Math.max((taskDueDate - today) / (1000 * 60 * 60 * 24), 0);

        if (daysUntilDue <= 1) {
            // If due date is today or one day away, give higher priority
            priority += 3;
        } else if (daysUntilDue <= 3) {
            priority += 1;
        } else if (daysUntilDue > 3) {
            priority -= 1;
        }

        if (weight >= 7) {
            // High weight
            priority += 2.5;
        } else if (weight >= 4) {
            // Medium weight
            priority += 1;
        } else if (weight < 4) {
            priority -= 1;
        }

        if (estimatedTime <= 3) {
            // 1-3 hours
            priority += 1;
        } else if (estimatedTime <= 6) {
            // 3-6 hours
            priority += 0.5;
        } else if (estimatedTime > 6) {
            priority -= 0.5;
        }

    } else {
        // Handle case where dueDate is null

        if (!dueDate) {
            priority -= 1.5;
        }

        if (weight >= 7) {
            // High weight
            priority += 3;
        } else if (weight >= 4) {
            // Medium weight
            priority += 1.5;
        } else if (weight < 4) {
            priority -= 1;
        }

        if (estimatedTime <= 3) {
            // 1-3 hours
            priority += 1.5;
        } else if (estimatedTime <= 6) {
            // 3-6 hours
            priority += 1;
        } else if (estimatedTime > 6) {
            priority -= 0.5;
        }
    }

    const normalizedPriority = Math.max(1, Math.min(5, priority));
    return normalizedPriority;
}

function areTasksDueToday() {
    let tasksDueToday = false;
    tasks.forEach(task => {
        if (isTaskDueToday(task) && !isTaskCompleted(task)) {
            tasksDueToday = true;
        }
    });
    return tasksDueToday;
}

function adjustPriorityForDueToday(priority, weight) {
    if (weight <= 7) {
        return Math.min(priority, 4);
    }
    return priority;
}

function editTask(index) {
    const task = tasks[index];

    const newName = prompt("Enter the new task name:", task.name);
    if (newName === null) {
        // User clicked Cancel
        return;
    }

    const newWeight = parseInt(prompt("Enter the new importance (1-10):", task.weight));
    if (isNaN(newWeight) || newWeight < 1 || newWeight > 10) {
        alert("Please enter a valid importance between 1 and 10.");
        return;
    }

    const newDueDate = prompt("Enter the new due date (YYYY-MM-DD):", task.dueDate);
    const newEstimatedTime = parseInt(prompt("Enter the new estimated time (hours):", task.estimatedTime));

    if (isNaN(newEstimatedTime) || newEstimatedTime <= 0) {
        alert("Please enter a valid estimated time greater than 0.");
        return;
    }

    // Update the task with new values
    task.name = newName;
    task.weight = newWeight;
    task.dueDate = newDueDate || null;
    task.estimatedTime = newEstimatedTime;

    saveTasks();
    displayTasks();
}


function displayTasks() {
    const taskTableBody = document.getElementById("taskTableBody");
    taskTableBody.innerHTML = "";

    const completedTasks = [];
    const incompleteTasks = [];

    tasks.forEach(task => {
        if (task.completed) {
            completedTasks.push(task);
        } else {
            incompleteTasks.push(task);
        }
    });

    // Sort tasks by priority
    const sortedTasks = [...incompleteTasks, ...completedTasks].sort((a, b) => {
        const priorityA = calculatePriority(a.weight, a.dueDate, a.estimatedTime, a.completed);
        const priorityB = calculatePriority(b.weight, b.dueDate, b.estimatedTime, b.completed);
        return priorityB - priorityA; // Sort in descending order
    });

    sortedTasks.forEach(task => {
        const row = document.createElement("tr");


        let options = { year: 'numeric', month: '2-digit', day: '2-digit' };

        row.innerHTML = `<td><input type="checkbox" onchange="toggleTaskCompletion(${tasks.indexOf(task)})" ${task.completed ? 'checked' : ''}></td>
        <td>${task.name}</td>
        <td>${task.weight}</td>
        <td>${task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-GB', options) : "N/A"}</td>
        <td>${task.estimatedTime} hours</td>
        <td class="${getPriorityClass(task)}">${calculatePriority(task.weight, task.dueDate, task.estimatedTime, task.completed)}</td>
        <td>
        <button class="edit-button" onclick="editTask(${tasks.indexOf(task)})">Edit</button>
        <button class="delete-button" onclick="deleteTask(${tasks.indexOf(task)})">Delete</button>
    </td>`;
        taskTableBody.appendChild(row);
    });
}

// function to check if a task is completed
function isTaskCompleted(task) {
    if (task.completed) {
        return true;
    }
    return false;
}



function isTaskDueToday(task) {
    if (task.dueDate) {
        const today = new Date().setHours(0, 0, 0, 0);
        const taskDueDate = new Date(task.dueDate).setHours(0, 0, 0, 0);

        return today === taskDueDate;
    }
    return false;
}


function deleteTask(index) {
    const task = tasks[index];
    if (task.completed) {
        tasks.splice(index, 1);
        saveTasks();
        displayTasks();
    } else {
        const confirmation = confirm("Are you sure you want to delete this task?");
        if (confirmation) {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        }
    }
}

function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

function getPriorityClass(task) {
    const priority = calculatePriority(task.weight, task.dueDate, task.estimatedTime, task.completed);

    if (priority === 5) {
        return 'priority-highest';
    } else if (priority >= 4) {
        return 'priority-high';
    } else if (priority >= 2) {
        return 'priority-medium';
    } else {
        return 'priority-low';
    }
}

function addTask() {
    const taskNameInput = document.getElementById("taskName");
    const taskWeightInput = document.getElementById("taskWeight");
    const dueDateInput = document.getElementById("dueDate");
    const estimatedTimeInput = document.getElementById("estimatedTime");

    const taskName = taskNameInput.value;
    const taskWeight = parseInt(taskWeightInput.value);
    const dueDate = dueDateInput.value;
    const estimatedTime = parseInt(estimatedTimeInput.value);

    // Validate the weight input
    if (taskName && !isNaN(taskWeight) && taskWeight >= 1 && taskWeight <= 10 && !isNaN(estimatedTime) && estimatedTime > 0) {
        const newTask = { name: taskName, weight: taskWeight, dueDate: dueDate || null, estimatedTime: estimatedTime, completed: false };
        tasks.push(newTask);
        saveTasks();
        displayTasks();

        // Clear the input values
        taskNameInput.value = "";
        taskWeightInput.value = "";
        dueDateInput.value = "";
        estimatedTimeInput.value = "";
    } else if (taskWeight < 1 || taskWeight > 10) {
        alert("Enter an importance between 1 and 10");
    } else if (isNaN(taskWeight)) {
        alert("Please enter an importance");
    } else if (isNaN(estimatedTime)) {
        alert("Please enter an estimated time");
    } else if (estimatedTime <= 0) {
        alert("Please enter an estimated time greater than 1");
    } else if (!taskName) {
        alert("Please enter a task name");
    } else {
        alert("Error. Please check your inputs");
    }
}


//create a function for the clear button
function clearTasks() {
    const confirmation = confirm("Are you sure you want to clear all tasks?");
    if (confirmation) {
        tasks.splice(0, tasks.length);
        saveTasks();
        displayTasks();
    }
}

function loadTasks() {
    try {
        const data = localStorage.getItem('tasks');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error loading tasks:", error.message);
        return [];
    }
}

function saveTasks() {
    try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error("Error saving tasks:", error.message);
    }
}

// Display tasks when the page loads
displayTasks();
