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
        this.betterView.renderDashboard(this.width, this.height);
        this.betterView.renderLegend();
    }

    addResizeListener() {
        window.addEventListener("resize", (event) => {
            this.betterView.renderDashboard(this.width, window.innerWidth, window.innerHeight);
        });
    }
}