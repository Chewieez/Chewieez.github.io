const projects = {};

const personalPage = {
    "name": "Personal Page",
    "date completed": "in progress",
    "technologies": "HTML, CSS, JavaScript",
    "teammates": "not applicable"
}

projects.personalPage = personalPage;

projectString = JSON.stringify(projects);

localStorage.setItem("projectString", projectString);