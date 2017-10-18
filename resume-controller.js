console.log("controller file loaded: ", "yes")

// pull professionalHistory Database from local storage
const professionalHistoryD = JSON.parse(professionalHistoryString);

// console.log professionHistoryD to check if retrieved and check structure
console.log("professionalHistoryD", professionalHistoryD);

// get control of container to place job history with document.getElementById
const profHistoryEl = document.getElementById("professional-history");

// assign professionalHistoryArray that is inside the professionalHistory object to a variable
const profHistoryArray = professionalHistory.professionalHistoryArray;


//loop through array and populate the <section id-"professional-history"> container with each array item (job).
for (let i = 0; i < profHistoryArray.length; i++) {
    let job = profHistoryArray[i];

    profHistoryEl.innerHTML += `
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