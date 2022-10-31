export default class Todos {
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
    
    #highlightFilterButton(filterAllButton,  filterIncompleteButton, filterCompleteButton) {
        filterAllButton.style.backgroundColor = (this.getFilter() === "all" ? "green" : "white");
        filterIncompleteButton.style.backgroundColor = (this.getFilter() === "incomplete" ? "green" : "white");
        filterCompleteButton.style.backgroundColor = (this.getFilter() === "complete" ? "green" : "white");
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

    addFilterEventListeners() {
        const filterAllButton = document.getElementById("filter-all-button");
        const filterIncompleteButton = document.getElementById("filter-incomplete-button");
        const filterCompleteButton = document.getElementById("filter-complete-button");
    
        this.#highlightFilterButton(filterAllButton, filterIncompleteButton, filterCompleteButton);
    
        filterAllButton.addEventListener("click", (e) => {
            this.hide();
            this.setFilter("all");
            this.show();
            this.#highlightFilterButton(filterAllButton, filterIncompleteButton, filterCompleteButton);
        });
        
        filterIncompleteButton.addEventListener("click", (e) => {
            this.hide();
            this.setFilter("incomplete");
            this.show();
            this.#highlightFilterButton(filterAllButton, filterIncompleteButton, filterCompleteButton);
        });
    
        filterCompleteButton.addEventListener("click", (e) => {
            this.hide();
            this.setFilter("complete");
            this.show();
            this.#highlightFilterButton(this.getFilter(), filterAllButton, filterIncompleteButton, filterCompleteButton);
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
