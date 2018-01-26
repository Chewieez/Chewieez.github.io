const professionalHistory = {};
const professionalHistoryArray = [];

const job1 = {
    "company": "Emerald Studios",
    "title": "Staff Engineer",
    "dates": "2001 - 2003",
    "responsibilities": "Working in all aspects of running a commercial recording studio. Assisting and engineering sessions in seven studios. Aiding in communication between clients and studio employees"
}

const job2 = {
    "company": "Greg Lawrence Engineering",
    "title": "Audio Engineer",
    "dates": "2003 - present",
    "responsibilities": "Performing first engineer duties on full tracking and overdub sessions. Tuning and editing vocals for legendary artists including: Joan Osborne, Toby Keith, Clint Black, Vince Gill, David Lee Roth. Aiding in communication between the artists, the first engineer, and the producer to ensure a smooth session. Assisting the first engineer on sessions ranging from a small band to a string orchestra of over 80 musicians. Working with different clients every week and establishing long term business relations with producers, musicians, and other engineers."
}

const job3 = {
    "company": "Greg Lawrence Consulting",
    "title": "Social Media Consultant",
    "dates": "2009 - present",
    "responsibilities": "Helping small businesses learn how to leverage the power of social media to further their connection with the public and improve and increase sales, profits & company brand. Communicate with clients in person, over the phone, through the internet and also create and supply clients with guides to Social Media best practices and use."
}

// populate array with professional history so that it will always populate the page in the same order
professionalHistoryArray.unshift(job1);
professionalHistoryArray.unshift(job2);
professionalHistoryArray.unshift(job3);

// place ProfessionHistoryArray into professionalHistory object
professionalHistory.professionalHistoryArray = professionalHistoryArray;

// create a stringified version of professionalHistory object
const professionalHistoryString = JSON.stringify(professionalHistory);
// place stringified version in local storage
localStorage.setItem("professionalHistoryString", professionalHistoryString);

