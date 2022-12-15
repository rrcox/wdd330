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
        const canvas = document.getElementById("canvas")
        console.log(this.values);
        canvas.addEventListener("click", (event) => {
            let x = event.offsetX;
            let y = event.offsetY;
            
            this.values.forEach(value => {
                let tx = value.targetLocation.x;
                let ty = value.targetLocation.y;
                let tw = value.targetLocation.w;
                let th = value.targetLocation.h;
                let ax = value.actualLocation.x;
                let ay = value.actualLocation.y;
                let aw = value.actualLocation.w;
                let ah = value.actualLocation.h;
    
                if ((x >= tx && x <= tx + tw && y >= ty && y <= ty + th) ||
                    (x >= ax && x <= ax + aw && y >= ay && y <= ay + ah)) 
                {
                    console.log("bar clicked:", value.label);
                    // build goal set screen
                }
            })
        });
    }
}