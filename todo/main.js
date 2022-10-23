// export default class Todos {
class Todos {
    constructor(elementId) {
        this.parentElement = document.getElementById(elementId);
        this.parentElement.addEventListener("click", (e) => {
            if (e.target.id === "remove") {
                const taskNode = e.target.closest("li");
                this.removeTask(taskNode)
            } else if (e.target.id === "complete") {
                this.#completeTask(e.target);
            }
        });
        this.taskList = this.#getTaskList() || [];
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
        const taskName = node.nextElementSibling;
        if (node.innerText === "not complete") { 
            node.innerText = "complete";
            const strikeThroughText = this.#strikeThrough(taskName.innerText);
            taskName.innerText = strikeThroughText;
            this.#updateTask(node.nextElementSibling);
        } else {
            node.innerText = "not complete";
            const text = this.#clearStrikeThrough(taskName.innerText);
            taskName.innerText = text;
            this.#updateTask(node.nextElementSibling);
        }
    }
    
    #updateTask(node) {
        let newList = this.taskList.map(task => {
            if (task.id === node.id) {
                if (task.complete === "true") {
                    task.complete = "false"
                } else {
                    task.complete = "true";
                }
            } 
            return task;
        });
        this.#setTaskList(newList);
    }

    #addToTaskList(taskName) {
        const newTask = {
            id: Date.now().toString(),
            name: taskName,
            complete: false.toString()
        };
        this.taskList.push(newTask);
        console.log(this.taskList);
        return newTask;
    }

    #removeFromTaskList(node) {
        const id = node.children[0].children[1].id;
        this.taskList = this.taskList.filter(task => task.id !== id);
    }

    #getTaskList() {
        return JSON.parse(window.localStorage.getItem('toDo'));
    }

    #setTaskList(taskList) {
        window.localStorage.setItem('toDo', JSON.stringify(taskList));
    }

    show() {       
        this.taskList.forEach(task => {
            const element = renderTask(task);
            this.parentElement.appendChild(element);
        });
    }

    addTask(taskName) {
        const newTask = this.#addToTaskList(taskName);
        this.#setTaskList(this.taskList);
        const element = renderTask(newTask);
        this.parentElement.appendChild(element);
    }

    removeTask(node) {
        this.parentElement.removeChild(node)
        this.#removeFromTaskList(node)
        this.#setTaskList(this.taskList);
    }

}

//*****************************************************************************
// Auxillary Module-Scope Functions
//*****************************************************************************

function renderTask(task) {
    const element = document.createElement("li");
    element.innerHTML = `
        <div>
            <div id="complete">not complete</div>
            <h2 id="${task.id}">${task.name}</h2>
            <button id="remove">remove</button>
        </div>`;
    return element;
}

//-------main.js----------------------  

const todos = new Todos("todo");
todos.show();

const addTaskForm = document.getElementById("add-task-form");
addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const element = document.getElementById("taskName")
    const newTaskName = element.value;
    if (newTaskName !== "") {
        todos.addTask(newTaskName);
        element.value = "";
    }
});
