const hikeList = [
    {
      name: "Bechler Falls",
      imgSrc: "falls.jpg",
      imgAlt: "Image of Bechler Falls",
      distance: "3 miles",
      difficulty: "Easy",
      description:
        "Beautiful short hike along the Bechler river to Bechler Falls",
      directions:
        "Take Highway 20 north to Ashton. Turn right into the town and continue \
        through. Follow that road for a few miles then turn left again onto the \
        Cave Falls road.Drive to the end of the Cave Falls road. There is a \
        parking area at the trailhead."
    },
    {
      name: "Teton Canyon",
      imgSrc: "falls.jpg",
      imgAlt: "Image of Bechler Falls",
      distance: "3 miles",
      difficulty: "Easy",
      description: "Beautiful short (or long) hike through Teton Canyon.",
      directions:
        "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. \
        Follow that road for a few miles then turn right onto Stateline \
        Road for a short distance, then left onto Alta Road. Veer right after \
        Alta back onto Teton Canyon Road. There is a parking area at the trailhead."
    },
    {
      name: "Denanda Falls",
      imgSrc: "falls.jpg",
      imgAlt: "Image of Bechler Falls",
      distance: "7 miles",
      difficulty: "Moderate",
      description:
        "Beautiful hike through Bechler meadows river to Denanda Falls",
      directions:
        "Take Highway 20 north to Ashton. Turn right into the town and continue \
        through. Follow that road for a few miles then turn left again onto the \
        Cave Falls road. Drive to until you see the sign for Bechler Meadows on \
        the left. Turn there. There is a parking area at the trailhead."
    }
];
  
const imgBasePath = "./images/";

export default class Hikes {
// class Hikes {
    constructor(elementId) {
        this.parentElement = document.getElementById(elementId);
    }

    getAllHikes() {
        return hikeList;
    }

    getHikeByName(hikeName) {
        return this.getAllHikes().find(hike => hike.name === hikeName);
    }
    
    showHikeList() {       
        renderHikeList(this.parentElement, hikeList);
    }

    showOneHike(hikeName) {
        const hike = this.getHikeByName(hikeName);
        const element = renderOneHikeFull(hike);
        this.parentElement.replaceChildren(element);
        const backButton = this.buildBackButton();
        this.parentElement.appendChild(backButton);
    }
    
    addHikeListener() {
        const children = Array.from(this.parentElement.children);
        children.forEach( (child) => {
            child.addEventListener("click", (e) => {
                const hikeName = e.target.closest("li").children[0].innerText;
                this.showOneHike(hikeName);
            })
        });
    }

    buildBackButton() {
        const backButton = document.createElement("button");
        backButton.innerText = "Back to Great Hikes List";
        backButton.addEventListener("click", (e) => {
            this.parentElement.replaceChildren();
            renderHikeList(this.parentElement, hikeList);
            this.addHikeListener();
        });

       return backButton;
    }
}

//*****************************************************************************
// Auxillary Module-Scope Functions
//*****************************************************************************

function renderHikeList(parent, hikes) {
    hikeList.forEach(hike => {
        const node = renderOneHikeLight(hike);
        parent.appendChild(node);
    })
}

function renderOneHikeLight(hike) {
    const item = document.createElement("li");
    item.innerHTML = ` <h2>${hike.name}</h2>
    <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
    <div>
            <div>
                <h3>Distance</h3>
                <p>${hike.distance}</p>
            </div>
            <div>
                <h3>Difficulty</h3>
                <p>${hike.difficulty}</p>
            </div>                
    </div>`;
    return item;
}

function renderOneHikeFull(hike) {
    const item = document.createElement("li");
    item.innerHTML = ` <h2>${hike.name}</h2>
    <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
    <div>
            <div>
                <h3>Distance</h3>
                <p>${hike.distance}</p>
            </div>
            <div>
                <h3>Difficulty</h3>
                <p>${hike.difficulty}</p>
            </div>
            <div> and other stuff </div>            
    </div>`;
    return item;
}
