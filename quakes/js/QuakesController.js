import { getLocation } from './utilities.js';
import QuakesModel from './QuakesModel.js';
import QuakesView from './QuakesView.js';

export default class QuakesController {
    constructor(title, parent, details, position = null) {
        this.title = title;
        this.parent = parent;
        this.details = details;
        this.titleElement = null;
        this.parentElement = null;
        this.detailsElement = null;
        this.backButton = null;
        this.position = position || {lat: 0, lon: 0};
        this.quakesModel = new QuakesModel();
        this.quakesView = new QuakesView();        
    }

    async init() {
        this.titleElement = document.getElementById(this.title);
        this.parentElement = document.getElementById(this.parent);
        this.detailsElement = document.getElementById(this.details);
        await this.initPos();
        this.getQuakesByRadius();
        this.backButton = document.getElementById("backButton");
        this.addBackButtonListener();
    }

    async initPos() {
        if (this.position.lat === 0) {
            try {
                const locResponse = await getLocation();
                const location = locResponse.coords;
                this.position = {lat: location.latitude, lon: location.longitude}
            } catch (error) {
                console.log(error);
            }
        }
    }

    async getQuakesByRadius(radius = 500) {
        this.quakesView.renderTitle(this.titleElement, "Quake List");
        this.quakesView.clearQuake(this.detailsElement);
        this.parentElement.innerHTML = 'Loading...';

        const quakeList = await this.quakesModel.getEarthQuakesByRadius(this.position, radius);

        this.quakesView.renderQuakeList(quakeList, this.parentElement);
        this.quakesView.displayButton(this.backButton, false);
        this.parentElement.addEventListener('click', e => {
            this.getQuakeDetails(e.target.id);
        });
    }
  
    async getQuakeDetails(quakeId) {
        this.quakesView.renderTitle(this.titleElement, "Quake");
        this.quakesView.clearQuakeList(this.parentElement);

        const quake = this.quakesModel.getQuakeById(quakeId);

        this.quakesView.renderQuake(quake, this.detailsElement);
        this.quakesView.displayButton(this.backButton, true);
    }

    addBackButtonListener() {
        this.backButton.addEventListener('click', e => {
            console.log('back button clicked');
            this.getQuakesByRadius(); 
        });
    }
}