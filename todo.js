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
    if (event.target.elements.title.value != '') {
        const time = moment();//in the form of numbers
        todos.push(
            {
                id: uuidv4(),
                task: event.target.elements.title.value,
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


// //notfinished will contain an array of objects/todos that are not finished
// function RenderTodos(todoList) {
//     //Summary
//     const notfinished = todoList.filter((value) => {
//         return !value.isFinished;
//     })
//     const summary = document.createElement('h2');
//     summary.id = "summary"
//     summary.textContent = `You have ${notfinished.length} todos left`;
//     document.querySelector('body').appendChild(summary);

//     //Make a div of class todo-list
//     const block = document.createElement('div')
//     block.id = "todo-list"
//     document.querySelector('body').appendChild(block);

//     //Rendering
//     todo.forEach((value) => {
//         const p = document.createElement('p');
//         p.className = "todo"
//         p.textContent = `.${value.task}`
//         document.querySelector('#todo-list').appendChild(p);
//     })
// }


// //targeted by id
// document.querySelector('#cancel').addEventListener('click', function (e) {
//     console.log(e.target.textContent);
// })

// //------------------------------------(EXTRA WORK)-------------------------------------


// //buttons added (remove and add)
// document.querySelector('#add-todo').addEventListener('click', function () {
//     RemoveTodoListInputs();
//     const todoinput = document.createElement('input')
//     todoinput.placeholder = "Enter Todo Here : "
//     todoinput.id = "todo-input"
//     document.querySelector('#todo-list').appendChild(todoinput)

//     document.querySelector('#todo-list').querySelector('input').addEventListener('focusout', function (e) {
//         const p = document.createElement('p');
//         p.textContent = `.${e.target.value}`
//         document.querySelector('#todo-list').appendChild(p);
//         todoinput.remove();
//     })
// })

//remove all input fields in div having className = '.todo-list'
// function RemoveTodoListInputs() {
//     console.log("removing");
//     document.querySelector('#todo-list').querySelectorAll('input').forEach((value) => {
//         value.remove();
//     })
// }

// //remove
// document.querySelector('button#remove-todo').addEventListener('click', function () {
//     RemoveTodoListInputs();
//     const todoinput = document.createElement('input')
//     todoinput.placeholder = "Enter Number Here : "
//     todoinput.type = 'number';
//     todoinput.id = "todo-input-no"
//     document.querySelector('#todo-list').appendChild(todoinput);

//     document.querySelector('#todo-input-no').addEventListener('focusout', function (event) {
//         document.querySelector('.todo-list').querySelectorAll('p').forEach((value, index) => {
//             if (index + 1 == event.target.value)
//                 value.remove();
//         })
//         todoinput.remove();
//     })
// })



// //----------------------------------------------------------------------------------

// //-------------------------------Filtering TODO List--------------------------------------
// //creating a filter object containig searched_text
// const filters = {
//     searchtext: ''
// }

// //create an input field in div block
// const searchbar = document.createElement('input');
// searchbar.id = "search-engine"
// searchbar.placeholder = "Filter Your Todo List"
// document.querySelector('body').appendChild(searchbar);

// //setting up a div
// const block = document.createElement('div')
// block.id = "TodoList"
// document.querySelector('body').appendChild(block);


// //FilterUp
// function RenderFilteredList(list, filter) {
//     let filteredlist = []
//     if (filter.searchtext != '') {

//         filteredlist = list.filter((value) => {
//             return value.task.toLowerCase().includes(filter.searchtext.toLowerCase());
//         })
//     }
//     //removing previous results in div element
//     document.querySelector('#TodoList').innerHTML = ''

//     //adding new results
//     filteredlist.forEach((value) => {
//         const p = document.createElement('p');
//         p.textContent = value.task
//         document.querySelector('#TodoList').appendChild(p);
//     })
// }

// //RenderingFilteredList
// document.querySelector('#search-engine').addEventListener('input', function (event) {
//     filters.searchtext = event.target.value;
//     RenderFilteredList(todo, filters);
// })

// //------------------------------END---------------------------------------------

// //calling
// RenderTodos(todo);

// //Button Event Response
// //adding button (Extra Work) ---------------------------------------------------
// const bt = document.createElement('button');
// bt.textContent = "Clear Todo List"
// bt.id = "clear-list"
// console.log(bt);
// document.querySelector('body').appendChild(bt);

// //clicking event for remove and add
// document.querySelector('#clear-list').addEventListener('click', function (e) {
//     if (e.target.textContent.includes('Clear')) {
//         document.querySelector('#todo-list').remove();
//         document.querySelector("#summary").remove();
//         bt.textContent = "Restore Todo List"
//     }
//     else if (e.target.textContent.includes('Restore')) {
//         RenderTodos(todo);
//         bt.textContent = "Clear Todo List"
//         document.querySelector('body').appendChild(bt);
//     }
// })

// //-------------------------------------------------------------------------


// //----------------------------------FORMS-------------------------------
// document.querySelector('#add-new-todo').addEventListener('submit', function (event) {
//     //preventing from default work
//     event.preventDefault()
//     if (event.target.elements.title.value != '' && event.target.elements.time.value != '') {
//         todo.push({
//             task: event.target.elements.title.value,
//             time: event.target.elements.time.value,
//             iscompleted: false
//         })

//         //removing existing ones
//         document.querySelector('#todo-list').remove();
//         document.querySelector("#summary").remove();

//         //rerendering the Todo List
//         RenderTodos(todo);
//         event.target.elements.title.value = ''
//         event.target.elements.time.value = ''

//     }
// })


// // ------------------------------CheckBoxes---------------------------------------
// // hiding completed ones

// document.querySelector('#hide-comleted').addEventListener('change', function (event) {
//     document.querySelector('#todo-list').remove();
//     if (event.target.checked) {
//         todo.forEach((value) => {

//         })
//     }
//     else {
//         document.querySelector("#summary").remove();
//         RenderTodos();
//     }
// })
// // we have to add  todos(not finished yet)
// console.log(notfinished);


// // create function - creating an array of elements and maintain(store)

// function createTodos(arr1, arr2) {
//     arr1.forEach((value, index) => {
//         arr2.push(document.createElement('p'));
//         arr2[index].textContent = `${index + 1}. ${value.task}`;
//     })
// }
// const todos = [];

// createTodos(notfinished, todos);
// console.log(todos);
// // position todos that were created
// todos.forEach((value) => {
//     value.className = "incomplete-todo"
//     document.querySelector('body').appendChild(value);
// })
// // ----------------------------------------------------------------------------------