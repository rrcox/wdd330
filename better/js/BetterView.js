import { barGraph, getMaxProportion } from './library.js';

export default class BetterView {
    renderTitle(titleElement, title) {
        titleElement.innerHTML = title;
    }

    renderUser(userElement, user) {
        userElement.innerHTML = `<p>${user.first} ${user.last}, ${user.born}</p>`
    }

    renderDashboard(width, height) {
        const values = [
                            {label: 'Goal 2', target: 250, actual: 500 },
                            {label: 'Goal 1', target: 400, actual: 300 },
                            {label: 'Goal 3', target:  75, actual: 60 }
                       ];
                      
        const element = document.getElementById('dashboard');
        const maxProportion = getMaxProportion(values);
        const graphWidth = width * 0.8;
        const graphHeight = height * 0.4;            
        
        element.innerHTML = `<div id="canvas-div"  >
                                <canvas 
                                    id="canvas"
                                    width=${graphWidth} 
                                    height=${graphHeight}
                                >
                                </canvas>
                             </div>`;
    
        // Get canvas and context
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        
        barGraph(values, graphHeight, graphWidth, maxProportion, context);
    }
        
    renderLegend() {
        const element = document.getElementById('legend');
        element.innerHTML = `<div>Target</div>
                             <div id="targetColor"></div>
                             <div>Actual:</div>
                             <div id="actualColor"></div>`;
    }    
}