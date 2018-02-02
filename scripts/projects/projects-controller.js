

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
                <article class="col-xm-8 col-sm-6 col-md-4">
                    <div class="thumbnail project__thumbnail">
                        <a href="${project.deployed}" target="_blank"><img src="${project.image}" class="thumbnail__image img-responsive" alt="${project.name}"></a>
                        <div class="thumbnail__caption caption">
                            <h3>${project.name}</h3>
                            <p>${project.summary}</p>
                            <div class="caption__details">  
                                <h4 class="caption__header">Deployed</h4>
                                <p class="important-text"><a href="${project.deployed}" target="_blank">${project.deployed}</a></p>
                                <h4 class="caption__header">Github </h4>
                                <p class="important-text"><a href="${project.github}" target="_blank">${project.github}</a><p>
                                <h4 class="caption__header">Technologies </h4>
                                <p>${project.technologies}</p>
                            </div>
                        </div>
                    </div>
                </article>
            `
        })
        portfolioEl.innerHTML = portfolioString
    })
}

module.exports = populateProjects