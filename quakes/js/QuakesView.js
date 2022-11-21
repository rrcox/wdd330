export default class QuakesView {
    renderTitle(titleElement, title) {
        titleElement.innerHTML = title;
    }

    renderQuakeList(quakeList, listElement) {
        listElement.innerHTML = quakeList.features
            .map((quake) => {
                return `<li id='${quake.id}'>${quake.properties.title} ${new Date(quake.properties.time)}</li>`;
            })
            .join('');
    }
    
    clearQuakeList(listElement) {
        listElement.innerHTML = null;
    }

    renderQuake(quake, detailsElement) {
        const quakeProperties = Object.entries(quake.properties);
        detailsElement.innerHTML = quakeProperties
            .map((item) => {
                if (item[0] === "time" || item[0] === "updated") {
                    return `<li>${item[0]}: ${new Date(item[1])}</li>`;
                } else {
                    return `<li>${item[0]}: ${item[1]}</li>`
                };
          })
          .join("");
    }

    clearQuake(detailsElement) {
        detailsElement.innerHTML = null;
    }

    displayButton(buttonElement, show){
        buttonElement.hidden = show ? false : true;
    }
}