//Reading Existing SavedTodos From localStorage

const getSavedTodo = function () {
    const todoJSON = localStorage.getItem('todos');
    console.log(todoJSON);
    if (todoJSON !== null) {
        return JSON.parse(todoJSON);
    }
    else {
        return [];
    }

}

//Toggle Checked state using checkbox change
const toggleTodoCheckedStatus = function (id) {
    const todo = todos.find(function (value) {
        return value.id === id;
    })

    if (todo !== undefined) {
        todo.isFinished = !todo.isFinished;
    }
}
//Removing Todo using X button
const RemoveTodo = function (id) {
    const todoIndex = todos.findIndex(function (value) {
        return value.id === id;
    })

    if (todoIndex >= 0)
        todos.splice(todoIndex, 1);
}

//Save NewTodos To the localStorage
const saveTodo = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

//Rendering All Todos
function RenderTodos(todoList, filter) {
    //filtering elements according to filter.searchtext
    let filteredTodos = todoList.filter((value) => {
        // debugger
        return value.task.toLowerCase().includes(filter.searchtext.toLowerCase());
    })

    //filtering all incomplete todos
    const inCompleteTodos = todoList.filter((value) => {
        return !value.isFinished;
    })
    //clearing all stuff from div
    document.querySelector('#todos').innerHTML = ''

    //summary
    const summary = generateSummDOM('h2', inCompleteTodos.length);
    document.querySelector('#todos').appendChild(summary);

    //filtering incompleted elements according to filter.searchtext
    if (filter.hideCompleted)
        filteredTodos = IncompleteTodos(filteredTodos);

    filteredTodos.forEach(element => {
        const para = generateTodoDOM(element)
        document.querySelector('#todos').appendChild(para);
    });
}

//Generating DOM element for todo-list
const generateTodoDOM = function (todo) {
    const TodoEl = document.createElement('div');//parent element

    const chkbox = document.createElement('input');
    const txt = document.createElement('a');
    const btn = document.createElement('button');

    // chkbox.type = 'checkbox';
    chkbox.setAttribute('type', 'checkbox');
    TodoEl.appendChild(chkbox);


    chkbox.checked = todo.isFinished
    //adding event listener to each checkbox (it will update summary according it)
    chkbox.addEventListener('change', function () {
        toggleTodoCheckedStatus(todo.id);
        saveTodo(todos);
        RenderTodos(todos, filter);
    })

    txt.setAttribute('href', `./todo-edit.html#${todo.id}`);
    txt.textContent = todo.task;
    const now = moment().format('YYYY-MM-DD HH:mm');
    if (todo.durationTime < now && todo.durationTime != '') {
        setColor(txt, 'red');
    }
    else {
        setColor(txt, 'purple');
    }
    TodoEl.appendChild(txt);

    setElementID(btn, 'remove');
    btn.textContent = ' X ';
    TodoEl.appendChild(btn);

    //adding event listener to each removing button 
    btn.addEventListener('click', function () {
        RemoveTodo(todo.id);
        saveTodo(todos);
        RenderTodos(todos, filter);
    })

    setElementID(TodoEl, 'todo-element');
    return TodoEl;
}


//Generating DOM element for Summary
const generateSummDOM = function (type, length) {
    const summary = document.createElement('h2');
    summary.textContent = `You have ${length} Todos left`
    return summary;
}

//Filtering Incompleted Todos
const IncompleteTodos = function (filteredTodos) {
    return filteredTodos.filter((value) => {
        return !value.isFinished;
    })
}

const setElementID = function (element, id) {
    element.setAttribute('id', id);
}

const setColor = function (element, color) {
    element.style.color = color;
}