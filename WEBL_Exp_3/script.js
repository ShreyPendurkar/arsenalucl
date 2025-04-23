let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDateTime = document.getElementById('taskDateTime');
    const taskText = taskInput.value.trim();
    const taskDueDate = taskDateTime.value;

    if (taskText !== "" && taskDueDate !== "") {
        const task = {
            text: taskText,
            dueDate: taskDueDate,
            createdDate: new Date().toLocaleString(),
            completed: false
        };
        tasks.push(task);
        taskInput.value = "";
        taskDateTime.value = "";
        renderTasks();
    } else {
        alert("Please enter a task and select a due date and time.");
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement('li');

        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task.text;
        if (task.completed) {
            taskText.classList.add('completed');
        }

        const createdDate = document.createElement('span');
        createdDate.className = 'task-date';
        createdDate.textContent = `Created: ${task.createdDate}`;

        const dueDate = document.createElement('span');
        dueDate.className = 'task-date';
        dueDate.textContent = `Due: ${new Date(task.dueDate).toLocaleString()}`;

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = task.text;
        editInput.style.display = 'none';
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-btn';
        editButton.onclick = () => {
            taskText.style.display = 'none';
            editInput.style.display = 'inline-block';
            editButton.style.display = 'none';
            saveButton.style.display = 'inline-block';
            editInput.focus();
        };

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.className = 'edit-btn';
        saveButton.style.display = 'none';
        saveButton.onclick = () => {
            if (editInput.value.trim() !== "") {
                task.text = editInput.value.trim();
                taskText.textContent = task.text;
                taskText.style.display = 'inline-block';
                editInput.style.display = 'none';
                saveButton.style.display = 'none';
                editButton.style.display = 'inline-block';
                renderTasks();
            } else {
                alert("Task cannot be empty.");
            }
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = () => {
            tasks.splice(index, 1);
            renderTasks();
        };

        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? 'Undo' : 'Complete';
        completeButton.className = 'complete-btn';
        completeButton.onclick = () => {
            task.completed = !task.completed;
            renderTasks();
        };

        editInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveButton.click();
            }
        });

        li.appendChild(taskText);
        li.appendChild(createdDate);
        li.appendChild(dueDate);
        li.appendChild(editInput);
        li.appendChild(editButton);
        li.appendChild(saveButton);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

// Initial render
renderTasks();
