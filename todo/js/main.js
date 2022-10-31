// import Tasks from './modules/tasks.js';
// import Todos from './modules/todos.js';
// import AddTaskForm from './modules/form.js';

class Tasks {
    constructor() {
        this.list = this.getTaskList() || [];
        this.filter = this.getTaskListFilter() || "all";
    }

    updateTask(node) {
        let newList = this.list.map(task => {
            if (task.id === node.id) {
                if (task.complete === "true") {
                    task.complete = "false"
                } else {
                    task.complete = "true";
                }
            } 
            return task;
        });
        this.setTaskList(newList);
    }

    addToTaskList(taskName) {
        const newTask = {
            id: Date.now().toString(),
            name: taskName,
            complete: false.toString()
        };
        this.list.push(newTask);
        return newTask;
    }

    removeFromTaskList(node) {
        const id = node.children[0].children[1].id;
        this.list = this.list.filter(task => task.id !== id);
    }

    getTaskList() {
        return JSON.parse(window.localStorage.getItem('toDo'));
    }

    getTaskListFilter() {
        return JSON.parse(window.localStorage.getItem('toDoFilter'));
    }

    setTaskList(list) {
        window.localStorage.setItem('toDo', JSON.stringify(list));
    }
    
    setTaskListFilter(filter) {
        window.localStorage.setItem('toDoFilter', JSON.stringify(filter));
        this.filter = filter;
    }
}

class Todos {
    constructor(elementId, tasks) {
        this.parentElement = document.getElementById(elementId);
        this.parentElement.addEventListener("click", (e) => {
            console.log("event triggered");
            console.log(e.target);
            if (e.target.classList.contains("remove")) {
                console.log("remove clicked");
                const taskNode = e.target.closest("li");
                this.removeTask(taskNode)
            } else if (e.target.classList.contains("complete")) {
                this.#completeTask(e.target);
            }
        });
        this.tasks = tasks;
    }

    #strikeThrough(text) {
        return text
            .split('')
            .map((char) => char + '\u0336')
            .join('')
    }
    
    #clearStrikeThrough(text) {
        return text
            .split('')
            .filter((char) => char !== '\u0336')
            .join('');
    }

    #completeTask(node) {
        console.log("in complete task");
        const taskName = node.nextElementSibling;
        if (node.innerText === "&#9744;") { 
            node.innerText = "&#10004;";
            const strikeThroughText = this.#strikeThrough(taskName.innerText);
            taskName.innerText = strikeThroughText;
        } else {
            node.innerText = "&#9744;";
            const text = this.#clearStrikeThrough(taskName.innerText);
            taskName.innerText = text;
        }

        this.tasks.updateTask(node.nextElementSibling);
        this.hide();
        this.show();
    }
    
    show() {       
        this.tasks.list.forEach(task => {
            const element = renderTask(task, this.#strikeThrough);
            const complete = (task.complete === "true");
            const filter = this.tasks.filter;

            if (filter === "complete" && complete ||
                filter === "incomplete" && !complete ||
                filter === "all" ) 
            {
                this.parentElement.appendChild(element);
            }
        });
    }

    hide() {
        this.parentElement.replaceChildren();
    }

    addTask(taskName) {
        const newTask = this.tasks.addToTaskList(taskName);
        this.tasks.setTaskList(this.tasks.list);
        const element = renderTask(newTask, this.#strikeThrough);
        this.parentElement.appendChild(element);
    }

    removeTask(node) {
        this.parentElement.removeChild(node)
        this.tasks.removeFromTaskList(node)
        this.tasks.setTaskList(this.tasks.list);
    }
    
    getFilter() {
        return this.tasks.filter;
    }

    setFilter(filter) {
        this.tasks.setTaskListFilter(filter);
    }
}

class AddTaskForm {
    constructor(formId, todos) {
        this.formElement = document.getElementById(formId);
        this.formElement.addEventListener("submit", (e) => {
            e.preventDefault();
            const element = document.getElementById("taskName")
            const newTaskName = element.value;
            if (newTaskName !== "") {
                todos.addTask(newTaskName);
                element.value = "";
            }
        });                
    }
}

//*****************************************************************************
// Auxillary Module-Scope Functions
//*****************************************************************************

function renderTask(task, callback) {
    const element = document.createElement("li");
    let complete = "&#9744;"
    let newText = task.name;
    if (task.complete === "true") {
        complete = "&#10004;";
        newText = callback(task.name);
    }
    element.innerHTML = `
        <div id="taskGrid">
            <div class="complete">${complete}</div>
            <h2 id="${task.id}">${newText}</h2>
            <button class="remove">&#128465;</button>
        </div>`;
    return element;
}

function highlightFilterButton(filter, filterAllButton,  filterIncompleteButton, filterCompleteButton) 
{
    filterAllButton.style.backgroundColor = (todos.getFilter() === "all" ? "green" : "white");
    filterIncompleteButton.style.backgroundColor = (todos.getFilter() === "incomplete" ? "green" : "white");
    filterCompleteButton.style.backgroundColor = (todos.getFilter() === "complete" ? "green" : "white");
}

function addFilterEventListeners(todos) {
    const filterAllButton = document.getElementById("filter-all-button");
    const filterIncompleteButton = document.getElementById("filter-incomplete-button");
    const filterCompleteButton = document.getElementById("filter-complete-button");

    highlightFilterButton(todos.getFilter(), filterAllButton, filterIncompleteButton, filterCompleteButton);

    filterAllButton.addEventListener("click", (e) => {
        todos.hide();
        todos.setFilter("all");
        todos.show();
        highlightFilterButton(todos.getFilter(), filterAllButton, filterIncompleteButton, filterCompleteButton);
    });
    
    filterIncompleteButton.addEventListener("click", (e) => {
        todos.hide();
        todos.setFilter("incomplete");
        todos.show();
        highlightFilterButton(todos.getFilter(), filterAllButton, filterIncompleteButton, filterCompleteButton);
    });

    filterCompleteButton.addEventListener("click", (e) => {
        todos.hide();
        todos.setFilter("complete");
        todos.show();
        highlightFilterButton(todos.getFilter(), filterAllButton, filterIncompleteButton, filterCompleteButton);
    });

}

const tasks = new Tasks();
const todos = new Todos("todo", tasks);
const addTaskForm = new AddTaskForm("add-task-form", todos);

todos.show();
addFilterEventListeners(todos);
