import Model from "../model.js";
import { cloneObjectArray } from "../library.js";

class GoalForm extends HTMLElement {
    constructor() {
        super();
        this.label = this.attributes.label.value;
        this.target = this.attributes.target.value;
        this.actual = this.attributes.actual.value;
        this.displayForm();
    }
    
    displayForm() {
        this.innerHTML = `
            <h1>Goal</h1>
            <form id="goalForm">
                <label for="target">Label*:</label>
                <input
                    type="text"
                    id="label"
                    name="label"
                    value="${this.label}"
                    required
                >
                <label for="target">Target*:</label>
                <input
                    type="text"
                    id="target"
                    name="target"
                    value="${this.target}"
                    required
                >
                <label for="actual">Actual*:</label>
                <input
                    type="text"
                    id="actual"
                    name="actual"
                    value="${this.actual}"
                    required
                >
                <input type="submit">
                <div id="formMessage"></div>
            </form>
        `;
        
        const form = document.getElementById('goalForm');
        form.addEventListener("submit", this.processForm);
    }
    
    processForm(e) {
        if (e.preventDefault) e.preventDefault();
        
        const labelChangedValue = document.getElementById('label').value;
        const targetChangedValue = document.getElementById('target').value;
        const actualChangedValue = document.getElementById('actual').value;
               
        const originalValues = JSON.parse(localStorage.getItem("values") || "[]");

        const changedValues = cloneObjectArray(originalValues);
        const changedValue = changedValues.find(value => value.label === this.label.value);
        
        changedValue.label = labelChangedValue;
        changedValue.target = +targetChangedValue;
        changedValue.actual = +actualChangedValue;

        const model = new Model();
        model.updateValues(originalValues, changedValues);

        return false;
    }    
}

customElements.define("goal-form", GoalForm);
