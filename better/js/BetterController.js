import BetterModel from './BetterModel.js';
import BetterView from './BetterView.js';
import { renderDashboard } from './library.js';

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
        renderDashboard(this.width, this.width, this.height);
    }

    addResizeListener() {
        window.addEventListener("resize", (event) => {
            renderDashboard(this.width, window.innerWidth, window.innerHeight);
        });
    }
}