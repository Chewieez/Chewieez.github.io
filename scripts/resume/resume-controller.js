
function populateResume() {
    // pull professionalHistory Database from local storage
    // const professionalHistoryD = JSON.parse(localStorage.getItem("professionalHistoryString"));

    // get control of container to place job history with document.getElementById
    const profHistoryEl = document.getElementById("professional-history");
    
    // create variable to hold Resume content from db
    let profHistoryArray = null;

    // pull professionalHistory from Firebase
    $.ajax({
        "url": "https://personal-site-60774.firebaseio.com/professionalHistoryArray.json"
    }).then((professionalHistory) => {
        // assign the returned value from Firebase (full of professional history) a variable
        profHistoryArray = professionalHistory
        
        // create an empty string to start building up to eventually place in DOM.
        let resumeString = "";

        //loop through array and populate the <section id-"professional-history"> container with each array item (job).
        for (let i = 0; i < profHistoryArray.length; i++) {
            let job = profHistoryArray[i];
        
            resumeString += `
                <article class="job-info">
                    <h4>${job.title}</h4>
                    <h5>${job.company}</h5>
                    <p>Dates: ${job.dates}</p>
                    <h5>Responsibilies:</h5>
                    <p>${job.responsibilities}</p>
                </article>
                <hr>
                `
        }
        profHistoryEl.innerHTML = resumeString
    })

}

module.exports = populateResume
