export function renderDashboard(initialWidth, width, height) {
    const values = [
                        {label: 'Goal 2', target: 250, actual: 600 },
                        {label: 'Goal 1', target: 400, actual: 300 },
                        {label: 'Goal 3', target:  75, actual: 60 }
                   ];

                   
    const element = document.getElementById('dashboard');
    const scale = width / initialWidth * 1.4;
    const maxProportion = getMaxProportion(values);
    console.log('max pro=', maxProportion); 
    const graphWidth = width * 0.8;
    const graphHeight = height * 0.4;            
    console.log('height=', height); 
    console.log('graphHeight=', graphHeight); 
    
    element.innerHTML = `<div id="canvas-div"  >
                            <canvas 
                                id="canvas"
                                width=${graphWidth} 
                                height=${graphHeight}
                            >
                            </canvas>
                            <div>${graphWidth}</div>
                            <div>${graphHeight}</div>
                         </div>`;

    // Get canvas and context
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    
    barGraph(values, graphHeight, graphWidth, maxProportion, context, scale);
}
    
function barGraph(values, height, width, maxProportion, context, scale = 1) {

        // Create target and actual gradients
        const targetGradient = context.createLinearGradient(20, 400, 20, 800);
        targetGradient.addColorStop(0, "blue");
        targetGradient.addColorStop(1, "lightblue");

        const actualGradient = context.createLinearGradient(20, 400, 20, 800);
        actualGradient.addColorStop(0, "green");
        actualGradient.addColorStop(1, "lightgreen");

        // Draw bars
        const topGapPct = 0.9;
        const xOffset = 40 * scale;
        const yOffset = 40 * scale;
        const barWidth = 60 * scale;
        const barGap = 40 * scale;
        let x = 0;
        let y = 0;
        let proportion;
        let targetHeight;
        let actualHeight;

        values.forEach((value, i) => {
            if (maxProportion > 0) {
                proportion = 1 - value.actual / value.target ;
                targetHeight = height * topGapPct;
                actualHeight = targetHeight - proportion * targetHeight;
            } else {
                proportion = 1 - value.actual / value.target ;
                targetHeight = height * topGapPct / (1 - maxProportion);
                actualHeight = targetHeight * (1 - proportion);
            }

            x = xOffset + (i * barWidth * 2) + (i * barGap);
            y = height - targetHeight;
            context.fillStyle = targetGradient;
            context.fillRect(x, y, barWidth, targetHeight);
            
            x = xOffset + barWidth + (i * barWidth * 2) + (i * barGap);
            y = height - actualHeight;
            context.fillStyle = actualGradient;
            context.fillRect(x, y, barWidth, actualHeight);
        });
}

function getMaxProportion(values) {
    let maxValue = 1 - values[0].actual / values[0].target;

    values.forEach(value => {
        let proportion = 1 - value.actual / value.target;
        if (Math.abs(proportion) >= Math.abs(maxValue) && proportion < 0 ) {
            maxValue = proportion;
        }
    })

    return maxValue;
}

