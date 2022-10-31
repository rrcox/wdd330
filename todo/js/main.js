import Tasks from './modules/tasks.js';
import Todos from './modules/todos.js';
import AddTaskForm from './modules/form.js';

function highlightFilterButton(filter, filterAllButton,  filterIncompleteButton, filterCompleteButton) 
{
    filterAllButton.style.backgroundColor = (todos.getFilter() === "all" ? "green" : "white");
    filterIncompleteButton.style.backgroundColor = (todos.getFilter() === "incomplete" ? "green" : "white");
    filterCompleteButton.style.backgroundColor = (todos.getFilter() === "complete" ? "green" : "white");
}

export function addFilterEventListeners(todos) {
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
