//Reading Existing SavedTodos From localStorage

const getSavedTodo = function () {
    const todoJSON = localStorage.getItem('todos');

    try {
        return todoJSON ? JSON.parse(todoJSON) : [];
    }
    catch (e) {
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
    const TodoEl = document.createElement('label');//parent element
    const containerEl = document.createElement('div');
    const chkbox = document.createElement('input');
    const txt = document.createElement('span');
    const btn = document.createElement('button');
    //      SetUp todoElement
    TodoEl.classList.add('list-item');
    //          CheckBox
    chkbox.setAttribute('type', 'checkbox');
    containerEl.appendChild(chkbox);
    chkbox.checked = todo.isFinished
    chkbox.addEventListener('change', function () {
        toggleTodoCheckedStatus(todo.id);
        saveTodo(todos);
        RenderTodos(todos, filter);
    })
    //              TextBox
    txt.setAttribute('href', `./todo-edit.html#${todo.id}`);
    txt.textContent = todo.task;
    const now = moment().format('YYYY-MM-DD HH:mm');
    if (todo.durationTime != '' && todo.durationTime < now && !todo.isFinished) {
        setColor(txt, 'red');
    }
    else {
        setColor(txt, 'white');
    }
    containerEl.appendChild(txt);
    //      Setup ContainerEl
    containerEl.classList.add('list-item__container');
    TodoEl.appendChild(containerEl);

    //          Remove Button
    btn.textContent = 'remove';
    setElementID(btn, 'remove');
    btn.classList.add('button', 'button-text');
    TodoEl.appendChild(btn);
    btn.addEventListener('click', function () {
        RemoveTodo(todo.id);
        saveTodo(todos);
        RenderTodos(todos, filter);
    })
    return TodoEl;
}


//Generating DOM element for Summary
const generateSummDOM = function (type, length) {
    const summary = document.createElement('h2');
    summary.classList.add('list-title');
    summary.textContent = `You have ${length} ${length !== 1 ? 'Todos' : 'Todo'} left`
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