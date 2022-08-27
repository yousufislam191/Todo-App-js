const todoInput = document.querySelector("#todo-input");
const todoButton = document.querySelector("#todo-btn");
const todoForm = document.querySelector("#todo-form");
const todoList = document.querySelector("#list");
const todoMessage = document.querySelector("#message");

//todo message show
const showMessage = (text, status) => {
    todoMessage.innerHTML = text;
    todoMessage.classList.add("alert", `${status}`);
    todoMessage.setAttribute("role", "alert");
    setTimeout(() => {
        todoMessage.innerHTML = "";
        todoMessage.classList.remove("alert", `${status}`);
    }, 1500)
}

//delete todo
const deletetodo = (event) => {
    const selectedTodo = event.target.parentElement.parentElement.parentElement.parentElement;
    todoList.removeChild(selectedTodo);
    showMessage("Todo is deleted", "alert-danger");

    //deletetodo from localstorage
    let todos = getTodoFromLocalStorage();
    todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);
    localStorage.setItem("mytodos", JSON.stringify(todos));
}

//create todo
const createTodo = (todoId, todoValue) => {
    const todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-3 rounded-3 ps-3 pe-3 pt-2 pb-2 bg-dark bg-opacity-50 list-text">
        <span class="text-light text-capitalize fw-semibold">${todoValue}</span>
        <span>
            <button class="btn btn-warning text-danger ms-3" id="deletebtn">
                <i class="fa fa-trash"></i>
            </button>
        </span>
    </div>
    `;
    todoList.appendChild(todoElement);

    //delete todo button
    const deleteButton = todoElement.querySelector("#deletebtn");
    deleteButton.addEventListener("click", deletetodo);
}

//get todo from local storage
const getTodoFromLocalStorage = () => {
    return localStorage.getItem("mytodos")
        ? JSON.parse(localStorage.getItem("mytodos"))
        : [];
}

// add todo
const addTodo = (event) => {
    event.preventDefault();
    const todoValue = todoInput.value;

    const todoId = Date.now().toString();
    createTodo(todoId, todoValue);
    showMessage("Todo is added", "alert-success");

    //add todo to localstorage
    const todos = getTodoFromLocalStorage();
    todos.push({ todoId, todoValue });
    localStorage.setItem("mytodos", JSON.stringify(todos));
};

//load todo from localstorage after window loading
const loadTodo = () => {
    const todos = getTodoFromLocalStorage();
    todos.map((todo) => createTodo(todo.todoId, todo.todoValue))
}

// add listener
todoForm.addEventListener("submit", addTodo)
window.addEventListener("DOMContentLoaded", loadTodo)