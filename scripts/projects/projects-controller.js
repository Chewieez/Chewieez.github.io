

function populateProjects() {
    // pull project data from Firebase
    $.ajax({
        "url": "https://personal-site-60774.firebaseio.com/projectsArray.json"
    }).then((projects) => {
        const projectsArray = projects

        // grab control of HTML container with document.getElementById()
        let portfolioEl = document.getElementById("portfolio")
        let portfolioString = ""
        // loop through arrays in object
        projectsArray.forEach(project => {
            // populate html container variable with project content
            portfolioString += `
                <article class="col-sm-6">
                    <div class="thumbnail">
                        <a href="${project.image}" target="_blank"><img src="${project.image}" class="img-responsive" alt="${project.name}">
                            <div class="caption">
                            <h4>${project.name}</h4>
                            <p><span class="important-text">Date completed:</span> ${project.date} &nbsp; &nbsp; <span class="important-text">Teammates:</span> ${project.teammates}</p>
                            <p>${project.summary}</p>
                            Deployed: <a href="${project.deployed}" target="_blank>http://trackd.me</a>
                            <p><span class="important-text">Technologies used:</span> ${project.technologies}</p>
                            
                            </div>
                        </a>
                    </div>
                </article>
            `
        })
        portfolioEl.innerHTML = portfolioString
    })
}

module.exports = populateProjects