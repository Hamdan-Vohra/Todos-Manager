let todos = getSavedTodo();

const filter = {
    searchtext: '',
    hideCompleted: false
}


RenderTodos(todos, filter);

//filter
document.querySelector('#search-text').addEventListener('input', function (event) {
    filter.searchtext = event.target.value;
    RenderTodos(todos, filter)
})

//adding new Todo in list
document.querySelector('#add-new-todo').addEventListener('submit', function (event) {
    event.preventDefault();
    const text = event.target.elements.title.value.trim();
    if (text.length > 0) {
        const time = moment();//in the form of numbers
        todos.push(
            {
                id: uuidv4(),
                task: text,
                isFinished: false,
                createdTime: time,
                durationTime: event.target.elements.duration.value,
            }
        )
    }
    saveTodo(todos);
    RenderTodos(todos, filter)
    event.target.elements.title.value = ''
})

//checkbox - hiding completed todos
document.querySelector('#hide-completed').addEventListener('change', function (event) {
    filter.hideCompleted = event.target.checked
    RenderTodos(todos, filter)
})

window.addEventListener('storage', function () {
    todos = getSavedTodo();
    RenderTodos(todos, filter);
})


