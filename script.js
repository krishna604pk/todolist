const taskInput = document.getElementById("task");
const categoryInput = document.getElementById("category");
const deadlineInput = document.getElementById("deadline");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");
const filterCategory = document.getElementById("filterCategory");

const todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo() {
    const task = taskInput.value;
    const category = categoryInput.value;
    const deadline = deadlineInput.value;

    if (task.trim() !== "") {
        const todo = {
            task,
            category,
            deadline
        };

        todos.push(todo);
        saveTodos();
        displayTodos();
        clearInputs();
    }
}

function clearInputs() {
    taskInput.value = "";
    categoryInput.value = "personal";
    deadlineInput.value = "";
}

function displayTodos() {
    const selectedCategory = filterCategory.value;
    const filteredTodos = selectedCategory === "all" ? todos : todos.filter(todo => todo.category === selectedCategory);

    todoList.innerHTML = "";

    filteredTodos.forEach((todo, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            Task: ${todo.task}<br>
            Category: ${todo.category}<br>
            Deadline: ${todo.deadline || "N/A"}<br>
            <button onclick="editTodo(${index})">Edit</button>
            <button onclick="deleteTodo(${index})">Delete</button>
        `;
        todoList.appendChild(listItem);
    });
}

function editTodo(index) {
    const updatedTask = prompt("Edit task:", todos[index].task);
    if (updatedTask !== null) {
        todos[index].task = updatedTask;
        saveTodos();
        displayTodos();
    }
}

function deleteTodo(index) {
    if (confirm("Are you sure you want to delete this to-do?")) {
        todos.splice(index, 1);
        saveTodos();
        displayTodos();
    }
}

addButton.addEventListener("click", addTodo);
filterCategory.addEventListener("change", displayTodos);

displayTodos();
