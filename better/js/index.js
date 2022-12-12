import BetterController from './BetterController.js';

const betterController = new BetterController("title");
// betterController.showTitle();
// betterController.addRecord();
betterController.addResizeListener();
betterController.display();

