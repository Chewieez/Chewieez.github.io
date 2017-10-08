const professionalHistory = {};

const job1 = {
    "company": "Emerald Studios",
    "title": "Staff Engineer",
    "dates": "2001 - 2003",
    "responsibilites": "Working in all aspects of running a commercial recording studio. Assisting and engineering sessions in seven studios. Aiding in communication between clients and studio employees"
}

const job2 = {
    "company": "Greg Lawrence Engineering" ,
    "title": "Audio Engineer",
    "dates": "2003 - present",
    "responsibilites": "Performing first engineer duties on full tracking and overdub sessions. Tuning and editing vocals for legendary artists including: Joan Osborne, Toby Keith, Clint Black, Vince Gill, David Lee Roth. Aiding in communication between the artists, the first engineer, and the producer to ensure a smooth session. Assisting the first engineer on sessions ranging from a small band to a string orchestra of over 80 musicians. Working with different clients every week and establishing long term business relations with producers, musicians, and other engineers."
}

const job3 = {
    "company": "Greg Lawrence Consulting",
    "title": "Social Media Consultant",
    "dates": "2009 - present",
    "responsibilites": "Helping small businesses learn how to leverage the power of social media to further their connection with the public and improve and increase sales, profits & company brand. Communicate with clients in person, over the phone, through the internet and also create and supply clients with guides to Social Media best practices and use."
}

professionalHistory.job1 = job1;
professionalHistory.job2 = job2;
professionalHistory.job3 = job3;


const professionalHistoryString = JSON.stringify(professionalHistory);
console.log(professionalHistoryString)
localStorage.setItem("professionalHistory", professionalHistoryString);