const todoID = location.hash.substring(1);

const todos = getSavedTodo();

const taskEl = document.querySelector('#todo-task');
const CheckBox = document.querySelector('#todo-completed');
const durationEl = document.querySelector('#todo-duration');

const setTodosInfo = function (todoID) {
    const todo = todos.find(function (value) {
        return value.id === todoID;
    })

    if (todo === undefined) {
        location.assign('./todo.html');
    }

    taskEl.value = todo.task;
    CheckBox.checked = todo.isFinished;
    durationEl.value = todo.durationTime
    // console.log(durationEl.textContent);
    return todo;
}

//it will return todo setting its values to html containers
let todo = setTodosInfo(todoID);

taskEl.addEventListener('input', function (event) {
    todo.task = event.target.value;
    console.log(taskEl.textContent);
    saveTodo(todos);
})

CheckBox.addEventListener('change', function (event) {
    todo.isFinished = event.target.value
    saveTodo(todos);
})

durationEl.addEventListener('input', function (event) {
    todo.durationTime = event.target.value;
    saveTodo(todos);
})

document.querySelector('#remove-todo').addEventListener('click', function () {
    RemoveTodo(todoID);
    saveTodo(todos);
    location.assign('/Websites/Todos-app/todo.html');
})

window.addEventListener('storage', function (event) {
    todos = JSON.parse(event.newValue);
    saveTodo(todos);
})
