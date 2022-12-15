import home from "./view/home.js";
import dashboard from "./view/dashboard.js";
import goal from "./view/goal.js";
import Model from "./model.js";

//-----------------------------------------------------------------------------
// Data
//-----------------------------------------------------------------------------

// let values = [
//     {label: 'Walking', target: 10, actual:  8 },
//     {label: 'Situps',  target: 50, actual: 60 },
//     {label: 'Pushups', target: 25, actual: 23 },
//     {label: 'Chinups', target: 10, actual:  4 },
// ];

let values = [];
const model = new Model();

// model.writeValues(values).then( () => {}); 

localStorage.clear();
model.readValues(values).then( () => {
    localStorage.setItem("values", JSON.stringify(values));
    values = JSON.parse(localStorage.getItem("values") || "[]");
});

//-----------------------------------------------------------------------------
// Routing
//-----------------------------------------------------------------------------

const routes = {
    "/": { title: "Home", render: home },
    "/dashboard": { title: "Dashboard", render: dashboard },
    "/goal": { title: "Goal", render: goal },
};

function router(details=null) {
    let view = routes[location.pathname];

    if(details && !details.type) {
        view = routes["/goal"];
        history.replaceState(null, "", "/goal");
        document.title = view.title;
        app.innerHTML = view.render(details);
    } else {
        if (view) {
            document.title = view.title;
            app.innerHTML = view.render();
        } else {
            history.replaceState(null, "", "/");
            router();
        }
    }
};

document.querySelectorAll('.page').forEach(page => {
    page.addEventListener("click", event => {
        event.preventDefault();
        history.pushState(null, "", event.currentTarget.href);
        router();
    })
});

window.addEventListener("barGraphClick", event => {
    router(event.detail);
});
window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", router);
