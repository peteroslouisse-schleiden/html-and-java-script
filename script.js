let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
    let subject = document.getElementById("subject").value;
    let task = document.getElementById("task").value;
    let dueDate = document.getElementById("dueDate").value;

    if(subject === "" || task === "" || dueDate === "") {
        alert("Please fill all fields!");
        return;
    }

    let newTask = {
        subject,
        task,
        dueDate,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    displayTasks();

    document.getElementById("subject").value = "";
    document.getElementById("task").value = "";
    document.getElementById("dueDate").value = "";
}

function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let total = tasks.length;
    let completedCount = 0;

    tasks.forEach((t, index) => {
        let today = new Date().toISOString().split("T")[0];

        let taskDiv = document.createElement("div");
        taskDiv.className = "task";

        if(t.completed) {
            taskDiv.classList.add("completed");
            completedCount++;
        }

        if(t.dueDate < today && !t.completed) {
            taskDiv.classList.add("overdue");
        }

        taskDiv.innerHTML = `
            <strong>${t.subject}</strong><br>
            ${t.task}<br>
            Due: ${t.dueDate}<br>
            <button class="small-btn" onclick="toggleComplete(${index})">Complete</button>
            <button class="small-btn" onclick="deleteTask(${index})">Delete</button>
        `;

        list.appendChild(taskDiv);
    });

    document.getElementById("total").innerText = total;
    document.getElementById("completed").innerText = completedCount;
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

displayTasks();
