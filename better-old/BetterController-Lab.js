import BetterModel from './BetterModel.js';
import BetterView from './BetterView.js';
// import { renderDashboard, renderLegend } from './library.js';

export default class BetterController {
    constructor(title) {
        this.title = title;
        this.user = "user";
        this.titleElement = document.getElementById(this.title);
        this.userElement = document.getElementById(this.user);
        this.betterModel = new BetterModel();
        this.betterView = new BetterView(); 
        this.width = window.innerWidth;
        this.height = window.innerHeight; 
        this.values = this.betterModel.getDashboardValues();     
    }

    // Controller Methods Here

    #showTitle() {
        // this.betterView.renderTitle(this.titleElement, "Better Every Day");
    }

    // addRecord() {
    //     const user = {first: "Ada", last: "Lovelace", born: 1815};
    //     this.betterModel.addUserRecord(user);
    //     this.betterView.renderUser(this.userElement, user);
    // }

    display() {
        this.#showTitle();
        this.betterView.renderDashboard(this.width, this.height, this.values);
        this.betterView.renderLegend();
    }

    addResizeListener() {
        window.addEventListener("resize", (event) => {
            this.betterView.renderDashboard(window.innerWidth, window.innerHeight);
        });
    }

    addDashboardListener() {
        const dashboardContainer = document.getElementById("dashboardContainer")
        const canvas = document.getElementById("canvas")
        console.log(this.values);
        canvas.addEventListener("click", (event) => {
            this.values.forEach(value => {
                if (event.offsetX >= value.targetLocation.x && event.offsetX <= value.targetLocation.x + value.targetLocation.w &&
                    event.offsetY >= value.targetLocation.y && event.offsetY <= value.targetLocation.y + value.targetLocation.h) {
                    console.log("bar clicked:", value.label);
                    const form = document.getElementById("dashboardForm");
                    form.style.display = "block";
                    dashboardContainer.style.display = "none";
                }
            })
        });
    }
}