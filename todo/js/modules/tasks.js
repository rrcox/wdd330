export default class Tasks {
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