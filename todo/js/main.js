import Tasks from './modules/tasks.js';
import Todos from './modules/todos.js';
import AddTaskForm from './modules/form.js';

const tasks = new Tasks();
const todos = new Todos("todo", tasks);
const addTaskForm = new AddTaskForm("add-task-form", todos);

todos.show();
todos.addFilterEventListeners();
