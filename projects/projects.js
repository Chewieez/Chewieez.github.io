const allProjects = {};
const projectsArray = [];

const personalPage = {
    "name": "Personal Page",
    "date": "in progress",
    "technologies": "HTML, CSS, JavaScript",
    "teammates": "not applicable",
    "image": "https://drive.google.com/uc?id=0B73GTEesc6fzbDFDa0d1VGRiZW8"
}

// pushing personalPage project into the projects array.
projectsArray.push(personalPage);

// placing projectsArray into allProjects object
allProjects.projectsArray = projectsArray;

// converting allProjects object into a string and placing in local storage
let projectString = JSON.stringify(allProjects);
localStorage.setItem("projectString", projectString);