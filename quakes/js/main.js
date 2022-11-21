import { getJSON, getLocation } from "./utilities.js";

const baseUrl =
  "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-01-01&endtime=2020-02-02";

let quakes = [];

async function everything() {
  let locResp = await getLocation();
  const location = locResp.coords;
  const radius = 500;
  const query =
    baseUrl +
    `&latitude=${location.latitude}&longitude=${location.longitude}&maxradiuskm=${radius}`;

  quakes = await getJSON(query);
  const listElement = document.querySelector("#quakeList");
  const listHtml = quakes.features.map((quake) => {
    return `<li id='${quake.id}'>${quake.properties.title} ${new Date(quake.properties.time)}</li>`;
  });
  listElement.innerHTML = listHtml.join("");

  listElement.addEventListener("click", (event) => {
    const quakeId = event.target.id;
    const quake = quakes.features.find((item) => item.id === quakeId);
    const detailsElement = document.querySelector("#quakeDetails");
    const quakeProperties = Object.entries(quake.properties);
    detailsElement.innerHTML = quakeProperties
      .map((item) => {
        if (item[0] === "time" || item[0] === "updated") {
          return `<li>${item[0]}: ${new Date(item[1])}</li>`;
        } else return `<li>${item[0]}: ${item[1]}</li>`;
      })
      .join("");
  });
}
everything();
