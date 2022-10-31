export default class AddTaskForm {
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
