export function barGraph(values, height, width, maxProportion, context) {

        // Draw bars
        const topGapPct = 0.9;
        const barWidth = Math.floor(width / ((values.length * 2) + values.length + 1)); 
        const xOffset = barWidth;
        const barGap = barWidth;
        
        let x;
        let y;
        let proportion;
        let targetHeight;
        let actualHeight;
        let targetGradient;
        let actualGradient;

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
            targetGradient = context.createLinearGradient(x, 0, x + barWidth, 0);
            targetGradient.addColorStop(0, "#64B5F6");
            targetGradient.addColorStop(1, "#1565C0");
            context.fillStyle = targetGradient;
            context.fillRect(x, y, barWidth, targetHeight);
            
            x = xOffset + barWidth + (i * barWidth * 2) + (i * barGap);
            y = height - actualHeight;
            actualGradient = context.createLinearGradient(x, 0, x + barWidth, 0);
            actualGradient.addColorStop(0, "#81C784");
            actualGradient.addColorStop(1, "#2E7D32");
            context.fillStyle = actualGradient;
            context.fillRect(x, y, barWidth, actualHeight);
        });
}

export function getMaxProportion(values) {
    let maxValue = 1 - values[0].actual / values[0].target;

    values.forEach(value => {
        let proportion = 1 - value.actual / value.target;
        if (Math.abs(proportion) >= Math.abs(maxValue) && proportion < 0 ) {
            maxValue = proportion;
        }
    })

    return maxValue;
}

