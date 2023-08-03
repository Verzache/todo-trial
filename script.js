// script.js
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Function to add a task to the list
function addTaskToList(task) {
  const taskItem = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'checkbox';
  taskItem.appendChild(checkbox);

  const taskLabel = document.createElement('label');
  taskLabel.textContent = task.text;
  taskItem.appendChild(taskLabel);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = function() {
    deleteTask(task._id);
  };
  taskItem.appendChild(deleteButton);

  taskList.appendChild(taskItem);
}

// Function to fetch and display all tasks
async function displayTasks() {
  taskList.innerHTML = '';
  const response = await fetch('http://localhost:3000/api/tasks');
  const tasks = await response.json();
  tasks.forEach(addTaskToList);
}

// Function to add a new task
async function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    return;
  }

  const response = await fetch('http://localhost:3000/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: taskText }),
  });

  if (response.ok) {
    const newTask = await response.json();
    addTaskToList(newTask);
    taskInput.value = '';
  }
}

// Function to delete a task
async function deleteTask(id) {
  const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    displayTasks();
  }
}

// Event listener for form submission
taskForm.addEventListener('submit', function(event) {
  event.preventDefault();
  addTask();
});

// Initial fetch and display tasks
displayTasks();
