import BetterController from './BetterController.js';

const betterController = new BetterController("title");
// betterController.showTitle();
// betterController.addRecord();
betterController.addResizeListener();
betterController.display();
betterController.addDashboardListener();

function processDashboardForm() {
    console.log('form processed');
}

