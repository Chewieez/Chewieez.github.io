const retrievedAllProjects = JSON.parse(localStorage.getItem("projectString", projectString))
//testing that the database is properly retrieved
console.log("retrievedAllProjects", retrievedAllProjects);

// grab control of HTML container with document.getElementById()
let portfolioEl = document.getElementById("portfolio")


//loop through object
for (key in retrievedAllProjects) {
    let projectsArray = retrievedAllProjects[key];

    // loop through arrays in object
    for (let i = 0; i < projectsArray.length; i++) {
        let project = projectsArray[i];

        // populate html container variable with project content
        portfolioEl.innerHTML += `
            <article class="col-sm-6">
                <div class="thumbnail">
                    <a href="${project.image}" target="_blank"><img src="${project.image}" class="img-responsive" alt="${project.name}">
                        <div class="caption">
                        <h4>${project.name}</h4>
                        <p><span class="important-text">Date completed:</span> ${project.date} &nbsp; &nbsp; <span class="important-text">Teammates:</span> ${project.teammates}</p>
                        <p><span class="important-text">Technologies used:</span> ${project.technologies}</p>
                        </div>
                    </a>
                </div>
            </article>
        `
    }
}




