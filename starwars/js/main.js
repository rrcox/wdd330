const peopleElement = document.getElementById("people");
const pagesElement = document.getElementById("pages");
const url = 'https://swapi.dev/api/people/';
const pageUrlPartial = "https://swapi.dev/api/people/?page=";

let people;

function renderPerson(person) {
    const element = document.createElement("li");
    element.innerHTML = `<h2>${person.name}</h2>`;
    return element;
}

function renderButton(pageNumber) {
    const element = document.createElement("button");
    element.innerHTML = `${pageNumber}`;
    element.addEventListener("click", () => {
        const pageUrl = pageUrlPartial + pageNumber;
        fetchPeople(pageUrl);
    });
    return element;
}

function handleNextButton(e) {
    if (people.next) fetchPeople(people.next); 
}

function handlePrevButton(e) {
    if (people.previous) fetchPeople(people.previous); 
}

async function fetchPeople(url) {
    const nextButtonElement = document.getElementById("next-button");
    const prevButtonElement = document.getElementById("prev-button");

    nextButtonElement.removeEventListener("click", handleNextButton);
    prevButtonElement.removeEventListener("click", handlePrevButton);
    
    const response = await fetch(url);
    people = await response.json();

    peopleElement.replaceChildren();
    people.results.forEach( (person) => {
        const personNode = renderPerson(person);
        peopleElement.appendChild(personNode);
    });

    nextButtonElement.addEventListener("click", handleNextButton);
    prevButtonElement.addEventListener("click", handlePrevButton);    
}

//-----------------------------------------------------------------------------
// Stretch Goal 2:
// 
// Function: buildPages()
// Build the correct number of buttons based on the total number of people
// returned by fetchPeople(). 
//-----------------------------------------------------------------------------

function buildPages () {
    const pages = Math.ceil(people.count / people.results.length);

    for (i = 1; i <= pages; i++) {
        const pageNode = renderButton(i)
        pagesElement.appendChild(pageNode)        
    }
}

//-----------------------------------------------------------------------------
// Function: run()
// Used to makes sure fetchPeople() completes before buildPages() is called.
// The buildPages() function needs the values from the people object.
//-----------------------------------------------------------------------------

async function run () {
    await fetchPeople(url);  
    buildPages();
}

run();