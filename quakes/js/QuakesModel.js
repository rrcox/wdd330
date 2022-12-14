import { getJSON } from './utilities.js';

export default class Quake {
    constructor() {
        this.baseUrl =
            'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-03-02';
        this._quakes = [];
    }

    async getEarthQuakesByRadius(position, radius = 500) {
        const query = this.baseUrl +
            `&latitude=${position.lat}&longitude=${position.lon}&maxradiuskm=${radius}`;
        this._quakes = await getJSON(query);

        return this._quakes;
    }

    getQuakeById(id) {
        return this._quakes.features.filter(item => item.id === id)[0];
    }
}