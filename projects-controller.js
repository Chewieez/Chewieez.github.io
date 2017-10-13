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
                        <p>${project.name}</p>
                        <p>Date completed: ${project.date}</p>
                        <p>Technologies used: ${project.technologies}</p>
                        <p>Teamates: ${project.teammates}</p>
                        </div>
                    </a>
                </div>
            </article>       
    
        `
    }
}




