import BetterModel from './BetterModel.js';
import BetterView from './BetterView.js';

export default class BetterController {
    constructor(title) {
        this.title = title;
        this.user = "user";
        this.titleElement = document.getElementById(this.title);
        this.userElement = document.getElementById(this.user);
        this.betterModel = new BetterModel();
        this.betterView = new BetterView();        
    }

    // Controller Methods Here

    showTitle() {
        this.betterView.renderTitle(this.titleElement, "Better Every Day");
    }

    addRecord() {
        const user = {first: "Ada", last: "Lovelace", born: 1815};
        this.betterModel.addUserRecord(user);
        this.betterView.renderUser(this.userElement, user);
    }
}